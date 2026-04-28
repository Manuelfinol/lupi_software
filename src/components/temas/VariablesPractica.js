import { useState } from "react";

export default function VariablesPractica({ setPantalla, onComplete }) {
  const preguntas = [
    {
      enunciado: "Si escribo: edad = 20, ¿qué estoy guardando?",
      opciones: ["Un número", "Un texto"],
      correcta: "Un número",
    },
    {
      enunciado: 'Si escribo: nombre = "Carlos", ¿qué estoy guardando?',
      opciones: ["Un número", "Un texto"],
      correcta: "Un texto",
    },
    {
      enunciado: "Si quiero guardar la calificación 18, ¿qué variable usarías?",
      opciones: ["calificacion", "nombre"],
      correcta: "calificacion",
    },
  ];

  const [respuestas, setRespuestas] = useState(Array(preguntas.length).fill(null));
  const [mensaje, setMensaje] = useState("");

  const elegirRespuesta = (index, opcion) => {
    const nuevas = [...respuestas];
    nuevas[index] = opcion;
    setRespuestas(nuevas);
  };

  const verificar = () => {
    const todoBien = preguntas.every((p, i) => respuestas[i] === p.correcta);

    if (todoBien) {
      setMensaje("🎉 ¡Muy bien! Has entendido las variables.");
      setTimeout(() => {
        onComplete();
      }, 1200);
    } else {
      setMensaje("❌ Algunas respuestas no son correctas. Intenta otra vez.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-purple-50 p-10 text-center">
      <h2 className="text-4xl font-bold text-purple-900 mb-6">
        Práctica: Variables 📦
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 w-full max-w-2xl">
        {preguntas.map((p, index) => (
          <div key={index} className="mb-6 text-left">
            <p className="text-lg font-semibold mb-3">
              {index + 1}. {p.enunciado}
            </p>
            <div className="flex gap-4">
              {p.opciones.map((op, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-xl border shadow ${
                    respuestas[index] === op
                      ? "bg-purple-300 border-purple-600"
                      : "bg-gray-100 hover:bg-gray-200 border-gray-400"
                  }`}
                  onClick={() => elegirRespuesta(index, op)}
                >
                  {op}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        className="px-6 py-3 bg-green-600 text-white text-xl rounded-xl shadow-lg hover:bg-green-700 transition mb-4"
        onClick={verificar}
      >
        ✅ Verificar
      </button>

      {mensaje && <p className="text-lg mt-4">{mensaje}</p>}

      <button
        className="mt-6 px-6 py-3 bg-purple-600 text-white text-xl rounded-xl shadow-lg hover:bg-purple-700 transition"
        onClick={() => setPantalla("reto_variables")}
      >
        🧩 Ir al reto de Variables (Blockly)
      </button>

      <button
        className="mt-8 px-6 py-3 bg-red-500 text-white text-lg rounded-xl shadow-lg hover:bg-red-600 transition"
        onClick={() => setPantalla("aprender")}
      >
        ⬅ Volver a Aprender
      </button>
    </div>
  );
}
