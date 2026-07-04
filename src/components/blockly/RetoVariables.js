import RetoBaseBlockly from "./RetoBaseBlockly";
import * as Blockly from "blockly/core";

// =======================
// BLOQUES
// =======================
function definirBloques() {

  // Crear variable
  Blockly.Blocks["lupi_set_var"] = {
    init: function () {
      this.appendValueInput("VALOR")
        .setCheck("Number")
        .appendField("Guardar en variable")
        .appendField(new Blockly.FieldTextInput("puntos"), "VAR");

      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(260);
    },
  };

  // Obtener variable
  Blockly.Blocks["lupi_get_var"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("valor de")
        .appendField(new Blockly.FieldTextInput("puntos"), "VAR");

      this.setOutput(true, "Number");
      this.setColour(260);
    },
  };

  // Número
  Blockly.Blocks["math_number"] = Blockly.Blocks["math_number"];

  // Decir con valor
  Blockly.Blocks["lupi_dice_var"] = {
    init: function () {
      this.appendValueInput("VALOR")
        .appendField("Lupi dice");

      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(160);
    },
  };
}

// =======================
// PARSER
// =======================
function parseBlock(block, parseStatementList) {
  if (!block) return [];

  const t = block.type;

  // Guardar variable
  if (t === "lupi_set_var") {
    const varName = block.getFieldValue("VAR");
    const valBlock = block.getInputTargetBlock("VALOR");

    let valor = 0;
    if (valBlock?.type === "math_number") {
      valor = Number(valBlock.getFieldValue("NUM"));
    }

    return [{ type: "set_var", varName, valor }];
  }

  // Obtener variable
  if (t === "lupi_get_var") {
    return [{ type: "get_var", varName: block.getFieldValue("VAR") }];
  }

  // Decir
  if (t === "lupi_dice_var") {
    const valBlock = block.getInputTargetBlock("VALOR");

    if (!valBlock) return [];

    if (valBlock.type === "lupi_get_var") {
      return [
        {
          type: "decir_var",
          varName: valBlock.getFieldValue("VAR"),
        },
      ];
    }

    if (valBlock.type === "math_number") {
      return [
        {
          type: "decir_num",
          valor: Number(valBlock.getFieldValue("NUM")),
        },
      ];
    }
  }

  return [];
}

// =======================
// VALIDACIÓN + EJECUCIÓN
// =======================
function validarSolucion(acciones, setLupi) {
  let memoria = {};

  acciones.forEach((a) => {
    if (a.type === "set_var") {
      memoria[a.varName] = a.valor;
    }

    if (a.type === "decir_var") {
      const valor = memoria[a.varName];

      setLupi((prev) => ({
        ...prev,
        mensaje: `Tengo ${valor} puntos`,
      }));
    }

    if (a.type === "decir_num") {
      setLupi((prev) => ({
        ...prev,
        mensaje: `Número: ${a.valor}`,
      }));
    }
  });

  // Validación
  const tieneVariable = acciones.some((a) => a.type === "set_var");
  const usaVariable = acciones.some((a) => a.type === "decir_var");

  if (!tieneVariable) {
    return { ok: false, mensaje: "Debes guardar un valor en una variable" };
  }

  if (!usaVariable) {
    return { ok: false, mensaje: "Debes usar la variable en Lupi dice" };
  }

  return { ok: true };
}

// =======================
// TOOLBOX
// =======================
const toolbox = `
<xml xmlns="https://developers.google.com/blockly/xml">
  <category name="Variables" colour="#9C27B0">
    <block type="lupi_set_var">
      <value name="VALOR">
        <shadow type="math_number">
          <field name="NUM">5</field>
        </shadow>
      </value>
    </block>

    <block type="lupi_get_var"></block>
  </category>

  <category name="Acciones" colour="#4CAF50">
    <block type="lupi_dice_var"></block>
  </category>

  <category name="Números">
    <block type="math_number"></block>
  </category>
</xml>
`;

// =======================
// COMPONENTE
// =======================
export default function RetoVariables({ setPantalla }) {
  return (
    <RetoBaseBlockly
      titulo="🧠 Reto de Variables"
      descripcion="Guarda un valor en una variable y luego haz que Lupi lo diga."
      toolboxXML={toolbox}
      definirBloques={definirBloques}
      parseBlock={parseBlock}
      validarSolucion={validarSolucion}
      bloquesIncorrectos={[]}
      setPantalla={setPantalla}
    />
  );
}