// src/blockly/customBlocks.js
import * as Blockly from "blockly/core";

export function definirBloquesLupi() {
  // --- Bloques personalizados de Lupi ---

  // Bloque: Lupi dice un mensaje
  Blockly.Blocks["lupi_dice"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Lupi dice")
        .appendField(new Blockly.FieldTextInput("Hola!"), "MENSAJE");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip("Lupi dirá un mensaje en pantalla");
    },
  };

  // Bloque: Mover a Lupi
  Blockly.Blocks["lupi_mover"] = {
    init: function () {
      this.appendDummyInput()
        .appendField("Mover a Lupi")
        .appendField(
          new Blockly.FieldDropdown([
            ["arriba ⬆", "UP"],
            ["abajo ⬇", "DOWN"],
            ["izquierda ⬅", "LEFT"],
            ["derecha ➡", "RIGHT"],
          ]),
          "DIRECCION"
        );
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(160);
      this.setTooltip("Mueve a Lupi en una dirección");
    },
  };

  // --- Parche: Sobrescribir controls_repeat_ext ---
  // Corrige el error "Message does not reference all 1 arg(s)."
  Blockly.Blocks["controls_repeat_ext"] = {
    init: function () {
      this.jsonInit({
        "type": "controls_repeat_ext",
        "message0": "repetir %1 veces %2 %3",
        "args0": [
          {
            "type": "input_value",
            "name": "TIMES",
            "check": "Number"
          },
          {
            "type": "input_dummy"
          },
          {
            "type": "input_statement",
            "name": "DO"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": 120,
        "tooltip": "Repite las instrucciones el número de veces indicado.",
        "helpUrl": "https://developers.google.com/blockly/guides/create-custom-blocks/define-blocks"
      });
    }
  };
}
