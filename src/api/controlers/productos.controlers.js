import connection from "../database/db.js"
import productModels from "../models/productos.models.js"
import {enviarRespuesta, mostrarError} from "../utils/errorResponses.js"

// ideas Para modularizar

/* modularizar el res.500 OK
modularizar el res.200 cambiar de alguna forma el de getallproducts OK
validacion en getelementbyid OK
validacion en insertProduct OK 
validacion en updateProduct con affectedRows OK

*/

export async function getAllProducts(request, response){
    try {
        const [rows, fields] = await productModels.seleccionarTodosLosProductos();
        const limit = parseInt(request.query.limit) || 10;
        const offset = parseInt(request.query.offset) || 0;
        //const pagina = await productModels.seleccionarProductos({limit, offset});
        
        const mensaje = rows.length === 0 ? "No se encontraron productos" : "Productos encontrados";

        enviarRespuesta(response,200,mensaje,rows);
        
    } catch (error) {
        
        mostrarError(response,error,"No se pudieron obtener los productos");
    }
};

export async function getProductById(request, response) {
    try {
        let {id} = request.params; 

        const [rows, fields] = await productModels.seleccionarProductoPorId(id);

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

export async function insertProduct(request, response) {
    try {
        
        const {nombre, precio, tipo, img_url, stock} = request.body;
        
        if ( !nombre || !precio || !tipo || !img_url || !stock){
            enviarRespuesta(response,400,"Datos inválidos");
        };
        
        const [rows] = await productModels.agregarProducto();

        enviarRespuesta(response,201,"Creación exitosa.",rows);
        
    } catch (error) {
        
        mostrarError(response,error,"Error modificando el producto");
            
    }
        
};
    
export async function updateProduct(request, response) {
    try {
        let {id, nombre, precio, img_url, categoria, stock} = request.body;
        // console.log("Cuerpo de la solicitud:", request.body);
        
    if (!nombre || !precio || !categoria || !img_url || stock === null || !id){
        console.log("Error: Campos inválidos");

        enviarRespuesta(response,400,"Datos inválidos o faltan campos");
      
        }
        
        const [resultado] = await productModels.actualizarProducto(id, nombre, precio, categoria, img_url, stock);
        
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
        