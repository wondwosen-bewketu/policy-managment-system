import { Injectable } from '@nestjs/common';
import {
  createTransporter,
  createMailOptions,
  sendEmail,
} from '../../shared/email';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = createTransporter();
  }

  async sendPolicyCreatedEmail(
    policyEmail: string,
    policyDetails: any,
  ): Promise<void> {
    const {
      policyNumber,
      userName,
      coverageAmount,
      premiumAmount,
      startDate,
      endDate,
    } = policyDetails;

    const subject = `Your Policy ${policyNumber} has been created`;
    const text = `Dear ${userName},\n\nYour policy with number ${policyNumber} has been successfully created.\n\nCoverage Amount: ${coverageAmount}\nPremium Amount: ${premiumAmount}\nStart Date: ${startDate}\nEnd Date: ${endDate}\n\nThank you for choosing our service.`;

    const mailOptions = createMailOptions(policyEmail, subject, text);

    await sendEmail(this.transporter, mailOptions);
  }

  async sendPolicyApprovedEmail(
    policyEmail: string,
    policyDetails: any,
  ): Promise<void> {
    const {
      policyNumber,
      userName,
      coverageAmount,
      premiumAmount,
      invoiceNumber,
    } = policyDetails;

    const subject = `Your Policy ${policyNumber} has been approved`;

    const text = `Dear ${userName},\n\nYour policy with number ${policyNumber} has been successfully approved.\n\nInvoice Details:\nInvoice Number: ${invoiceNumber}\nCoverage Amount: ${coverageAmount}\nPremium Amount: ${premiumAmount}\n\nThank you for choosing our service.`;

    const mailOptions = createMailOptions(policyEmail, subject, text);

    await sendEmail(this.transporter, mailOptions);
  }

  async sendPolicyRejectedEmail(
    policyEmail: string,
    policyDetails: any,
  ): Promise<void> {
    const { policyNumber, userName, rejectedReason } = policyDetails;

    const subject = `Your Policy ${policyNumber} has been rejected`;
    const text = `Dear ${userName},\n\nYour policy with number ${policyNumber} has been rejected.\n\nReason: ${rejectedReason}\n\nPlease contact support for further assistance.`;

    const mailOptions = createMailOptions(policyEmail, subject, text);

    await sendEmail(this.transporter, mailOptions);
  }

  async sendPolicyCanceledEmail(
    policyEmail: string,
    policyDetails: any,
  ): Promise<void> {
    const { policyNumber, userName, canceledReason } = policyDetails;

    const subject = `Your Policy ${policyNumber} has been canceled`;
    const text = `Dear ${userName},\n\nYour policy with number ${policyNumber} has been canceled.\n\nReason: ${canceledReason}\n\nPlease contact support for further assistance.`;

    const mailOptions = createMailOptions(policyEmail, subject, text);

    await sendEmail(this.transporter, mailOptions);
  }

  async sendPaymentConfirmationEmail(
    userEmail: string,
    paymentDetails: {
      policyNumber: string;
      paymentAmount: number;
      lastPaymentDate: Date;
      remainingBalance: number;
    },
  ) {
    const body = `
      Dear Customer,
      Your payment for policy number ${paymentDetails.policyNumber} was successful.
      Amount Paid: $${paymentDetails.paymentAmount}
      Payment Date: ${paymentDetails.lastPaymentDate.toISOString()}
      Remaining Balance: $${paymentDetails.remainingBalance}

      Thank you for choosing our services!
    `;

    console.log(`Sending payment confirmation email to ${userEmail}:`, body);
    // Actual email sending logic goes here
  }
}
