import connection from "../database/db.js"
import { Router } from "express";
const router = Router();

import { validateId } from "../middlewares/middlewares.js";

import { deleteProduct, getAllProducts,
        getProductById, insertProduct, 
        updateProduct } from "../controlers/productos.controlers.js";

import { multerUploader } from "../middlewares/multer-middlewares.js";


router.get("/", getAllProducts);

router.get("/:id",validateId ,getProductById);

router.post("/", insertProduct);

router.put("/",updateProduct);

router.delete("/:id",validateId ,deleteProduct);

router.post("/upload", multerUploader.single("image"), (req,res) => {
        try{
                console.log("Imagen subida correctamente")
                console.log(req.file);
        }catch(err){
                console.error("ERROR: " + err)
        }
})

export default router;