import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductions1715265369021 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const producersDocuments = [
      '90497249065',
      '29583588016',
      '92003718000150',
      '96775528000101',
      '29436636032',
    ];
    const plantationsData = [
      'Soja',
      'Milho',
      'Algodão',
      'Café',
      'Cana de Açucar',
    ];
    await queryRunner.startTransaction();
    try {
      const producers = await queryRunner.query(
        `SELECT
            pr."id",
            fr."id" as farm_id
        FROM
            "producers" pr
            RIGHT JOIN farms fr ON pr."id" = fr.producer_id
        WHERE
            pr."document" IN ($1, $2, $3, $4, $5)
        ORDER BY
            pr."id" ASC`,
        producersDocuments,
      );

      const plantations = await queryRunner.query(
        `SELECT
            id
        FROM
            "plantations"
        WHERE
            name IN ($1, $2, $3, $4, $5)
        ORDER BY
            id ASC`,
        plantationsData,
      );
      for (let i = 0; i < producers.length; i++) {
        await queryRunner.query(
          `INSERT INTO productions ("producer_id", "farm_id", "plantation_id") VALUES ($1, $2, $3)`,
          [producers[i].id, producers[i].farm_id, plantations[i].id],
        );
      }
      await queryRunner.commitTransaction();
      console.log('Productions inserted successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Failed to insert productions:', error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const producersDocuments = [
      '90497249065',
      '29583588016',
      '92003718000150',
      '96775528000101',
      '29436636032',
    ];
    const plantationsData = [
      'Soja',
      'Milho',
      'Algodão',
      'Café',
      'Cana de Açucar',
    ];
    await queryRunner.startTransaction();
    try {
      const producers = await queryRunner.query(
        `SELECT
                pr."id",
                fr."id" as farm_id
            FROM
                "producers" pr
                RIGHT JOIN farms fr ON pr."id" = fr.producer_id
            WHERE
                pr."document" IN ($1, $2, $3, $4, $5)
            ORDER BY
                pr."id" ASC`,
        producersDocuments,
      );
      const plantations = await queryRunner.query(
        `SELECT
                id
            FROM
                "plantations"
            WHERE
                name IN ($1, $2, $3, $4, $5)
            ORDER BY
                id ASC`,
        plantationsData,
      );
      for (let i = 0; i < producers.length; i++) {
        await queryRunner.query(
          `DELETE FROM productions 
            WHERE producer_id = $1
                AND farm_id = $2
                AND plantation_id = $3`,
          [producers[i].id, producers[i].farm_id, plantations[i].id],
        );
      }

      await queryRunner.commitTransaction();
      console.log('Productions deleted successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Failed to delete productions:', error);
      throw error;
    }
  }
}
