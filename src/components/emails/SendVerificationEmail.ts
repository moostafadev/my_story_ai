import SibApiV3Sdk from "@sendinblue/client";

const client = new SibApiV3Sdk.TransactionalEmailsApi();

client.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string
);

const domain =
  process.env.NODE_ENV === "production"
    ? "https://my-story-ai-dev.vercel.app"
    : "http://localhost:3000";

export async function sendVerificationEmail(
  to: string,
  name: string,
  code: string
) {
  await client.sendTransacEmail({
    sender: { email: "moostafa.dev@gmail.com", name: "MyStoryAI" },
    to: [{ email: to, name }],
    subject: "🔑 Verify Your Account | MyStoryAI",
    htmlContent: `
      <div style="font-family: Arial, sans-serif; background-color:#f9f9f9; padding:30px; text-align:center;">
        <!-- Logo -->
        <img src="https://res.cloudinary.com/deharbts9/image/upload/v1756487074/xms8huioj65b9iqd5r8a.png" alt="MyStoryAI Logo" width="120" style="margin-bottom:20px;" />

        <!-- Card -->
        <div style="max-width:600px; margin:0 auto; background:#fff; padding:30px; border-radius:12px; box-shadow:0 2px 6px rgba(0,0,0,0.1); text-align:left;">
          <h2 style="color:#333;">Hello ${name} 👋</h2>
          <p style="color:#555; font-size:16px;">
            Thank you for joining <strong>MyStoryAI</strong> 🚀  
            Please use the verification code below to activate your account:
          </p>

          <!-- OTP Code -->
          <div style="background:#f0f0f0; padding:15px; text-align:center; border-radius:8px; margin:20px 0;">
            <h1 style="letter-spacing:4px; color:#222;">${code}</h1>
          </div>

          <p style="color:#777; font-size:14px;">
            This code is valid for <strong>10 minutes</strong> only.  
            If you didn’t create this account, you can safely ignore this email.
          </p>

          <p style="margin-top:30px; font-size:14px; color:#999;">Best regards ❤️ The MyStoryAI Team</p>
        </div>

        <!-- Footer -->
        <p style="margin-top:20px; font-size:12px; color:#aaa;">
          © ${new Date().getFullYear()} MyStoryAI. All rights reserved.  
          <br/>
          <a href="${domain}" style="color:#555; text-decoration:none;">Official Website</a> | 
          <a href="twitter.com/yourapp" style="color:#555; text-decoration:none;">Twitter</a>
        </p>
      </div>
    `,
  });
}
