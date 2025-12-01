import Lupi from "../Lupi";

export default function CondicionesTeoria({ setPantalla, onComplete }) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-yellow-100 p-10 text-center">
      <h2 className="text-4xl font-bold text-yellow-900 mb-8">Teoría: Condiciones ❓</h2>

      <Lupi 
        mensaje="Una condición nos permite decidir qué hacer en una situación. En programación, las condiciones son muy importantes porque nos ayudan
        a elegir entre diferentes caminos."
      />
     

      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 mt-6">
        <p className="text-lg">Ejemplo:</p>
        <p className="text-lg mt-3">
          <em>“Si está lloviendo, llevo paraguas. Si no, salgo sin paraguas.”</em>
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 mt-6">
        <p className="text-lg">Otro Ejemplo:</p>
        <p className="text-lg mt-3">
          <em>“Si la niña está triste, le leo un cuento. Si no, juego con ella.”</em>
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
