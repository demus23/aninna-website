// server/emiratesPost.js
//
// Emirates Post EMX API integration
// Docs: https://developers.emiratespost.ae
//
// CREDENTIALS NEEDED (add to Render environment variables after meeting):
//   EMX_USERNAME       = provided by Emirates Post IT team
//   EMX_PASSWORD       = provided by Emirates Post IT team
//   EMX_ACCOUNT_NUMBER = your account number
//   EMX_API_BASE_URL   = https://api.emiratespost.ae  (confirm live URL with IT team)
//                        Test URL will also be provided — swap to test first
//
// All functions return { success: true, data: ... } or { success: false, error: ... }

const EMX_BASE_URL = process.env.EMX_API_BASE_URL || "https://api.emiratespost.ae";
const EMX_USERNAME = process.env.EMX_USERNAME;
const EMX_PASSWORD = process.env.EMX_PASSWORD;
const EMX_ACCOUNT_NUMBER = process.env.EMX_ACCOUNT_NUMBER;

// ANINNA sender details — update these to your real business address
const ANINNA_SENDER = {
  SenderContactName: "ANINNA",
  SenderCompanyName: "ANINNA Beauty",
  SenderAddress: process.env.ANINNA_ADDRESS || "YOUR_ADDRESS_HERE",
  SenderCity: 1,          // 1 = Dubai — confirm city codes with EMX IT team
  SenderContactMobile: process.env.ANINNA_PHONE || "971000000000",
  SenderContactPhone: process.env.ANINNA_PHONE || "971000000000",
  SenderEmail: "orders@aninna.com",
  SenderZipCode: "00000", // UAE doesn't use postal codes — confirm with IT team
  SenderState: "Dubai",
  SenderCountry: 971,     // UAE country code
};

// Auth header used in every request
function authHeader() {
  const encoded = Buffer.from(`${EMX_USERNAME}:${EMX_PASSWORD}`).toString("base64");
  return {
    "Content-Type": "application/json",
    "Authorization": `Basic ${encoded}`,
  };
}

// ─── CREATE SHIPMENT BOOKING ───────────────────────────────────────────────
// Called when you click "Create Shipment" in the admin panel.
// Returns AWBNumber (tracking number) and AWBLabelURL (PDF label).
//
// order shape expected:
// {
//   id, full_name, phone, address, apartment, city, country,
//   email, amount, items, notes
// }
export async function createEMXBooking(order) {
  if (!EMX_USERNAME || !EMX_PASSWORD) {
    return { success: false, error: "EMX credentials not configured" };
  }

  const body = {
    BookingRequest: {
      // Sender (ANINNA)
      ...ANINNA_SENDER,

      // Receiver (customer)
      ReceiverContactName: order.full_name,
      ReceiverCompanyName: null,
      ReceiverAddress: `${order.address}${order.apartment ? ", " + order.apartment : ""}`,
      ReceiverCity: 1,          // Confirm if IT team provides city code lookup
      ReceiverContactMobile: order.phone?.replace(/\D/g, "") || "",
      ReceiverContactPhone: order.phone?.replace(/\D/g, "") || "",
      ReceiverEmail: order.email,
      ReceiverZipCode: "00000",
      ReceiverState: order.city || "Dubai",
      ReceiverCountry: 971,     // All GCC orders — adjust if needed for KSA/KWT etc.

      // Shipment details
      ReferenceNo: order.id,       // Your order ID as reference
      ReferenceNo1: null,
      ReferenceNo2: null,
      ReferenceNo3: null,
      ContentTypeCode: "NonDocument",
      NatureType: 11,             // Confirm correct nature type with IT team
      Service: "Domestic",        // "Domestic" for UAE, "International" for GCC
      ShipmentType: "Express",
      DeleiveryType: "Door to Door",
      Registered: "No",
      PaymentType: "Credit",      // Uses your account — confirm with IT team
      CODAmount: "0",
      CODCurrency: null,
      CommodityDescription: "Nourishing Scalp & Hair Serum",
      Pieces: 1,
      Weight: 100,               // grams — ANINNA serum weight, update to real value
      WeightUnit: "Grams",
      Length: 5,                 // cm — update to your actual packaging dimensions
      Width: 5,
      Height: 15,
      DimensionUnit: "Centimetre",
      ItemValue: String(order.amount || 90),
      ValueCurrency: "AED",
      ProductCode: null,
      DeliveryInstructionsID: null,
      RequestSource: null,
      SendMailToSender: "No",    // We handle our own emails via Resend
      SendMailToReceiver: "No",
      PreferredPickupDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit", month: "short", year: "numeric"
      }).replace(/ /g, "-"), // "20-Aug-2024" format
      PreferredPickupTimeFrom: "09:00",
      PreferredPickupTimeTo: "17:00",
    },
  };

  try {
    const res = await fetch(`${EMX_BASE_URL}/api/Booking/CreateBooking`, {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok || !data?.BookingResponse?.AWBNumber) {
      console.error("EMX booking error:", data);
      return { success: false, error: data?.BookingResponse?.Description || "Booking failed" };
    }

    return {
      success: true,
      awbNumber: data.BookingResponse.AWBNumber,
      labelUrl: data.BookingResponse.AWBLabelURL || null,
      labelBase64: data.BookingResponse.AWBLabel || null,
    };
  } catch (err) {
    console.error("EMX booking exception:", err);
    return { success: false, error: err.message };
  }
}

