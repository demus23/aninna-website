import { useEffect, useState } from "react";

type Order = {
  id: string;
  stripe_session_id: string;
  payment_status: string;
  amount: number;
  currency: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  apartment: string;
  notes: string;
  items: any;
  created_at: string;
  shipping_status: string;
  tracking_number: string | null;
  label_url: string | null;
  shipped_at: string | null;
};

const SHIPPING_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:          { label: "Pending",          color: "bg-yellow-100 text-yellow-800" },
  created:          { label: "Shipment Created",  color: "bg-blue-100 text-blue-800" },
  picked_up:        { label: "Picked Up",         color: "bg-indigo-100 text-indigo-800" },
  out_for_delivery: { label: "Out for Delivery",  color: "bg-purple-100 text-purple-800" },
  delivered:        { label: "Delivered",          color: "bg-green-100 text-green-800" },
  on_hold:          { label: "On Hold",            color: "bg-orange-100 text-orange-800" },
  undelivered:      { label: "Undelivered",        color: "bg-red-100 text-red-800" },
  returned:         { label: "Returned",           color: "bg-red-100 text-red-800" },
  cancelled:        { label: "Cancelled",          color: "bg-gray-100 text-gray-600" },
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adminKey, setAdminKey] = useState(
    sessionStorage.getItem("aninna_admin_key") || ""
  );
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchOrders = async (key: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${apiBaseUrl}/api/admin/orders`, {
        headers: { "x-admin-key": key },
      });
      if (res.status === 401) {
        setError("Invalid admin key.");
        sessionStorage.removeItem("aninna_admin_key");
        return;
      }
      const data = await res.json();
      setOrders(data.orders || []);
      sessionStorage.setItem("aninna_admin_key", key);
    } catch {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminKey) fetchOrders(adminKey);
    else setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShip = async (orderId: string) => {
    if (!confirm("Create Emirates Post shipment for this order?")) return;
    setActionLoading(orderId + "-ship");
    try {
      const res = await fetch(`${apiBaseUrl}/api/admin/orders/${orderId}/ship`, {
        method: "POST",
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();
      if (data.success) {
        alert(`✓ Shipment created!\nAWB: ${data.awbNumber}\n\nShipping email sent to customer.`);
        fetchOrders(adminKey);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch {
      alert("Something went wrong.");
    } finally {
      setActionLoading(null);
    }
  };

  const handlePrintLabel = async (orderId: string) => {
    setActionLoading(orderId + "-label");
    try {
      const res = await fetch(`${apiBaseUrl}/api/admin/orders/${orderId}/label`, {
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();
      if (data.labelUrl) {
        window.open(data.labelUrl, "_blank");
      } else {
        alert("Label URL not available. Try printing from Emirates Post portal directly.");
      }
    } catch {
      alert("Could not retrieve label.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleTrack = async (orderId: string) => {
    setActionLoading(orderId + "-track");
    try {
      const res = await fetch(`${apiBaseUrl}/api/admin/orders/${orderId}/track`, {
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();
      if (data.success) {
        alert(`Tracking status:\n${JSON.stringify(data.tracking, null, 2)}`);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch {
      alert("Could not fetch tracking.");
    } finally {
      setActionLoading(null);
    }
  };

  // Login screen
  if (!adminKey || error === "Invalid admin key.") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f5ef] p-8">
        <form
          onSubmit={(e) => { e.preventDefault(); fetchOrders(adminKey); }}
          className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm"
        >
          <h1 className="mb-4 text-2xl font-semibold text-[#7b3327]">Admin Access</h1>
          <label className="mb-2 block text-sm font-medium text-[#7b3327]">Admin Key</label>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            className="mb-4 w-full rounded-xl border border-[#e8dfd2] px-4 py-3 outline-none focus:border-[#d4a83e]"
            autoFocus
          />
          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-[#7b3327] px-6 py-3 font-semibold text-[#f5c95c] transition hover:opacity-90"
          >
            View Orders
          </button>
        </form>
      </div>
    );
  }

  const pendingCount = orders.filter(o => !o.tracking_number).length;

  return (
    <div className="min-h-screen bg-[#f8f5ef] p-6 text-[#2b211d]">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold text-[#7b3327]">Admin Orders</h1>
          <p className="mt-1 text-[#6f6159]">
            {orders.length} total · {pendingCount} need shipping
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => fetchOrders(adminKey)}
            className="rounded-full border border-[#d7c8b6] px-5 py-2 font-medium text-[#7b3327] transition hover:bg-white"
          >
            Refresh
          </button>
          <button
            onClick={() => { sessionStorage.removeItem("aninna_admin_key"); setAdminKey(""); }}
            className="rounded-full border border-[#d7c8b6] px-5 py-2 font-medium text-[#7b3327] transition hover:bg-white"
          >
            Log out
          </button>
        </div>
      </div>

      {/* EMX credentials warning */}
      {!import.meta.env.VITE_EMX_CONFIGURED && (
        <div className="mb-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
          <strong>Emirates Post not yet configured.</strong> Add EMX_USERNAME, EMX_PASSWORD,
          EMX_ACCOUNT_NUMBER, and EMX_API_BASE_URL to your Render environment variables
          after your meeting with the IT team. All other features work normally.
        </div>
      )}

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 shadow-sm">No orders yet.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = SHIPPING_STATUS_LABELS[order.shipping_status] ||
              { label: order.shipping_status || "Pending", color: "bg-gray-100 text-gray-600" };
            const isExpanded = expandedOrder === order.id;

            return (
              <div key={order.id} className="rounded-2xl bg-white shadow-sm">
                {/* Summary row */}
                <div
                  className="flex cursor-pointer flex-wrap items-center gap-4 p-6"
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[#7b3327]">{order.full_name}</p>
                    <p className="text-sm text-[#6f6159]">
                      {order.city}, {order.country} · {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">{order.currency?.toUpperCase()} {order.amount}</p>
                    <p className="text-sm text-[#6f6159]">{order.payment_status}</p>
                  </div>

                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.color}`}>
                    {status.label}
                  </span>

                  <span className="text-[#8a7b72]">{isExpanded ? "▲" : "▼"}</span>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-[#f0e8db] px-6 pb-6">
                    <div className="mt-4 grid gap-6 md:grid-cols-2">
                      {/* Customer info */}
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#d4a83e]">
                          Customer
                        </p>
                        <div className="space-y-1 text-sm text-[#6f6159]">
                          <p><span className="font-medium text-[#2b211d]">Name:</span> {order.full_name}</p>
                          <p><span className="font-medium text-[#2b211d]">Email:</span> {order.email}</p>
                          <p><span className="font-medium text-[#2b211d]">Phone:</span> {order.phone}</p>
                          <p><span className="font-medium text-[#2b211d]">Address:</span> {order.address}{order.apartment ? `, ${order.apartment}` : ""}</p>
                          <p><span className="font-medium text-[#2b211d]">City:</span> {order.city}, {order.country}</p>
                          {order.notes && <p><span className="font-medium text-[#2b211d]">Notes:</span> {order.notes}</p>}
                        </div>
                      </div>

                      {/* Shipping info */}
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#d4a83e]">
                          Shipping
                        </p>
                        <div className="space-y-1 text-sm text-[#6f6159]">
                          {order.tracking_number ? (
                            <>
                              <p><span className="font-medium text-[#2b211d]">AWB:</span> {order.tracking_number}</p>
                              {order.shipped_at && (
                                <p><span className="font-medium text-[#2b211d]">Shipped:</span> {new Date(order.shipped_at).toLocaleDateString()}</p>
                              )}
                              <a
                                href="https://www.emx.ae/all-services/track-a-package"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 inline-block text-[#7b3327] underline"
                              >
                                Track on Emirates Post →
                              </a>
                            </>
                          ) : (
                            <p className="text-yellow-700">Not yet shipped</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      {!order.tracking_number ? (
                        <button
                          onClick={() => handleShip(order.id)}
                          disabled={actionLoading === order.id + "-ship"}
                          className="rounded-full bg-[#7b3327] px-5 py-2.5 text-sm font-semibold text-[#f5c95c] transition hover:opacity-90 disabled:opacity-60"
                        >
                          {actionLoading === order.id + "-ship" ? "Creating..." : "🚚 Create Shipment"}
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handlePrintLabel(order.id)}
                            disabled={actionLoading === order.id + "-label"}
                            className="rounded-full bg-[#7b3327] px-5 py-2.5 text-sm font-semibold text-[#f5c95c] transition hover:opacity-90 disabled:opacity-60"
                          >
                            {actionLoading === order.id + "-label" ? "Loading..." : "🏷 Print Label"}
                          </button>
                          <button
                            onClick={() => handleTrack(order.id)}
                            disabled={actionLoading === order.id + "-track"}
                            className="rounded-full border border-[#d4a83e] px-5 py-2.5 text-sm font-semibold text-[#7b3327] transition hover:bg-[#d4a83e] hover:text-white disabled:opacity-60"
                          >
                            {actionLoading === order.id + "-track" ? "Loading..." : "📍 Track Status"}
                          </button>
                        </>
                      )}

                      <a
                        href={`mailto:${order.email}`}
                        className="rounded-full border border-[#d7c8b6] px-5 py-2.5 text-sm font-medium text-[#7b3327] transition hover:bg-[#f8f5ef]"
                      >
                        ✉ Email Customer
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
