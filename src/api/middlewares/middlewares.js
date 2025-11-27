
export const loggerUrl = (request, response, next) => {
    console.log(`[${new Date().toLocaleString()}] ${request.method} ${request.url}`);
    next();
}

export const validateId = (request, response, next) => {
    let {id} = request.params;

    if(!id || isNaN(id)){
        response.status(400).json({
            message: "Id invalido"
        });
    }

    request.id = parseInt(id, 10);
    next();
}