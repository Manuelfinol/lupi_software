import * as Blockly from "blockly/core";
import RetoBaseBlockly from "./RetoBaseBlockly";

export default function RetoBucles({ setPantalla }) {

  const toolbox = `
  <xml xmlns="https://developers.google.com/blockly/xml">

    <category name="Bucles" colour="#ff9800">
      <block type="lupi_repeat"></block>
    </category>

    <category name="Acciones" colour="#4caf50">
      <block type="lupi_mover"></block>
    </category>

  </xml>
  `;

  const definirBloques = () => {

    if (!Blockly.Blocks["lupi_repeat"]) {

      Blockly.Blocks["lupi_repeat"] = {
        init: function () {
          this.appendDummyInput()
            .appendField("Repetir")
            .appendField(
              new Blockly.FieldNumber(3, 1, 10),
              "TIMES"
            )
            .appendField("veces");

          this.appendStatementInput("DO")
            .appendField("hacer");

          this.setColour(40);

          this.setPreviousStatement(true);
          this.setNextStatement(true);
        },
      };
    }

    if (!Blockly.Blocks["lupi_mover"]) {

      Blockly.Blocks["lupi_mover"] = {
        init: function () {
          this.appendDummyInput()
            .appendField("➡️ Avanzar");
              
            this.setColour(120);

          this.setPreviousStatement(true);
          this.setNextStatement(true);
        },
      };
    }
  };

  const parseBlock = (block, parseStatementList) => {

    if (!block) return [];

    if (block.type === "lupi_mover") {
      return [
        {
          type: "mover",
          dir: "RIGHT",
        },
      ];
    }

    if (block.type === "lupi_repeat") {

      const veces =
        Number(block.getFieldValue("TIMES")) || 0;

      const doBlock =
        block.getInputTargetBlock("DO");

      const accionesInternas =
        parseStatementList(doBlock);

      const resultado = [];

      for (let i = 0; i < veces; i++) {
        resultado.push(...accionesInternas);
      }

      return resultado;
    }

    return [];
  };

  const validarSolucion = (acciones) => {

    const movimientos =
      acciones.filter(
        (a) => a.type === "mover"
      ).length;

    if (movimientos !== 3) {
      return {
        ok: false,
        mensaje:
          "Debes hacer que Lupi avance exactamente 3 veces.",
      };
    }

    return {
      ok: true,
    };
  };

  return (
    <RetoBaseBlockly
      titulo="🔁 Reto de Bucles"
      descripcion="
      Ayuda a Lupi a avanzar usando un bucle.<br><br>
      <strong>Debes repetir 3 veces la acción Avanzar.</strong>
      "
      toolboxXML={toolbox}
      definirBloques={definirBloques}
      parseBlock={parseBlock}
      validarSolucion={validarSolucion}
      setPantalla={setPantalla}
    />
  );
}