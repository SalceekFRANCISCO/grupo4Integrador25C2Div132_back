import connection from "../database/db.js"
import { Router } from "express";
const router = Router();

import { validateId } from "../middlewares/middlewares.js";

import { deleteProduct, getAllProducts,
        getProductById, insertProduct, 
        updateProduct } from "../controlers/productos.controlers.js";


router.get("/", getAllProducts);

router.get("/:id",validateId ,getProductById);

router.post("/", insertProduct);

router.put("/",updateProduct);

router.delete("/:id",validateId ,deleteProduct);

export default router;