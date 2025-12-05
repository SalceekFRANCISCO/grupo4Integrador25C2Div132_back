// import { fileLoader } from "ejs";
// import connection from "../database/db.js"
import productModels from "../models/productos.models.js"
import {enviarRespuesta, mostrarError} from "../utils/errorResponses.js"

export async function getAllProducts(request, response){
    try {
        const [rows] = await productModels.seleccionarTodosLosProductos();
        
        const mensaje = rows.length === 0 ? "No se encontraron productos" : "Productos encontrados";

        enviarRespuesta(response,200,mensaje,rows);
        
    } catch (error) {
        
        mostrarError(response,error,"No se pudieron obtener los productos");
    }
};

export async function getProductById(request, response) {
    try {
        let {id} = request.params; 

        const [rows] = await productModels.seleccionarProductoPorId(id);

        if(rows.length === 0){
            console.log(`No existe producto con id: ${id}`);
            
            enviarRespuesta(response,404,`No existe producto con id: ${id}`);

        } else{
        
            enviarRespuesta(response,200,"Busqueda exitosa",rows);
        }
        
    } catch (error) {

        mostrarError(response,error,"Error obteniendo el producto.");
        
    }
};

export async function createProduct(request, response) {
    try {
        let {nombre, img_url, categoria, precio, stock, activo} = request.body;
        console.log("La body es " + request.body);

        if (!nombre || !categoria || !img_url || !precio || !stock || activo === null) {
            enviarRespuesta(response,400,"Datos inválidos");
        }

        let [rows] = await productModels.agregarProducto(nombre, img_url, categoria, precio, stock, activo);

        enviarRespuesta(response,201,"Creación exitosa.",rows);
    }
    catch(error) {
        mostrarError(response,error,"Error creando el producto");
    }
}
    
export async function updateProduct(request, response) {
    try {
        let {id, nombre, precio, img_url, categoria, stock, activo} = request.body;
        
    if (!nombre || !precio || !categoria || !img_url || stock === null || activo === null || !id){
        console.log("Error: Campos inválidos");

        enviarRespuesta(response,400,"Datos inválidos o faltan campos");
      
        }
        
        const [resultado] = await productModels.actualizarProducto(id, nombre, precio, categoria, img_url, stock, activo);
        
        if (resultado.affectedRows === 0){
            enviarRespuesta(response,400,"No se actualizó el producto");
    }

    enviarRespuesta(response,200,"Modificación de producto exitosa.");

    } catch (error) {
        
        mostrarError(response,error,"Error modificando el producto");
        
    }
};

export async function deleteProduct(request, response) {
    try {
        
        const {id} = request.params; 
        
        const [resultado] = await productModels.eliminarProducto(id);
        
        if (!resultado.affectedRows === 0){
            enviarRespuesta(response,400,"No se elimino el producto");
        }

        enviarRespuesta(response,200,"Eliminacion de producto exitosa.");
        
    } catch (error) {
        
        mostrarError(response,error,"Error eliminando el producto");
    }

};
