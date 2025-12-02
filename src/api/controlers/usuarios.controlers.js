import connection from "../database/db.js"
import usersModels from "../models/usuarios.models.js"
import {enviarRespuesta, mostrarError} from "../utils/errorResponses.js"
import { hashPassword } from "../utils/bcrypt.js";


export async function createUser(request, response) {
    
    try {
        let {nombre, email, contraseña} = request.body;

        if (!nombre || !email || !contraseña) {
            enviarRespuesta(response,400,"Datos inválidos");
        }

        console.log("antes del hash: "+contraseña);
        const contraseñaHash = (await hashPassword(contraseña));
        console.log("despues del hash: "+contraseñaHash);

        // let [rows] = await usersModels.agregarUsuario(nombre,email,contraseña);
        let [rows] = await usersModels.agregarUsuario(nombre,email,contraseñaHash);

        enviarRespuesta(response,201,"Creación exitosa.",rows);
    }
    catch(error) {
        mostrarError(response,error,"Error creando el usuario");
    }
}