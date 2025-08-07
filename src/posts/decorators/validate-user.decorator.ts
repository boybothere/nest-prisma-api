import { registerDecorator, ValidationOptions } from 'class-validator';
import { UserIdExistsConstraint } from '../validators/validate-user.validator';


export function ValidateUserId(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: UserIdExistsConstraint,
        });
    };
}
