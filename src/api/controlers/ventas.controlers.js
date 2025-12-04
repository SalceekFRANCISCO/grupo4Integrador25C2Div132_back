import ventasProductosModels from "../models/ventas-productos.models.js";
import productModels from "../models/ventas.models.js";
import {enviarRespuesta, mostrarError} from "../utils/errorResponses.js"

export async function getVentas(request, response) {
    try {
        const [rows, fields] = await productModels.seleccionarVentas();

        const mensaje = rows.length === 0 ? "No se encontraron ventas" : "Ventas encontradas";

        enviarRespuesta(response,200,mensaje,rows);
    }
    catch(error) {
        mostrarError(response,error,"No se pudieron obtener las ventas");
    }
};

export async function getVentaById(request, response) {
    try {
        let {id} = request.params; 
        const [rows, fields] = await productModels.seleccionarVentaPorId(id);

        if(rows.length === 0) {
            console.log(`No existe una venta con el id: ${id}`);
            enviarRespuesta(response, 404, `No existe una venta con el id: ${id}`);
        }
        else {
            enviarRespuesta(response, 200, "Búsqueda exitosa", rows);
        }
    }
    catch(error) {
        console.log("soy el error");
        
        mostrarError(response, error, "No se pudo obtener la venta");
    }
};

export async function createVenta(request, response) {
    try {
        let {fecha, nombreUsuario, total, productos} = request.body;
        console.log("La body es " + request.body);

        if (!fecha || !nombreUsuario || total === null || !Array.isArray(productos)) {
            enviarRespuesta(response, 400, "Datos inválidos");
        }

        let [rows] = await productModels.agregarVenta(fecha, nombreUsuario, total);
        
        const ventaId = rows.insertId;
        
        for (const productoID of productos){
            await ventasProductosModels.agregarVentaProducto(productoID,ventaId);
        }

        enviarRespuesta(response, 201, "Creación exitosa.", rows);
    }
    catch(error) {
        mostrarError(response, error, "Error creando la venta");
    }
};

export async function updateVenta(request, response) {
    try {
        let {id, fecha, nombreUsuario, total} = request.body;
        if (!fecha || !nombreUsuario || !total || !id){
            console.log("Error: Campos inválidos");
            enviarRespuesta(response,400,"Datos inválidos o faltan campos");
        }
        
        const [resultado] = await productModels.actualizarVenta(id, fecha, nombreUsuario, total);
        
        if (resultado.affectedRows === 0){
            enviarRespuesta(response,400,"No se actualizó la venta");
    };

    enviarRespuesta(response,200,"Modificación de venta exitosa.");

    } catch (error) {
        
        mostrarError(response,error,"Error modificando la venta");
        
    }
};

export async function deleteVenta(request, response) {
    try {
        
        const {id} = request.params; 
        
        const [resultado] = await productModels.eliminarVenta(id);
        
        if (!resultado.affectedRows === 0){
            enviarRespuesta(response,400,"No se pudo eliminar la venta.");
        }

        enviarRespuesta(response,200,"Se eliminó la venta.");
        
    } catch (error) {
        
        mostrarError(response,error,"Error eliminando la venta");
    }

};
