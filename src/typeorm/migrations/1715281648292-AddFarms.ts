import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFarms1715281648292 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const producersDocuments = [
      '90497249065',
      '29583588016',
      '92003718000150',
      '96775528000101',
      '29436636032',
    ];
    const farmsData = [
      {
        name: 'Fazenda Feliz',
        city: 'São Paulo',
        state: 'SP',
        agricultural_area: 4,
        vegetation_area: 3,
        total_area: 7,
      },
      {
        name: 'Fazenda Carioca',
        city: 'Rio de Janeiro',
        state: 'RJ',
        agricultural_area: 8,
        vegetation_area: 5,
        total_area: 13,
      },
      {
        name: 'Salvador Fazenda',
        city: 'Salvador',
        state: 'BA',
        agricultural_area: 9,
        vegetation_area: 3,
        total_area: 12,
      },
      {
        name: 'Horizonte',
        city: 'Belo Horizonte',
        state: 'MG',
        agricultural_area: 7,
        vegetation_area: 10,
        total_area: 17,
      },
      {
        name: 'Alegria',
        city: 'Porto Alegre',
        state: 'RS',
        agricultural_area: 2,
        vegetation_area: 1,
        total_area: 3,
      },
    ];
    await queryRunner.startTransaction();
    try {
      const producers = await queryRunner.query(
        `SELECT id FROM producers WHERE document IN ($1, $2, $3, $4, $5)`,
        producersDocuments,
      );

      for (let i = 0; i < farmsData.length; i++) {
        await queryRunner.query(
          `INSERT INTO farms ("name", "city", "state", "agricultural_area", "vegetation_area", "total_area", "producer_id") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            farmsData[i].name,
            farmsData[i].city,
            farmsData[i].state,
            farmsData[i].agricultural_area,
            farmsData[i].vegetation_area,
            farmsData[i].total_area,
            producers[i].id,
          ],
        );
      }
      await queryRunner.commitTransaction();
      console.log('Farms inserted successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Failed to insert farms:', error);
      throw error;
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const farmNames = [
      'Fazenda Feliz',
      'Fazenda Carioca',
      'Salvador Fazenda',
      'Horizonte',
      'Alegria',
    ];
    await queryRunner.startTransaction();
    try {
      await queryRunner.query(
        `DELETE FROM farms WHERE name IN ($1, $2, $3, $4, $5)`,
        farmNames,
      );
      await queryRunner.commitTransaction();
      console.log('Farms deleted successfully.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Failed to delete farms:', error);
      throw error;
    }
  }
}
