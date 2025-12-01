const imagenes = {
  hablando: "/lupi/lupi_hablando.png",
  feliz: "/lupi/lupi_felicitando.png",
  triste: "/lupi/lupi_triste.png",
  motivando: "/lupi/lupi_motivando.png",
  celebrando: "/lupi/lupi_celebrando.png",
  celebrando2: "/lupi/lupi_celebrando2.png",
  default: "/lupi/lupi.png",
};

export default function Lupi({ mensaje, tipo = "info", emocion = "default", className = "" }) {
  // tipo controla el color de la burbuja (info, exito, error)
  const estilos = {
    info: "bg-blue-100 border-blue-300 text-blue-900",
    exito: "bg-green-100 border-green-400 text-green-900",
    error: "bg-red-100 border-red-400 text-red-900",
  };

  return (
    <div className="flex items-start gap-4 bg-white p-4 rounded-xl shadow-lg max-w-2xl mt-4">
      {/* Imagen de Lupi según emoción */}
      <img
        src={imagenes[emocion] || imagenes.default}
        alt={`Lupi ${emocion}`}
        className={`w-40 h-20 object-contain ${className}`}
      />

      {/* Burbuja de diálogo */}
      <div className={`p-3 rounded-xl border ${estilos[tipo]}`}>
        {mensaje ? (
          <p className="text-3xl font-medium" dangerouslySetInnerHTML={{ __html: mensaje }}></p>
        ) : null}
      </div>
    </div>
  );
}