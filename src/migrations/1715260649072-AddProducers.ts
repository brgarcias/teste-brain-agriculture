import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProducers1715260649072 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(
        `INSERT INTO producers ("name", "document", "document_type") VALUES ($1, $2, $3), ($4, $5, $6), ($7, $8, $9), ($10, $11, $12), ($13, $14, $15)`,
        [
          'Bruno Garcia',
          '90497249065',
          'cpf',
          'Amanda Roque',
          '29583588016',
          'cpf',
          'Adriana Lopes',
          '92003718000150',
          'cnpj',
          'Beatriz Oliveira',
          '96775528000101',
          'cnpj',
          'Washington Silva',
          '29436636032',
          'cpf',
        ],
      );
      await queryRunner.commitTransaction();
      console.log('Producers inserted successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Failed to insert producers:', error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(
        `DELETE FROM producers WHERE document IN ($1, $2, $3, $4, $5)`,
        [
          '90497249065',
          '29583588016',
          '92003718000150',
          '96775528000101',
          '29436636032',
        ],
      );
      await queryRunner.commitTransaction();
      console.log('Producers deleted successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Failed to delete producers:', error);
      throw error;
    }
  }
}
