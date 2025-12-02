// src/components/BlocklyCondiciones.js
import { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly/core";
import "blockly/blocks";
import Lupi from "./Lupi";

// =========================
//  BLOQUES PERSONALIZADOS
// =========================

function definirBloquesCondicionales() {
  // Bloque SI
  Blockly.Blocks["lupi_if"] = {
    init: function () {
      this.appendValueInput("CONDICION")
        .setCheck("Boolean")
        .appendField("Si");
      this.appendStatementInput("DO").appendField("hacer");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(200);
      this.setTooltip("Ejecuta las acciones solo si la condición es verdadera");
    },
  };

  // Bloque SI-SINO
  Blockly.Blocks["lupi_if_else"] = {
    init: function () {
      this.appendValueInput("CONDICION")
        .setCheck("Boolean")
        .appendField("Si");
      this.appendStatementInput("DO").appendField("hacer");
      this.appendStatementInput("ELSE").appendField("si no");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("Evalúa la condición y ejecuta una de las dos opciones");
    },
  };

  // Condición: ¿Está lloviendo?
  Blockly.Blocks["llueve"] = {
    init: function () {
      this.appendDummyInput().appendField("¿Está lloviendo?");
      this.setOutput(true, "Boolean");
      this.setColour(120);
    },
  };

  // Acción: Lupi dice
  Blockly.Blocks["lupi_dice"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Lupi dice")
        .appendField(new Blockly.FieldTextInput("Hola"), "MENSAJE");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
    },
  };

  // Acción: Lupi abre paraguas
  Blockly.Blocks["lupi_paraguas"] = {
    init: function () {
      this.appendDummyInput().appendField("Lupi abre el paraguas");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(20);
    },
  };

  // ❌ Bloque incorrecto: Lupi baila
  Blockly.Blocks["lupi_baila"] = {
    init: function () {
      this.appendDummyInput().appendField("Lupi baila");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0); // rojo si se usa
    },
  };

// ❌ Bloque incorrecto: Lupi canta
  Blockly.Blocks["lupi_canta"] = {
    init: function () {
      this.appendDummyInput().appendField("Lupi canta");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(0);
    },
  };

// ❌ Condición incorrecta
  Blockly.Blocks["condicion_oscuro"] = {
    init: function () {
      this.appendDummyInput().appendField("¿Está oscuro?");
      this.setOutput(true, "Boolean");
      this.setColour(0);
    },
  };

}

// =========================
//  COMPONENTE PRINCIPAL
// =========================

