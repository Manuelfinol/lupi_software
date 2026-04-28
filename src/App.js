import { useEffect, useState } from "react";
import MenuPrincipal from "./components/MenuPrincipal";
import Aprender from "./components/Aprender";
import SecuenciasTeoria from "./components/temas/SecuenciasTeoria";
import SecuenciasPractica from "./components/temas/SecuenciasPractica";
import CondicionesTeoria from "./components/temas/CondicionesTeoria";
import CondicionesPractica from "./components/temas/CondicionesPractica";
import BuclesTeoria from "./components/temas/BuclesTeoria";
import BuclesPractica from "./components/temas/BuclesPractica";
import VariablesTeoria from "./components/temas/VariablesTeoria";
import VariablesPractica from "./components/temas/VariablesPractica";
import TiposVariablesTeoria from "./components/temas/TiposVariablesTeoria";
import TiposVariablesPractica from "./components/temas/TiposVariablesPractica";
import Lupi from "./components/Lupi";
import BlocklyEditor from "./components/BlocklyEditor";
import BlocklyChallenge from "./components/BlocklyChallenge";
import BlocklyCondiciones from "./components/BlocklyCondiciones";
import RetoCondiciones from "./components/blockly/RetoCondiciones";
import RetoVariables from "./components/blockly/RetoVariables";




const PROGRESO_KEY = "progreso_v1";

