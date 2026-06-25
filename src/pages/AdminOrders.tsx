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
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adminKey, setAdminKey] = useState(
    sessionStorage.getItem("aninna_admin_key") || ""
  );

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
        setOrders([]);
        sessionStorage.removeItem("aninna_admin_key");
        return;
      }

      const data = await res.json();
      setOrders(data.orders || []);
      sessionStorage.setItem("aninna_admin_key", key);
    } catch (err) {
      console.error(err);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (adminKey) {
      fetchOrders(adminKey);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!adminKey || error === "Invalid admin key.") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f5ef] p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchOrders(adminKey);
          }}
          className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm"
        >
          <h1 className="mb-4 text-2xl font-semibold text-[#7b3327]">
            Admin Access
          </h1>
          <label className="mb-2 block text-sm font-medium text-[#7b3327]">
            Admin Key
          </label>
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

  return (
    <div className="min-h-screen bg-[#f8f5ef] p-8 text-[#2b211d]">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-semibold text-[#7b3327]">Admin Orders</h1>
        <button
          onClick={() => {
            sessionStorage.removeItem("aninna_admin_key");
            setAdminKey("");
          }}
          className="rounded-full border border-[#d7c8b6] px-5 py-2 font-medium text-[#7b3327] transition hover:bg-white"
        >
          Log out
        </button>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          No orders yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white p-6 shadow-sm">
          <table className="w-full min-w-[1000px] text-left">
            <thead>
              <tr className="border-b text-sm uppercase text-[#7b3327]">
                <th className="p-3">Date</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Address</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="p-3">
                    {new Date(order.created_at).toLocaleString()}
                  </td>
                  <td className="p-3 font-semibold">{order.full_name}</td>
                  <td className="p-3">{order.email}</td>
                  <td className="p-3">{order.phone}</td>
                  <td className="p-3">
                    {order.address}, {order.apartment}, {order.city},{" "}
                    {order.country}
                  </td>
                  <td className="p-3 font-semibold">
                    {order.currency?.toUpperCase()} {order.amount}
                  </td>
                  <td className="p-3">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      {order.payment_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
