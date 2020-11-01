import { Request, Response, NextFunction } from "express"
import { DatabaseConnectionError } from "../errors/database-connection-err"
import { RequestValidatonError } from '../errors/request-validation-err'

export const errorHandle = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof RequestValidatonError) {

        return res.status(err.statusCode).send({ errors: err.serializeError() })
    }

    if (err instanceof DatabaseConnectionError) {
        return res.status(err.statusCode).send({ errors: err.serializeError() })
    }

    res.status(400).send({
        errors: [{ message: "Something went wrong" }]
    })
}