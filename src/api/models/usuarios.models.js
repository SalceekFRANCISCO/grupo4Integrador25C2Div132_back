import connection from "../database/db.js"

const agregarUsuario = (nombre, email, contraseñaHash) => {
    let sql = "INSERT INTO usuarios (nombre, email, contraseña) VALUES (?,?,?)";

    return connection.query(sql, [nombre, email, contraseñaHash]);
}

export default {
    agregarUsuario
}