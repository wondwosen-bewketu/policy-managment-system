import * as nodemailer from 'nodemailer';
import { emailConfig } from './config';

export const createTransporter = () => {
  return nodemailer.createTransport(emailConfig);
};
