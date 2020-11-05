import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

import { RequestValidatonError } from '../errors/request-validation-err'
import { BadRequestError } from '../errors/bad-request-error'

const router = express.Router()

router.post(
	'/api/users/signin',
	[
		body('email').isEmail().withMessage('Email must be valid'),
		body('password')
			.trim()
			.notEmpty()
			.withMessage('You must supply a password'),
	],
	(req: Request, res: Response) => {
		const errors = validationResult(req)

		if (!errors.isEmpty()) {
			throw new RequestValidatonError(errors.array())
		}
	}
)

export { router as signinRouter }
