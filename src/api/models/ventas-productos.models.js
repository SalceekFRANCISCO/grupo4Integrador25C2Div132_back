import connection from "../database/db.js";

async function agregarVentaProducto(id_producto, id_ventas){
    let sql = "INSERT INTO productos_ventas (id_producto, id_ventas) VALUES (?, ?)";
    return await connection.query(sql, [id_producto, id_ventas]);
};


export default{
    agregarVentaProducto
}