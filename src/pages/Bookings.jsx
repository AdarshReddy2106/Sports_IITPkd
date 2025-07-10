import React, { useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import './Bookings.css';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { createBooking } from '../../Js/UserBookings';

const Bookings = () => {
  const { user } = useUser();
  const [form, setForm] = useState({
    name: '',
    email: '',
    selectedFacility: '',
    bookingDate: '',
    startTime: '',
    endTime: '',
    participants: '',
    notes: ''
  });
  

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        name: user.fullName || '',
        email: user.primaryEmailAddress?.emailAddress || ''
      }));
    }
  }, [user]);

  const [status, setStatus] = useState('');

  const API_URL = process.env.NODE_ENV === 'production'
    ? 'https://contactapi-iit.vercel.app/api/contact'
    : 'http://localhost:2030/api/BookingMail';

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
      if (!form.name || !form.email) {
        setStatus('User not logged in or missing info.');
        return;
  }
    setStatus('Booking...');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('Booking Sent! Wait for Confirmation.');
        setForm(prev => ({
          ...prev,
          selectedFacility: '',
          bookingDate: '',
          startTime: '',
          endTime: '',
          participants: '',
          notes: ''
        }));
      } else {
        setStatus(data.error || 'Failed to send.');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
      // Get facility name for database
      const facilityName = facilities.find(f => f.id === form.selectedFacility)?.name || form.selectedFacility;
      
      // Create booking in database
      const bookingData = {
        user_id: user?.id,
        name: form.name,
        email: form.email,
        facility: facilityName,
        date: form.bookingDate,
        start_time: form.startTime,
        end_time: form.endTime,
        participants: form.participants,
        notes: form.notes
      };
      await createBooking(bookingData);
  };

  const facilities = [
    { id: 'Badminton', name: 'Badminton Court' },
    { id: 'Basketball', name: 'Basketball Court' },
    { id: 'Cricket', name: 'Cricket Field' },
    { id: 'TableTennis', name: 'Table Tennis Courts' },
    { id: 'Track', name: 'Athletic Track' },
  ];

  return (
    <div className="bookings-container">
      <div className="bookings-wrapper">
        <div className="bookings-header">
          <h2 className="bookings-title">
            Book Our <span className="accent">Facilities</span>
          </h2>
          <p className="bookings-description">
            Reserve our world-class facilities for your training sessions, events, or competitions.
          </p>
        </div>

        <div className="bookings-content">
          <div className="booking-form-card">
            <h3 className="form-title">Facility Booking</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Select Facility</label>
                <select
                  name="selectedFacility"
                  value={form.selectedFacility}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select a facility</option>
                  {facilities.map(facility => (
                    <option key={facility.id} value={facility.id}>{facility.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Date</label>
                <div className="input-wrapper">
                  <input
                    type="date"
                    name="bookingDate"
                    value={form.bookingDate}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                  {!form.bookingDate && (
                    <span className="custom-placeholder">Select date</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Start Time</label>
                  <div className="input-wrapper">
                    <input
                      type="time"
                      name="startTime"
                      value={form.startTime}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                    {!form.startTime && (
                      <span className="custom-placeholder">Select start time</span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">End Time</label>
                  <div className="input-wrapper">
                    <input
                      type="time"
                      name="endTime"
                      value={form.endTime}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                    {!form.endTime && (
                      <span className="custom-placeholder">Select end time</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Number of Participants</label>
                <input
                  type="number"
                  name="participants"
                  value={form.participants}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter number of participants"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Additional Notes</label>
                <input
                  type="text"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Any additional requirements or notes"
                />
              </div>
              <button type="submit" className="submit-btn">
                Book Now
              </button>
              {status && <div className="status-message">{status}</div>}
            </form>
          </div>

          <div className="sidebar">
            {/* ...unchanged contact/booking info sidebar... */}
            <div className="info-card">
              <h3 className="info-title">Booking Information</h3>
              <div className="hours-table">
                <div className="hours-row">
                  <span className="hours-day">Monday - Friday</span>
                  <span className="hours-time">6:00 AM - 10:00 PM</span>
                </div>
                <div className="hours-row">
                  <span className="hours-day">Saturday</span>
                  <span className="hours-time">7:00 AM - 9:00 PM</span>
                </div>
                <div className="hours-row">
                  <span className="hours-day">Sunday</span>
                  <span className="hours-time">8:00 AM - 8:00 PM</span>
                </div>
              </div>

              <h4 className="info-title" style={{ marginTop: '2rem', marginBottom: '1rem' }}>Booking Policies</h4>
              <ul className="policies-list">
                <li className="policy-item">Bookings must be made at least 24 hours in advance</li>
                <li className="policy-item">Cancellations must be made 12 hours before the scheduled time</li>
                <li className="policy-item">Payment is required at the time of booking</li>
                <li className="policy-item">Members receive priority booking privileges</li>
              </ul>
            </div>

            <div className="help-card">
              <h3 className="help-title">Need Help?</h3>
              <p className="help-description">Our team is ready to assist you with your booking needs. Contact us for personalized assistance.</p>
              <div className="contact-info">
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <span>bookings@elitesports.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
