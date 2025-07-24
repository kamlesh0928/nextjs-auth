import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER!,
        pass: process.env.MAILTRAP_PASS!,
      },
    });

    const mailOptions = {
      from: "learning.nextjs@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset Your Password",
      html:
        emailType === "VERIFY"
          ? `<p>Click <a href="${process.env.DOMAIN}/verify-email?token=${hashedToken}">here</a> to verify your email
           or copy and paste the link below in your browser: <br> 
           ${process.env.DOMAIN}/verify-email?token=${hashedToken}</p>`
          : `<p>You requested a password reset. Click <a href="${process.env.DOMAIN}/reset-password?token=${hashedToken}">here</a> to reset your password. 
           This link is valid for 1 hour. If you did not request a password reset, please ignore this email. <br>
           Or copy and paste the link below in your browser: <br> 
           ${process.env.DOMAIN}/reset-password?token=${hashedToken}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
