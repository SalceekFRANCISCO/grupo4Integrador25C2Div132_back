//#region Imports
import express from "express";
import environments from "./src/api/config/environments.js";
import connection  from "./src/api/database/db.js";
import cors from "cors";
import { loggerUrl } from "./src/api/middlewares/middlewares.js";
import {productRoutes } from "./src/api/routes/index.js";
import { _dirname, join } from "./src/api/utils/index.js";

const app = express();
const PORT = environments.port;
//#endregion


//#region Middleware
app.use(cors());
app.use(loggerUrl);
app.use(express.json());
app.use(express.static(join(_dirname, "src/public")));
//#endregion


//#region Config
app.set("view engine", "ejs");
app.set("views", join(_dirname, "src/views"))
//#endregion


//#region routes
app.use("api/products", productRoutes);
//#endregion 


app.get("/dashboard", async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM productos");
        console.log(rows);
        res.render("index", {
            title: "Dashboard",
            about: "Listado de productos",
            productos: rows
        });
    } catch(error) {
        console.error(error);
    }
});

app.get("/", (req, res) => {
    res.send("TP Integrador Div 132");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo desde el puerto ${PORT}`)
});
