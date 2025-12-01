import { useState } from "react";

export default function BuclesPractica({ setPantalla, onComplete }) {
  const ejercicios = [
    { instruccion: "Aplaude 👏 3 veces", repeticiones: 3, simbolo: "👏" },
    { instruccion: "Salta 🤸 5 veces", repeticiones: 5, simbolo: "🤸" },
    { instruccion: "Dibuja un corazón ❤️ 2 veces", repeticiones: 2, simbolo: "❤️" },
  ];

  const [index, setIndex] = useState(0);
  const [respuesta, setRespuesta] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [mostrarLoop, setMostrarLoop] = useState("");

  const ejercicio = ejercicios[index];

  const verificar = () => {
    if (parseInt(respuesta) === ejercicio.repeticiones) {
      setMensaje("🎉 ¡Muy bien! Entendiste el bucle.");
      setMostrarLoop(ejercicio.simbolo.repeat(ejercicio.repeticiones));

      setTimeout(() => {
        if (index < ejercicios.length - 1) {
          setIndex(index + 1);
          setRespuesta(null);
          setMensaje("");
          setMostrarLoop("");
        } else {
          onComplete();
        }
      }, 1500);
    } else {
      setMensaje("❌ Esa no es la cantidad correcta, intenta otra vez.");
      setMostrarLoop("");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-yellow-50 p-10 text-center">
      <h2 className="text-4xl font-bold text-yellow-900 mb-6">
        Práctica: Bucles 🔁
      </h2>

      <p className="text-xl max-w-3xl mb-6">
        Elige cuántas veces se repite la acción.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 w-full max-w-xl">
        <p className="text-lg font-semibold mb-4">
          {ejercicio.instruccion}
        </p>

        <div className="flex justify-center gap-4 mb-4">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              className={`px-4 py-2 rounded-xl border shadow ${
                respuesta === num
                  ? "bg-yellow-300 border-yellow-600"
                  : "bg-gray-100 hover:bg-gray-200 border-gray-400"
              }`}
              onClick={() => setRespuesta(num)}
            >
              {num}
            </button>
          ))}
        </div>

        <button
          className="px-6 py-3 bg-green-600 text-white text-lg rounded-xl shadow-lg hover:bg-green-700 transition"
          onClick={verificar}
        >
          ✅ Verificar
        </button>

        {mensaje && <p className="text-lg mt-4">{mensaje}</p>}

        {mostrarLoop && (
          <div className="mt-6 text-3xl font-bold">{mostrarLoop}</div>
        )}
      </div>

      <button
        className="mt-8 px-6 py-3 bg-red-500 text-white text-lg rounded-xl shadow-lg hover:bg-red-600 transition"
        onClick={() => setPantalla("aprender")}
      >
        ⬅ Volver a Aprender
      </button>
    </div>
  );
}
