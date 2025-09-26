import { OrderService } from "@/services/order.service";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("Webhook received:", body);

    // Check if payment was successful
    if (body.success === true) {
      // Extract order ID from the webhook data
      // This might be in body.order.id or body.obj.order.id depending on Paymob's webhook structure
      const orderId = body.obj?.order?.id || body.order?.id;

      if (orderId) {
        try {
          // Update order state to PAID
          await OrderService.updateOrder(orderId.toString(), {
            state: "PAID",
          });

          console.log(`Order ${orderId} updated to PAID status`);
        } catch (updateError) {
          console.error(`Failed to update order ${orderId}:`, updateError);
          // You might want to implement retry logic here
        }
      } else {
        console.error("Order ID not found in webhook payload");
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
