// server/index.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { requireAdmin } from "./middleware/requireAdmin.js";

dotenv.config({ path: "./server/.env" });

const app = express();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const allowedOrigins = [
  "http://localhost:5173",
  "https://aninna.com",
  "https://www.aninna.com",
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: allowedOrigins,
  })
);

/* STRIPE WEBHOOK - must be BEFORE express.json() */
app.post(
  "/api/stripe/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook signature error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const metadata = session.metadata || {};

      let parsedItems = [];

      try {
        parsedItems = metadata.items ? JSON.parse(metadata.items) : [];
      } catch (error) {
        console.error("Failed to parse metadata items:", error.message);
      }

      const { error } = await supabase.from("orders").insert({
        stripe_session_id: session.id,
        payment_status: session.payment_status,
        amount: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency || "aed",

        full_name: metadata.fullName || "",
        email: session.customer_email || session.customer_details?.email || "",
        phone: metadata.phone || "",
        country: metadata.country || "",
        city: metadata.city || "",
        address: metadata.address || "",
        apartment: metadata.apartment || "",
        notes: metadata.notes || "",

        items: parsedItems,
      });

      if (error) {
        console.error("Supabase order insert error:", error);
      } else {
        console.log("Order saved:", session.id);
      }
    }

    res.json({ received: true });
  }
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Stripe backend running");
});

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { customer, items } = req.body;

    if (!customer) {
      return res.status(400).json({ error: "Customer details are required" });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "aed",
        product_data: {
          name: item.name,
          images:
            item.image &&
            typeof item.image === "string" &&
            item.image.startsWith("http")
              ? [item.image]
              : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const safeItems = items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url:
        "https://aninna.com/success?session_id={CHECKOUT_SESSION_ID}",
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
        items: JSON.stringify(safeItems),
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: "Stripe error" });
  }
});

// Contact form submissions, stored in Supabase.
// Requires a "contact_messages" table.
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      message,
    });

    if (error) {
      console.error("Supabase contact insert error:", error);
      return res.status(500).json({ error: "Failed to send message." });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Admin routes
app.get("/api/admin/orders", requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase orders error:", error);
      return res.status(500).json({ error: "Failed to fetch orders" });
    }

    res.json({ orders: data });
  } catch (error) {
    console.error("Admin orders error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/admin/messages", requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase messages error:", error);
      return res.status(500).json({ error: "Failed to fetch messages" });
    }

    res.json({ messages: data });
  } catch (error) {
    console.error("Admin messages error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});