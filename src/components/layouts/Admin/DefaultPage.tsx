import React from "react";

interface IProps {
  title: string;
  desc?: string;
  children: React.ReactNode;
}

const DefaultPage = ({ title, desc, children }: IProps) => {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
        <p className="text-base sm:text-lg text-gray-700">{desc}</p>
      </div>
      {children}
    </section>
  );
};

export default DefaultPage;
