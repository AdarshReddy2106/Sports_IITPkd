const express = require('express');
const nodemailer = require('nodemailer');


const router = express.Router();

// --- Nodemailer Configuration ---
const ADMIN_EMAIL = '102301018@smail.iitpkd.ac.in';
// IMPORTANT: This must be a Google "App Password", not your regular Gmail password.
// Search "gmail app password" to learn how to generate one for your account.
const ADMIN_PASS = 'lbrm afmt mlks ekij'; 

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ADMIN_EMAIL,
    pass: ADMIN_PASS,
  },
});

// --- API Route to Handle Booking Emails ---
// This will be accessed via '/api/booking/send-email' because of how it's used in server.js
router.post('/send-email', async (req, res) => {
  console.log('Received request to send booking email:', req.body);
  try {
    const { name, email, facility, date, start_time, end_time } = req.body;

    // Basic validation
    if (!name || !email || !facility || !date || !start_time || !end_time) {
        return res.status(400).json({ message: 'Missing required booking details.' });
    }

    // --- Email to Admin ---
    await transporter.sendMail({
      from: `"IIT Palakkad Sports Booking" <${ADMIN_EMAIL}>`,
      to: ADMIN_EMAIL,
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
      from: `"IIT Palakkad Sports Booking" <${ADMIN_EMAIL}>`,
      to: email,
      subject: `Your Booking Request for ${facility} is Pending`,
      html: `
        <h2>Booking Request Received!</h2>
        <p>Hello ${name},</p>
        <p>We have received your booking request. You will be notified again once an admin has approved or rejected your request.</p>
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

// Export the router so server.js can use it
module.exports = router;