import { Resend } from "resend";


export const sendOtpEmail = async (email: string, otp: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log(otp)
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email",
    html: `<p>Your OTP is <b>${otp}</b></p>`,
  });
};