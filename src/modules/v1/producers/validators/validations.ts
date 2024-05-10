import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isCPF, isCNPJ } from 'brazilian-values';

@ValidatorConstraint({ name: 'isCNPJorCPF', async: false })
export class IsCNPJorCPF implements ValidatorConstraintInterface {
  validate(document: string, args: ValidationArguments) {
    const documentType = args.object['documentType'];
    if (documentType === 'cpf') {
      return isCPF(document);
    }
    return isCNPJ(document);
  }

  defaultMessage(args: ValidationArguments) {
    const documentType = args.object['documentType'];
    if (documentType === 'cpf') {
      return `Invalid CPF: '${args.value}'. Please provide a valid CPF.`;
    } else if (documentType === 'cnpj') {
      return `Invalid CNPJ: '${args.value}'. Please provide a valid CNPJ.`;
    } else {
      return `Invalid document: '${args.value}'. Please provide a valid Brazilian Document ID (e.g., CPF or CNPJ).`;
    }
  }
}
