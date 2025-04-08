import {Request,Response,NextFunction} from 'express'


export function loggerMiddleware(request:Request,response:Response,next:NextFunction){


    console.log(`[${request.method}] ${request.originalUrl}`);

    if(Object.keys(request.query).length){
        console.log("Query: ", request.query);
    }

    if(Object.keys(request.body).length){
        console.log("Body: ", request.body);
    }

    next();
}