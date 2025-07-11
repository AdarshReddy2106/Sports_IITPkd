// server.js
const express = require('express');
const cors = require('cors');
const contactApi = require('./api/contact');
const bookingApi = require('./api/BookingMail');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://sports-iitpkd.vercel.app',
    'https://contactapi-iit.vercel.app',
  ],
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/contact', contactApi);
app.use('/api/BookingMail', bookingApi);

// Health check
app.get('/', (req, res) => {
  res.send('Backend is running');
});

const PORT = process.env.PORT || 2030;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
