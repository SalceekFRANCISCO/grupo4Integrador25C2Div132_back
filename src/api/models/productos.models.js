import connection from "../database/db.js"

export const seleccionarTodosLosProductos = () => {
    let sql = "SELECT * FROM productos";// optimizar esto

    return connection.query(sql);
}

export const seleccionarProductos = async ({limit = 10, offset = 0}) => {
    const sqlTotalProd = "SELECT count(*) as total from productos";
    const [[{total}]] = await connection.query(sqlTotalProd);
    
    console.log(total);
    
    let sql = "SELECT * FROM productos limit ? offset ?";

    const [rows] = await connection.query(sql, [limit, offset]);

    return {rows, total}
}

// #region Operacion CRUD
// Create
export const agregarProducto = (nombre, img_url, categoria, precio, stock, activo) => {
    let sql = "INSERT INTO productos (nombre, img_url, categoria, precio, stock, activo) VALUES (?, ?, ?, ?, ?, ?)";
    
    return connection.query(sql, [nombre, img_url, categoria, precio, stock, activo]);
}

// Read
export const seleccionarProductoPorId = (id) => {
    let sql = "SELECT * FROM productos WHERE id = ?";
    
    return connection.query(sql, [id]);
}

// Update
export const actualizarProducto = (id, nombre, precio, categoria, img_url, stock, activo) => {
    let sql = `UPDATE productos 
                SET nombre= ?, img_url= ?, categoria= ?,  precio= ?,  stock= ?, activo = ?
                WHERE id = ?`;
    console.log(id, nombre, precio, categoria, img_url, stock, activo);
    return connection.query(sql, [nombre, img_url, categoria, precio, stock, activo, id]);
}

// Delete
export const eliminarProducto = (id) => {
    let sql = "DELETE FROM productos WHERE id = ?";

    return connection.query(sql, [id]);
}

export default {
    seleccionarTodosLosProductos,
    seleccionarProductos,
    seleccionarProductoPorId,
    agregarProducto,
    actualizarProducto,
    eliminarProducto
}
//#endregion