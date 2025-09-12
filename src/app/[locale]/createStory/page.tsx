import OrderFormStepOne from "@/features/home/CreateStory/Form";
import { getUserFromCookies } from "@/lib/cookies";
import { UserService } from "@/services/user.service";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const CreateStoryPage = async () => {
  const userId = await getUserFromCookies();
  if (!userId?.userId) {
    redirect("/login");
  }
  const result = await UserService.getUserById(userId.userId);
  if (!result?.id) {
    redirect("/login");
  }

  return (
    <section className="min-h-[calc(100vh-5rem)] flex">
      {/* Form Section */}
      <div className="flex-[3] py-10 px-4 relative">
        <OrderFormStepOne userId={userId.userId} />
      </div>

      {/* Image Section */}
      <div className="flex-[2] bg-gradient-to-b from-background via-background-accent to-background hidden lg:block p-10 relative shadow-sm">
        <div className="sticky -top-20 h-screen flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="My Story AI Logo"
            width={300}
            height={300}
            className="h-auto max-h-[400px] w-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default CreateStoryPage;
