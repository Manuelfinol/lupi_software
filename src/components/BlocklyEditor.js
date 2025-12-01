// src/components/BlocklyEditor.js
import { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly/core";
import "blockly/blocks";
import { definirBloquesLupi } from "../blockly/customBlocks";
import Lupi from "./Lupi";

export default function BlocklyEditor() {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);
  const [lupi, setLupi] = useState({ x: 0, y: 0, mensaje: "" });

  // Toolbox con repeat corregido
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

    const onResize = () => {
      Blockly.svgResize(workspaceRef.current);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
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

  const ejecutarAcciones = (acciones) => {
    let x = 0,
      y = 0;
    setLupi({ x: 0, y: 0, mensaje: "" });

    acciones.forEach((accion, idx) => {
      setTimeout(() => {
        if (accion.type === "decir") {
          setLupi((prev) => ({ ...prev, mensaje: accion.mensaje }));
        } else if (accion.type === "mover") {
          if (accion.direccion === "UP") y -= 30;
          if (accion.direccion === "DOWN") y += 30;
          if (accion.direccion === "LEFT") x -= 30;
          if (accion.direccion === "RIGHT") x += 30;
          setLupi((prev) => ({ ...prev, x, y }));
        }
      }, idx * 800);
    });
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div
        ref={blocklyDiv}
        className="w-full h-[420px] border rounded-xl shadow-lg"
      />
      <div className="flex gap-4 mt-4">
        <button
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700"
          onClick={() => {
            const acciones = extractActionsFromWorkspace();
            ejecutarAcciones(acciones);
          }}
        >
          ▶ Ejecutar programa
        </button>
        <button
          className="px-6 py-2 bg-gray-300 rounded-lg"
          onClick={() => {
            const acciones = extractActionsFromWorkspace();
            console.log("Acciones extraídas:", acciones);
            alert(`Acciones: ${JSON.stringify(acciones)}`);
          }}
        >
          ℹ️ Ver acciones (debug)
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
    </div>
  );
}
