
let getProducts_form = document.getElementById("getProducts-form");
let listado_productos = document.getElementById("listado-productos");
let contenedor_formulario = document.getElementById("contenedor-formulario");
getProducts_form.addEventListener("submit", async event => {
    event.preventDefault();
    let formData = new FormData(event.target);
    console.log("Formdata es: " + formData);

    let data = Object.fromEntries(formData.entries());
    console.log("La data es:" + data);

    let idProducto = data.id;
    console.log("Id del producto: " + idProducto);

    try {
        let response = await fetch(`http://localhost:3000/api/products/${idProducto}`)

        let datos = await response.json();
        console.log("Los datos son: " + datos);

        let producto = datos.payload[0];
        mostrarProducto(producto);
    } catch(error) {
        console.error("Error: " + error);
    }
});

function mostrarProducto(producto) {
    // console.table(producto); // El producto se recibe correctamente

    let htmlProducto = `
        <li class="li-listados">
            <img src="${producto.img_url}" alt="${producto.nombre}" class="img-listados">
            <p>Id: ${producto.id}/ Nombre: ${producto.nombre}/ <strong>Precio: $${producto.precio}</strong></p>
        </li>
        <li class="li-botonera">
            <input type="button" id="updateProduct_button" value="Actualizar producto">
        </li>
        `;

    listado_productos.innerHTML = htmlProducto;

    let updateProduct_button = document.getElementById("updateProduct_button");

    updateProduct_button.addEventListener("click", event => {
        crearFormularioPut(event, producto);
    });
}


function crearFormularioPut(event, producto) {

    event.stopPropagation(); // Evitamos la propagacion de eventos
    console.table(producto); // Recibimos el producto para llenar los valores del formulario

    let formularioPutHtml = `
        <form id="updateProducts-form" class="products-form-amplio">

            <label for="nameProd">Nombre</label>
            <input type="text" name="name" id="nameProd" value="${producto.nombre}" required>
            <br>

            <label for="imageProd">Imagen</label>
            <input type="text" name="image" id="imageProd" value="${producto.img_url}" required>
            <br>

            <label for="categoryProd">Categoria</label>
            <select name="category" id="categoryProd" required>
                <option value="food">comida</option>
                <option value="drink">bebida</option>
            </select>
            <br>

            <label for="priceProd">Precio</label>
            <input type="number" name="price" id="priceProd" value="${producto.precio}" required>
            <br>

            <input type="submit" value="Actualizar producto">
        </form>
    `;

    contenedor_formulario.innerHTML = formularioPutHtml;

    let updateProducts_form = document.getElementById("updateProducts-form");

    updateProducts_form.addEventListener("submit", event => {
        actualizarProducto(event)
    });
}


async function actualizarProducto(event) {
    event.preventDefault();

    let url = "http//localhost:3000/api/products";

    let formData = new FormData(event.target);
    console.log(data);
    let data = Object.fromEntries(formData.entries());

    try {
        let response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        let result = await response.json();

        if (response.ok) {
            console.log(result.message);
            alert(result);

            listado_productos.innerHTML = "";
            contenedor_formulario.innerHTML = "";
        }

    } catch {
        console.log("Error :)")
    }
}