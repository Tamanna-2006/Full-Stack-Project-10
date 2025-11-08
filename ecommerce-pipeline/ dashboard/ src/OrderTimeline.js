import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrderTimeline() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Use Docker service name instead of localhost
        const res = await axios.get('http://order-service:3001/api/orders');
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching orders:', err.message);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Order Timeline</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(order => (
          <div
            key={order.orderId}
            style={{
              border: '1px solid black',
              borderRadius: '10px',
              margin: '10px',
              padding: '10px'
            }}
          >
            <h4>
              Order ID: {order.orderId} | Status: {order.status}
            </h4>
            <ul>
              {order.events.map(e => (
                <li key={e.eventId}>
                  {e.eventType} at{' '}
                  {new Date(e.timestamp).toLocaleTimeString()}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}


