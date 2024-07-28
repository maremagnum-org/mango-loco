import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: false })
export class IsEqualValueValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints;
    const relatedObject = args.object as Record<string, any>;
    if (relatedObject.hasOwnProperty(relatedPropertyName)) {
      const relatedValue = relatedObject[relatedPropertyName];
      return value === relatedValue;
    }
    throw new Error(
      `La propiedad relacionada '${relatedPropertyName}' no existe en el objeto.`
    );
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `El valor de '${args.property}' no coincide con '${relatedPropertyName}'.`;
  }
}

/**
 * @IsEqual decorador de validación personalizado. Comprueba si el valor de la propiedad decorada es igual al valor de otra propiedad.
 * @ref hace referencia a la propiedad con la que se debe comparar el valor.
 * @validationOptions son las opciones de validación opcionales.
 */
export function IsEqual(ref: string, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [ref],
      validator: IsEqualValueValidator,
    });
  };
}
