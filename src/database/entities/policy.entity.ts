import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntityWithSoftDelete } from './entity';
import { PaymentFrequency } from '../../shared/enums';
import { Invoice } from './invoice.entity';

@Entity('policies')
export class Policy extends BaseEntityWithSoftDelete {
  @Column({ type: String, length: 255 })
  userEmail: string;

  @Column({ type: String, length: 100 })
  userName: string;

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

  @Column({ type: 'timestamptz', nullable: true })
  lastPaymentDate: Date | null;

  @Column({ type: 'timestamptz' })
  dueDate: Date;

  @Column({ type: 'boolean', default: false })
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
    enum: PaymentFrequency,
    default: PaymentFrequency.MONTHLY,
  })
  paymentFrequency: PaymentFrequency;

  @OneToMany(() => Invoice, (invoice) => invoice.policy)
  invoices: Invoice[];
}
