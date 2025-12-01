import { useState } from "react";
import Lupi from "../Lupi";
// import { Link, Play, Home } from "lucide-react";

export default function SecuenciasPractica({ setPantalla, onComplete }) {
  const pasosCorrectos = [
    "Levántate de la cama",
    "Enciende la luz",
    "Lávate los dientes",
    "Abre la puerta",
    "Sal de la habitación",
    "Desayuna",
    "Ve a la universidad",
  ];

  // Estado inicial con pasos desordenados
  const [pasos, setPasos] = useState(shuffleArray([...pasosCorrectos]));
  const [mensaje, setMensaje] = useState(null);

  // Función para mezclar un array
  function shuffleArray(array) {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  }

  // Mover un paso hacia arriba o abajo
  const moverPaso = (index, direccion) => {
    const nuevoOrden = [...pasos];
    const swapIndex = index + direccion;
    if (swapIndex < 0 || swapIndex >= pasos.length) return;
    [nuevoOrden[index], nuevoOrden[swapIndex]] = [
      nuevoOrden[swapIndex],
      nuevoOrden[index],
    ];
    setPasos(nuevoOrden);
  };

  // Verificar si el orden es correcto
  const verificar = () => {
    if (JSON.stringify(pasos) === JSON.stringify(pasosCorrectos)) {
      setMensaje({
        texto: "🎉 ¡Correcto! Has completado la secuencia.",
        tipo: "exito",
        emocion: "feliz",
      });
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      setMensaje({
        texto: "❌ Todavía no está bien, intenta de nuevo.",
        tipo: "error",
        emocion: "triste",
      });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-pink-50 p-10 text-center">
      <h2 className="text-4xl font-bold text-pink-900 mb-6">
        Práctica: Secuencias 🔢
      </h2>

      <Lupi
        mensaje="Ordena los pasos correctamente para representar una secuencia de la vida diaria."
      />

      {/* <p className="text-xl max-w-3xl mb-6">
        Ordena los pasos correctamente para representar una secuencia de la vida
        diaria:
      </p> */}

      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 w-full max-w-md">
        {pasos.map((paso, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-pink-100 p-3 rounded-lg mb-3"
          >
            <span className="text-lg">{paso}</span>
            <div className="flex gap-2">
              <button
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => moverPaso(index, -1)}
              >
                ⬆
              </button>
              <button
                className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => moverPaso(index, 1)}
              >
                ⬇
              </button>
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

      {/* Lupi aparece dando feedback */}
      {mensaje && (
        <Lupi
          mensaje={mensaje.texto}
          tipo={mensaje.tipo}
          emocion={mensaje.emocion}
        />
      )}

      <button
        className="mt-8 px-6 py-3 bg-red-500 text-white text-lg rounded-xl shadow-lg hover:bg-red-600 transition"
        onClick={() => setPantalla("aprender")}
      >
        ⬅ Volver a Aprender
      </button>
    </div>
  );
}
