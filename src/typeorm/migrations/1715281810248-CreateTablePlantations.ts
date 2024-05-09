import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePlantations1715281810248 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(
        `CREATE TABLE IF NOT EXISTS "public"."plantations" (
            "id" SERIAL PRIMARY KEY,
            "name" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
            "created_at" timestamp(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
            "updated_at" timestamp(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone
        );`,
      );
      await queryRunner.commitTransaction();
      console.log('Plantations table created successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Failed to create Plantations table:', error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(`DROP TABLE IF EXISTS "public"."plantations";`);
      await queryRunner.commitTransaction();
      console.log('Plantations table dropped successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Failed to drop Plantations table:', error);
      throw error;
    }
  }
}
