// src/components/blockly/RetoBaseBlockly.js
import { useEffect, useRef, useState } from "react";
import * as Blockly from "blockly/core";
import "blockly/blocks";
import Lupi from "../Lupi";

export default function RetoBaseBlockly({
  titulo = "Reto Blockly",
  descripcion = "",
  toolboxXML = "",
  definirBloques = () => {},
  parseBlock = () => [],
  validarSolucion = () => ({ ok: false, mensaje: "Validación no implementada" }),
  bloquesIncorrectos = [],
  setPantalla,
}) {

  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

  const [lupi, setLupi] = useState({ mensaje: "", x: 0, y: 0, paraguas: false });

  // ================
  // INICIALIZAR BLOCKLY
  // ================
  useEffect(() => {
    definirBloques();

    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolboxXML,
      scrollbars: true,
      trashcan: true,
    });

    return () => workspaceRef.current?.dispose();
  }, []);

  // ================
  // PARSER DE LISTA
  // ================
  const parseStatementList = (firstBlock) => {
    const list = [];
    let cur = firstBlock;
    while (cur) {
      list.push(...parseBlock(cur, parseStatementList));
      cur = cur.getNextBlock();
    }
    return list;
  };

  // ================
  // EXTRAER PROGRAMA
  // ================
  const extractActions = () => {
    const top = workspaceRef.current.getTopBlocks(true);
    const res = [];
    top.forEach((t) => res.push(...parseStatementList(t)));
    return res;
  };

  // ================
  // EJECUTAR PROGRAMA
  // ================
  const ejecutar = () => {
    const acciones = extractActions();

    // Validar si hay bloques incorrectos usados
    const usadoIncorrecto = workspaceRef.current
      .getAllBlocks(false)
      .some((b) => bloquesIncorrectos.includes(b.type));

    if (usadoIncorrecto) {
      alert("❌ Hay bloques incorrectos en tu solución. Están marcados en rojo.");
      return;
    }

    // VALIDAR SOLUCIÓN
    const resultado = validarSolucion(acciones, setLupi);

    if (!resultado.ok) {
      alert("❌ " + resultado.mensaje);
      return;
    }

    alert("🎉 ¡Reto completado!");
  };

  return (
    <div className="flex flex-col w-full p-6 gap-6">
     <h2
        className="text-3xl font-bold mb-4 text-center"
        dangerouslySetInnerHTML={{ __html: titulo }}
     ></h2>

      <p
        className="mb-4 text-lg max-w-xl text-center"
        dangerouslySetInnerHTML={{ __html: descripcion }}
      ></p>

      <div className="flex w-full gap-6">
        {/* Área Blockly */}
        <div className="w-1/2 border rounded-xl shadow h-[480px]" ref={blocklyDiv}></div>

        {/* Escenario */}
        <div className="w-1/2 flex flex-col items-center">
          <div className="relative w-[260px] h-[260px] bg-blue-50 border rounded-xl flex items-center justify-center">
            <Lupi mensaje={lupi.mensaje} emocion={lupi.paraguas ? "feliz" : "hablando"} />
            {lupi.paraguas && <div className="absolute top-4 text-3xl">☂️</div>}
          </div>

        <div align="center" className="mt-4">
      <button className="px-6 py-3 bg-green-600 text-white rounded-xl w-auto self-start mt-2" onClick={ejecutar}>
        ▶ Ejecutar programa
      </button>
        </div>
        </div>
      </div>


      <button className="px-6 py-3 bg-gray-500 text-white rounded-xl w-auto self-start mt-2" onClick={() => setPantalla("menu")}>
        ⬅ Volver al menú
      </button>
    </div>
  );
}
