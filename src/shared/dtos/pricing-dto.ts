import { PaymentFrequency } from '../enums/paymentFrequency.enum';

export class PricingRequestDto {
  paymentFrequency: PaymentFrequency;
  coverageAmount: number;
  startDate: Date;
  endDate?: Date;
  isPaused?: boolean;
  pausedDays?: number;
}
