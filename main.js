const notif = document.getElementById("notificacion");
// Agregar un evento al formulario para manejar el envío
document.getElementById("formTorneo").addEventListener("submit", function(e) {
      e.preventDefault();
      const nombre = document.getElementById("torneo").value;
      const equipos = document.getElementById("opciones").value;
      //alert(`Torneo "${nombre}" creado con ${equipos} equipos.`);
      notif.innerText = `✅ Torneo "${nombre}" creado con ${equipos} equipos.`;
      notif.style.display = "block";

    setTimeout(() => {
      notif.style.display = "none";
    }, 4000); 
        // Mostrar la sección después de enviar el formulario
      document.querySelector("section").style.display = "block";
    });

