import { useState } from "react";

export default function TiposVariablesPractica({ setPantalla, onComplete }) {
  const ejercicios = [
    { valor: "25", tipo: "Número 🔢" },
    { valor: '"Hola"', tipo: "Texto 🔠" },
    { valor: "false", tipo: "Booleano ✅" },
    { valor: '"Carlos"', tipo: "Texto 🔠" },
    { valor: "100", tipo: "Número 🔢" },
    { valor: "true", tipo: "Booleano ✅" },
  ];

  const tipos = ["Número 🔢", "Texto 🔠", "Booleano ✅"];

  const [respuestas, setRespuestas] = useState(Array(ejercicios.length).fill(null));
  const [mensaje, setMensaje] = useState("");

  const elegir = (index, tipo) => {
    const nuevas = [...respuestas];
    nuevas[index] = tipo;
    setRespuestas(nuevas);
  };

  const verificar = () => {
    const todoBien = ejercicios.every((e, i) => respuestas[i] === e.tipo);

    if (todoBien) {
      setMensaje("🎉 ¡Muy bien! Has clasificado correctamente los tipos de variables.");
      setTimeout(() => {
        onComplete();
      }, 1200);
    } else {
      setMensaje("❌ Algunas respuestas no son correctas. Intenta de nuevo.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-indigo-50 p-10 text-center">
      <h2 className="text-4xl font-bold text-indigo-900 mb-6">
        Práctica: Tipos de Variables 🔠🔢✅
      </h2>

      <p className="text-xl max-w-3xl mb-6">
        Elige a qué tipo corresponde cada valor.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 w-full max-w-3xl">
        {ejercicios.map((e, index) => (
          <div key={index} className="mb-6 text-left">
            <p className="text-lg font-semibold mb-3">
              {index + 1}. {e.valor}
            </p>
            <div className="flex gap-4 flex-wrap">
              {tipos.map((t, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-xl border shadow ${
                    respuestas[index] === t
                      ? "bg-indigo-300 border-indigo-600"
                      : "bg-gray-100 hover:bg-gray-200 border-gray-400"
                  }`}
                  onClick={() => elegir(index, t)}
                >
                  {t}
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
        className="mt-8 px-6 py-3 bg-red-500 text-white text-lg rounded-xl shadow-lg hover:bg-red-600 transition"
        onClick={() => setPantalla("aprender")}
      >
        ⬅ Volver a Aprender
      </button>
    </div>
  );
}
