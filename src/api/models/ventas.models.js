import connection from "../database/db.js";

export const seleccionarVentas = () => {
    let sql = `SELECT * FROM VENTAS`;
    return connection.query(sql);
};

export const seleccionarVentaPorId = (id) => {
    let sql = "SELECT * FROM ventas WHERE id = ?";
    return connection.query(sql, [id]);
};

export const agregarVenta = (fecha, nombreUsuario, total) => {
    let sql = "INSERT INTO ventas (fecha, nombreUsuario, total) VALUES (?, ?, ?)";
    return connection.query(sql, [fecha, nombreUsuario, total]);
};

export const actualizarVenta = (id, fecha, nombreUsuario, total) => {
    let sql = `UPDATE ventas
                SET fecha= ?, nombreUsuario= ?, total= ?
                WHERE id = ?`;
    console.log(id, fecha, nombreUsuario, total);
    return connection.query(sql, [fecha, nombreUsuario, total, id]);
};

export const eliminarVenta = (id) => {
    let sql = "DELETE FROM ventas WHERE id = ?";
    return connection.query(sql, [id]);
};


export default {
    seleccionarVentas,
    seleccionarVentaPorId,
    agregarVenta,
    actualizarVenta,
    actualizarVenta
}