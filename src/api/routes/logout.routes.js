// import connection from "../database/db.js"
import Router from "express";

const router = Router();

import { destruirSesion } from "../controlers/logout.controlers.js";

router.post("/", destruirSesion);


export default router;