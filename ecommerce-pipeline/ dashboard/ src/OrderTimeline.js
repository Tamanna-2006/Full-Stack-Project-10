import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrderTimeline() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Use environment variable or fallback to same origin proxy
        const baseURL = process.env.REACT_APP_API_BASE_URL || '';
        const res = await axios.get(`${baseURL}/api/orders`);
        setOrders(res.data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch orders:', err.message);
        setError('Could not connect to backend.');
      }
    };

    // Poll every 2 seconds
    const interval = setInterval(fetchOrders, 2000);
    fetchOrders();

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Order Timeline</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div
            key={order.orderId}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              margin: '10px 0',
              padding: '10px',
            }}
          >
            <h4>
              Order ID: {order.orderId} | Status: {order.status}
            </h4>
            <ul>
              {order.events.map(e => (
                <li key={e.eventId}>
                  {e.eventType} at {new Date(e.timestamp).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

