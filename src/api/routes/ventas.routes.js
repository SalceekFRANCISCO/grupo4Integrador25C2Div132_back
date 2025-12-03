import { Router } from "express";
import { getVentas, getVentaById, createVenta, deleteVenta, updateVenta } from "../controlers/ventas.controlers.js";
import { validateId } from "../middlewares/middlewares.js";

const router = Router();

router.get("/", getVentas);

router.get("/:id", validateId, getVentaById);

router.post("/", createVenta);

router.put("/", updateVenta);

router.delete("/:id", deleteVenta);



export default router;