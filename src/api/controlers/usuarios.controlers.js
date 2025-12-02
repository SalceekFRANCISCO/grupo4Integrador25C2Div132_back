import connection from "../database/db.js"
import usersModels from "../models/usuarios.models.js"
import {enviarRespuesta, mostrarError} from "../utils/errorResponses.js"


export async function createUser(request, response) {
    try {
        let {nombre, email, contrasenia} = request.body;
        // nombre, email, contrasenia

        if (!nombre || !email || !contrasenia) {
            enviarRespuesta(response,400,"Datos inválidos");
        }

        let [rows] = await usersModels.agregarUsuario(nombre,email,contrasenia);

        enviarRespuesta(response,201,"Creación exitosa.",rows);
    }
    catch(error) {
        mostrarError(response,error,"Error creando el usuario");
    }
}