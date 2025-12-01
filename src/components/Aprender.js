import Progreso from "./Progreso";

export default function Aprender({ setPantalla, setTemaActual, progreso, onReset }) {
  const estaBloqueado = (tema) => {
    if (tema === "condiciones" && !progreso.secuencias) return true;
    if (tema === "bucles" && !progreso.condiciones) return true;
    return false;
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-yellow-50 p-10">
      <h2 className="text-4xl font-bold text-yellow-900 mb-6">📚 Aprender</h2>

      {/* Progreso visual con medallas */}
      <Progreso progreso={progreso} />

      {/* Botones de lecciones */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        <button
          className={`px-6 py-3 rounded-xl text-xl shadow-lg ${
            progreso.secuencias
              ? "bg-green-600 text-white"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
          onClick={() => {
            setTemaActual("secuencias");
            setPantalla("teoria");
          }}
        >
          Secuencias 🔗
        </button>

        <button
          disabled={estaBloqueado("condiciones")}
          className={`px-6 py-3 rounded-xl text-xl shadow-lg ${
            progreso.condiciones
              ? "bg-green-600 text-white"
              : estaBloqueado("condiciones")
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
          onClick={() => {
            setTemaActual("condiciones");
            setPantalla("teoria");
          }}
        >
          Condiciones ❓
        </button>

        <button
          disabled={estaBloqueado("bucles")}
          className={`px-6 py-3 rounded-xl text-xl shadow-lg ${
            progreso.bucles
              ? "bg-green-600 text-white"
              : estaBloqueado("bucles")
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
          onClick={() => {
            setTemaActual("bucles");
            setPantalla("teoria");
          }}
        >
          Bucles 🔁
        </button>

        <button
          disabled={!progreso.bucles}
          className={`px-6 py-3 rounded-xl text-xl shadow-lg ${
            progreso.variables
              ? "bg-green-600 text-white"
              : !progreso.bucles
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
          onClick={() => {
            setTemaActual("variables");
            setPantalla("teoria");
          }}
        >
          Variables 📦
        </button>

          <button
            disabled={!progreso.variables}
            className={`px-6 py-3 rounded-xl text-xl shadow-lg ${
              progreso.tipos_variables
                ? "bg-green-600 text-white"
                : !progreso.variables
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
            onClick={() => {
              setTemaActual("tipos_variables");
              setPantalla("teoria");
            }}
          >
            Tipos de Variables 🔠🔢✅
          </button>


      </div>

      {/* Botones extra */}
      <div className="flex gap-4 mt-8">
        <button
          className="px-6 py-3 bg-purple-600 text-white text-lg rounded-xl shadow-lg hover:bg-purple-700 transition"
          onClick={() => setPantalla("menu")}
        >
          ⬅ Volver al Menú
        </button>

        <button
          className="px-6 py-3 bg-gray-600 text-white text-lg rounded-xl shadow-lg hover:bg-gray-700 transition"
          onClick={onReset}
        >
          🔁 Reiniciar progreso
        </button>
      </div>
    </div>
  );
}
