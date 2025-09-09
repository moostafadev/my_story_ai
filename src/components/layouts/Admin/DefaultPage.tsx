import React from "react";
import BackBtn from "./BackBtn";

interface IProps {
  title: string;
  desc?: string;
  children: React.ReactNode;
  showBackBtn?: boolean;
}

const DefaultPage = ({ title, desc, children, showBackBtn = true }: IProps) => {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
        <div className="flex flex-col gap-2 order-2 sm:order-1">
          <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
          <p className="text-base sm:text-lg text-gray-700">{desc}</p>
        </div>
        {showBackBtn ? <BackBtn /> : ""}
      </div>
      {children}
    </section>
  );
};

export default DefaultPage;
