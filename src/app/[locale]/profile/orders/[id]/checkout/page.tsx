import React from "react";

const CheckoutPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <div>CheckoutPage for Order ID: {id}</div>;
};

export default CheckoutPage;
