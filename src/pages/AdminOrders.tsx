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

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(`${apiBaseUrl}/api/admin/orders`);
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [apiBaseUrl]);

  return (
    <div className="min-h-screen bg-[#f8f5ef] p-8 text-[#2b211d]">
      <h1 className="mb-8 text-4xl font-semibold text-[#7b3327]">
        Admin Orders
      </h1>

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