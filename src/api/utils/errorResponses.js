
export function mostrarError(response,error,mensaje){
    response.status(500).json({
        message: mensaje
    })

    console.error(`Error interno del servidor ${error.message}`);
}

// export default{
//     errorResponses
// }
