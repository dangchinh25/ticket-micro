import { ValidationError } from "express-validator"

export class RequestValidatonError extends Error {
    statusCode = 400

    constructor(public errors: ValidationError[]) {
        super()
        //Only becasue we are extending a built in class
        Object.setPrototypeOf(this, RequestValidatonError.prototype)
    }

    serializeError() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param }
        })
    }
}