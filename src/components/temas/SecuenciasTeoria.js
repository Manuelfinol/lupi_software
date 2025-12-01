import Lupi from "../Lupi";

export default function SecuenciasTeoria({ setPantalla, onComplete }) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-pink-100 p-10 text-center">
      <h2 className="text-4xl font-bold text-pink-900 mb-8">Teoría: Secuencias 🔢</h2>

      {/* <p className="text-xl max-w-3xl mb-6">
        Una <strong>secuencia</strong> es una serie de pasos que siguen un orden.
        En programación, las secuencias son muy importantes porque la computadora
        ejecuta las instrucciones exactamente en el orden en que se las damos.
      </p> */}

      <Lupi
        mensaje="Una <strong>secuencia</strong> es una serie de pasos que siguen un orden. En programación, las secuencias son muy importantes porque <strong>la computadora ejecuta las instrucciones exactamente en el orden en que se las damos.</strong>"
        className="w-64 h-auto mx-auto"
      />
      
      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 mt-6">
        <p className="text-lg">Ejemplo:</p>
        <ul className="list-decimal list-inside text-left mt-3 text-lg">
          <li>Levántate de la cama</li>
          <li>Enciende la luz</li>
          <li>Lávate los dientes</li>
          <li>Abre la puerta</li>
          <li>Sal de la habitación</li>
          <li>Desayuna</li>
          <li>Ve a la universidad</li>
        </ul>
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
