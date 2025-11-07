import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrderTimeline() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/orders');
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {orders.map(order => (
        <div key={order.orderId} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
          <h4>Order ID: {order.orderId} | Status: {order.status}</h4>
          <ul>
            {order.events.map(e => (
              <li key={e.eventId}>{e.eventType} at {new Date(e.timestamp).toLocaleTimeString()}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
