import connection from "../database/db.js"

export const agregarUsuario = (nombre, email, contraseña) => {
    let sql = "INSERT INTO usuarios (nombre, email, contraseña) VALUES (?,?,?)";

    return connection.query(sql, [nombre, email, contraseña]);
}

export default {
    agregarUsuario
}