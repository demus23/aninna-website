// server/index.js
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: "./server/.env" });

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Stripe backend running");
});

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const { customer, items } = req.body;

    const line_items = items.map((item) => ({
      price_data: {
        currency: "aed",
        product_data: {
          name: item.name,
         images:
  item.image && typeof item.image === "string" && item.image.startsWith("http")
    ? [item.image]
    : [],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url:
        "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
      customer_email: customer.email,
      metadata: {
        fullName: customer.fullName || "",
        phone: customer.phone || "",
        country: customer.country || "",
        city: customer.city || "",
        address: customer.address || "",
        apartment: customer.apartment || "",
        notes: customer.notes || "",
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Stripe error" });
  }
});

app.get("/api/admin/orders", async (req, res) => {
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

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});