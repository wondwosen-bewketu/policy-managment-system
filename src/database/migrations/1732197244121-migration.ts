import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1732197244121 implements MigrationInterface {
  name = 'Migration1732197244121';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_91161bc3e2586990c6dd9e1615d"`,
    );
    await queryRunner.query(`ALTER TABLE "invoices" DROP COLUMN "policyId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "invoices" ADD "policyId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_91161bc3e2586990c6dd9e1615d" FOREIGN KEY ("policyId") REFERENCES "policies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
