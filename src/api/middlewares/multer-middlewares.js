import multer from "multer";
import {_dirname, join} from "../utils/index.js";
import path from "path";
import { randomUUID } from "crypto";

const storageConfig = multer.diskStorage(
    {destination: (req, file, callback) => {callback(null, join(_dirname, "src/public/img"))},
    filename:(req, file, callback) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const nombreFichero = randomUUID() + ext;
        callback(null, nombreFichero);
    }
});

const fileFilterConfig = (req, file, callback) => {
    const tiposPermitidos = ["image/png", "image/jpg", "image/jpeg"];
    const tipo = file.mimetype;
    if (tiposPermitidos.includes(tipo)) {
        callback(null, true);
    }
    else {
        callback(new Error("Tipo de archivo no permitido"));
    }
};

export const handleMulterError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(400).json({
            error: error.code,
            message: error.message
        })
    }
    if (error) {
        return res.status(400).json({
            error: error.message
        })
    }
    next();
}

export const multerUploader = multer({
    storage: storageConfig,
    limits: {fileSize: 5 * 1024 * 1024},
    fileFilter: fileFilterConfig
});