export default function BlocklyCondiciones({ setPantalla }) {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

  const [lupi, setLupi] = useState({
    mensaje: "",
    paraguas: false,
  });

  // TOOLBOX DEL RETO
  const toolbox = `
  <xml xmlns="https://developers.google.com/blockly/xml">
    <category name="Condiciones" colour="#5CA699">
      <block type="lupi_if"></block>
      <block type="lupi_if_else"></block>
      <block type="llueve"></block>
      <block type="condicion_oscuro"></block>
    </category>

    <category name="Acciones" colour="#A65C81">
      <block type="lupi_dice"></block>
      <block type="lupi_paraguas"></block>
      <block type="lupi_baila"></block>
      <block type="lupi_canta"></block>
    </category>
  </xml>`;

  useEffect(() => {
    definirBloquesCondicionales();

    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox,
      scrollbars: true,
      trashcan: true,
    });

    return () => {
      workspaceRef.current?.dispose();
    };
  }, []);

  // =========================
  // PARSE / INTERPRETACIÓN
  // =========================

  const parseBlock = (block) => {
    if (!block) return [];

    const t = block.type;

     // ⚠️ Si el bloque es incorrecto, lo pintamos de rojo
    if (BLOQUES_INCORRECTOS.includes(t)) {
      block.setColour("#FF0000");
      block.setWarningText("Este bloque no debe usarse en este reto.");
    } else {
      // Restaurar color si lo quitan del programa
      block.setWarningText(null);
    }

    if (t === "lupi_dice") {
      return [{ type: "decir", texto: block.getFieldValue("MENSAJE") }];
    }

    if (t === "lupi_paraguas") {
      return [{ type: "paraguas" }];
    }

    if (t === "llueve") {
      return [{ type: "eval_llueve" }];
    }

    if (t === "lupi_if") {
      const cond = block.getInputTargetBlock("CONDICION");
      const condActions = parseBlock(cond);

      const doBlock = block.getInputTargetBlock("DO");
      const doActions = parseStatementList(doBlock);

      return [{ type: "if", cond: condActions, do: doActions }];
    }

    if (t === "lupi_if_else") {
      const cond = block.getInputTargetBlock("CONDICION");
      const condActions = parseBlock(cond);

      const doBlock = block.getInputTargetBlock("DO");
      const doActions = parseStatementList(doBlock);

      const elseBlock = block.getInputTargetBlock("ELSE");
      const elseActions = parseStatementList(elseBlock);

      return [{ type: "if_else", cond: condActions, do: doActions, else: elseActions }];
    }

    return [];
  };

  const parseStatementList = (firstBlock) => {
    const list = [];
    let cur = firstBlock;
    while (cur) {
      list.push(...parseBlock(cur));
      cur = cur.getNextBlock();
    }
    return list;
  };

  const extractActions = () => {
    const top = workspaceRef.current.getTopBlocks(true);
    const res = [];
    top.forEach((t) => res.push(...parseStatementList(t)));
    return res;
  };
  const BLOQUES_INCORRECTOS = [
      "lupi_baila",
      "lupi_canta",
      "condicion_oscuro",
    ];

  // =========================
  // EJECUCIÓN DEL PROGRAMA
  // =========================

  const ejecutar = () => {
  const acciones = extractActions();
  let llueveHoy = true;

  const ejecutarAccion = (accion) => {
    if (accion.type === "decir") {
      setLupi((p) => ({ ...p, mensaje: accion.texto }));
    }

    if (accion.type === "paraguas") {
      setLupi((p) => ({ ...p, paraguas: true }));
    }

    if (accion.type === "if") {
      const condicionEsLlueve = accion.cond.some((c) => c.type === "eval_llueve");

      if (condicionEsLlueve && llueveHoy) {
        accion.do.forEach((a) => ejecutarAccion(a)); // <== YA NO EJECUTA ejecutar()
      }
    }

    if (accion.type === "if_else") {
      const condicionEsLlueve = accion.cond.some((c) => c.type === "eval_llueve");

      if (condicionEsLlueve && llueveHoy) {
        accion.do.forEach((a) => ejecutarAccion(a));
      } else {
        accion.else.forEach((a) => ejecutarAccion(a));
      }
    }
  };

  // Validar que no existan bloques incorrectos
const incorrectoUsado = workspaceRef.current.getAllBlocks(false)
  .some(b => BLOQUES_INCORRECTOS.includes(b.type));

if (incorrectoUsado) {
  alert("❌ Hay bloques incorrectos en tu solución. Revísalos (están en rojo).");
  return;
}

  acciones.forEach((a) => ejecutarAccion(a));
};


  // =========================
  // RENDER
  // =========================

 return (
  <div className="flex flex-col w-full p-6">

    <h2 className="text-3xl font-bold mb-4 text-center">
      Reto de Condiciones ❓
    </h2>

    <p className="mb-4 text-lg max-w-xl text-center mx-auto">
      Construye el programa:  
      <strong> “Si está lloviendo, Lupi abre el paraguas. Si no, Lupi dice: Hace sol.”</strong>
    </p>

    {/* ============================
         DISPOSICIÓN HORIZONTAL
       ============================ */}
    <div className="flex gap-4 w-full">

      {/* (1) TOOLBOX / BLOQUES */}
        <div className="hidden">
      <div className="w-[260px] border rounded-xl shadow bg-white overflow-hidden">
        <h3 className="text-center font-bold p-2 bg-gray-100 border-b">Bloques</h3>
        </div>
      </div>
        {/* Nota: El toolbox no va aquí, pero dejamos este panel para estética */}

      {/* (2) WORKSPACE DE BLOCKLY */}
      <div className="flex-1">
        <div
          ref={blocklyDiv}
          className="w-full h-[460px] border rounded-xl shadow"
        />
        <button
          className="mt-4 px-6 py-3 bg-green-600 text-white rounded-xl"
          onClick={ejecutar}
        >
          ▶ Ejecutar programa
        </button>
      </div>

      {/* (3) RESULTADO LUPI */}
      <div className="w-[360px] flex flex-col items-center">
        <h3 className="font-bold mb-2">Resultado</h3>

        <div className="relative w-[240px] h-[240px] bg-blue-50 border rounded-xl flex items-center justify-center overflow-hidden">
          <Lupi
            mensaje={lupi.mensaje}
            emocion={lupi.paraguas ? "feliz" : "hablando"}
          />

          {lupi.paraguas && (
            <div className="absolute top-4 text-3xl">☂️</div>
          )}

          {/* Lluvia animada */}
          {lupi.llueve && (
            <div className="lluvia">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="gota"
                  style={{
                    left: `${Math.random() * 240}px`,
                    animationDelay: `${Math.random() * 0.4}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <button
          className="mt-4 px-4 py-2 bg-gray-400 text-white rounded-xl"
          onClick={() => setPantalla("menu")}
        >
          ⬅ Volver al menú
        </button>
      </div>
    </div>
  </div>
);

}
