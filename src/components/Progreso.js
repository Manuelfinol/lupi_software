export default function Progreso({ progreso }) {
  const temas = [
    { key: "secuencias", nombre: "Secuencias 🔗" },
    { key: "condiciones", nombre: "Condiciones ❓" },
    { key: "bucles", nombre: "Bucles 🔁" },
    { key: "variables", nombre: "Variables 📦" },
    { key: "tipos_variables", nombre: "Tipos de Variables 🔠🔢✅" },
  ];

  // Calcular progreso
  const total = temas.length;
  const completados = temas.filter((t) => progreso[t.key]).length;
  const porcentaje = Math.round((completados / total) * 100);

  return (
    <div className="w-full max-w-2xl mb-10">
      {/* Medallas */}
      <div className="flex justify-center gap-6 mb-6">
        {temas.map((tema) => (
          <div
            key={tema.key}
            className={`flex flex-col items-center p-4 rounded-xl shadow-lg ${
              progreso[tema.key]
                ? "bg-green-200 border-2 border-green-600"
                : "bg-gray-200 border-2 border-gray-400 opacity-70"
            }`}
          >
            <span className="text-3xl">
              {progreso[tema.key] ? "🏅" : "⚪"}
            </span>
            <p className="mt-2 text-sm font-bold">{tema.nombre}</p>
          </div>
        ))}
      </div>

      {/* Barra de progreso */}
      <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden shadow-inner">
        <div
          className="bg-green-500 h-6 text-white text-sm flex items-center justify-center transition-all duration-500"
          style={{ width: `${porcentaje}%` }}
        >
          {porcentaje}%
        </div>
      </div>

      {/* Mensaje motivador */}
      {porcentaje === 100 ? (
        <p className="text-center mt-4 font-bold text-green-700 text-xl">
          🎉 ¡Felicitaciones! Has completado todos los módulos básicos de programación 👩‍💻👨‍💻
        </p>
      ) : (
        <p className="text-center mt-2 font-semibold text-gray-700">
          Progreso: {completados} de {total} lecciones completadas
        </p>
      )}
    </div>
  );
}
