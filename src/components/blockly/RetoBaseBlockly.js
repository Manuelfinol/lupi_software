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

  const [lupi, setLupi] = useState({
    mensaje: "",
    x: 0,
    y: 0,
    paraguas: false,
  });

  const [resultado, setResultado] = useState(null);

  // =====================
  // INICIALIZAR BLOCKLY
  // =====================
  useEffect(() => {
    definirBloques();

    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolboxXML,
      scrollbars: true,
      trashcan: true,
    });

    return () => {
      workspaceRef.current?.dispose();
      workspaceRef.current = null;
    };
  }, []);

  // =====================
  // PARSER
  // =====================
  const parseStatementList = (firstBlock) => {
    const list = [];
    let cur = firstBlock;

    while (cur) {
      list.push(...parseBlock(cur, parseStatementList));
      cur = cur.getNextBlock();
    }

    return list;
  };

  const extractActions = () => {
    const workspace = workspaceRef.current;
    if (!workspace) return [];

    const top = workspace.getTopBlocks(true);
    const res = [];

    top.forEach((t) => {
      res.push(...parseStatementList(t));
    });

    return res;
  };

  // =====================
  // EJECUCIÓN VISUAL
  // =====================
  const ejecutarAcciones = (acciones) => {
    let x = 0;
    let y = 0;

    setLupi({ mensaje: "", x: 0, y: 0, paraguas: false });

    acciones.forEach((accion, i) => {
      setTimeout(() => {
        if (accion.type === "decir") {
          setLupi((prev) => ({ ...prev, mensaje: accion.texto }));
        }

        if (accion.type === "paraguas") {
          setLupi((prev) => ({ ...prev, paraguas: true }));
        }

        if (accion.type === "mover") {
          if (accion.dir === "RIGHT") x += 30;
          if (accion.dir === "LEFT") x -= 30;
          if (accion.dir === "UP") y -= 30;
          if (accion.dir === "DOWN") y += 30;

          setLupi((prev) => ({ ...prev, x, y }));
        }
      }, i * 600);
    });
  };

  // =====================
  // EJECUTAR
  // =====================
  const ejecutar = () => {
    try {
      const acciones = extractActions();

      // Validar bloques incorrectos
      const usadoIncorrecto = workspaceRef.current
        .getAllBlocks(false)
        .some((b) => bloquesIncorrectos.includes(b.type));

      if (usadoIncorrecto) {
        setResultado({
          ok: false,
          texto: "❌ Usaste bloques incorrectos (marcados en rojo).",
        });
        return;
      }

      // Ejecutar visual
      ejecutarAcciones(acciones);

      // Validar solución
      const resultadoValidacion = validarSolucion(acciones, setLupi);

      setTimeout(() => {
        if (resultadoValidacion.ok) {
          setResultado({
            ok: true,
            texto: "🎉 ¡Reto completado!",
          });
        } else {
          setResultado({
            ok: false,
            texto: "❌ " + resultadoValidacion.mensaje,
          });
        }
      }, acciones.length * 600 + 200);
    } catch (error) {
      console.error(error);
      setResultado({
        ok: false,
        texto: "⚠ Error al ejecutar el programa",
      });
    }
  };

  // =====================
  // UI
  // =====================
  return (
    <div className="flex flex-col w-full p-6 gap-6">
      
      {/* TITULO */}
      <h2
        className="text-3xl font-bold text-center"
        dangerouslySetInnerHTML={{ __html: titulo }}
      ></h2>

      {/* DESCRIPCIÓN */}
      <p
        className="text-lg text-center max-w-xl mx-auto"
        dangerouslySetInnerHTML={{ __html: descripcion }}
      ></p>

      {/* CONTENIDO */}
      <div className="flex w-full gap-6">
        
        {/* Blockly */}
        <div
          className="w-1/2 border rounded-xl shadow h-[480px]"
          ref={blocklyDiv}
        ></div>

        {/* Escenario */}
        <div className="w-1/2 flex flex-col items-center">

  <div
    className="
      relative
      w-[520px]
      h-[360px]
      rounded-2xl
      overflow-hidden
      border-4
      border-green-700
      shadow-2xl
      bg-gradient-to-b
      from-sky-200
      via-sky-100
      to-green-100
    "
  >

    {/* Nubes */}
   <div
      className="absolute top-3 left-10 text-5xl animate-bounce"
      style={{
        animationDuration: "5s"
      }}
    >
      ☁️
    </div>

    <div
      className="absolute top-10 right-12 text-4xl animate-pulse"
      style={{
        animationDuration: "4s"
      }}
    >
      ☁️
    </div>

    {/* Sol */}
    <div className="absolute top-5 right-5 text-5xl">
      ☀️
    </div>

    {/* Árbol */}
    <div className="absolute bottom-16 left-8 text-6xl">
      🌳
    </div>

    {/* Flor */}
    <div className="absolute bottom-12 right-20 text-3xl">
      🌼
    </div>

    {/* Meta */}
    <div
      className="absolute bottom-16 right-8 text-6xl animate-pulse"
      style={{
        animationDuration: "1s"
      }}
    >
      ⭐
    </div>

    {/* Piso */}
    <div
      className="
        absolute
        bottom-0
        left-0
        w-full
        h-14
        bg-green-600
      "
    />

    {/* Césped */}
    <div
      className="
    absolute
    bottom-0
    left-0
    w-full
    h-14
    bg-gradient-to-r
    from-green-600
    via-green-500
    to-green-700
  "
    >
      🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿🌿
    </div>

    {/* Lupi */}
    <div
      className="absolute bottom-12 transition-all duration-700 animate-bounce"
      style={{
        left: `${40 + lupi.x}px`,
        animationDuration: "0.8s"
      }}
    >
      <Lupi
          escenario={true}
          mensaje={lupi.mensaje}
          emocion={lupi.paraguas ? "feliz" : "hablando"}
      />
    </div>

    {/* Paraguas */}
    {lupi.paraguas && (
      <div
        className="absolute text-5xl"
        style={{
          left: `${75 + lupi.x}px`,
          bottom: "180px"
        }}
      >
        ☂️
      </div>
    )}

  </div>

  <button
    className="mt-6 px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
    onClick={ejecutar}
  >
    ▶ Ejecutar programa
  </button>

</div>
      </div>

      {/* RESULTADO */}
      {resultado && (
        <div
          className={`p-4 rounded-xl text-center ${
            resultado.ok
              ? "bg-green-100 text-green-900"
              : "bg-yellow-100 text-black"
          }`}
        >
          {resultado.texto}
        </div>
      )}

      {/* VOLVER */}
      <button
        className="px-6 py-3 bg-gray-500 text-white rounded-xl w-fit"
        onClick={() => setPantalla("menu")}
      >
         {/* No se ve el boton */}
        ⬅ Volver al menú
      </button>
    </div>
  );
}