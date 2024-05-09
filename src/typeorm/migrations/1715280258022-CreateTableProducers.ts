import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProducers1715280258022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(
        `CREATE TABLE IF NOT EXISTS "public"."producers" (
            "id" SERIAL PRIMARY KEY,
            "name" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
            "document" varchar(32) COLLATE "pg_catalog"."default" NOT NULL,
            "document_type" "public"."producers_document_type_enum" NOT NULL DEFAULT 'cpf'::producers_document_type_enum,
            "created_at" timestamp(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
            "updated_at" timestamp(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
            UNIQUE ("document")
          );`,
      );
      await queryRunner.commitTransaction();
      console.log('Producers table created successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Failed to create Producer table:', error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(`DROP TABLE IF EXISTS "public"."producers";`);
      await queryRunner.commitTransaction();
      console.log('Producers table dropped successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Failed to drop Producers table:', error);
      throw error;
    }
  }
}
