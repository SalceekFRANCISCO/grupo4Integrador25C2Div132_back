import connection from "../database/db.js"
import { Router } from "express";
const router = Router();

import { getEmail, getLogin } from "../controlers/login.controlers.js";

router.get("/", getLogin);

router.post("/", getEmail);

export default router;