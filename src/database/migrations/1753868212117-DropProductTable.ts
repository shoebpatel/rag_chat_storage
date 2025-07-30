import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropProductTable1722337600000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "product"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      CREATE TABLE "product" (
        "id" SERIAL PRIMARY KEY,
        "title" character varying NOT NULL
      )
    `);
    }
}
