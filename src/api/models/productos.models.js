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
export const agregarProducto = (nombre, img_url, categoria, precio, stock) => {
    let sql = "INSERT INTO productos (nombre, img_url, categoria, precio, stock) VALUES (?,?,?,?,?)";
    
    return connection.query(sql, [nombre, img_url, categoria, precio, stock]);
}

// Read
export const seleccionarProductoPorId = (id) => {
    let sql = "SELECT * FROM productos WHERE id = ?";
    
    return connection.query(sql, [id]);
}

// Update
export const actualizarProducto = (id, nombre, precio, categoria, img_url, stock) => {
    let sql = `UPDATE productos 
                SET nombre= ?, img_url= ?, categoria= ?,  precio= ?,  stock= ?
                WHERE id = ?`;
    console.log(id, nombre, precio, categoria, img_url, stock);
    return connection.query(sql, [nombre, img_url, categoria, precio, stock, id]);
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