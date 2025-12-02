import connection from "../database/db.js"
import usersModels from "../models/usuarios.models.js"
import {enviarRespuesta, mostrarError} from "../utils/errorResponses.js"


export async function createUser(request, response) {
    
    try {
        let {nombre, email, contraseña} = request.body;
        // nombre, email, contraseña

        if (!nombre || !email || !contraseña) {
            // console.log("estoy aca puto");
            // console.log(email);
            // console.log(nombre);
            console.log("soy la contraseña "+contraseña);
            
            enviarRespuesta(response,400,"Datos inválidos"); //esta rompiendo aca
        }

        let [rows] = await usersModels.agregarUsuario(nombre,email,contraseña);

        enviarRespuesta(response,201,"Creación exitosa.",rows);
    }
    catch(error) {
        mostrarError(response,error,"Error creando el usuario");
    }
}