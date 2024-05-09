import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableFarms1715281440086 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(
        `CREATE TABLE IF NOT EXISTS "public"."farms" (
            "id" SERIAL PRIMARY KEY,
            "name" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
            "city" varchar(128) COLLATE "pg_catalog"."default" NOT NULL,
            "state" varchar(2) COLLATE "pg_catalog"."default" NOT NULL,
            "agricultural_area" int4 NOT NULL,
            "vegetation_area" int4 NOT NULL,
            "total_area" int4,
            "producer_id" int4,
            "created_at" timestamp(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
            "updated_at" timestamp(6) NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone,
            UNIQUE ("name"),
            FOREIGN KEY ("producer_id") REFERENCES "public"."producers" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        );`,
      );
      await queryRunner.commitTransaction();
      console.log('Farms table created successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Failed to create Farms table:', error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(`DROP TABLE IF EXISTS "public"."farms";`);
      await queryRunner.commitTransaction();
      console.log('Farms table dropped successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Failed to drop Farms table:', error);
      throw error;
    }
  }
}
