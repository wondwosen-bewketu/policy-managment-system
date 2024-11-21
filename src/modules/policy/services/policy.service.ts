import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Policy } from '../../../database/entities';
import {
  PolicyRequestDto,
  UpdatePolicyDto,
  PolicyApproveRequestDto,
  PolicyRejectRequestDto,
  PolicyCancelRequestDto,
} from '../dtos';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy)
    private readonly policyRepository: Repository<Policy>,
  ) {}

  async createPolicy(dto: PolicyRequestDto): Promise<Policy> {
    return this.policyRepository.save(this.policyRepository.create(dto));
  }

  async findAllPolicies(): Promise<Policy[]> {
    return this.policyRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findPolicyById(id: string): Promise<Policy> {
    const policy = await this.policyRepository.findOneBy({ id });
    if (!policy) {
      throw new NotFoundException(`Policy with ID ${id} not found`);
    }
    return policy;
  }

  async updatePolicy(id: string, dto: UpdatePolicyDto): Promise<Policy> {
    const policy = await this.findPolicyById(id);

    return this.policyRepository.save({
      ...policy,
      ...dto,
    });
  }

  async approvePolicy(
    id: string,

    { isActive }: PolicyApproveRequestDto,
  ): Promise<Policy> {
    const policy = await this.findPolicyById(id);

    return this.policyRepository.save({
      ...policy,
      isActive,
      approvedAt: new Date(),
    });
  }

  async rejectPolicy(
    id: string,
    { rejectedReason }: PolicyRejectRequestDto,
  ): Promise<Policy> {
    const policy = await this.findPolicyById(id);

    return this.policyRepository.save({
      ...policy,
      rejectedAt: new Date(),
      rejectedReason,
      isActive: false,
    });
  }

  async cancelPolicy(
    id: string,
    { cancledReason }: PolicyCancelRequestDto,
  ): Promise<Policy> {
    const policy = await this.findPolicyById(id);

    return this.policyRepository.save({
      ...policy,
      cancledAt: new Date(),
      cancledReason,
      isActive: false,
    });
  }

  async deletePolicy(id: string): Promise<void> {
    const policy = await this.findPolicyById(id);
    await this.policyRepository.softRemove(policy);
  }
}
