import { Request, Response, NextFunction } from "express"
import { DatabaseConnectionError } from "../errors/database-connection-err"
import { RequestValidatonError } from '../errors/request-validation-err'

export const errorHandle = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof RequestValidatonError) {
        console.log("Handling this error as a request validation error")
    }

    if (err instanceof DatabaseConnectionError) {
        console.log("Handling this error as a db connection error")
    }

    res.status(400).send({
        message: err.message
    })
}