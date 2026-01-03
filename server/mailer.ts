"use server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "capitalnexusfinace@gmail.com",
    pass: "rcri hevc aoxn ovma",
  },
});

export const sendMail = async (to: string, verificationCode: string) => {
  const mailOptions = {
    from: "Capital Nexus Auth support@capitalnexusfinace.com",
    to,
    subject: "Email Verification Code - Capital Nexus Online",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Header with Logo -->
                  <tr>
                    <td align="center" style="padding: 40px 30px; background-color: #0013BB;">
                      <img src="https://res.cloudinary.com/dtcu32sa6/image/upload/v1767439010/capital-logo-light_cebchc.png" alt="Capital Nexus Online" style="width: 120px; height: auto; display: block;">
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <h1 style="margin: 0 0 20px 0; font-size: 24px; color: #333333; text-align: center;">
                        Verify Your Email Address
                      </h1>
                      <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #666666;">
                        Thank you for signing up with Capital Nexus Online Banking. To complete your registration, please use the verification code below:
                      </p>
                      
                      <!-- Verification Code Box -->
                      <div style="background-color: #f8f9fa; border: 2px solid #0013BB; border-radius: 8px; padding: 20px; margin: 30px 0; text-align: center;">
                        <div style="font-size: 14px; color: #666666; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">
                          Your Verification Code
                        </div>
                        <div style="font-size: 36px; font-weight: bold; color: #0013BB; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                          ${verificationCode}
                        </div>
                      </div>
                      
                      <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 20px; color: #666666;">
                        This code will expire in <strong>10 minutes</strong>.
                      </p>
                      <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 20px; color: #666666;">
                        If you didn't request this verification code, please ignore this email.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px; background-color: #f8f9fa; border-top: 1px solid #e0e0e0;">
                      <p style="margin: 0 0 10px 0; font-size: 12px; line-height: 18px; color: #999999; text-align: center;">
                        © ${new Date().getFullYear()} Capital Nexus Online Banking. All rights reserved.
                      </p>
                      <p style="margin: 0; font-size: 12px; line-height: 18px; color: #999999; text-align: center;">
                        This is an automated message, please do not reply to this email.
                      </p>
                    </td>
                  </tr>
                  
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email: %s", error);
    return { success: false };
  }
};
