// src/policy/services/policy.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from '../../../database/entities';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  PaginationDto,
  createPaginationResponse,
  PaginationResponse,
} from '../../../shared/pagination';
import {
  PolicyRequestDto,
  UpdatePolicyDto,
  PolicyRejectRequestDto,
  PolicyCancelRequestDto,
} from '../dtos';
import { generateRandomString } from '../../../shared/helper';
import { PolicyEvents } from '../events/policy.events';
import { addDays } from 'date-fns';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private readonly policyRepository: Repository<Policy>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(dto: PolicyRequestDto): Promise<Policy> {
    const newPolicy = this.policyRepository.create(dto);
    newPolicy.policyNumber = 'POLICY-' + generateRandomString(12);
    const policy = await this.policyRepository.save(newPolicy);

    this.eventEmitter.emit(PolicyEvents.CREATED, policy);

    return policy;
  }

  async approve(id: string): Promise<Policy> {
    const policy = await this.findOne(id);

    const updatedPolicy = await this.policyRepository.save({
      ...policy,
      isActive: true,
      approvedAt: new Date(),
    });

    this.eventEmitter.emit(PolicyEvents.APPROVED, updatedPolicy);

    return updatedPolicy;
  }
  async reject(
    id: string,
    { rejectedReason }: PolicyRejectRequestDto,
  ): Promise<Policy> {
    const policy = await this.findOne(id);
    const updatedPolicy = await this.policyRepository.save({
      ...policy,
      rejectedAt: new Date(),
      rejectedReason,
      isActive: false,
    });
    this.eventEmitter.emit(PolicyEvents.REJECTED, updatedPolicy);
    return updatedPolicy;
  }

  async cancel(
    id: string,
    { cancledReason }: PolicyCancelRequestDto,
  ): Promise<Policy> {
    const policy = await this.findOne(id);
    const updatedPolicy = await this.policyRepository.save({
      ...policy,
      cancledAt: new Date(),
      cancledReason,
      isActive: false,
    });
    this.eventEmitter.emit(PolicyEvents.CANCELED, updatedPolicy);
    return updatedPolicy;
  }

  async remove(id: string): Promise<void> {
    const policy = await this.findOne(id);
    await this.policyRepository.softRemove(policy);
  }

  async findOne(id: string): Promise<Policy> {
    const policy = await this.policyRepository.findOneBy({ id });
    if (!policy) throw new NotFoundException(`Policy with ID ${id} not found`);
    return policy;
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<Policy>> {
    const { skip, limit } = paginationDto;
    const [data, total] = await this.policyRepository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return createPaginationResponse(
      data,
      total,
      paginationDto.page,
      paginationDto.limit,
    );
  }

  async update(id: string, dto: UpdatePolicyDto): Promise<Policy> {
    const policy = await this.findOne(id);
    const updatedPolicy = await this.policyRepository.save({
      ...policy,
      ...dto,
    });
    this.eventEmitter.emit(PolicyEvents.APPROVED, updatedPolicy);
    return updatedPolicy;
  }

  async getPoliciesToGenerateInvoice(): Promise<Policy[]> {
    const today = new Date();
    const threeDaysFromNow = addDays(today, 3);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    return this.policyRepository
      .createQueryBuilder('policy')
      .where('policy.isActive = :isActive', { isActive: true })
      .andWhere('policy.dueDate <= :threeDaysFromNow', { threeDaysFromNow })
      .andWhere('policy.lastPaymentDate < :startOfMonth', { startOfMonth })
      .getMany();
  }

  // async getPoliciesToCancel(): Promise<Policy[]> {
  //   const today = new Date();
  //   const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  //   const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  //   return this.policyRepository
  //     .createQueryBuilder('policy')
  //     .where('policy.isActive = :isActive', { isActive: true })
  //     .andWhere('policy.lastPaymentDate <= :startOfDay', { startOfDay })
  //     .andWhere('DATE(policy.lastPaymentDate) != DATE(:endOfDay)', { endOfDay })
  //     .getMany();
  // }
}
