const express = require('express');
const cors = require('cors');

// Import your route modules
const contactApi = require('./api/contact'); 
const bookingApi = require('./api/BookingMail'); 

const app = express();

// --- Middleware ---
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://sports-iitpkd.vercel.app',
    'https://contactapi-iit.vercel.app',
  ],
  credentials: true,
}));
app.use(express.json());

// --- Routes ---
// Any request to /api/contact/... will be handled by contactApi
app.use('/api/contact', contactApi); 

// Any request to /api/booking/... will be handled by bookingApi
// So, the mail route will be at POST /api/booking/send-email
app.use('/api/booking', bookingApi);

// Health check route
app.get('/', (req, res) => {
  res.send('Backend is running correctly.');
});

const PORT = process.env.PORT || 2030;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});