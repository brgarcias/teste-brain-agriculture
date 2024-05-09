import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPlantations1715281870938 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(
        `INSERT INTO plantations ("name") VALUES ($1), ($2), ($3), ($4), ($5)`,
        ['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açucar'],
      );
      await queryRunner.commitTransaction();
      console.log('Plantations inserted successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Failed to insert plantations:', error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(
        `DELETE FROM plantations WHERE name IN ($1, $2, $3, $4, $5)`,
        ['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açucar'],
      );
      await queryRunner.commitTransaction();
      console.log('Plantations deleted successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Failed to delete plantations:', error);
      throw error;
    }
  }
}
