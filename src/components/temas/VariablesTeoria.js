import LupiTeoria from "../LupiTeoria";

export default function VariablesTeoria({ setPantalla, onComplete }) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-purple-100 p-10 text-center">
      <h2 className="text-4xl font-bold text-purple-900 mb-8">
        Teoría: Variables 📦
      </h2>

       <LupiTeoria
              texto="Una <strong>variable</strong> es como una caja donde guardamos información
        para usarla más adelante. Podemos guardar números, palabras o incluso resultados de operaciones."
      />

      {/* <p className="text-xl max-w-3xl mb-6">
        Una <strong>variable</strong> es como una caja donde guardamos información
        para usarla más adelante.  
        Podemos guardar números, palabras o incluso resultados de operaciones.
      </p> */}

      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <p className="text-lg">Ejemplo:</p>
        <p className="text-lg mt-3">
          <code className="bg-gray-100 p-1 rounded">
            edad = 15
          </code>{" "}
          👉 Aquí guardamos el número 15 en la variable llamada <em>edad</em>.
        </p>
        <p className="text-lg mt-3">
          <code className="bg-gray-100 p-1 rounded">
            nombre = "Ana"
          </code>{" "}
          👉 Aquí guardamos la palabra “Ana” en la variable <em>nombre</em>.
        </p>
      </div>

      <button
        className="px-6 py-3 bg-green-600 text-white text-xl rounded-xl shadow-lg hover:bg-green-700 transition"
        onClick={onComplete}
      >
        ✅ ¡Lo entendí!
      </button>

      <button
        className="mt-6 px-6 py-3 bg-red-500 text-white text-lg rounded-xl shadow-lg hover:bg-red-600 transition"
        onClick={() => setPantalla("aprender")}
      >
        ⬅ Volver a Aprender
      </button>
    </div>
  );
}
