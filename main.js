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
  document.querySelector("section").style.display = "block";

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
    partidos.forEach((partido, idx) => {
      const inputA = document.getElementById(`resultadoA${idx}`);
      const inputB = document.getElementById(`resultadoB${idx}`);
      resultados.push({
        partido: `${partido.equipoA} vs ${partido.equipoB}`,
        resultado: `${inputA.value} - ${inputB.value}`
      });
    });
    notif.innerText = `✅ Resultados registrados: ${resultados.map(r => r.partido + ' ' + r.resultado).join(', ')}`;
    notif.style.display = "block";
    setTimeout(() => { notif.style.display = "none"; }, 4000);
    // Mostrar los partidos y resultados en el documento
    mostrarResultadosEnDocumento(resultados);
  };
}

// Función para mostrar los partidos y resultados en el documento
function mostrarResultadosEnDocumento(resultados) {
  let resultadosDiv = document.getElementById("resultadosPartidos");
  if (!resultadosDiv) {
    resultadosDiv = document.createElement("div");
    resultadosDiv.className = "contenedor";
    resultadosDiv.id = "resultadosPartidos";
    resultadosDiv.style.marginTop = "20px";
    resultadosDiv.innerHTML = "<h2>Resultados de los Partidos</h2>";
    document.body.appendChild(resultadosDiv);
  } else {
    resultadosDiv.innerHTML = "<h2>Resultados de los Partidos</h2>";
  }
  const ul = document.createElement("ul");
  resultados.forEach(r => {
    const li = document.createElement("li");
    li.textContent = `${r.partido}: ${r.resultado}`;
    ul.appendChild(li);
  });
  resultadosDiv.appendChild(ul);
}
