import { useState } from "react";
import Lupi from "../Lupi";

export default function CondicionesPractica({ setPantalla, onComplete }) {
  const preguntas = [
    {
      pregunta: "Si está lloviendo ☔, ¿qué haces?",
      opciones: ["Llevo paraguas", "Me pongo bloqueador solar"],
      correcta: "Llevo paraguas",
    },
    {
      pregunta: "Si hace sol 🌞, ¿qué haces?",
      opciones: ["Llevo un paraguas", "Uso gafas de sol"],
      correcta: "Uso gafas de sol",
    },
    {
      pregunta: "Si tengo hambre 🍽️, ¿qué hago?",
      opciones: ["Como algo", "Me voy a dormir"],
      correcta: "Como algo",
    },
    {
      pregunta: "Si la niña está triste 😢, ¿qué hago?",
      opciones: ["La ignoro", "Le leo un cuento"],
      correcta: "Le leo un cuento",
    },
     {
      pregunta: "Si la niña está feliz 😊, ¿qué hago?",
      opciones: ["Juego con ella", "La ignoro"],
      correcta: "Juego con ella",
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
    const todoBien = preguntas.every(
      (p, i) => respuestas[i] === p.correcta
    );

    if (todoBien) {
      setMensaje({
        texto: "🎉 ¡Muy bien! Respondiste todas correctamente.",
        tipo: "exito",
        emocion: "feliz",
      });
      setTimeout(() => {
        onComplete();
      }, 1200);
    } else {
      setMensaje({
        texto: "❌ Algunas respuestas no son correctas. Intenta de nuevo.",
        tipo: "error",
        emocion: "triste",
      }); 
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-yellow-50 p-10 text-center">
      <h2 className="text-4xl font-bold text-yellow-900 mb-6">
        Práctica: Condiciones ❓
      </h2>
      <Lupi
        mensaje="Lee cada situación y elige la opción correcta según la condición."
      />  
      {/* <p className="text-xl max-w-3xl mb-6">
        Lee cada situación y elige la opción correcta según la condición.
      </p> */}

      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 w-full max-w-2xl">
        {preguntas.map((p, index) => (
          <div key={index} className="mb-6 text-left">
            <p className="text-lg font-semibold mb-3">
              {index + 1}. {p.pregunta}
            </p>
            <div className="flex gap-4">
              {p.opciones.map((op, i) => (
                <button
                  key={i}
                  className={`px-4 py-2 rounded-xl border shadow ${
                    respuestas[index] === op
                      ? "bg-yellow-300 border-yellow-600"
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

      {mensaje && <p className="text-lg mt-4">{mensaje.texto}</p>}

      <button
        className="mt-8 px-6 py-3 bg-red-500 text-white text-lg rounded-xl shadow-lg hover:bg-red-600 transition"
        onClick={() => setPantalla("aprender")}
      >
        ⬅ Volver a Aprender
      </button>
    </div>
  );
}
