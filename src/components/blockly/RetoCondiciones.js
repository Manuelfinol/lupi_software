import RetoBaseBlockly from "./RetoBaseBlockly";
import * as Blockly from "blockly/core";

export default function RetoCondiciones({ setPantalla }) {
  
  // ----------- DEFINIR BLOQUES ----------
  const definirBloques = () => {
    Blockly.Blocks["llueve"] = {
      init: function () {
        this.appendDummyInput().appendField("¿Está lloviendo?");
        this.setOutput(true, "Boolean");
        this.setColour(150);
      },
    };

    Blockly.Blocks["lupi_paraguas"] = {
      init: function () {
        this.appendDummyInput().appendField("Lupi abre paraguas");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(20);
      },
    };

    Blockly.Blocks["lupi_dice"] = {
      init: function () {
        this.appendDummyInput()
          .appendField("Lupi dice")
          .appendField(new Blockly.FieldTextInput("Hola"), "MSG");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(180);
      },
    };

    Blockly.Blocks["lupi_if_else"] = {
      init: function () {
        this.appendValueInput("COND").setCheck("Boolean").appendField("Si");
        this.appendStatementInput("DO").appendField("hacer");
        this.appendStatementInput("ELSE").appendField("si no");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour(230);
      },
    };

    // Bloques incorrectos
    Blockly.Blocks["lupi_baila"] = {
      init: function () {
        this.appendDummyInput().appendField("Lupi baila");
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setColour("#FF0000");
      },
    };
  };

  // ----------- TOOLBOX ----------
  const toolbox = `
  <xml>
    <category name="Condiciones" colour="#5CA699">
      <block type="lupi_if_else"></block>
      <block type="llueve"></block>
    </category>

    <category name="Acciones" colour="#A65C81">
      <block type="lupi_paraguas"></block>
      <block type="lupi_dice"></block>

      <!-- incorrecto -->
      <block type="lupi_baila"></block>
    </category>
  </xml>
  `;

  // ----------- PARSER ----------
  const parseBlock = (block, parseList) => {
    if (!block) return [];

    const t = block.type;

    if (t === "llueve") return [{ type: "cond_llueve" }];

    if (t === "lupi_paraguas") return [{ type: "paraguas" }];

    if (t === "lupi_dice")
      return [{ type: "decir", msg: block.getFieldValue("MSG") }];

    if (t === "lupi_if_else") {
      const cond = parseBlock(block.getInputTargetBlock("COND"), parseList);
      const doActions = parseList(block.getInputTargetBlock("DO"));
      const elseActions = parseList(block.getInputTargetBlock("ELSE"));

      return [{ type: "ifelse", cond, do: doActions, else: elseActions }];
    }

    return [];
  };

  // ----------- VALIDACIÓN ----------
  const validarSolucion = (acciones, setLupi) => {
    let llueve = true;

    const ejecutar = (list) => {
      list.forEach((a) => {
        if (a.type === "paraguas") setLupi((p) => ({ ...p, paraguas: true }));
        if (a.type === "decir") setLupi((p) => ({ ...p, mensaje: a.msg }));
      });
    };

    const bloque = acciones[0];
    if (!bloque || bloque.type !== "ifelse")
      return { ok: false, mensaje: "Debe haber un bloque SI-SINO." };

    const esLlueve = bloque.cond.some((c) => c.type === "cond_llueve");

    if (!esLlueve) return { ok: false, mensaje: "La condición debe ser llueve." };

    if (llueve) ejecutar(bloque.do);
    else ejecutar(bloque.else);

    return { ok: true };
  };

//   return (
//     <RetoBaseBlockly
//       titulo="Reto de Condiciones"
//       descripcion="Construye un programa que diga: Si llueve, Lupi abre el paraguas. Si no, Lupi dice 'Hace sol'."
//       toolboxXML={toolbox}
//       definirBloques={definirBloques}
//       parseBlock={parseBlock}
//       validarSolucion={validarSolucion}
//       bloquesIncorrectos={["lupi_baila"]}
//       setPantalla={setPantalla}
//     />
//   );


return (
  <RetoBaseBlockly
    titulo="
      <span class='text-4xl font-extrabold text-indigo-700 drop-shadow'>
        🌦️ Reto de <span class='text-indigo-900'>Condiciones</span>
      </span>
    "
    descripcion="
      <div class='text-gray-700 leading-relaxed'>
        <p>
          Construye un programa que cumpla lo siguiente:
        </p>
        <br>
        <p>
          <span class='font-bold text-blue-600'>Si llueve</span> ☔ →
          <span class='font-semibold text-green-600'> Lupi abre el paraguas</span>.
        </p>
        <p>
          <span class='font-bold text-yellow-600'>Si no llueve</span> 🌞 →
          <span class='font-semibold text-orange-600'> Lupi dice: “Hace sol”</span>.
        </p>
      </div>
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
