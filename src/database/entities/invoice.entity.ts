import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Policy } from './policy.entity';
import { BaseEntityWithSoftDelete } from './entity';

@Entity('invoices')
export class Invoice extends BaseEntityWithSoftDelete {
  @Column()
  invoiceNumber: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amountDue: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  amountPaid: number;

  @Column('date')
  dueDate: Date;

  @Column('date', { nullable: true })
  paidDate: Date;

  @Column({ default: false })
  isPaid: boolean;

  @Column({ type: 'varchar', length: 50, default: 'PENDING' })
  status: string;

  @Column({ type: 'uuid' })
  policyId: string;

  @ManyToOne(() => Policy, (policy) => policy.invoices)
  @JoinColumn({ name: 'policyId' })
  policy: Policy | null;
}
