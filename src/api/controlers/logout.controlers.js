import {mostrarError} from "../utils/errorResponses.js"

export function destruirSesion(request, response){
    request.session.destroy((error) => {
        if (error) {
            console.log("Error al destruir la sesión", error);

            mostrarError(response,error,"Error al cerrar la sesión.");
            // return response.status(500).json({ //error responses
            //     error: "Error al cerrar la sesión."
            // })
        }
        else{
            response.redirect("/login");
        }
    })
}