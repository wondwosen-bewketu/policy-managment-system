import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}

export class BaseEntityWithTimestamp extends BaseEntity {
  @CreateDateColumn({
    type: 'timestamptz',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  updatedAt!: Date;
}

export class BaseEntityWithSoftDelete extends BaseEntityWithTimestamp {
  @DeleteDateColumn({
    type: 'timestamptz',
  })
  deletedAt?: Date | null;
}
