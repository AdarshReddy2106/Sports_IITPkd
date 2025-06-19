import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Calendar.css';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 0)); // January 2024

  const events = [
    {
      date: 6,
      month: 'JAN',
      title: 'Swimming Championship',
      time: '9:00 AM - 5:00 PM',
      description: 'Annual swimming competition for all age groups.',
      color: 'bg-teal-600'
    },
    {
      date: 11,
      month: 'JAN',
      title: 'Basketball Tournament',
      time: '10:00 AM - 6:00 PM',
      description: 'Inter-school basketball tournament finals.',
      color: 'bg-red-500'
    },
    {
      date: 15,
      month: 'JAN',
      title: 'Fitness Workshop',
      time: '2:00 PM - 4:00 PM',
      description: 'Learn advanced fitness techniques from expert trainers.',
      color: 'bg-blue-900'
    },
    {
      date: 20,
      month: 'JAN',
      title: 'Tennis Open',
      time: '8:00 AM - 6:00 PM',
      description: 'Regional tennis championship.',
      color: 'bg-teal-600'
    },
    {
      date: 25,
      month: 'JAN',
      title: 'Athletics Meet',
      time: '7:00 AM - 4:00 PM',
      description: 'Track and field competitions.',
      color: 'bg-red-500'
    }
  ];

  const calendarEvents = {
    6: 'teal',
    11: 'red',
    15: 'blue',
    20: 'teal',
    25: 'red'
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const days = [];
  
  // Empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 0);
    const prevDate = prevMonth.getDate() - firstDay + i + 1;
    days.push(
      <div key={`prev-${i}`} className="h-12 flex items-center justify-center text-gray-400 text-sm">
        {prevDate}
      </div>
    );
  }

  // Days of current month
  for (let day = 1; day <= daysInMonth; day++) {
    const hasEvent = calendarEvents[day];
    const eventColor = hasEvent === 'teal' ? 'bg-teal-200 dark:bg-teal-700' : hasEvent === 'red' ? 'bg-red-200 dark:bg-red-700' : hasEvent === 'blue' ? 'bg-blue-200 dark:bg-blue-700' : '';
    
    days.push(
      <div key={day} className={`h-12 flex items-center justify-center relative ${eventColor} ${hasEvent ? 'rounded-lg' : ''}`}>
        <span className={`text-sm font-medium ${hasEvent ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>{day}</span>
        {hasEvent && <div className={`absolute bottom-1 w-2 h-2 rounded-full ${hasEvent === 'teal' ? 'bg-teal-300' : hasEvent === 'red' ? 'bg-red-300' : 'bg-blue-300'}`}></div>}
      </div>
    );
  }

  return (
    <div className="calendar-container">
      <div className="calendar-wrapper">
        <div className="calendar-header">
          <h2 className="calendar-title">
            Events <span className="accent">Calendar</span>
          </h2>
          <p className="calendar-description">
            Stay updated with our upcoming events, tournaments, and training sessions.
          </p>
        </div>

        <div className="calendar-widget">
          <div className="calendar-nav">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="calendar-nav-btn"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="calendar-month-title">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="calendar-nav-btn"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-day-header">
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-grid">
            {days}
          </div>
        </div>

        <div className="events-section">
          <h3 className="events-title">Upcoming Events</h3>
          <div className="events-list">
            {events.map((event, index) => (
              <div key={index} className="event-card">
                <div className={`event-date ${event.color.includes('teal') ? 'teal' : event.color.includes('red') ? 'red' : 'blue'}`}>
                  <div className="event-month">{event.month}</div>
                  <div className="event-day">{event.date}</div>
                </div>
                <div className="event-content">
                  <h4 className="event-title">{event.title}</h4>
                  <p className="event-time">{event.time}</p>
                  <p className="event-description">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
