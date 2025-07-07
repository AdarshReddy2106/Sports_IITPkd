const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();


const ADMIN_EMAIL = '102301018@smail.iitpkd.ac.in'; // use your email
const ADMIN_PASS = 'lbrm afmt mlks ekij'; // use your mail and app password

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: ADMIN_EMAIL,
    pass: ADMIN_PASS,
  },
});

router.post('/', async (req, res) => {
  const { name, email, message, subject } = req.body;
  if (!name || !email || !message || !subject) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: ADMIN_EMAIL,
      subject: 'New Contact Us Submission',
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    });
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.log('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

module.exports = router;

