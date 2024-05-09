import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProductions1715282046960 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(
        `CREATE TABLE IF NOT EXISTS "public"."productions" (
            "id" SERIAL PRIMARY KEY,
            "plantation_id" int4,
            "producer_id" int4,
            "farm_id" int4,
            "created_at" timestamp(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
            "updated_at" timestamp(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
            FOREIGN KEY ("producer_id") REFERENCES "public"."producers" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
            FOREIGN KEY ("farm_id") REFERENCES "public"."farms" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
            FOREIGN KEY ("plantation_id") REFERENCES "public"."plantations" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        );`,
      );
      await queryRunner.commitTransaction();
      console.log('Productions table created successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Failed to create Productions table:', error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(`DROP TABLE IF EXISTS "public"."productions";`);
      await queryRunner.commitTransaction();
      console.log('Productions table dropped successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Failed to drop Productions table:', error);
      throw error;
    }
  }
}
