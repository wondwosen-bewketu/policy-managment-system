// src/shared/email/sender.ts
export const sendEmail = async (transporter: any, mailOptions: any) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to ' + mailOptions.to);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
