const API_URL = "http://localhost:3000/";

// === Nuevos nombres ===
const zonaArrastre = document.getElementById('zonaArrastre');
const inputArchivo = document.getElementById('inputArchivo');
const formularioSubida = document.getElementById('formularioSubida');
const vistaArchivo = document.getElementById('vistaArchivo');
const nombreArchivo = document.getElementById('nombreArchivo');
const rellenoProgreso = document.getElementById('rellenoProgreso');

// === Cuando se selecciona un archivo manualmente ===
inputArchivo.addEventListener('change', () => {
  if (inputArchivo.files.length) {
    mostrarArchivo(inputArchivo.files[0]);
  }
});

// === Eventos de arrastre sobre la zona ===
['dragenter', 'dragover'].forEach(eventName => {
  zonaArrastre.addEventListener(eventName, e => {
    e.preventDefault();
    zonaArrastre.classList.add('arrastrando');
  });
});

['dragleave', 'drop'].forEach(eventName => {
  zonaArrastre.addEventListener(eventName, e => {
    e.preventDefault();
    zonaArrastre.classList.remove('arrastrando');
  });
});

// === Cuando se suelta un archivo sobre la zona ===
zonaArrastre.addEventListener('drop', e => {
  const files = e.dataTransfer.files;
  if (files.length) {
    inputArchivo.files = files;
    mostrarArchivo(files[0]);
  }
});

// === Mostrar archivo seleccionado ===
function mostrarArchivo(file) {
  vistaArchivo.style.display = 'flex';
  nombreArchivo.textContent = `Archivo: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
  rellenoProgreso.style.width = '0%';
  rellenoProgreso.style.backgroundColor = '#2563eb';
}

// === API_URL inyectable en EJS ===
window.API_URL = '<%= typeof API_URL !== "undefined" ? API_URL : "http://localhost:3000/" %>';

// === Enviar archivo ===
document
  .getElementById("formularioSubida")
  .addEventListener("submit", async (evn) => {
    evn.preventDefault();

    const file = inputArchivo.files[0];
    if (!file) return alert("Seleccione un archivo.");

    const data = new FormData();
    data.append("image", file);

    try {
      const resp = await fetch(API_URL + "api/productos/upload", {
        method: "POST",
        body: data,
      });

      const dataRes = await resp.json();

      if (resp.ok) {
        rellenoProgreso.style.backgroundColor = "#22c55e";
        rellenoProgreso.style.width = "100%";

        const image = await fetch(API_URL + `images/${dataRes.payload.url}`);
        const blob = await image.blob();
        const objectURL = URL.createObjectURL(blob);
        const imagen = `<br> <img style="width:200px" src="${objectURL}"/>`;

        document.body.innerHTML += imagen;
      }
    } catch (error) {
      rellenoProgreso.style.backgroundColor = "#ef4444";
      rellenoProgreso.style.width = "100%";
      console.log(error.message);
    }
  });