function App() {
  const [pantalla, setPantalla] = useState("inicio");
  const [temaActual, setTemaActual] = useState(null);

  const [progreso, setProgreso] = useState({
    secuencias: false,
    condiciones: false,
    bucles: false,
    variables: false,
    tipos_variables: false,
  });

  // Cargar progreso
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROGRESO_KEY);
      if (saved) setProgreso(JSON.parse(saved));
    } catch (e) {
      console.error("Error al leer progreso:", e);
    }
  }, []);

  // Guardar progreso
  useEffect(() => {
    try {
      localStorage.setItem(PROGRESO_KEY, JSON.stringify(progreso));
    } catch (e) {
      console.error("Error al guardar progreso:", e);
    }
  }, [progreso]);

  const completarLeccion = (id) => {
    setProgreso((prev) => ({ ...prev, [id]: true }));
  };

  const reiniciarProgreso = () => {
    if (window.confirm("¿Seguro que deseas reiniciar tu progreso?")) {
      setProgreso({
        secuencias: false,
        condiciones: false,
        bucles: false,
        variables: false,
        tipos_variables: false,
      });
      localStorage.removeItem(PROGRESO_KEY);
    }
  };

  // ⭐⭐⭐ BOTÓN DE DESARROLLO — DESBLOQUEAR TODO ⭐⭐⭐
  const desbloquearTodo = () => {
    const fullUnlock = {
      secuencias: true,
      condiciones: true,
      bucles: true,
      variables: true,
      tipos_variables: true,
    };
    setProgreso(fullUnlock);
    localStorage.setItem(PROGRESO_KEY, JSON.stringify(fullUnlock));
    alert("🔓 Todas las lecciones han sido desbloqueadas (modo desarrollador).");
  };

  // Pantalla inicio
  if (pantalla === "inicio") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-blue-100">
        <h1 className="text-9xl font-bold text-blue-900 mb-8 text-center">
          <Lupi 
              mensaje="¡Hola! Soy <strong>Lupi</strong>, tu asistente de programación. ¡Vamos a aprender juntos!"
              className="w-80 h-auto mx-auto" 
          />
        </h1>
        <button
          className="px-8 py-4 bg-blue-600 text-white text-2xl font-semibold rounded-2xl shadow-lg hover:bg-blue-700 transition"
          onClick={() => setPantalla("menu")}
        >
          ¡Empezar!
        </button>
      </div>
    );
  }

  // Pantalla menú
  if (pantalla === "menu") {
    return <MenuPrincipal setPantalla={setPantalla} />;
  }

  // Pantalla APRENDER con BOTÓN DE DESARROLLO
  if (pantalla === "aprender") {
    return (
      <div className="flex flex-col items-center">
        <Aprender
          setPantalla={setPantalla}
          setTemaActual={setTemaActual}
          progreso={progreso}
          onReset={reiniciarProgreso}
        />

        {/* 🔧 BOTÓN DE DESARROLLO */}
        <button
          onClick={desbloquearTodo}
          className="mt-6 px-6 py-3 bg-purple-700 text-white rounded-xl shadow-lg hover:bg-purple-800"
        >
          🛠 Desbloquear Todo (Modo Desarrollador)
        </button>
      </div>
    );
  }

  // --- Teoría y práctica de temas (igual a tu código original) ---

  if (pantalla === "teoria" && temaActual === "secuencias") {
    return (
      <SecuenciasTeoria
        setPantalla={setPantalla}
        onComplete={() => setPantalla("practica_secuencias")}
      />
    );
  }

  if (pantalla === "practica_secuencias") {
    return (
      <SecuenciasPractica
        setPantalla={setPantalla}
        onComplete={() => {
          completarLeccion("secuencias");
          setPantalla("aprender");
          alert("¡Excelente! Has desbloqueado Condiciones ❓");
        }}
      />
    );
  }

  if (pantalla === "teoria" && temaActual === "condiciones") {
    return (
      <CondicionesTeoria
        setPantalla={setPantalla}
        onComplete={() => setPantalla("practica_condiciones")}
      />
    );
  }

  if (pantalla === "practica_condiciones") {
    return (
      <CondicionesPractica
        setPantalla={setPantalla}
        onComplete={() => {
          completarLeccion("condiciones");
          setPantalla("aprender");
          alert("¡Muy bien! Has desbloqueado Bucles 🔁");
        }}
      />
    );
  }

  if (pantalla === "teoria" && temaActual === "bucles") {
    return (
      <BuclesTeoria
        setPantalla={setPantalla}
        onComplete={() => setPantalla("practica_bucles")}
      />
    );
  }

  if (pantalla === "practica_bucles") {
    return (
      <BuclesPractica
        setPantalla={setPantalla}
        onComplete={() => {
          completarLeccion("bucles");
          setPantalla("aprender");
          alert("🎉 ¡Excelente! Terminaste bucles.");
        }}
      />
    );
  }

  if (pantalla === "teoria" && temaActual === "variables") {
    return (
      <VariablesTeoria
        setPantalla={setPantalla}
        onComplete={() => setPantalla("practica_variables")}
      />
    );
  }

  if (pantalla === "practica_variables") {
    return (
      <VariablesPractica
        setPantalla={setPantalla}
        onComplete={() => {
          completarLeccion("variables");
          setPantalla("aprender");
          alert("🎉 Aprendiste Variables.");
        }}
      />
    );
  }

  if (pantalla === "teoria" && temaActual === "tipos_variables") {
    return (
      <TiposVariablesTeoria
        setPantalla={setPantalla}
        onComplete={() => setPantalla("practica_tipos_variables")}
      />
    );
  }

  if (pantalla === "practica_tipos_variables") {
    return (
      <TiposVariablesPractica
        setPantalla={setPantalla}
        onComplete={() => {
          completarLeccion("tipos_variables");
          setPantalla("aprender");
          alert("🎉 Aprendiste los tipos de variables.");
        }}
      />
    );
  }

  if (pantalla === "blockly") {
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-50 p-10">
        <h2 className="text-3xl font-bold mb-6">Prueba Blockly 🧩</h2>
        <BlocklyEditor />
        <button
          className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-xl shadow-lg"
          onClick={() => setPantalla("menu")}
        >
          ⬅ Volver al Menú
        </button>
      </div>
    );
  }

  if (pantalla === "reto1") {
    return <BlocklyChallenge />;
  }

  // if (pantalla === "reto_condiciones") {
  // return (
  //   <BlocklyCondiciones
  //     setPantalla={setPantalla}
  //   />
  // );
  // }

  if (pantalla === "reto_condiciones") {
  return <RetoCondiciones setPantalla={setPantalla} />;
}

if (pantalla === "reto_variables") {
  return <RetoVariables setPantalla={setPantalla} />;
}

  return null;
}

export default App;
