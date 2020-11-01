import { ValidationError } from "express-validator"
import { CustomError } from "./custom-error"

export class RequestValidatonError extends CustomError {
    statusCode = 400

    constructor(public errors: ValidationError[]) {
        super("Invalid request parameter")
        //Only becasue we are extending a built in class
        Object.setPrototypeOf(this, RequestValidatonError.prototype)
    }

    serializeError() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.param }
        })
    }
}