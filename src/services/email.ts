import SibApiV3Sdk from "@sendinblue/client";

const client = new SibApiV3Sdk.TransactionalEmailsApi();

client.setApiKey(
  SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string
);

export async function sendWelcomeEmail(to: string, name: string) {
  try {
    await client.sendTransacEmail({
      sender: { email: "moostafa.dev@gmail.com", name: "MyStoryAI" },
      to: [{ email: to, name }],
      subject: "🎉 شكرًا لانضمامك إلينا!",
      htmlContent: `
        <h1>أهلاً ${name} 👋</h1>
        <p>شكرًا لإنشاء حسابك في <strong>MyStoryAI</strong>. احنا متحمسين تبدأ معانا 🚀</p>
      `,
    });
    console.log("✅ Welcome email sent!");
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
}
