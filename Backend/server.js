const express = require('express');
const cors = require('cors');
const contactApi = require('./api/contact');

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5173', // Your React app's URL
  credentials: true
}));

app.use(express.json());

app.use('/api/contact', contactApi);

app.get('/', (req, res) => {
  res.send('Backend is running');
});

const PORT = process.env.PORT || 2030;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});