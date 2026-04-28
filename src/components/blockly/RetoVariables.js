// src/components/retos/RetoVariables.js
import RetoBaseBlockly from "./RetoBaseBlockly";
import * as Blockly from "blockly/core";

export default function RetoVariables({ setPantalla }) {
  // ============================
  // 1. DEFINIR BLOQUES
  // ============================
  const definirBloques = () => {
    Blockly.Blocks["set_variable"] = {
      init: function () {
        this.appendDummyInput()
          .appendField("crear variable")
          .appendField(new Blockly.FieldTextInput("edad"), "VAR")
          .appendField("valor")
          .appendField(new Blockly.FieldNumber(0, 0, 999), "VALUE");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
      },
    };

    Blockly.Blocks["get_variable"] = {
      init: function () {
        this.appendDummyInput()
          .appendField("valor de")
          .appendField(new Blockly.FieldTextInput("edad"), "VAR");
        this.setOutput(true, "Number");
        this.setColour(200);
      },
    };

    Blockly.Blocks["lupi_dice"] = {
      init: function () {
        this.appendValueInput("MENSAJE")
          .appendField("Lupi dice");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(160);
      },
    };
  };

  // ============================
  // 2. TOOLBOX
  // ============================
  const toolbox = `
  <xml xmlns="https://developers.google.com/blockly/xml">
    <category name="Variables" colour="#e67e22">
      <block type="set_variable"></block>
      <block type="get_variable"></block>
    </category>

    <category name="Acciones" colour="#9b59b6">
      <block type="lupi_dice"></block>
    </category>
  </xml>`;

  // ============================
  // 3. PARSER
  // ============================
  const parseBlock = (block) => {
    if (!block) return [];

    const t = block.type;

    if (t === "set_variable") {
      return [
        {
          type: "set_var",
          nombre: block.getFieldValue("VAR"),
          valor: Number(block.getFieldValue("VALUE")),
        },
      ];
    }

    if (t === "get_variable") {
      return [
        {
          type: "get_var",
          nombre: block.getFieldValue("VAR"),
          valor: "{{var}}",
        },
      ];
    }

    if (t === "lupi_dice") {
      const mensajeBlock = block.getInputTargetBlock("MENSAJE");
      const msg = mensajeBlock ? parseBlock(mensajeBlock)[0] : { valor: "" };
      return [{ type: "decir", valor: msg.valor }];
    }

    return [];
  };

  // ============================
  // 4. VALIDACIÓN DEL RETO
  // ============================
  const validarSolucion = (acciones) => {
    let edad = null;
    let mensaje = "";

    acciones.forEach((ac) => {
      if (ac.type === "set_var" && ac.nombre === "edad") {
        edad = ac.valor;
      }
      if (ac.type === "decir") {
        mensaje = ac.valor;
      }
    });

    if (edad === null) return false;

    return mensaje.includes(edad.toString());
  };

  // ============================
  // 5. RETURN FINAL
  // ============================
  return (
    <RetoBaseBlockly
      titulo="
        <span class='text-4xl font-extrabold text-green-700 drop-shadow'>
          🧮 Reto de Variables
        </span>
      "
      descripcion="
        <p class='text-lg'>
          Crea una variable llamada <strong>edad</strong>,
          ponle un valor numérico y luego
          haz que Lupi diga:
          <strong> 'Tengo X años' </strong>
          usando el valor de la variable.
        </p>
      "
      toolboxXML={toolbox}
      definirBloques={definirBloques}
      parseBlock={parseBlock}
      validarSolucion={validarSolucion}
      bloquesIncorrectos={["lupi_baila"]}
      setPantalla={setPantalla}
    />
  );
}
