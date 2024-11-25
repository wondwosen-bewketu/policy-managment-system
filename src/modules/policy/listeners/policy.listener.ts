import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PolicyEmailHandler } from './policy-email-handler.service';
import { PolicyEvents } from '../events/policy.events';
import { PolicyEventPayload } from '../../../shared/types';

@Injectable()
export class PolicyListener {
  constructor(private readonly policyEmailHandler: PolicyEmailHandler) {}

  @OnEvent(PolicyEvents.CREATED)
  async handlePolicyCreatedEvent(payload: PolicyEventPayload) {
    await this.policyEmailHandler.sendPolicyCreatedEmail(
      payload.userEmail,
      payload,
    );
  }

  @OnEvent(PolicyEvents.APPROVED)
  async handlePolicyApprovedEvent(payload: PolicyEventPayload) {
    await this.policyEmailHandler.sendPolicyApprovedEmail(
      payload.userEmail,
      payload,
    );
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
