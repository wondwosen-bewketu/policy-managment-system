import { Entity, Column } from 'typeorm';
import { BaseEntityWithSoftDelete } from './entity';
// import { Invoice } from './invoice.entity';
import { PolicyPaymentFrequency } from '../../shared/enums';

@Entity('policies')
export class Policy extends BaseEntityWithSoftDelete {
  @Column({ type: String, length: 64 })
  vehicleModel: string;

  @Column()
  vehiclePlateNumber: string;

  @Column()
  policyNumber: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  coverageAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  premiumAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  deductibleAmount: number;

  @Column({ type: 'timestamptz' })
  startDate: Date;

  @Column({ type: 'timestamptz' })
  endDate: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'timestamptz', nullable: true })
  rejectedAt: Date;

  @Column({ type: String, length: 2400, nullable: true })
  rejectedReason: string;

  @Column({ type: 'timestamptz', nullable: true })
  cancledAt: Date;

  @Column({ type: String, length: 2400, nullable: true })
  cancledReason: string;

  @Column({
    type: 'enum',
    enum: PolicyPaymentFrequency,
    default: PolicyPaymentFrequency.MONTHLY,
  })
  paymentFrequency: PolicyPaymentFrequency;

  // @OneToMany(() => Invoice, (invoice) => invoice.policy)
  // invoices: Invoice[];
}
