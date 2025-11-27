import express from "express";
// import mySql from "mysql2/promise";
import environments from "./src/api/config/environments.js";
import connection  from "./src/api/database/db.js";
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import {productRoutes } from "./src/api/routes/index.js";
import { _dirname, join } from "./src/api/utils/index.js";

const app = express();
const PORT = environments.port;


//#region Middleware
app.use(cors());

app.use(loggerUrl);

app.use(express.static(join(_dirname, "src/public")));



//#endregion

//#region Config
app.set("view engine", "ejs");
app.set("views", join(_dirname, "src/views"))
//#endregion

app.use("api/products", productRoutes);


app.get("/dashboard", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM productos");
        console.log(rows);
        res.render("index", {
            title: "Dashboard",
            about: "Listado de productos"
        });
    } catch(error) {
        console.error(error);
    }
});

app.get("/", (req, res) => {
    res.send("TP Integrador Div 132");
});

// app.get("/products", async (req, res) => {
// 	try {
// 	    const sql = "SELECT * FROM productos";
//         const [rows, fields] = await connection.query(sql);
//         console.log(rows);

//         res.status(200).json({
//             payload: rows
//         })


//     } catch(error) {
//         console.error("Error obteniendo productos" + error.message);
//         res.status(500).json({
//             message: "Error interno al obtener productos"
//         })
//     }
// })
app.listen(PORT, () => {
    console.log(`Servidor corriendo desde el puerto ${PORT}`)
});
