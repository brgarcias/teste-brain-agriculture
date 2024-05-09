import { SetMetadata } from '@nestjs/common';

export enum DocumentsEnum {
  CPF = 'cpf',
  CNPJ = 'cnpj',
}

export const DocumentsType = (...documentType: DocumentsEnum[]) =>
  SetMetadata('documentType', documentType);
