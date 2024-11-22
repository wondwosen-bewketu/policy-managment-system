import { Injectable } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PolicyEvents } from '../events/policy.events';
import { EmailService } from '../../../shared/email';
import {
  PolicyCreatedEvent,
  PolicyApprovalEvent,
  PolicyRejectionEvent,
  PolicyCancellationEvent,
  PolicyUpdateEvent,
} from '../events/policy.events';

@Injectable()
export class PolicyListener {
  constructor(private readonly emailService: EmailService) {}

  // Listener for policy creation
  @EventPattern(PolicyEvents.CREATED)
  async handlePolicyCreated(
    @Payload() data: PolicyCreatedEvent,
  ): Promise<void> {
    console.log('Policy Created:', data);
    await this.sendCreationEmail(data);
  }

  // Listener for policy approval
  @EventPattern(PolicyEvents.APPROVED)
  async handlePolicyApproved(
    @Payload() data: PolicyApprovalEvent,
  ): Promise<void> {
    console.log('Policy Approved:', data);
    await this.sendApprovalEmail(data);
  }

  // Listener for policy rejection
  @EventPattern(PolicyEvents.REJECTED)
  async handlePolicyRejected(
    @Payload() data: PolicyRejectionEvent,
  ): Promise<void> {
    console.log('Policy Rejected:', data);
    await this.sendRejectionEmail(data);
  }

  // Listener for policy cancellation
  @EventPattern(PolicyEvents.CANCELED)
  async handlePolicyCanceled(
    @Payload() data: PolicyCancellationEvent,
  ): Promise<void> {
    console.log('Policy Canceled:', data);
    await this.sendCancellationEmail(data);
  }

  // Listener for policy update
  @EventPattern(PolicyEvents.UPDATED)
  async handlePolicyUpdated(@Payload() data: PolicyUpdateEvent): Promise<void> {
    console.log('Policy Updated:', data);
    await this.sendUpdateNotificationEmail(data);
  }

  // Helper method to send creation email
  private async sendCreationEmail(data: PolicyCreatedEvent): Promise<void> {
    try {
      const { email, policyNumber } = data;
      const subject = `Your Policy ${policyNumber} has been Created!`;
      const message = `Dear Customer, your policy with number ${policyNumber} has been successfully created.`;

      await this.emailService.send({
        to: email,
        subject,
        text: message,
      });
      console.log(`Creation email sent to: ${email}`);
    } catch (error) {
      console.error('Failed to send creation email:', error.message);
    }
  }

  // Helper method to send approval email
  private async sendApprovalEmail(data: PolicyApprovalEvent): Promise<void> {
    try {
      const { email, policyNumber } = data;
      const subject = `Your Policy ${policyNumber} has been Approved!`;
      const message = `Dear Customer, your policy with number ${policyNumber} has been approved.`;

      await this.emailService.send({
        to: email,
        subject,
        text: message,
      });
      console.log(`Approval email sent to: ${email}`);
    } catch (error) {
      console.error('Failed to send approval email:', error.message);
    }
  }

  // Helper method to send rejection email
  private async sendRejectionEmail(data: PolicyRejectionEvent): Promise<void> {
    try {
      const { email, policyNumber, rejectedReason } = data;
      const subject = `Your Policy ${policyNumber} has been Rejected`;
      const message = `Dear Customer, your policy with number ${policyNumber} has been rejected due to the following reason: ${rejectedReason}`;

      await this.emailService.send({
        to: email,
        subject,
        text: message,
      });
      console.log(`Rejection email sent to: ${email}`);
    } catch (error) {
      console.error('Failed to send rejection email:', error.message);
    }
  }

  // Helper method to send cancellation email
  private async sendCancellationEmail(
    data: PolicyCancellationEvent,
  ): Promise<void> {
    try {
      const { email, policyNumber, cancledReason } = data;
      const subject = `Your Policy ${policyNumber} has been Canceled`;
      const message = `Dear Customer, your policy with number ${policyNumber} has been canceled due to the following reason: ${cancledReason}`;

      await this.emailService.send({
        to: email,
        subject,
        text: message,
      });
      console.log(`Cancellation email sent to: ${email}`);
    } catch (error) {
      console.error('Failed to send cancellation email:', error.message);
    }
  }

  // Helper method to send update notification email
  private async sendUpdateNotificationEmail(
    data: PolicyUpdateEvent,
  ): Promise<void> {
    try {
      const { email, policyNumber } = data;
      const subject = `Your Policy ${policyNumber} has been Updated`;
      const message = `Dear Customer, your policy with number ${policyNumber} has been updated.`;

      await this.emailService.send({
        to: email,
        subject,
        text: message,
      });
      console.log(`Update notification email sent to: ${email}`);
    } catch (error) {
      console.error('Failed to send update notification email:', error.message);
    }
  }
}
