//#region Imports
import express, { response } from "express";
import environments from "./src/api/config/environments.js";
import connection  from "./src/api/database/db.js";
import cors from "cors";
import { loggerUrl, requireLogin } from "./src/api/middlewares/middlewares.js";
import {productRoutes, userRoutes } from "./src/api/routes/index.js";
import { _dirname, join } from "./src/api/utils/index.js";
import { handleMulterError } from "./src/api/middlewares/multer-middlewares.js";
import session from "express-session";
import { comparePassword, hashPassword } from "./src/api/utils/bcrypt.js";

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


//#region Routes
app.use("/api/productos", productRoutes);
app.use("/api/usuarios", userRoutes);
//#endregion 


//#region Session
app.use(session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: true
}));

//#endregion


//#region Devolver las vistas
app.get("/", (request, response) => {
    response.send("TP Integrador Div 132");
});

app.get("/dashboard", requireLogin, async (request, response) => {
    try {
        const [rows] = await connection.query("SELECT * FROM productos");
        console.log(rows);
        response.render("index", {
            title: "Dashboard",
            about: "Listado de productos",
            productos: rows
        });
    } catch(error) {
        console.error(error);
    }
});

app.get("/consultar", requireLogin, (request, response) => {
    response.render("consultar", {
        title: "Consultar",
        about: "Consultar productos"
    })
});

app.get("/crear", requireLogin, (request, response) => {
    response.render("crear", {
        title: "Crear",
        about: "Crear"
    })
});

app.get("/modificar", requireLogin, (request, response) => {
    response.render("modificar", {
        title: "Modificar",
        about: "Modificar un producto"
    })
});

app.get("/eliminar", requireLogin, (request, response) => {
    response.render("eliminar", {
        title: "Eliminar",
        about: "Eliminar productos"
    })
});

app.get("/upload", requireLogin, (request, response) => {
    response.render("subirImagen", {
        title: "Subir una imagen"
    })
})

app.get("/login", (request, response) => {
    response.render("login", {
        title: "login",
        about: "Iniciá sesión"
    });
});
//#endregion


//#region vistas del login
// app.post("/login", async (request, response) => {
//     try {
//         const {email, contraseña} = request.body;
//         console.log(email, contraseña)

//         if (!email || !contraseña) {
//             return response.render("login", {
//                 title: "Login",
//                 about: "Login",
//                 error: "Todos los campos son obligatorios"
//             })
//         }

//         const sql = "SELECT * FROM usuarios WHERE email = ? AND contraseña = ?";
//         const [rows] = await connection.query(sql, [email, contraseña]);

//         if (rows[0].length === 0) {
//             return response.render("login", {
//                 title: "login",
//                 about: "login",
//                 error: "Credenciales incorrectas"
//             })
//         }

//         console.log(rows[0]);
//         const user = rows[0];
//         console.table(user);

//         request.session.user = {
//             id: user.id,
//             nombre: user.nombre,
//             email: user.email
//         };

//         response.redirect("/dashboard");

//     } catch(error) {
//         console.error("Error en el login" + error);
//     }
// });

app.post("/login", async (request, response) => {
    try {
        const {email, contraseña} = request.body;
        // console.log(email, contraseña)
        // console.log(await hashPassword(contraseña));
        

        if (!email || !contraseña) {
            return response.render("login", {
                title: "Login",
                about: "Login",
                error: "Todos los campos son obligatorios"
            })
        }

        const sql = "SELECT * FROM usuarios WHERE email = ?";
        const [rows] = await connection.query(sql, [email]);

        if (rows[0].length === 0) {
            return response.render("login", {
                title: "login",
                about: "login",
                error: "Credenciales incorrectas"
            })
        }

        const user = rows[0];
        console.table(user);

        const isMatch = await comparePassword(contraseña,user.contraseña); 
        if(!isMatch){
            return response.render("login", {
                title: "login",
                about: "login",
                error: "Credenciales incorrectas"
            })
        }

        request.session.user = {
            id: user.id,
            nombre: user.nombre,
            email: user.email
        };

        response.redirect("/dashboard");

    } catch(error) {
        console.error("Error en el login" + error);
    }
});

app.post("/logout", (request, response) => {
    request.session.destroy((error) => {
        if (error) {
            console.log("Error al destruir la sesión", error);
            return response.status(500).json({
                error: "Error al cerrar la sesión."
            })
        }
        response.redirect("/login");
    })
})

app.get("/registrar", (request, response) => {
    response.render("crearUsuario", {
        title: "Registrar",
        about: "Registrar un usuario"
    })
});
//#endregion


//#region llamada al puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo desde el puerto ${PORT}`)
});

//#endregion
