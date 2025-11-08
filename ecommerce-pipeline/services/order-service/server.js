const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Sample order timeline data
app.get("/api/orders", (req, res) => {
  res.json([
    {
      orderId: "101",
      status: "Shipped",
      events: [
        { eventId: 1, eventType: "Order Created", timestamp: Date.now() - 60000 },
        { eventId: 2, eventType: "Payment Processed", timestamp: Date.now() - 30000 },
        { eventId: 3, eventType: "Shipped", timestamp: Date.now() }
      ]
    },
    {
      orderId: "102",
      status: "Delivered",
      events: [
        { eventId: 1, eventType: "Order Created", timestamp: Date.now() - 120000 },
        { eventId: 2, eventType: "Payment Processed", timestamp: Date.now() - 90000 },
        { eventId: 3, eventType: "Delivered", timestamp: Date.now() - 30000 }
      ]
    }
  ]);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Order service running on port ${PORT}`));
