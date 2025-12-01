export default function MenuPrincipal({ setPantalla }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h2 className="text-4xl font-bold text-green-900 mb-10">Menú Principal 🌟</h2>

      <div className="flex flex-col gap-6">
        <button
          className="px-8 py-4 bg-green-600 text-white text-2xl rounded-xl shadow-lg hover:bg-green-700 transition"
          onClick={() => setPantalla("aprender")}
        >
          Aprender 📚
        </button>

        <button
          className="px-8 py-4 bg-yellow-500 text-white text-2xl rounded-xl shadow-lg hover:bg-yellow-600 transition"
          onClick={() => alert("Abrir sección Jugar 🎮")}
        >
          Jugar 🎮
        </button>

        <button
          className="px-8 py-4 bg-red-500 text-white text-2xl rounded-xl shadow-lg hover:bg-red-600 transition"
          onClick={() => setPantalla("inicio")}
        >
          Salir
        </button>

        <button
          className="px-6 py-3 bg-purple-500 text-white text-xl rounded-xl shadow-lg hover:bg-purple-600 transition"
          onClick={() => setPantalla("blockly")}
        >
          Probar Blockly 🧩
        </button>

        <button
          className="px-6 py-3 bg-orange-500 text-white text-xl rounded-xl shadow-lg hover:bg-orange-600 transition"
          onClick={() => setPantalla("reto1")}
        >
          🦾 Reto 1 con Lupi
        </button>

        

      </div>
    </div>
  );
}
