import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersRefactor1708439553223 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "name" to "title"`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "title" to "name"`);
    }

}
