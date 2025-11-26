import connection from "../database/db.js"
import productModels from "../models/productos.models.js"

// ideas Para modularizar

/* modularizar el res.500
modularizar el res.200 cambiar de alguna forma el de getallproducts
validacion en getelementbyid
validacion en insertProduct
validacion en updateProduct con affectedRows

*/

export async function getAllProducts(request, response){
    try {
        const [rows, fields] = await productModels.seleccionarTodosLosProductos();

        response.status(200).json({
            payload: rows,
            message: rows.length === 0 ? "No se encontraron los productos":"Productos encontrados"
        })
        
    } catch (error) {
        
        // todo esto se podria modularizar en una funcion aparte donde solo pasas el error y el mensaje
        response.status(500).json({
            message: "No se pudieron obtener los productos"
        })

        console.error("Error interno del servidor" + error.message);
    }
};

export async function getProductById(request, response) {
    try {
        const {id} = request.params; //esto me genera dudas!! no se como especificamente obtiene el id

        const [rows, fields] = await productModels.seleccionarProductoPorId(id);

        if(rows.length === 0){
            console.log("No existe un producto con id: "+id);
            
            return response.status(404).json({
                message: `No existe producto con id: ${id}`
            });

        } else{
            response.status(200).json({
                payload: rows,
                message: "Busqueda exitosa"
            })
        }
        
    } catch (error) {

        response.status(500).json({
            message: "Error obteniendo el producto." //esta linea podria ser una funcion aparte que se llama cuando se va al catch
        });
        
        console.error(`Error interno del servidor ${error.message}`); //esta linea podria ser una funcion aparte que se llama cuando se va al catch
    }
};

export async function insertProduct(request, response) {
    try {

        const {nombre, precio, tipo, img_url, stock} = request.body;

        if ( !nombre || !precio || !tipo || !img_url || !stock){
            return request.status(400).json({
                message: "Datos invalidos"
            })
        };

        const [rows] = await productModels.agregarProducto();

        response.status(201).json({
            payload: rows,
            message: "creacion exitosa."
        });
        
    } catch (error) {

        response.status(500).json({
            message: "Error modificando el producto"
        });
        
        console.error("Error interno del servidor"+error.message);
        
    }
    
};

export async function updateProduct(request, response) {
    try {

        const {nombre, precio, tipo, img_url, stock, id} = request.body;

        if ( !nombre || !precio || !tipo || !img_url || !stock || !id){
            return request.status(400).json({
                message: "Datos invalidos o faltan campos."
            })
        }

        const [resultado] = await productModels.actualizarProducto(nombre, precio, tipo, img_url, stock, id);

        if (!resultado.affectedRows === 0){
            return response.status(400).json({
                message: "No se actualizo el producto"
            });
        }

        response.status(200).json({
            payload: rows,
            message: "Modificacion de producto exitosa."
        });
        
    } catch (error) {

        response.status(500).json({
            message: "Error modificando el producto"
        });
        
        console.error("Error interno del servidor "+error.message);
        
    }
    
};

export async function deleteProduct(request, response) {
    try {

        const {id} = request.params; //esto me genera dudas!! no se como especificamente obtiene el id

        const [resultado] = await productModels.eliminarProducto(id);

        if (!resultado.affectedRows === 0){
            return response.status(400).json({
                message: "No se elimino el producto"
            });
        }

        // todo esto tambien puede modularizarse pasando el status, la response y el mensaje
        response.status(200).json({ 
            payload: rows,
            message: "Eliminacion de producto exitosa."
        });
        
    } catch (error) {

        response.status(500).json({
            message: "Error eliminando el producto"
        });
        
        console.error("Error interno del servidor"+error.message);
    }
    
};
