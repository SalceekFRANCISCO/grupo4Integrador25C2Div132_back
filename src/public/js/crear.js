let url = "http://localhost:3000/api/productos"
let crearProducto_form = document.getElementById("crearProductos-form");

crearProducto_form.addEventListener("submit", async event => {
    event.preventDefault();

    let formData = new FormData(event.target);
    console.log("El form-data es " + formData);
    let data = Object.fromEntries(formData.entries());
    console.log("La data es " + data);
    data.precio = parseFloat(data.precio);
    data.stock = parseInt(data.stock);
    enviarProducto(data);
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
        let result = await response.json();

        if (response.ok) {
            console.log(result.message);
            alert(result.message);
        } else {
            console.error(result.message);
            alert(result.message);
        }

    } catch(error) {
        console.error("Error al enviar los datos: ", error);
        alert("Error al procesar la solicitud")
    }
}