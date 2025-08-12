const notif = document.getElementById("notificacion");
const torneoN = document.querySelector(".TorneoN");
const listaEquipos = document.getElementById("listaEquipos");
const formTorneo = document.getElementById("formTorneo");
let Nequipos = 0;
formTorneo.addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("torneo").value;
  const equipos = parseInt(document.getElementById("opciones").value);
  Nequipos = equipos; // Guardar el número de equipos
  // Notificación
  notif.innerText = `✅ Torneo "${nombre}" creado con ${equipos} equipos.`;
  notif.style.display = "block";
  setTimeout(() => {
    notif.style.display = "none";
  }, 4000);
  // Mostrar la sección
  document.querySelector("#equipos").style.display = "block";
  document.querySelector("#formularioTorneo").style.display = "none";
  nombreT = nombre; // Guardar el nombre del torneo
  // Actualizar el h1 con el nombre del torneo
  torneoN.innerText = `Torneo: ${nombre}`;

  // Limpiar y agregar los inputs de equipos
  listaEquipos.innerHTML = "";
  for (let i = 1; i <= equipos; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Nombre del Equipo ${i}`;
    input.className = "equipo-input";
    const li = document.createElement("li");
    li.appendChild(input);
    listaEquipos.appendChild(li);
  }
});
// comentario de prueba
// Manejo del formulario de equipos
const formEquipos = document.getElementById("formEquipos");

formEquipos.addEventListener("submit", function(e) {
  e.preventDefault();
  const inputs = document.querySelectorAll(".equipo-input");
  const equipos = Array.from(inputs).map(input => input.value.trim()).filter(value => value !== "");
  // sección de simulación
  const simulacionTorneo = document.getElementById("simulacionTorneo");
  simulacionTorneo.style.display = "block";

  if (equipos.length > 0) {
    notif.innerText = `✅ Equipos registrados: ${equipos.join(", ")}`;
    notif.style.display = "block";
    setTimeout(() => {
      notif.style.display = "none";
    }, 4000);
    // Mostrar automáticamente la simulación de partidos
    mostrarSimulacionPartidos(equipos);
  } else {
    notif.innerText = "⚠️ Por favor, ingrese al menos un nombre de equipo.";
    notif.style.display = "block";
    setTimeout(() => {
      notif.style.display = "none";
    }, 4000);
  }
});

// Función para mostrar la simulación de partidos
function mostrarSimulacionPartidos(equipos) {
  const partidosDiv = document.getElementById("partidos");
  partidosDiv.innerHTML = "";
  let partidos = [];
  switch (equipos.length) {
    case 2:
      partidos = [
        { equipoA: equipos[0], equipoB: equipos[1] }
      ];
      break;
    case 4:
      partidos = [
        { equipoA: equipos[0], equipoB: equipos[1] },
        { equipoA: equipos[2], equipoB: equipos[3] }
      ];
      break;
    case 8:
      for (let i = 0; i < 8; i += 2) {
        partidos.push({ equipoA: equipos[i], equipoB: equipos[i+1] });
      }
      break;
    case 16:
      for (let i = 0; i < 16; i += 2) {
        partidos.push({ equipoA: equipos[i], equipoB: equipos[i+1] });
      }
      break;
    default:
      partidosDiv.innerHTML = "⚠️ Número de equipos no soportado para simulación.";
      return;
  }
  // Mostrar partidos y crear inputs para resultados
  partidos.forEach((partido, idx) => {
    const partidoDiv = document.createElement("div");
    partidoDiv.className = "partido-item";
    partidoDiv.innerHTML = `
      <span>${partido.equipoA}</span><input type="number" min="0" class="resultado-input" placeholder="0" id="resultadoA${idx}"> vs <input type="number" min="0" class="resultado-input" placeholder="0" id="resultadoB${idx}"><span>${partido.equipoB}</span>`;
    partidosDiv.appendChild(partidoDiv);
  });
  // Agregar botones de simulación y registro de resultados
  let btnSimular = document.getElementById("btnSimularResultados");
  let btnRegistrar = document.getElementById("btnRegistrarResultados");
  if (!btnSimular) {
    btnSimular = document.createElement("button");
    btnSimular.id = "btnSimularResultados";
    btnSimular.textContent = "Simular Resultados";
    partidosDiv.appendChild(btnSimular);
  }
  if (!btnRegistrar) {
    btnRegistrar = document.createElement("button");
    btnRegistrar.id = "btnRegistrarResultados";
    btnRegistrar.textContent = "Registrar Resultados";
    partidosDiv.appendChild(btnRegistrar);
  }
  // Evento para simular resultados aleatorios
  btnSimular.onclick = function() {
    partidos.forEach((_, idx) => {
      const inputA = document.getElementById(`resultadoA${idx}`);
      const inputB = document.getElementById(`resultadoB${idx}`);
      const golA = Math.floor(Math.random() * 6);
      const golB = Math.floor(Math.random() * 6);
      inputA.value = golA;
      inputB.value = golB;
    });
    notif.innerText = "✅ Resultados simulados automáticamente.";
    notif.style.display = "block";
    setTimeout(() => { notif.style.display = "none"; }, 3000);
  };

  // Evento para registrar resultados manuales
  btnRegistrar.onclick = function() {
    let resultados = [];
    let ganadores = [];
    partidos.forEach((partido, idx) => {
      const inputA = document.getElementById(`resultadoA${idx}`);
      const inputB = document.getElementById(`resultadoB${idx}`);
      resultados.push({
        partido: `${partido.equipoA} vs ${partido.equipoB}`,
        resultado: `${inputA.value} - ${inputB.value}`
        // Agregar partido detallado
        ,
        partidoD: `${partido.equipoA} ${inputA.value} - ${inputB.value} ${partido.equipoB}`
      
      });
      // Determinar ganador de cada partido
      const golA = parseInt(inputA.value);
      const golB = parseInt(inputB.value);
      if (!isNaN(golA) && !isNaN(golB)) {
        if (golA > golB) {
          ganadores.push(partido.equipoA);
        } else if (golB > golA) {
          ganadores.push(partido.equipoB);
        } else {
          // Si hay empate, elige aleatorio
          ganadores.push(Math.random() < 0.5 ? partido.equipoA : partido.equipoB);
        }
      }
    });
    notif.innerText = `✅ Resultados registrados: ${resultados.map(r => r.partido + ' ' + r.resultado).join(', ')}`;
    notif.style.display = "block";
    setTimeout(() => { notif.style.display = "none"; }, 4000);
    mostrarResultadosEnDocumento(resultados);
    // Iniciar eliminatoria si hay más de 1 ganador
    if (ganadores.length > 1) {
      iniciarEliminatoriaInteractiva(ganadores);
    } else if (ganadores.length === 1) {
      mostrarGanadorFinal(ganadores[0]);
    }
  };
}

// Función para mostrar los partidos y resultados en el documento
function mostrarResultadosEnDocumento(resultados) {
  let resultadosDiv = document.getElementById("Partidos");
  if (!resultadosDiv) {
    resultadosDiv = document.createElement("div");
    resultadosDiv.className = "contenedor";
    resultadosDiv.id = "Partidos";
    resultadosDiv.style.marginTop = "20px";
    resultadosDiv.innerHTML = "<h2>Resultados de los Partidos</h2>";
    document.body.appendChild(resultadosDiv);
  } else {
    resultadosDiv.innerHTML = "<h2>Resultados de los Partidos</h2>";
  }
  const ul = document.createElement("ul");
  resultados.forEach(r => {
    const li = document.createElement("li");
    li.textContent = `${r.partidoD}`;
    ul.appendChild(li);
  });
  resultadosDiv.appendChild(ul);
}

// Función para mostrar la eliminatoria interactiva hasta el ganador
function iniciarEliminatoriaInteractiva(equiposIniciales) {
  let ronda = 1;
  // Mezclar aleatoriamente los equipos solo en la primera ronda
  let equipos = [...equiposIniciales];
  for (let i = equipos.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [equipos[i], equipos[j]] = [equipos[j], equipos[i]];
  }
  mostrarRonda(equipos, ronda);
}

function mostrarRonda(equipos, ronda) {
  let resultadosDiv = document.getElementById("Partidos");
  if (!resultadosDiv) {
    resultadosDiv = document.createElement("div");
    resultadosDiv.className = "contenedor";
    resultadosDiv.id = "Partidos";
    resultadosDiv.style.marginTop = "20px";
    document.body.appendChild(resultadosDiv);
  }
  // Mensaje especial según cantidad de equipos
  let mensajeRonda = "";
  switch (equipos.length) {
    case 32:
      mensajeRonda = "<h2>16avos de final</h2>";
      break;
    case 16:
      mensajeRonda = "<h2>Octavos de final</h2>";
      break;
    case 8:
      mensajeRonda = "<h2>Cuartos de final</h2>";
      break;
    case 4:
      mensajeRonda = "<h2>Semifinales</h2>";
      break;
    case 2:
      mensajeRonda = "<h2>Final</h2>";
      break;
    default:
      mensajeRonda = `<h3>Ronda ${ronda}</h3>`;
  }
  resultadosDiv.innerHTML += mensajeRonda;
  const rondaDiv = document.createElement("div");
  rondaDiv.className = "ronda-eliminatoria";
  rondaDiv.innerHTML = "";
  let partidos = [];
  for (let i = 0; i < equipos.length; i += 2) {
    const equipoA = equipos[i];
    const equipoB = equipos[i+1];
    if (!equipoB) break;
    partidos.push({ equipoA, equipoB });
    rondaDiv.innerHTML += `
      <div class="partido-item">
        <span>${equipoA}</span>
        <input type="number" min="0" class="resultado-input" placeholder="0" id="eliminatoriaA${ronda}_${i}">
        vs
        <input type="number" min="0" class="resultado-input" placeholder="0" id="eliminatoriaB${ronda}_${i}">
        <span>${equipoB}</span>
      </div>
    `;
  }
  // Botón para registrar resultados de la ronda
  const btnRonda = document.createElement("button");
  btnRonda.textContent = "Registrar Resultados Ronda " + ronda;
  btnRonda.className = "btn-ronda";
  rondaDiv.appendChild(btnRonda);
  resultadosDiv.appendChild(rondaDiv);
  btnRonda.onclick = function() {
    let ganadores = [];
    let hayEmpate = false;
    for (let i = 0; i < partidos.length; i++) {
      const inputA = document.getElementById(`eliminatoriaA${ronda}_${i}`);
      const inputB = document.getElementById(`eliminatoriaB${ronda}_${i}`);
      const golA = parseInt(inputA.value);
      const golB = parseInt(inputB.value);
      if (!isNaN(golA) && !isNaN(golB)) {
        if (golA === golB) {
          hayEmpate = true;
          inputA.style.border = "2px solid red";
          inputB.style.border = "2px solid red";
        } else {
          inputA.style.border = "";
          inputB.style.border = "";
          if (golA > golB) {
            ganadores.push(partidos[i].equipoA);
          } else {
            ganadores.push(partidos[i].equipoB);
          }
        }
      }
    }
    if (hayEmpate) {
      notif.innerText = "❌ No puede haber empate. Modifica los resultados para cada partido.";
      notif.style.display = "block";
      setTimeout(() => { notif.style.display = "none"; }, 4000);
      return;
    }
    rondaDiv.innerHTML += `<p>Ganadores: ${ganadores.join(", ")}</p>`;
    btnRonda.disabled = true;
    if (ganadores.length > 1) {
      mostrarRonda(ganadores, ronda + 1);
    } else if (ganadores.length === 1) {
      mostrarGanadorFinal(ganadores[0]);
    }
  };
}

// Función para mostrar el ganador final
function mostrarGanadorFinal(ganador) {
  let resultadosDiv = document.getElementById("Partidos");
  if (!resultadosDiv) {
    resultadosDiv = document.createElement("div");
    resultadosDiv.className = "contenedor";
    resultadosDiv.id = "Partidos";
    resultadosDiv.style.marginTop = "20px";
    document.body.appendChild(resultadosDiv);
  }
  resultadosDiv.innerHTML += `<h2>🏆 Ganador del Torneo: ${ganador}</h2>`;
}
