export const emailConfig = {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'bewketuwondwosen@gmail.com',
    pass: process.env.EMAIL_APP_PASSWORD || 'uaeb jbqn ugox lhwn',
  },
  requireTLS: true,
  tls: {
    rejectUnauthorized: false,
  },
};
