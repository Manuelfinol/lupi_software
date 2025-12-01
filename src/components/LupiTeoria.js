// src/components/LupiTeoria.js
import Lupi from "./Lupi";

export default function LupiTeoria({ texto }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl shadow-md border border-blue-200 my-4">
      <Lupi emocion="hablando" mensaje={texto} />
    </div>
  );
}
