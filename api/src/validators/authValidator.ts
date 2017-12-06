import { Request } from 'express';
import { BaseValidator } from './baseValidator';

export class AuthValidator extends BaseValidator {
    public static validateLogin(req: Request) {

        let schema: ExpressValidator.ValidationSchema = {
            'userName': {
                in: 'body',
                notEmpty: {
                    errorMessage: 'No user name supplied'
                },
                hasNoSpaces: {
                    errorMessage: 'User name cannot contain spaces'
                }
            },
            'password': {
                in: 'body',
                notEmpty: {
                    errorMessage: 'No password supplied'
                },
                hasNoSpaces: {
                    errorMessage: 'Password cannot contain spaces'
                }
            }
        };

        return this.validate(req, schema);
    }

    public static validateSignup(req: Request) {
        let schema: ExpressValidator.ValidationSchema = {
            'userName': {
                in: 'body',
                notEmpty: {
                    errorMessage: 'No user name supplied'
                },
                hasNoSpaces: {
                    errorMessage: 'User name cannot contain spaces'
                }
            },
            'password': {
                in: 'body',
                notEmpty: {
                    errorMessage: 'No password supplied'
                },
                hasNoSpaces: {
                    errorMessage: 'Password cannot contain spaces'
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