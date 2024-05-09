import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isValidState', async: false })
export class IsValidState implements ValidatorConstraintInterface {
  validate(state: string) {
    const validStates = [
      'AC',
      'AL',
      'AP',
      'AM',
      'BA',
      'CE',
      'DF',
      'ES',
      'GO',
      'MA',
      'MT',
      'MS',
      'MG',
      'PA',
      'PB',
      'PR',
      'PE',
      'PI',
      'RJ',
      'RN',
      'RS',
      'RO',
      'RR',
      'SC',
      'SP',
      'SE',
      'TO',
    ];
    return validStates.includes(state.toUpperCase());
  }

  defaultMessage(args: ValidationArguments) {
    return `The state '${args.value}' is not a valid Brazilian state abbreviation (e.g., AC, SP, RJ).`;
  }
}
