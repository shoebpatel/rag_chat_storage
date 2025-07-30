import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1753867850250 implements MigrationInterface {
    name = 'InitSchema1753867850250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_91b22fa0788f0912b1eceb25df8" PRIMARY KEY ("id", "title")`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_91b22fa0788f0912b1eceb25df8"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "title" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_91b22fa0788f0912b1eceb25df8" PRIMARY KEY ("id", "title")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_91b22fa0788f0912b1eceb25df8"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_91b22fa0788f0912b1eceb25df8" PRIMARY KEY ("id", "title")`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "PK_91b22fa0788f0912b1eceb25df8"`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`);
    }

}
