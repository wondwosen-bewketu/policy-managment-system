export enum PolicyEvents {
  CREATED = 'policy.created',
  APPROVED = 'policy.approved',
  REJECTED = 'policy.rejected',
  CANCELED = 'policy.canceled',
  UPDATED = 'policy.updated',
}

// Event Payload Interfaces
export interface PolicyCreatedEvent {
  email: string;
  policyNumber: string;
}

export interface PolicyApprovalEvent {
  email: string;
  policyNumber: string;
}

export interface PolicyRejectionEvent {
  email: string;
  policyNumber: string;
  rejectedReason: string;
}

export interface PolicyCancellationEvent {
  email: string;
  policyNumber: string;
  cancledReason: string;
}

export interface PolicyUpdateEvent {
  email: string;
  policyNumber: string;
}
