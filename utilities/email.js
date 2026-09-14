import "dotenv/config";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Send verification email
export const sendVerificationEmail = async (to, token) => {
  const verifyUrl = `${process.env.BACKEND_URL}/api/auth/verify-email/${token}`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Verify your Finance Tracker account",
    html: `
      <h2>Verify your email</h2>

      <p>Please click the button below to verify your email.</p>

      <a href="${verifyUrl}">
        Verify Email
      </a>

      <p>This link will expire in 24 hours.</p>
    `,
  });
};

// Send password reset email
export const sendResetPasswordEmail = async (to, token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Reset your Finance Tracker password",
    html: `
      <h2>Reset your password</h2>

      <p>You requested to reset your Finance Tracker password.</p>

      <p>Click the button below to create a new password:</p>

      <a href="${resetUrl}">
        Reset Password
      </a>

      <p>This link will expire in 15 minutes.</p>

      <p>If you did not request this, you can safely ignore this email.</p>
    `,
  });
};