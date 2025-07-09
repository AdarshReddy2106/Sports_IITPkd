// api/BookingMail.js

const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

const ADMIN_EMAIL = '102301018@smail.iitpkd.ac.in';
const ADMIN_PASS = 'lbrm afmt mlks ekij';

router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      selectedFacility,
      bookingDate,
      startTime,
      endTime
    } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: ADMIN_EMAIL,
        pass: ADMIN_PASS,
      },
    });

    await transporter.sendMail({
      from: ADMIN_EMAIL,
      to: ADMIN_EMAIL,
      subject: 'New Facility Booking Request',
      html: `<p>${name} (${email}) requested booking for <strong>${selectedFacility}</strong> on <strong>${bookingDate}</strong> from <strong>${startTime}</strong> to <strong>${endTime}</strong>.</p>`,
    });

    res.status(200).json({ message: 'Message sent' });
  } catch (error) {
    console.error('Error sending booking email:', error);
    res.status(500).json({ message: 'Error sending booking email' });
  }
});

module.exports = router;
