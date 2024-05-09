import { isCPF, isCNPJ } from 'brazilian-values';

export class IsCNPJorCPF {
  validate(document: string, args: any) {
    const documentType = args.object.documentType;
    switch (documentType) {
      case 'cpf':
        return isCPF(document);
      case 'cnpj':
        return isCNPJ(document);
      default:
        return false;
    }
  }

  defaultMessage() {
    return 'Invalid document. Please provide a valid Brazilian Document ID (e.g., CPF or CNPJ).';
  }
}
