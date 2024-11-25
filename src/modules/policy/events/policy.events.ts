// src/policy/events/policy.events.ts

export const PolicyEvents = {
  CREATED: 'policy.created',
  APPROVED: 'policy.approved',
  REJECTED: 'policy.rejected',
  CANCELED: 'policy.canceled',
  INVOICE_GENERATED: 'policy.invoiceGenerated',
};

// src/shared/types/policy-event-payload.ts

export interface PolicyEventPayload {
  userEmail: string;
  policyId: string; // Add this line to ensure policyId exists in the payload
  // Add other properties if necessary
}
