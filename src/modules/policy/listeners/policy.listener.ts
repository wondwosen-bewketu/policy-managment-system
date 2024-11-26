import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PolicyEmailHandler } from './policy-email-handler.service';
import { PolicyEvents } from '../events/policy.events';
import { PolicyEventPayload } from '../../../shared/types';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Policy } from 'src/database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class PolicyListener {
  constructor(
    private readonly policyEmailHandler: PolicyEmailHandler,
    @InjectQueue('invoiceQueue') private readonly invoiceQueue: Queue,
    @InjectRepository(Policy)
    private readonly policyRepository: Repository<Policy>,
  ) {}

  @OnEvent(PolicyEvents.CREATED)
  async handlePolicyCreatedEvent(payload: PolicyEventPayload) {
    await this.policyEmailHandler.sendPolicyCreatedEmail(
      payload.userEmail,
      payload,
    );
  }

  @OnEvent(PolicyEvents.APPROVED)
  async handlePolicyApprovedEvent(updatedPolicy: Policy) {
    console.log(
      `Policy Approved: ${updatedPolicy.policyNumber}. Adding invoice generation job to the queue.`,
    );

    // Check if policy exists
    const completePolicy = await this.policyRepository.findOne({
      where: { id: updatedPolicy.id },
    });

    if (!completePolicy) {
      console.error(`Policy with ID ${updatedPolicy.id} not found.`);
      return;
    }

    await this.policyEmailHandler.sendPolicyApprovedEmail(
      completePolicy.userEmail,
      completePolicy,
    );

    console.log('Adding job to invoiceQueue...');
    await this.invoiceQueue.add('generate-invoice', completePolicy, {
      attempts: 3,
      backoff: 5000,
    });
    console.log('Job successfully added to the queue.');
  }
  @OnEvent(PolicyEvents.REJECTED)
  async handlePolicyRejectedEvent(payload: PolicyEventPayload) {
    await this.policyEmailHandler.sendPolicyRejectedEmail(
      payload.userEmail,
      payload,
    );
  }

  @OnEvent(PolicyEvents.CANCELED)
  async handlePolicyCancelledEvent(payload: PolicyEventPayload) {
    await this.policyEmailHandler.sendPolicyCanceledEmail(
      payload.userEmail,
      payload,
    );
  }
}
