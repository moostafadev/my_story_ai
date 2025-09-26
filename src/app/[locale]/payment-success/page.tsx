import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function PaymentSuccessPage() {
  const t = await getTranslations("PaymentSuccess");

  return (
    <section className="flex flex-col items-center justify-center h-screen gap-6">
      <h1 className="text-3xl font-bold text-green-600">
        ✅ {t("payment_successful")}
      </h1>
      <p className="text-lg">{t("payment_confirmation")}</p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700"
      >
        {t("go_to_homepage")}
      </Link>
    </section>
  );
}
