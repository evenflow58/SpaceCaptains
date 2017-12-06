import { Request } from 'express';

export class BaseValidator {
    public static validate(req: Request, schema: ExpressValidator.ValidationSchema): Promise<any> {
        req.check(schema);

        return req.getValidationResult()
            .then((result) => {
                result.throw();
                return;
            });
    }
}