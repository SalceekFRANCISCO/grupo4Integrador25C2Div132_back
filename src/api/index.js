import express from "express";
import mySql from "mysql2/promise";
import environments from "./config/environments.js";
import connection  from "./database/db.js";
import cors from "cors";

const app = express();
const PORT = environments.port;


app.use(cors());
app.get("/", (req, res) => {
    res.send("TP Integrador Div 132");
});
app.get("/products", async (req, res) => {
	try {
	    const sql = "SELECT * FROM productos";
        const [rows, fields] = await connection.query(sql);
        console.log(rows);

        res.status(200).json({
            payload: rows
        })


    } catch(error) {
        console.error("Error obteniendo productos" + error.message);
        res.status(500).json({
            message: "Error interno al obtener productos"
        })
    }
})
app.listen(PORT, () => {
    console.log(`Servidor corriendo desde el puerto ${PORT}`)
});
