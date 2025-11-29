let url = "http://localhost:3000/api/products"
let crearProducto_form = document.getElementById("crearProductos-form");

crearProducto_form.addEventListener("submit", async event => {
    event.preventDefault();

    let formData = new FormData(event.target);
    console.log(formData);
    let data = Object.fromEntries(formData.entries());
    console.log(data);
})

async function enviarProducto(data) {
    console.table(data);

    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

    } catch(error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud")
    }
}