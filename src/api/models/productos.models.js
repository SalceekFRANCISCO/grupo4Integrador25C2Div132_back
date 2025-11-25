import connection from "../database/db.js"

export const seleccionarTodosLosProductos = () => {
    let sql = "SELECT * FROM productos";// optimizar esto

    return connection.query(sql);
}

// Operacion CRUD
// Create
export const agregarProducto = (nombre, precio, tipo, img_url, stock) => {
    let sql = "INSERT INTO productos (nombre, precio, tipo, img_url, stock) VALUES (?,?,?,?,?)";
    
    return connection.query(sql, [nombre, precio, tipo, img_url, stock]);
}

// Read
export const seleccionarProductoPorId = (id) => {
    let sql = "SELECT FROM productos WHERE id = ?";
    
    return connection.query(sql, [id]);
}

// Update
export const actualizarProducto = (nombre, precio, tipo, img_url, stock, id) => {
    let sql = `UPDATE productos 
                SET nombre= ?, precio= ?, tipo= ?, img_url= ?, stock= ? 
                WHERE id = ?`;
    
    return connection.query(sql, [nombre, precio, tipo, img_url, stock, id]);
}

// Delete
export const eliminarProducto = (id) => {
    let sql = "";

    return connection.query(sql, [id]);
}

// DELETE FROM Students

// WHERE StudentID = 003;