import { ValidationError } from "express-validator"

export class RequestValidatonError extends Error {
    constructor(public errors: ValidationError[]) {
        super()
        //Only becasue we are extending a built in class
        Object.setPrototypeOf(this, RequestValidatonError.prototype)
    }
}