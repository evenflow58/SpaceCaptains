import { Request } from 'express';
import { BaseValidator } from './baseValidator';

export class AuthValidator extends BaseValidator {
    public static validateLogin(req: Request) {

        let schema: ExpressValidator.ValidationSchema = {
            'token': {
                in: 'body',
                notEmpty: {
                    errorMessage: 'Invalid token'
                },
                hasNoSpaces: {
                    errorMessage: 'Invalid token'
                }
            }
        };

        return this.validate(req, schema);
    }

    public static validateSignup(req: Request) {
        let schema: ExpressValidator.ValidationSchema = {
            'id': {
                in: 'body',
                notEmpty: {
                    errorMessage: 'No id provided'
                }
            },
            'firstName': {
                in: 'body',
                notEmpty: {
                    errorMessage: 'No first name supplied'
                }
            },
            'lastName': {
                in: 'body',
                notEmpty: {
                    errorMessage: 'No last name supplied'
                }
            },
            'email': {
                in: 'body',
                notEmpty: {
                    errorMessage: 'No email supplied'
                },
                isEmail: {
                    errorMessage: 'Incorrect email format'
                }
            }
        };

        return this.validate(req, schema);
    }
}