import { useEffect, useState } from "react";

function VendorDashboard() {
  const [orders, setOrders] = useState([]);

  // ✅ Fetch all orders
  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  // ✅ Optional: mark as completed
  const handleMarkCompleted = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/orders/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Completed" }),
      });
      const updatedOrder = await res.json();
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? updatedOrder : order))
      );
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  return (
    <div className="vendorDashboard">
      <h1>Vendor Dashboard</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => {
          // ✅ Parse JSON safely
          let items = [];
          try {
            items =
              typeof order.items === "string"
                ? JSON.parse(order.items)
                : order.items;
          } catch (err) {
            console.error("Error parsing items:", err);
          }

          return (
            <div key={order.id} className="orderCard">
              <div className="orderHeader">
                <h2>Order #{order.id}</h2>
                <span
                  className={`status ${
                    order.status?.toLowerCase() || "pending"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              </div>

              <p>
                <strong>Customer:</strong> {order.customer_name || "N/A"} <br />
                <strong>Phone:</strong> {order.customer_number || "N/A"} <br />
                <strong>Date:</strong>{" "}
                {new Date(order.created_at).toLocaleString()}
              </p>

              <h3>Items:</h3>
              <ul className="itemsList">
                {items.length > 0 ? (
                  items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} — {item.quantity} × ${item.price.toFixed(2)} =
                      ${(item.quantity * item.price).toFixed(2)}
                    </li>
                  ))
                ) : (
                  <li>No items found</li>
                )}
              </ul>

              <p className="orderTotal">
                <strong>Total:</strong> ${parseFloat(order.total).toFixed(2)}
              </p>

              {/* Optional status button */}
              {order.status !== "Completed" && (
                <button
                  className="completeBtn"
                  onClick={() => handleMarkCompleted(order.id)}
                >
                  Mark as Completed
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default VendorDashboard;