// ─── TRACK SHIPMENT ────────────────────────────────────────────────────────
// Returns current status of an AWB number.
export async function trackEMXShipment(awbNumber) {
  if (!EMX_USERNAME || !EMX_PASSWORD) {
    return { success: false, error: "EMX credentials not configured" };
  }

  try {
    const res = await fetch(
      `${EMX_BASE_URL}/api/Tracking/TrackShipment?AWBNumber=${awbNumber}`,
      { method: "GET", headers: authHeader() }
    );

    const data = await res.json();

    if (!res.ok) {
      return { success: false, error: "Tracking request failed" };
    }

    return { success: true, tracking: data };
  } catch (err) {
    console.error("EMX tracking exception:", err);
    return { success: false, error: err.message };
  }
}

// ─── CANCEL SHIPMENT ───────────────────────────────────────────────────────
export async function cancelEMXBooking(awbNumber) {
  if (!EMX_USERNAME || !EMX_PASSWORD) {
    return { success: false, error: "EMX credentials not configured" };
  }

  try {
    const res = await fetch(`${EMX_BASE_URL}/api/Booking/CancelBooking`, {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify({ AWBNumber: awbNumber }),
    });

    const data = await res.json();
    return { success: res.ok, data };
  } catch (err) {
    console.error("EMX cancel exception:", err);
    return { success: false, error: err.message };
  }
}

// ─── CUSTOMER ENDPOINT (webhook receiver) ──────────────────────────────────
// Emirates Post calls THIS endpoint on your server to push status updates.
// Register the URL https://aninna-api.onrender.com/api/emx/status-update
// with the IT team so they can configure it on their side.
//
// Statuses Emirates Post sends:
// "Shipment Created" | "Shipment Picked up by Courier" | "Out for Delivery"
// "Shipment Delivered" | "Shipment on Hold" | "Undelivered" | "Shipment Returned to Sender"
export function parseEMXStatusUpdate(body) {
  return {
    awbNumber: body.AWB_Number,
    referenceNumber: body.Reference_Number,   // This will be your order.id
    timestamp: body.Time_Stamp,
    status: body.Status,
    subStatus: body.SubStatus,
    customerName: body.ConsigneeContactName,
    customerAddress: body.ConsigneeAddress,
    customerPhone: body.ConsigneeMobNumber,
    remarks: body.Remarks,
  };
}
