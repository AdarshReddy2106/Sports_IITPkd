const express = require('express');
const cors = require('cors');
const contactApi = require('./api/contact');
const bookingApi = require('./api/BookingMail');
const fs = require('fs');
const path = require('path');

const app = express();

// CORS config
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://sports-iitpkd.vercel.app',
    'https://contactapi-iit.vercel.app'
  ],
  credentials: true
}));

app.use(express.json());

// Contact & booking routes
app.use('/api/contact', contactApi);
app.use('/api/BookingMail', bookingApi);

// ✅ EVENTS API
const eventsFile = path.join(__dirname, 'events.json');

const readEvents = () => {
  try {
    const data = fs.readFileSync(eventsFile);
    return JSON.parse(data);
  } catch {
    return [];
  }
};

app.get('/events', (req, res) => {
  const events = readEvents();
  res.json(events);
});

app.post('/events', (req, res) => {
  const events = readEvents();
  events.push(req.body);
  fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
  res.status(201).send({ success: true });
});

app.delete('/events/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const events = readEvents();
  if (index >= 0 && index < events.length) {
    events.splice(index, 1);
    fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
    res.status(200).send({ success: true });
  } else {
    res.status(404).send({ error: 'Event not found' });
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Server
const PORT = process.env.PORT || 2030;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
