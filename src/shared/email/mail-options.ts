// src/shared/email/mail-options.ts
export const createMailOptions = (
  policyEmail: string,
  subject: string,
  text: string,
) => {
  return {
    from: 'bewketuwondwosen@gmail.com',
    to: policyEmail,
    subject,
    text,
  };
};
