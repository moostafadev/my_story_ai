import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, currency } = await req.json();

    // 1. Auth request
    const authRes = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: process.env.PAYMOB_API_KEY,
      }),
    });

    const authData = await authRes.json();
    const token = authData.token;

    // 2. Create order
    const orderRes = await fetch(
      "https://accept.paymob.com/api/ecommerce/orders",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auth_token: token,
          amount_cents: amount * 100,
          currency: currency,
          items: [
            {
              name: "Test Product",
              amount_cents: amount * 100,
              description: "A test product",
              quantity: 1,
            },
          ],
        }),
      }
    );

    const orderData = await orderRes.json();
    const orderId = orderData.id;

    // 3. Generate Payment Key
    const redirectBase =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const paymentKeyRes = await fetch(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auth_token: token,
          amount_cents: amount * 100,
          expiration: 3600,
          order_id: orderId,
          billing_data: {
            first_name: "Test",
            last_name: "User",
            email: "test@example.com",
            phone_number: "01000000000",
            apartment: "NA",
            floor: "NA",
            street: "NA",
            building: "NA",
            shipping_method: "NA",
            city: "Cairo",
            country: "EG",
            state: "NA",
          },
          currency: currency,
          integration_id: process.env.PAYMOB_INTEGRATION_ID,
          redirect_url: `${redirectBase}/payment-callback`,
        }),
      }
    );

    const paymentKeyData = await paymentKeyRes.json();
    const payment_token = paymentKeyData.token;

    // 4. Build Checkout URL
    const checkoutURL = `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${payment_token}`;

    return NextResponse.json({
      checkout_url: checkoutURL,
      order_id: orderId,
    });
  } catch (err) {
    console.error("Payment error:", err);
    return NextResponse.json({ error: "Payment failed" }, { status: 500 });
  }
}
