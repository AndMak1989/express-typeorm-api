import {CreateProducts1607437608841} from "@shared/typeorm/migrations/1607437608841-CreateProducts";
import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateExtentions1607437600000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('')
  }
}
