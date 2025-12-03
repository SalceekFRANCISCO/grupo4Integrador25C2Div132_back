
export function mostrarError(response,error,mensaje){
    response.status(500).json({
        message: mensaje
    })
    
    console.error(`Error interno del servidor ${error.message}`);

}

export function enviarRespuesta(response, codigo, mensaje, rows = null) {

    const respuesta = { message: mensaje };

    if (rows !== null) {
        respuesta.payload = rows;
    }

    return response.status(codigo).json(respuesta);
}

  // response.status(200).json ({
        //     payload: rows,
        //     message: rows.length === 0 ? "No se encontraron productos" : "Productos encontrados"
        // })
        

// getProductById
// return response.status(404).json({
    //     message: `No existe producto con id: ${id}`
    // });
