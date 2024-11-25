import { Injectable } from '@nestjs/common';
import { EmailService } from '../email.service';

@Injectable()
export class PolicyEmailHandler {
  constructor(private readonly emailService: EmailService) {}

  async sendPolicyCreatedEmail(userEmail: string, policyDetails: any) {
    await this.emailService.sendPolicyCreatedEmail(userEmail, policyDetails);
  }

  async sendPolicyApprovedEmail(userEmail: string, policyDetails: any) {
    await this.emailService.sendPolicyApprovedEmail(userEmail, policyDetails);
  }

  async sendPolicyRejectedEmail(userEmail: string, policyDetails: any) {
    await this.emailService.sendPolicyRejectedEmail(userEmail, policyDetails);
  }

  async sendPolicyCanceledEmail(userEmail: string, policyDetails: any) {
    await this.emailService.sendPolicyCanceledEmail(userEmail, policyDetails);
  }
}
