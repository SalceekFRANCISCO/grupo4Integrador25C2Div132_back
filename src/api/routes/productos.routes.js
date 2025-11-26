import connection from "../database/db.js"
import { Router } from "express";
const router = Router();

// me falta importar el middleware

import { deleteProduct, getAllProducts,
        getProductById, insertProduct, 
        updateProduct } from "../controlers/productos.controlers.js";


router.get("/", getAllProducts);

router.get("/:id","aca va el validateId" ,getProductById);

router.post("/", insertProduct);

router.put("/",updateProduct);

router.delete("/:id","aca va el validateId" ,deleteProduct);

export default router;