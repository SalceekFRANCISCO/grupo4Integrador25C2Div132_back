import connection from "../database/db.js"
import { Router } from "express";
const router = Router();

import {createUser} from "../controlers/usuarios.controlers.js"


router.post("/", createUser);



export default router;