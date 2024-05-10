import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidTotalArea', async: false })
export class IsValidTotalArea implements ValidatorConstraintInterface {
  validate(totalArea: number, args: ValidationArguments) {
    const vegetationArea = args.object['vegetationArea'];
    const agriculturalArea = args.object['agriculturalArea'];

    if (vegetationArea + agriculturalArea > totalArea) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const sum = args.object['vegetationArea'] + args.object['agriculturalArea'];
    return `The result of the sum of vegetation and agricultural areas - '${sum}' - must not be greater than the total area - '${args.value}'.`;
  }
}
