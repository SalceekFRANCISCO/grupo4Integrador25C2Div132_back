let getProducts_form = document.getElementById("getProducts-form");
let listado_productos = document.getElementById("listado-productos");
console.log(listado_productos);

getProducts_form.addEventListener("submit", async event => {
    event.preventDefault();
    let formData = new FormData(event.target);
    console.log("Formdata es: " + formData);

    let data = Object.fromEntries(formData.entries());
    console.log("La data es:" + data);

    let idProducto = data.id;
    console.log("Id del producto: " + idProducto);

    try {
        let response = await fetch(`http://localhost:3000/api/productos/${idProducto}`)

        let datos = await response.json();
        console.log("Los datos son: " + datos);

        let producto = datos.payload[0];
        mostrarProducto(producto);
    } catch(error) {
        console.error("Error: " + error);
    }
});

function mostrarProducto(producto) {
    console.table(producto);

    let htmlProducto = `<li class = "li-listados">
                        <img src="${producto.img_url}" alt=${producto.nombre} class="img-listados">
                        <p> Id: ${producto.id}/Nombre: ${producto.nombre}/<strong>Precio: $${producto.precio}</strong></p>
        </li>
        `;

    console.log(htmlProducto);
    listado_productos.innerHTML = htmlProducto;
}