import React, { useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import './Bookings.css';

const Bookings = () => {
  const [selectedFacility, setSelectedFacility] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [participants, setParticipants] = useState('');
  const [notes, setNotes] = useState('');

  const facilities = [
    { id: 'swimming', name: 'Olympic Swimming Pool' },
    { id: 'basketball', name: 'Indoor Basketball Court' },
    { id: 'fitness', name: 'Fitness Center' },
    { id: 'tennis', name: 'Tennis Courts' },
    { id: 'track', name: 'Athletic Track' },
    { id: 'hall', name: 'Multi-purpose Hall' }
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
            <div className="form-group">
              <label className="form-label">Select Facility</label>
              <select
                value={selectedFacility}
                onChange={(e) => setSelectedFacility(e.target.value)}
                className="form-select"
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
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="form-input"
                  id="booking-date"
                  placeholder=" "
                />
                {!bookingDate && (
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
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="form-input"
                    id="start-time"
                    placeholder=" "
                  />
                  {!startTime && (
                    <span className="custom-placeholder">Select start time</span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">End Time</label>
                <div className="input-wrapper">
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="form-input"
                    id="end-time"
                    placeholder=" "
                  />
                  {!endTime && (
                    <span className="custom-placeholder">Select end time</span>
                  )}
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Number of Participants</label>
              <input
                type="number"
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                className="form-input"
                placeholder="Enter number of participants"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Additional Notes</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="form-input"
                placeholder="Any additional requirements or notes"
              />
            </div>

            <button className="submit-btn">
              Book Now
            </button>
          </div>

          <div className="sidebar">
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
