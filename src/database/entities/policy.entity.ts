import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntityWithSoftDelete } from './entity';
import { Invoice } from './invoice.entity';

@Entity()
export class Policy extends BaseEntityWithSoftDelete {
  @Column()
  vehicleModel: string;

  @Column()
  vehicleYear: number;

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

  @Column('date')
  startDate: Date;

  @Column('date')
  endDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'enum',
    enum: ['MONTHLY', 'QUARTERLY', 'SEMI_ANNUAL', 'ANNUAL'],
    default: 'MONTHLY',
  })
  paymentFrequency: string;

  @OneToMany(() => Invoice, (invoice) => invoice.policy)
  invoices: Invoice[];
}
