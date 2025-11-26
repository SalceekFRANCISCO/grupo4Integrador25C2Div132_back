import { request, response } from "express"
import connection from "../database/db.js"


export const loggerUrl = (request, response, next) => {
    console.log(`[${new Date().toLocaleString()}] ${request.method} ${request.url}`);
    next();
}

// arreglar esto que esta mal
export const validateId = (request, response, next) => {
    // console.log(`[${new Date().toLocaleString()}] ${request.method} ${request.url}`);
    next();
}






// escribir codigo, esta en papel