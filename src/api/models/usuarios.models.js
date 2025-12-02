import connection from "../database/db.js"

export const agregarUsuario = (nombre, email, constrasenia) => {
    let sql = "INSERT INTO usuarios (nombre, email, constraseña) VALUES (?,?,?)";

    return connection.query(sql, [nombre, email, constrasenia]);
}

export default {
    agregarUsuario
}