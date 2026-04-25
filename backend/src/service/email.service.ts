import { Resend } from "resend";
import { IEmailService } from "./interfaces/IEmailService";
import { AppError } from "../utils/AppError";
import { AUTH_MESSAGES } from "../constants/error-messages";
import { STATUS_CODES } from "../constants/status-codes";

export class EmailService implements IEmailService {
  async sendOtpEmail(email: string, otp: string) {
    console.log(otp)
    if (!email || !otp) {
      throw new AppError(AUTH_MESSAGES.MISSING_EMAIL_OR_OTP,STATUS_CODES.BAD_REQUEST);
    }

    if (!process.env.RESEND_API_KEY) {
      throw new AppError(AUTH_MESSAGES.EMAIL_SERVICE_NOT_CONFIGURED,STATUS_CODES.INTERNAL_SERVER_ERROR);
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verify your email",
        html: `<p>Your OTP is <b>${otp}</b></p>`,
      });
    } catch {
      throw new AppError(AUTH_MESSAGES.EMAIL_SEND_FAILED,STATUS_CODES.BAD_GATEWAY);
    }
  }
}