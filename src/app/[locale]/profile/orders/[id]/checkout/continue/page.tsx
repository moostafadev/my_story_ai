import CheckoutSection from "@/features/home/Checkout";
import { getUserFromCookies } from "@/lib/cookies";
import { OrderService } from "@/services/order.service";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

const ContinuePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const t = await getTranslations("CheackoutPage");

  const order = await OrderService.getOrderById(id);
  const userId = await getUserFromCookies();
  if (!order?.userId || order?.userId !== userId?.userId || !order) {
    redirect("/");
  }

  console.log(order);

  return (
    <section className="min-h-[calc(100vh-5rem)] py-8 lg:p-12">
      <div className="container flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <CheckoutSection
          order={{
            id: order.id,
            storyPrice: order.storiesPrice,
            deliveryPrice: order.deliveryPrice,
            totalPrice: order.fPrice,
            storyType: order.storyType,
          }}
        />
      </div>
    </section>
  );
};

export default ContinuePage;
