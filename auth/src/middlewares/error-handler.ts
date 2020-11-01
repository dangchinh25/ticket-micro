import { Request, Response, NextFunction } from "express"
import { DatabaseConnectionError } from "../errors/database-connection-err"
import { RequestValidatonError } from '../errors/request-validation-err'

export const errorHandle = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof RequestValidatonError) {
        const formattedErrors = err.errors.map(error => { return { message: error.msg, field: error.param } })

        return res.status(400).send({ errors: formattedErrors })
    }

    if (err instanceof DatabaseConnectionError) {
        return res.status(500).send({ errors: [{ message: err.reason }] })
    }

    res.status(400).send({
        errors: [{ message: "Something went wrong" }]
    })
}