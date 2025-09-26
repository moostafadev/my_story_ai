import AddressForm from "@/features/home/Checkout/Form";
import { OrderService } from "@/services/order.service";
import { SettingsService } from "@/services/settings.service";
import { UserService } from "@/services/user.service";
import { STORYTYPE } from "@prisma/client";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const CheckoutPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const order = await OrderService.getOrderById(id);
  if (!order?.userId) {
    redirect("/");
  }
  const user = await UserService.getUserById(order?.userId);

  if (!user?.id) {
    redirect("/login");
  }

  if (order.storyType === "PDF") {
    redirect("/profile/orders/" + id + "/checkout/continue?type=visa");
  }

  const settings = await SettingsService.getSettings();

  if (!settings) {
    redirect("/");
  }

  return (
    <section className="min-h-[calc(100vh-5rem)] flex">
      {/* Steps Section */}
      <div className="flex-[3] py-10 px-4 flex flex-col gap-6">
        <AddressForm
          orderId={id}
          prices={{
            softPrice: settings.storyCreationPriceSoft,
            hardPrice: settings.storyCreationPriceHard,
          }}
          storyType={order.storyType as STORYTYPE}
        />
      </div>

      {/* Image Section */}
      <div className="flex-[2] bg-background-sub hidden lg:block p-10 relative shadow-sm">
        <div className="flex justify-center min-h-[calc(100vh-5rem)] h-full">
          <Image
            src="/logo.png"
            alt="My Story AI Logo"
            width={300}
            height={300}
            className="sticky top-[250px] h-auto max-h-[400px] w-auto object-contain mt-[50%] -translate-y-1/2"
          />
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
