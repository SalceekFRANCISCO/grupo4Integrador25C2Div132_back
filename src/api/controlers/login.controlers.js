import {enviarRespuesta, mostrarError} from "../utils/errorResponses.js"
import  loginModels from "../models/login.models.js"
import { comparePassword } from "../utils/bcrypt.js";

export async function getLogin(request, response){
    return response.render("login", {
        title: "login",
        about: "Iniciá sesión"
    });
}


export async function getEmail(request, response) {
    try {
        let {email, contraseña} = request.body;

        if(!email || !contraseña){
            return enviarRespuesta(response,400,"Credenciales Incorrectas");
        }

        const [rows] =  await loginModels.obtenerEmail(email);

        if(rows.length === 0){
            return response.render("login",{
                title: "login",
                about: "login",
                error: "credenciales incorrectas"
            })
        }

        const user = rows[0];

        const esIgual = await comparePassword(contraseña, user.contraseña);
        if (!esIgual){
            return response.render("login",{
                title: "login",
                about: "login",
                error: "credenciales incorrectas"
            })
        }

        request.session.user = {
            id: user.id,
            nombre: user.nombre,
            email: user.email
        };

        return response.redirect("/dashboard");
        
    } catch (error) {

        mostrarError(response,error,"Error en el login");
    }
    

}

