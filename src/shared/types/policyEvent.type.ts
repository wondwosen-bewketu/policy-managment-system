export interface PolicyEventPayload {
  policyId: string;
  userEmail: string;
  userName: string;
  policyNumber: string;
  coverageAmount: number;
  premiumAmount: number;
  startDate: string;
  endDate: string;
  rejectedReason?: string;
  canceledReason?: string;
}
