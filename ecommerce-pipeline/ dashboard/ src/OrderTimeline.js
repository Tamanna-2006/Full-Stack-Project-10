import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderTimeline() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/orders");
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
    padding: "30px",
  };

  const cardStyle = {
    width: "80%",
    maxWidth: "600px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    margin: "15px 0",
    padding: "20px",
    borderLeft: "6px solid #007bff",
    transition: "transform 0.2s",
  };

  const cardHover = {
    transform: "scale(1.02)",
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "10px",
  };

  const statusStyle = {
    fontSize: "15px",
    color: "#007bff",
    fontWeight: "500",
  };

  const eventListStyle = {
    backgroundColor: "#f1f5f9",
    borderRadius: "8px",
    padding: "10px 15px",
    listStyleType: "none",
  };

  const eventItemStyle = {
    fontSize: "14px",
    color: "#555",
    marginBottom: "6px",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: "#007bff", marginBottom: "25px" }}>📦 Order Timeline</h2>
      {orders.map((order) => (
        <div
          key={order.orderId}
          style={cardStyle}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div style={titleStyle}>Order ID: {order.orderId}</div>
          <div style={statusStyle}>Status: {order.status}</div>
          <ul style={eventListStyle}>
            {order.events.map((e) => (
              <li key={e.eventId} style={eventItemStyle}>
                {e.eventType} <br />
                <small style={{ color: "#999" }}>
                  {new Date(e.timestamp).toLocaleTimeString()}
                </small>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}


