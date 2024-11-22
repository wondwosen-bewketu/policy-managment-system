import { Injectable } from '@nestjs/common';
import { PricingPlan } from '../../shared/types';
import { PaymentFrequency } from '../../shared/enums';

@Injectable()
export class PricingService {
  private readonly pricingPlans: { [key: string]: PricingPlan } = {
    [PaymentFrequency.MONTHLY]: { baseRate: 0.02 }, // 2% of coverage amount for monthly payments
    [PaymentFrequency.QUARTERLY]: { baseRate: 0.06 }, // 6% of coverage amount for quarterly payments
    [PaymentFrequency.SEMI_ANNUAL]: { baseRate: 0.12 }, // 12% of coverage amount for semi-annual payments
    [PaymentFrequency.ANNUAL]: { baseRate: 0.24 }, // 24% of coverage amount for annual payments
  };

  calculatePremium(paymentFrequency: string, coverageAmount: number): number {
    const plan = this.pricingPlans[paymentFrequency.toUpperCase()];

    if (!plan) {
      throw new Error('Unsupported payment frequency');
    }

    return coverageAmount * plan.baseRate;
  }
}
