import { Injectable } from '@nestjs/common';
import { EmailService } from '../../shared/email';
@Injectable()
export class PolicyEmailService {
  constructor(private readonly emailService: EmailService) {}

  async sendEmail(to: string, subject: string, message: string): Promise<void> {
    try {
      await this.emailService.send({
        to,
        subject,
        text: message,
      });
      console.log(`Email sent to: ${to}`);
    } catch (error) {
      console.error('Failed to send email:', error.message);
    }
  }
}
