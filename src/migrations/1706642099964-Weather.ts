import { MigrationInterface, QueryRunner } from "typeorm";

export class Weather1706642099964 implements MigrationInterface {
    name = 'Weather1706642099964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "weather" ("id" SERIAL NOT NULL, "coord" jsonb NOT NULL, "weather" jsonb NOT NULL, "base" character varying NOT NULL, "main" jsonb NOT NULL, "visibility" integer NOT NULL, "wind" jsonb NOT NULL, "clouds" jsonb NOT NULL, "dt" integer NOT NULL, "sys" jsonb NOT NULL, "timezone" integer NOT NULL, "record_id" integer NOT NULL, "name" character varying NOT NULL, "cod" integer NOT NULL, CONSTRAINT "PK_af9937471586e6798a5e4865f2d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "weather"`);
    }

}
