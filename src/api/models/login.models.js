import connection from "../database/db.js"

async function obtenerEmail(email){
    const sql = "SELECT * FROM usuarios WHERE email = ?";

    return await connection.query(sql, [email]);
}

export default {
    obtenerEmail
}