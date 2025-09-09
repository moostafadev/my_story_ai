import Soon from "@/components/Soon";
import Image from "next/image";
import React from "react";

const CreateStoryPage = () => {
  return (
    <>
      <section className="min-h-[calc(100vh-5rem)] flex">
        <div className="flex-[3] py-10 px-4">
          <Soon />
        </div>
        <div className="flex-[2] bg-gradient-to-b from-background via-background-accent to-background hidden lg:flex p-10 items-center justify-center shadow-sm">
          <Image
            src={"/logo.png"}
            alt="My Story AI Logo"
            width={300}
            height={300}
            className="max-h-full min-h-96 w-auto"
          />
        </div>
      </section>
    </>
  );
};

export default CreateStoryPage;
