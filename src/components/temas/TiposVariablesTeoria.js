import LupiTeoria from "../LupiTeoria";

export default function TiposVariablesTeoria({ setPantalla, onComplete }) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-indigo-100 p-10 text-center">
      <h2 className="text-4xl font-bold text-indigo-900 mb-8">
        Teoría: Tipos de Variables 🔠🔢✅
      </h2>

      <LupiTeoria
        texto="Las variables pueden guardar <strong>diferentes tipos de datos</strong>.  
        Los más comunes son:"
      />

      {/* <p className="text-xl max-w-3xl mb-6">
        Las variables pueden guardar **diferentes tipos de datos**.  
        Los más comunes son:
      </p> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-blue-200 p-4 rounded-xl shadow">
          <h3 className="text-2xl font-bold text-blue-900">Números 🔢</h3>
          <p className="mt-2">Ejemplo: <code>edad = 20</code></p>
        </div>
        <div className="bg-green-200 p-4 rounded-xl shadow">
          <h3 className="text-2xl font-bold text-green-900">Texto 🔠</h3>
          <p className="mt-2">Ejemplo: <code>nombre = "Ana"</code></p>
        </div>
        <div className="bg-yellow-200 p-4 rounded-xl shadow">
          <h3 className="text-2xl font-bold text-yellow-900">Booleanos ✅</h3>
          <p className="mt-2">Ejemplo: <code>esMayor = true</code></p>
        </div>
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
