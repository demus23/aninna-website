// server/index.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { requireAdmin } from "./middleware/requireAdmin.js";
import {
  createEMXBooking,
  trackEMXShipment,
  cancelEMXBooking,
  parseEMXStatusUpdate,
} from "./emiratesPost.js";

dotenv.config({ path: "./server/.env" });

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const allowedOrigin = process.env.FRONTEND_URL || "https://aninna.com";
app.use(cors({ origin: allowedOrigin }));

// ─── STRIPE WEBHOOK — must be BEFORE express.json() ───────────────────────
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body, sig, process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const metadata = session.metadata || {};
      const customerEmail = session.customer_email || session.customer_details?.email || "";
      const customerName = metadata.fullName || "Valued Customer";
      const amount = session.amount_total ? session.amount_total / 100 : 0;
      const currency = (session.currency || "aed").toUpperCase();

      const { error: dbError } = await supabase.from("orders").insert({
        stripe_session_id: session.id,
        payment_status: session.payment_status,
        amount,
        currency: session.currency || "aed",
        full_name: customerName,
        email: customerEmail,
        phone: metadata.phone || "",
        country: metadata.country || "",
        city: metadata.city || "",
        address: metadata.address || "",
        apartment: metadata.apartment || "",
        notes: metadata.notes || "",
        items: metadata.items ? JSON.parse(metadata.items) : [],
        shipping_status: "pending",   // NEW: shipping lifecycle field
        tracking_number: null,
      });

      if (dbError) console.error("Supabase order insert error:", dbError);
      else console.log("Order saved:", session.id);

      // Send order confirmation email
      if (customerEmail && process.env.RESEND_API_KEY) {
        try {
          await resend.emails.send({
            from: "ANINNA <orders@aninna.com>",
            to: customerEmail,
            subject: "Your ANINNA Order is Confirmed ✓",
            html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background:#f8f5ef;font-family:system-ui,-apple-system,sans-serif;color:#2b211d;">
  <div style="max-width:560px;margin:40px auto;padding:0 16px;">
    <div style="text-align:center;padding:40px 0 24px;">
      <h1 style="margin:0;font-size:32px;font-weight:700;letter-spacing:4px;color:#7b3327;">ANINNA</h1>
      <p style="margin:4px 0 0;font-size:13px;color:#7d6d63;">Nourishing Scalp & Hair Serum</p>
    </div>
    <div style="background:#ffffff;border-radius:24px;padding:40px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#d4a83e;">Order Confirmed</p>
      <h2 style="margin:0 0 16px;font-size:26px;font-weight:600;color:#7b3327;">Thank you, ${customerName.split(" ")[0]}.</h2>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#6f6159;">
        Your order has been received and payment confirmed. We're preparing your ANINNA serum for dispatch within 1–2 business days.
      </p>
      <div style="background:#f8f5ef;border-radius:16px;padding:20px;margin-bottom:24px;">
        <p style="margin:0 0 12px;font-weight:600;color:#7b3327;">Order Summary</p>
        <div style="display:flex;justify-content:space-between;font-size:15px;color:#6f6159;">
          <span>ANINNA Nourishing Scalp & Hair Serum</span>
        </div>
        <div style="border-top:1px solid #eadfce;margin-top:12px;padding-top:12px;display:flex;justify-content:space-between;font-weight:600;font-size:16px;">
          <span>Total</span><span>${currency} ${amount.toFixed(2)}</span>
        </div>
      </div>
      <div style="font-size:14px;color:#6f6159;line-height:1.8;">
        <p style="margin:0 0 4px;font-weight:600;color:#7b3327;">Delivering to</p>
        <p style="margin:0;">${metadata.address || ""}${metadata.apartment ? ", " + metadata.apartment : ""}</p>
        <p style="margin:0;">${metadata.city || ""}, ${metadata.country || ""}</p>
      </div>
    </div>
    <div style="text-align:center;padding:16px 0 40px;font-size:14px;color:#8a7b72;line-height:1.8;">
      <p style="margin:0;">Questions? <a href="mailto:hello@aninna.com" style="color:#7b3327;">hello@aninna.com</a> or <a href="https://wa.me/971000000000" style="color:#7b3327;">WhatsApp</a></p>
      <p style="margin:8px 0 0;">Follow us: <a href="https://instagram.com/aninnabeauty" style="color:#7b3327;">@aninnabeauty</a></p>
    </div>
  </div>
</body>
</html>`.trim(),
          });
          console.log("Confirmation email sent to:", customerEmail);
        } catch (emailErr) {
          console.error("Email error:", emailErr);
        }
      }
    }

    res.json({ received: true });
  }
);

app.use(express.json());

app.get("/", (req, res) => res.send("ANINNA API running"));

// ─── CHECKOUT SESSION ──────────────────────────────────────────────────────
app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { customer, items } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ error: "Cart is empty" });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "aed",
        product_data: {
          name: item.name,
          images: item.image?.startsWith("http") ? [item.image] : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: "https://aninna.com/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://aninna.com/cancel",
      customer_email: customer.email,
      metadata: {
        fullName: customer.fullName || "",
        phone: customer.phone || "",
        country: customer.country || "",
        city: customer.city || "",
        address: customer.address || "",
        apartment: customer.apartment || "",
        notes: customer.notes || "",
        items: JSON.stringify(items.map(({ id, name, price, quantity }) => ({ id, name, price, quantity }))),
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Stripe error" });
  }
});

// ─── CONTACT FORM ──────────────────────────────────────────────────────────
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: "All fields are required." });

    const { error } = await supabase.from("contact_messages").insert({ name, email, message });
    if (error) return res.status(500).json({ error: "Failed to send message." });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ─── NEWSLETTER ────────────────────────────────────────────────────────────
app.post("/api/newsletter", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email required." });

    const { error } = await supabase
      .from("newsletter_subscribers")
      .upsert({ email }, { onConflict: "email" });

    if (error) return res.status(500).json({ error: "Failed to subscribe." });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ─── EMX: STATUS UPDATE WEBHOOK (Emirates Post calls this) ────────────────
// Give this URL to the Emirates Post IT team:
// https://aninna-api.onrender.com/api/emx/status-update
app.post("/api/emx/status-update", async (req, res) => {
  try {
    const update = parseEMXStatusUpdate(req.body);
    console.log("EMX status update received:", update);

    // Find the order by reference number (which is our order.id)
    const { data: orders } = await supabase
      .from("orders")
      .select("*")
      .eq("id", update.referenceNumber)
      .single();

    if (orders) {
      // Map EMX statuses to our internal statuses
      const statusMap = {
        "Shipment Created": "created",
        "Shipment Picked up by Courier": "picked_up",
        "Out for Delivery": "out_for_delivery",
        "Shipment Delivered": "delivered",
        "Shipment on Hold": "on_hold",
        "Undelivered": "undelivered",
        "Shipment Returned to Sender": "returned",
        "Shipment Cancelled": "cancelled",
      };

      await supabase
        .from("orders")
        .update({
          shipping_status: statusMap[update.status] || update.status,
          emx_status: update.status,
          emx_substatus: update.subStatus,
        })
        .eq("id", update.referenceNumber);

      // Email customer when out for delivery or delivered
      if (
        (update.status === "Out for Delivery" || update.status === "Shipment Delivered") &&
        orders.email
      ) {
        const isDelivered = update.status === "Shipment Delivered";
        try {
          await resend.emails.send({
            from: "ANINNA <orders@aninna.com>",
            to: orders.email,
            subject: isDelivered
              ? "Your ANINNA Order Has Been Delivered ✓"
              : "Your ANINNA Order Is Out for Delivery 🚚",
            html: `
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f8f5ef;font-family:system-ui,sans-serif;color:#2b211d;">
  <div style="max-width:560px;margin:40px auto;padding:0 16px;">
    <div style="text-align:center;padding:40px 0 24px;">
      <h1 style="margin:0;font-size:32px;font-weight:700;letter-spacing:4px;color:#7b3327;">ANINNA</h1>
    </div>
    <div style="background:#fff;border-radius:24px;padding:40px;margin-bottom:24px;">
      <h2 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#7b3327;">
        ${isDelivered ? "Your order has been delivered!" : "Your order is on its way!"}
      </h2>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#6f6159;">
        ${isDelivered
          ? `Hi ${orders.full_name?.split(" ")[0] || ""},<br/><br/>Your ANINNA Nourishing Scalp & Hair Serum has been delivered. We hope you love your new scalp care ritual.`
          : `Hi ${orders.full_name?.split(" ")[0] || ""},<br/><br/>Your ANINNA serum is out for delivery today. Make sure someone is available to receive it.`
        }
      </p>
      ${orders.tracking_number ? `
      <div style="background:#f8f5ef;border-radius:16px;padding:16px;margin-bottom:20px;">
        <p style="margin:0;font-size:14px;color:#6f6159;">
          Tracking number: <strong style="color:#7b3327;">${orders.tracking_number}</strong><br/>
          <a href="https://www.emx.ae/all-services/track-a-package" style="color:#7b3327;">Track on Emirates Post →</a>
        </p>
      </div>` : ""}
      ${isDelivered ? `
      <p style="margin:0;font-size:15px;line-height:1.7;color:#6f6159;">
        We'd love to hear what you think — follow us at
        <a href="https://instagram.com/aninnabeauty" style="color:#7b3327;">@aninnabeauty</a>
        and share your experience.
      </p>` : ""}
    </div>
    <div style="text-align:center;padding:0 0 40px;font-size:14px;color:#8a7b72;">
      <p>Questions? <a href="mailto:hello@aninna.com" style="color:#7b3327;">hello@aninna.com</a></p>
    </div>
  </div>
</body>
</html>`.trim(),
          });
        } catch (emailErr) {
          console.error("Delivery status email error:", emailErr);
        }
      }
    }

    // Emirates Post expects this exact response
    res.json({ errorCode: null, errorMsg: null, status: "Success" });
  } catch (err) {
    console.error("EMX status update error:", err);
    res.json({ errorCode: "500", errorMsg: err.message, status: "Error" });
  }
});

// ─── ADMIN: ORDERS ─────────────────────────────────────────────────────────
app.get("/api/admin/orders", requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return res.status(500).json({ error: "Failed to fetch orders" });
    res.json({ orders: data });
  } catch { res.status(500).json({ error: "Server error" }); }
});

// ─── ADMIN: CREATE EMX SHIPMENT ────────────────────────────────────────────
// Called from the admin panel "Create Shipment" button
app.post("/api/admin/orders/:orderId/ship", requireAdmin, async (req, res) => {
  try {
    const { orderId } = req.params;

    // Fetch the order
    const { data: order, error: fetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (fetchError || !order) return res.status(404).json({ error: "Order not found" });
    if (order.tracking_number) return res.status(400).json({ error: "Order already shipped" });

    // Call Emirates Post API
    const result = await createEMXBooking(order);

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    // Save tracking number to Supabase
    await supabase
      .from("orders")
      .update({
        tracking_number: result.awbNumber,
        shipping_status: "created",
        shipped_at: new Date().toISOString(),
        label_url: result.labelUrl || null,
      })
      .eq("id", orderId);

    // Send shipping notification email to customer
    if (order.email && process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: "ANINNA <orders@aninna.com>",
          to: order.email,
          subject: "Your ANINNA Order Has Been Shipped 📦",
          html: `
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f8f5ef;font-family:system-ui,sans-serif;color:#2b211d;">
  <div style="max-width:560px;margin:40px auto;padding:0 16px;">
    <div style="text-align:center;padding:40px 0 24px;">
      <h1 style="margin:0;font-size:32px;font-weight:700;letter-spacing:4px;color:#7b3327;">ANINNA</h1>
    </div>
    <div style="background:#fff;border-radius:24px;padding:40px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#d4a83e;">Order Shipped</p>
      <h2 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#7b3327;">
        Your ANINNA is on its way, ${order.full_name?.split(" ")[0] || ""}!
      </h2>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.7;color:#6f6159;">
        Your order has been handed to Emirates Post and is now on its way to you.
        Expected delivery: 2–4 business days within UAE.
      </p>
      <div style="background:#f8f5ef;border-radius:16px;padding:20px;margin-bottom:24px;">
        <p style="margin:0 0 8px;font-weight:600;color:#7b3327;">Tracking Details</p>
        <p style="margin:0;font-size:15px;color:#6f6159;">
          AWB Number: <strong style="color:#2b211d;">${result.awbNumber}</strong>
        </p>
        <p style="margin:8px 0 0;">
          <a href="https://www.emx.ae/all-services/track-a-package"
             style="display:inline-block;margin-top:12px;background:#7b3327;color:#f5c95c;padding:12px 24px;border-radius:50px;text-decoration:none;font-weight:600;font-size:14px;">
            Track Your Order →
          </a>
        </p>
      </div>
      <div style="font-size:14px;color:#6f6159;line-height:1.8;">
        <p style="margin:0 0 4px;font-weight:600;color:#7b3327;">Delivering to</p>
        <p style="margin:0;">${order.address}${order.apartment ? ", " + order.apartment : ""}</p>
        <p style="margin:0;">${order.city}, ${order.country}</p>
      </div>
    </div>
    <div style="text-align:center;padding:0 0 40px;font-size:14px;color:#8a7b72;line-height:1.8;">
      <p>Questions? <a href="mailto:hello@aninna.com" style="color:#7b3327;">hello@aninna.com</a> or WhatsApp us</p>
      <p style="margin:4px 0 0;"><a href="https://instagram.com/aninnabeauty" style="color:#7b3327;">@aninnabeauty</a></p>
    </div>
  </div>
</body>
</html>`.trim(),
        });
      } catch (emailErr) {
        console.error("Shipping email error:", emailErr);
      }
    }

    res.json({
      success: true,
      awbNumber: result.awbNumber,
      labelUrl: result.labelUrl,
    });
  } catch (err) {
    console.error("Ship order error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ─── ADMIN: PRINT LABEL ────────────────────────────────────────────────────
app.get("/api/admin/orders/:orderId/label", requireAdmin, async (req, res) => {
  try {
    const { data: order } = await supabase
      .from("orders")
      .select("label_url, tracking_number")
      .eq("id", req.params.orderId)
      .single();

    if (!order?.label_url && !order?.tracking_number) {
      return res.status(404).json({ error: "No label available — create shipment first" });
    }

    res.json({ labelUrl: order.label_url, trackingNumber: order.tracking_number });
  } catch { res.status(500).json({ error: "Server error" }); }
});

// ─── ADMIN: CANCEL SHIPMENT ────────────────────────────────────────────────
app.post("/api/admin/orders/:orderId/cancel-shipment", requireAdmin, async (req, res) => {
  try {
    const { data: order } = await supabase
      .from("orders")
      .select("tracking_number")
      .eq("id", req.params.orderId)
      .single();

    if (!order?.tracking_number) return res.status(400).json({ error: "No shipment to cancel" });

    const result = await cancelEMXBooking(order.tracking_number);

    if (result.success) {
      await supabase
        .from("orders")
        .update({ shipping_status: "cancelled" })
        .eq("id", req.params.orderId);
    }

    res.json(result);
  } catch { res.status(500).json({ error: "Server error" }); }
});

// ─── ADMIN: TRACK SHIPMENT ────────────────────────────────────────────────
app.get("/api/admin/orders/:orderId/track", requireAdmin, async (req, res) => {
  try {
    const { data: order } = await supabase
      .from("orders")
      .select("tracking_number")
      .eq("id", req.params.orderId)
      .single();

    if (!order?.tracking_number) return res.status(400).json({ error: "No tracking number yet" });

    const result = await trackEMXShipment(order.tracking_number);
    res.json(result);
  } catch { res.status(500).json({ error: "Server error" }); }
});

// ─── ADMIN: MESSAGES ───────────────────────────────────────────────────────
app.get("/api/admin/messages", requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return res.status(500).json({ error: "Failed to fetch messages" });
    res.json({ messages: data });
  } catch { res.status(500).json({ error: "Server error" }); }
});

// ─── ADMIN: SUBSCRIBERS ────────────────────────────────────────────────────
app.get("/api/admin/subscribers", requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) return res.status(500).json({ error: "Failed to fetch subscribers" });
    res.json({ subscribers: data });
  } catch { res.status(500).json({ error: "Server error" }); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
