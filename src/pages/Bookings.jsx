import React, { useState } from 'react';
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
        <form className="booking-form-card">
          <div className="form-group">
            <label className="form-label">Select Facility</label>
            <select
              className="form-select"
              value={selectedFacility}
              onChange={e => setSelectedFacility(e.target.value)}
            >
              <option value="">Select a facility</option>
              {facilities.map(fac => (
                <option key={fac.id} value={fac.id}>{fac.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              className="form-input"
              value={bookingDate}
              onChange={e => setBookingDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Start Time</label>
            <input
              type="time"
              className="form-input"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">End Time</label>
            <input
              type="time"
              className="form-input"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Number of Participants</label>
            <input
              type="number"
              className="form-input"
              value={participants}
              onChange={e => setParticipants(e.target.value)}
              min={1}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Additional Notes</label>
            <textarea
              className="form-textarea"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Any special requests?"
            />
          </div>
          <button type="submit" className="btn btn-primary">Book Now</button>
        </form>
      </div>
    </div>
  );
};

export default Bookings;
