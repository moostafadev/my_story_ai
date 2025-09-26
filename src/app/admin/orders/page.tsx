import DefaultPage from "@/components/layouts/Admin/DefaultPage";
import OrdersData from "@/features/Admin/Orders/Table";
import { OrderService } from "@/services/order.service";
import { redirect } from "next/navigation";

const OrdersPage = async () => {
  const data = await OrderService.getAllOrdersAdmin();

  if (!data) {
    redirect("/admin");
  }
  return (
    <>
      <DefaultPage title="االطلبات">
        <OrdersData data={data} />
      </DefaultPage>
    </>
  );
};

export default OrdersPage;
