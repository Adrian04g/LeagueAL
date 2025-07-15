document.getElementById("formTorneo").addEventListener("submit", function(e) {
      e.preventDefault();
      const nombre = document.getElementById("torneo").value;
      const equipos = document.getElementById("opciones").value;
      alert(`Torneo "${nombre}" creado con ${equipos} equipos.`);
        // Mostrar la sección después de enviar el formulario
      document.querySelector("section").style.display = "block";
    });

