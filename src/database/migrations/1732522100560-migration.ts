import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1732522100560 implements MigrationInterface {
  name = 'Migration1732522100560';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "invoices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "invoiceNumber" character varying NOT NULL, "amountDue" numeric(10,2) NOT NULL, "amountPaid" numeric(10,2), "dueDate" date NOT NULL, "paidDate" date, "isPaid" boolean NOT NULL DEFAULT false, "status" character varying(50) NOT NULL DEFAULT 'PENDING', "policyId" uuid NOT NULL, CONSTRAINT "PK_668cef7c22a427fd822cc1be3ce" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."policies_paymentfrequency_enum" AS ENUM('MONTHLY', 'QUARTERLY', 'SEMI_ANNUAL', 'ANNUAL')`,
    );
    await queryRunner.query(
      `CREATE TABLE "policies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP WITH TIME ZONE, "userEmail" character varying(255) NOT NULL, "userName" character varying(100) NOT NULL, "vehicleModel" character varying(64) NOT NULL, "vehiclePlateNumber" character varying NOT NULL, "policyNumber" character varying NOT NULL, "coverageAmount" numeric(10,2) NOT NULL, "premiumAmount" numeric(10,2) NOT NULL, "deductibleAmount" numeric(10,2) NOT NULL, "startDate" TIMESTAMP WITH TIME ZONE NOT NULL, "endDate" TIMESTAMP WITH TIME ZONE NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "rejectedAt" TIMESTAMP WITH TIME ZONE, "rejectedReason" character varying(2400), "cancledAt" TIMESTAMP WITH TIME ZONE, "cancledReason" character varying(2400), "paymentFrequency" "public"."policies_paymentfrequency_enum" NOT NULL DEFAULT 'MONTHLY', CONSTRAINT "PK_603e09f183df0108d8695c57e28" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoices" ADD CONSTRAINT "FK_91161bc3e2586990c6dd9e1615d" FOREIGN KEY ("policyId") REFERENCES "policies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invoices" DROP CONSTRAINT "FK_91161bc3e2586990c6dd9e1615d"`,
    );
    await queryRunner.query(`DROP TABLE "policies"`);
    await queryRunner.query(
      `DROP TYPE "public"."policies_paymentfrequency_enum"`,
    );
    await queryRunner.query(`DROP TABLE "invoices"`);
  }
}
