//#region Imports
import express from "express";
import environments from "./src/api/config/environments.js";
import cors from "cors";
import { loggerUrl, requireLogin } from "./src/api/middlewares/middlewares.js";
import {loginRoutes, logoutRoutes, productRoutes, userRoutes, ventasRoutes } from "./src/api/routes/index.js";
import { _dirname, join } from "./src/api/utils/index.js";
import { handleMulterError } from "./src/api/middlewares/multer-middlewares.js";
import session from "express-session";
import productosModels from "./src/api/models/productos.models.js";

const app = express();
const PORT = environments.port;
const SESSION_KEY = environments.session_key;
//#endregion


//#region Middleware
app.use(cors());
app.use(loggerUrl);
app.use(express.json());
app.use(express.static(join(_dirname, "src/public")));
app.use(express.urlencoded({ extended: true }));
app.use(handleMulterError);
//#endregion


//#region Config motor de plantillas
app.set("view engine", "ejs");
app.set("views", join(_dirname, "src/views"));
//#endregion


//#region Session
app.use(session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: true
}));

//#endregion


//#region que controlador responde a cada view
app.use("/api/productos", productRoutes);
app.use("/api/usuarios", userRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/login", loginRoutes);
app.use("/logout",logoutRoutes)
//#endregion 


//#region Devolver las vistas
app.get("/", (request, response) => {
    response.redirect("TP Integrador Div 132");
});

app.get("/dashboard", requireLogin, async (request, response) => {
    try {
        const [rows] = await productosModels.seleccionarTodosLosProductos();

        response.render("index", {
            title: "Dashboard",
            about: "Listado de productos",
            productos: rows
        });

    } catch(error) {
        console.error(error);
    }
});

app.get("/productos/consultar", requireLogin, (request, response) => {
    response.render("productos/consultar", {
        title: "Consultar",
        about: "Consultar productos"
    })
});

app.get("/productos/crear", requireLogin, (request, response) => {
    response.render("productos/crear", {
        title: "Crear",
        about: "Crear"
    })
});

app.get("/productos/modificar", requireLogin, (request, response) => {
    response.render("productos/modificar", {
        title: "Modificar",
        about: "Modificar un producto"
    })
});

app.get("/productos/eliminar", requireLogin, (request, response) => {
    response.render("productos/eliminar", {
        title: "Eliminar",
        about: "Eliminar productos"
    })
});

app.get("/upload", requireLogin, (request, response) => {
    response.render("subirImagen", {
        title: "Subir una imagen"
    })
})

app.get("/registrar", (request, response) => {
    response.render("crearUsuario", {
        title: "Registrar",
        about: "Registrar un usuario" //parametro de las view
    })
});

//#endregion


//#region llamada al puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo desde el puerto ${PORT}`)
});

//#endregion
