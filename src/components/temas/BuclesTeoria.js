import LupiTeoria from "../LupiTeoria";

export default function BuclesTeoria({ setPantalla, onComplete }) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-blue-100 p-10 text-center">
      <h2 className="text-4xl font-bold text-blue-900 mb-8">Teoría: Bucles 🔁</h2>

      <LupiTeoria
        texto="Un bucle es una instrucción que permite repetir acciones varias veces. 
        Es muy útil cuando necesitamos que Lupi haga lo mismo una y otra vez."
      />

      <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
        <p className="text-lg">Ejemplo:</p>
        <p className="text-lg mt-3">
          <em>“Repite 3 veces: aplaudir 👏”</em>
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
