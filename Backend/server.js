const express = require('express');
const cors = require('cors');
const contactApi = require('./api/contact');
const bookingApi = require('./api/BookingMail'); 
const app = express();

// Enable CORS for all routes - Updated to handle multiple origins
app.use(cors({
  origin: [
    'http://localhost:5173',           // Local development
    'https://sports-iitpkd.vercel.app', // Your deployed Vercel app
    'https://contactapi-iit.vercel.app' // Your backend domain (for self-requests)
  ],
  credentials: true
}));

app.use(express.json());

app.use('/api/contact', contactApi);
app.use('/api/BookingMail', bookingApi);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

const PORT = process.env.PORT || 2030;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});