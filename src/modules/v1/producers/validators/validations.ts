import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isCPFOrCNPJ } from 'brazilian-values';

@ValidatorConstraint({ name: 'isCNPJorCPF', async: false })
export class IsCNPJorCPF implements ValidatorConstraintInterface {
  validate(document: string) {
    return isCPFOrCNPJ(document);
  }

  defaultMessage(args: ValidationArguments) {
    return `Invalid document: '${args.value}'. Please provide a valid Brazilian Document ID (e.g., CPF or CNPJ).`;
  }
}
