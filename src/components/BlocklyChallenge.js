// src/components/BlocklyChallenge.js
import { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly/core";
import "blockly/blocks";
import { definirBloquesLupi } from "../blockly/customBlocks";
import Lupi from "./Lupi";

export default function BlocklyChallenge() {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);
  const [lupi, setLupi] = useState({ x: 0, y: 0, mensaje: "" });
  const [resultado, setResultado] = useState(null);

  const toolbox = `
    <xml xmlns="https://developers.google.com/blockly/xml">
      <block type="lupi_dice"></block>
      <block type="lupi_mover"></block>
      <block type="controls_repeat_ext">
        <value name="TIMES">
          <shadow type="math_number">
            <field name="NUM">3</field>
          </shadow>
        </value>
      </block>
      <block type="math_number"></block>
      <block type="text"></block>
    </xml>
  `;

  useEffect(() => {
    definirBloquesLupi();
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox,
      trashcan: true,
    });
    return () => {
      if (workspaceRef.current) {
        workspaceRef.current.dispose();
        workspaceRef.current = null;
      }
    };
  }, []);

  // --- Parser ---
  const parseStatementList = (firstBlock) => {
    const actions = [];
    let b = firstBlock;
    while (b) {
      actions.push(...parseBlock(b));
      b = b.getNextBlock();
    }
    return actions;
  };

  const parseBlock = (block) => {
    if (!block) return [];
    const type = block.type;

    if (type === "lupi_dice") {
      const mensaje = block.getFieldValue("MENSAJE") || "";
      return [{ type: "decir", mensaje }];
    }

    if (type === "lupi_mover") {
      const direccion = block.getFieldValue("DIRECCION") || "RIGHT";
      return [{ type: "mover", direccion }];
    }

    if (type === "controls_repeat_ext") {
      let times = 0;
      const timesBlock = block.getInputTargetBlock("TIMES");
      if (timesBlock && typeof timesBlock.getFieldValue === "function") {
        const val = timesBlock.getFieldValue("NUM");
        times = parseInt(val || "0", 10);
      }
      const doBlock = block.getInputTargetBlock("DO");
      let inner = [];
      if (doBlock) inner = parseStatementList(doBlock);

      const result = [];
      for (let i = 0; i < times; i++) {
        result.push(...inner);
      }
      return result;
    }

    return [];
  };

  const extractActionsFromWorkspace = () => {
    const workspace = workspaceRef.current;
    if (!workspace) return [];
    const top = workspace.getTopBlocks(true) || [];
    const topOrdered = top.filter((b) => !b.getPreviousBlock());
    const finalActions = [];
    topOrdered.forEach((tb) => {
      finalActions.push(...parseStatementList(tb));
    });
    return finalActions;
  };

  const ejecutarYValidar = () => {
    try {
      const acciones = extractActionsFromWorkspace();
      let x = 0,
        y = 0,
        mensaje = "";
      setResultado(null);

      acciones.forEach((accion, i) => {
        setTimeout(() => {
          if (accion.type === "decir") {
            mensaje = accion.mensaje;
            setLupi((prev) => ({ ...prev, mensaje }));
          } else if (accion.type === "mover") {
            if (accion.direccion === "RIGHT") x += 30;
            if (accion.direccion === "LEFT") x -= 30;
            if (accion.direccion === "UP") y -= 30;
            if (accion.direccion === "DOWN") y += 30;
            setLupi((prev) => ({ ...prev, x, y }));
          }
        }, i * 700);
      });

      const ok =
        acciones.length === 2 &&
        acciones[0].type === "decir" &&
        acciones[0].mensaje.toLowerCase().trim() === "hola" &&
        acciones[1].type === "mover" &&
        acciones[1].direccion === "RIGHT";

      setTimeout(() => {
        if (ok) {
          setResultado({
            ok: true,
            text: "🎉 ¡Muy bien! Lupi saludó y se movió a la derecha.",
          });
        } else {
          setResultado({
            ok: false,
            text:
              "❌ Intenta de nuevo. Pista: primero pon 'Lupi dice' con el texto Hola (exacto) y luego 'Mover a Lupi' → derecha.",
          });
        }
      }, acciones.length * 700 + 200);
    } catch (err) {
      console.error(err);
      setResultado({
        ok: false,
        text: "⚠ Ocurrió un error al ejecutar tu programa.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-bold mb-4">
        Reto: ¡Haz que Lupi salude y luego se mueva a la derecha!
      </h2>

      <div
        ref={blocklyDiv}
        className="w-full h-[420px] border rounded-xl shadow-lg"
      />

      <div className="flex gap-4 mt-4">
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg"
          onClick={ejecutarYValidar}
        >
          ▶ Ejecutar y verificar
        </button>
        <button
          className="px-6 py-2 bg-gray-300 rounded-lg"
          onClick={() => {
            const acciones = extractActionsFromWorkspace();
            console.log("Acciones:", acciones);
            alert(`Acciones: ${JSON.stringify(acciones)}`);
          }}
        >
          ℹ️ Ver acciones
        </button>
      </div>

      <div className="relative w-[320px] h-[320px] bg-gray-100 mt-6 border rounded-lg flex items-center justify-center overflow-hidden">
        <div
          className="absolute transition-all duration-500"
          style={{ transform: `translate(${lupi.x}px, ${lupi.y}px)` }}
        >
          <Lupi mensaje={lupi.mensaje} emocion="hablando" />
        </div>
      </div>

      {resultado && (
        <div
          className={`mt-4 p-4 rounded-lg shadow-lg ${
            resultado.ok
              ? "bg-green-100 text-green-900"
              : "bg-yellow-100 text-black"
          }`}
        >
          {resultado.text}
        </div>
      )}
    </div>
  );
}
