const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import the cors middleware

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Middleware to enable CORS for all routes

const PORT = process.env.PORT || 3001;

// --- Nodemailer Configuration ---
// IMPORTANT: Use environment variables for credentials in production
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '102301018@smail.iitpkd.ac.in';
const ADMIN_PASS = process.env.ADMIN_PASS || 'lbrm afmt mlks ekij'; // Use an "App Password" for Gmail

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ADMIN_EMAIL,
    pass: ADMIN_PASS,
  },
});

// --- API Route to Handle Booking Emails ---
app.post('/api/send-booking-email', async (req, res) => {
  console.log('Received request to send booking email:', req.body);
  try {
    const {
      name,
      email,
      facility,
      date,
      start_time,
      end_time
    } = req.body;

    // Basic validation
    if (!name || !email || !facility || !date || !start_time || !end_time) {
        return res.status(400).json({ message: 'Missing required booking details.' });
    }

    // --- Email to Admin ---
    await transporter.sendMail({
      from: `"IITB Sports Booking" <${ADMIN_EMAIL}>`,
      to: ADMIN_EMAIL, // Send to the admin
      subject: `New Booking Request: ${facility}`,
      html: `
        <h2>New Facility Booking Request</h2>
        <p>A new booking request has been submitted. Please review it in the admin dashboard.</p>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Facility:</strong> ${facility}</li>
          <li><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</li>
          <li><strong>Time:</strong> ${start_time} - ${end_time}</li>
        </ul>
      `,
    });
    
    // --- Confirmation Email to User ---
    await transporter.sendMail({
      from: `"IITB Sports Booking" <${ADMIN_EMAIL}>`,
      to: email, // Send to the user who booked
      subject: `Your Booking Request for ${facility} is Pending`,
      html: `
        <h2>Booking Request Received!</h2>
        <p>Hello ${name},</p>
        <p>We have received your booking request for the following slot. You will be notified again once an admin has approved or rejected your request.</p>
        <ul>
          <li><strong>Facility:</strong> ${facility}</li>
          <li><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</li>
          <li><strong>Time:</strong> ${start_time} - ${end_time}</li>
        </ul>
        <p>Thank you!</p>
      `,
    });


    res.status(200).json({ message: 'Notification emails sent successfully.' });
  } catch (error) {
    console.error('Error sending booking email:', error);
    res.status(500).json({ message: 'An error occurred while sending notification emails.' });
  }
});

app.listen(PORT, () => {
  console.log(`Email service listening on port ${PORT}`);
});