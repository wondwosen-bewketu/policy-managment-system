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
  PolicyApproveRequestDto,
  PolicyRejectRequestDto,
  PolicyCancelRequestDto,
} from '../dtos';
import { generateRandomString } from '../../../shared/helper';
import { InvoiceService } from '../../invoice/services/invoice.service';
import { PolicyEvents } from '../events/policy.events';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private readonly policyRepository: Repository<Policy>,
    private readonly eventEmitter: EventEmitter2,
    private readonly invoiceService: InvoiceService,
  ) {}

  async create(dto: PolicyRequestDto): Promise<Policy> {
    const newPolicy = this.policyRepository.create(dto);
    newPolicy.policyNumber = 'POLICY-' + generateRandomString(12);
    const policy = await this.policyRepository.save(newPolicy);

    this.eventEmitter.emit(PolicyEvents.CREATED, policy);
    return policy;
  }

  async approve(
    id: string,
    { isActive }: PolicyApproveRequestDto,
  ): Promise<Policy> {
    const policy = await this.findOne(id);
    const updatedPolicy = await this.policyRepository.save({
      ...policy,
      isActive,
      approvedAt: new Date(),
    });

    // Emit 'policy.approved' event
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
    if (!policy) {
      throw new NotFoundException(`Policy with ID ${id} not found`);
    }
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

    this.eventEmitter.emit(PolicyEvents.UPDATED, updatedPolicy);
    return updatedPolicy;
  }
}
