import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Calendar.css';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [currentDate] = useState(new Date());

  // Use environment variable for API URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://contactapi-iit.vercel.app';

  useEffect(() => {
    fetch(`${API_BASE_URL}/events`)
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  const calendarEvents = {};
  events.forEach((event) => {
    if (!calendarEvents[event.date]) {
      calendarEvents[event.date] = event.color?.includes('red')
        ? 'red'
        : event.color?.includes('teal')
        ? 'teal'
        : 'blue';
    }
  });

  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonthName = monthNames[currentMonth.getMonth()];
  const currentYear = currentMonth.getFullYear();

  // Get current date in YYYY-MM-DD format
  const today = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

  const days = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(
      <div key={`empty-${i}`} className="empty-day">
        •
      </div>
    );
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const fullDate = `${currentYear}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const hasEvent = calendarEvents[fullDate];
    const isToday = fullDate === today;
    
    // Determine classes
    let dayClasses = 'calendar-day current-month';
    
    if (isToday) {
      dayClasses += ' today';
    } else if (hasEvent) {
      dayClasses += ` has-event ${hasEvent}`;
    }

    days.push(
      <div key={day} className={dayClasses}>
        <span>{day}</span>
        {hasEvent && !isToday && (
          <div className={`event-indicator ${hasEvent}`} />
        )}
      </div>
    );
  }

  // Helper function to format date for display
  const formatEventDate = (dateString) => {
    const eventDate = new Date(dateString);
    const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = eventDate.getDate();
    return { month, day };
  };

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        {/* Header */}
        <div className="calendar-header">
          <h2 className="calendar-title">Events <span className="accent">Calendar</span></h2>
          <p className="calendar-description">Stay updated with our upcoming events, tournaments, and training sessions.</p>
        </div>

        {/* Month Navigation */}
        <div className="calendar-widget">
          <div className="calendar-nav">
            <button 
              onClick={() => setCurrentMonth(new Date(currentYear, currentMonth.getMonth() - 1))} 
              className="calendar-nav-btn"
            >
              <ChevronLeft />
            </button>
            <h3 className="calendar-month-title">{currentMonthName} {currentYear}</h3>
            <button 
              onClick={() => setCurrentMonth(new Date(currentYear, currentMonth.getMonth() + 1))} 
              className="calendar-nav-btn"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Weekdays */}
          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-day-header">{day}</div>
            ))}
          </div>

          {/* Days */}
          <div className="calendar-grid">{days}</div>
        </div>

        {/* Upcoming Events List */}
        <div className="events-section">
          <h3 className="events-title">Upcoming Events</h3>
          <div className="events-list">
            {events.map((event, index) => {
              const { month, day } = formatEventDate(event.date);
              
              return (
                <div key={index} className="event-card">
                  <div className={`event-date ${event.color?.includes('teal') ? 'teal' : event.color?.includes('red') ? 'red' : 'blue'}`}>
                    <div className="event-month">
                      {month}
                    </div>
                    <div className="event-day">
                      {day}
                    </div>
                  </div>
                  <div className="event-content">
                    <h4 className="event-title">{event.title}</h4>
                    <p className="event-time">
                      {event.startTime && event.endTime 
                        ? `${event.startTime} - ${event.endTime}`
                        : event.time || 'Time TBD'
                      }
                    </p>
                    <p className="event-description">{event.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;