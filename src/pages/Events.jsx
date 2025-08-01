import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Trophy, Medal, Award, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../../Js/supabase';
import './Events.css';

const Events = ({ setCurrentPage, isLoaded }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [currentPage, setCurrentPageState] = useState(1);
  const eventsPerPage = 6;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // Get today's date in YYYY-MM-DD format for the query
      const today = new Date().toISOString();

      // Fetching from the main 'events' table for dates *before* today
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .lt('date', today) // Filter for events with a date less than today
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching past events:', error);
      } else {
        setEvents(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const openEventDetails = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const closeEventDetails = () => {
    setShowEventDetails(false);
    setSelectedEvent(null);
  };

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPageState(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPageState(currentPage - 1);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventStatus = (event) => {
    if (event.winner) return 'Completed';
    if (event.scorecard) return 'Results Available';
    return 'Past Event';
  };

  const EventCard = ({ event }) => (
    <div className="event-card" onClick={() => openEventDetails(event)}>
      <div className="event-card-header">
        <div className="event-date">
          <Calendar size={16} />
          {formatDate(event.date)}
        </div>
        <div className={`event-status ${getEventStatus(event).toLowerCase().replace(' ', '-')}`}>
          {getEventStatus(event)}
        </div>
      </div>
      
      <h3 className="event-title">{event.title}</h3>
      
      {event.description && (
        <p className="event-description">{event.description}</p>
      )}
      
      <div className="event-meta">
        {(event.startTime && event.endTime) && (
          <div className="event-time">
            <Clock size={14} />
            {event.startTime} - {event.endTime}
          </div>
        )}
        
        {event.participants && (
          <div className="event-participants">
            <Users size={14} />
            {event.participants} participants
          </div>
        )}
      </div>
      
      {event.winner && (
        <div className="event-winner">
          <Trophy size={16} />
          Winner: {event.winner}
        </div>
      )}
    </div>
  );

  const EventDetailsModal = () => {
    if (!selectedEvent) return null;

    return (
      <div className={`event-modal-overlay ${showEventDetails ? 'show' : ''}`}>
        <div className="event-modal">
          <div className="event-modal-header">
            <h2>{selectedEvent.title}</h2>
            <button onClick={closeEventDetails} className="close-btn">
              <X size={24} />
            </button>
          </div>
          
          <div className="event-modal-content">
            <div className="event-modal-info">
              <div className="info-item">
                <Calendar size={18} />
                <span>{formatDate(selectedEvent.date)}</span>
              </div>
              
              {(selectedEvent.startTime && selectedEvent.endTime) && (
                <div className="info-item">
                  <Clock size={18} />
                  <span>{selectedEvent.startTime} - {selectedEvent.endTime}</span>
                </div>
              )}
              
              {selectedEvent.participants && (
                <div className="info-item">
                  <Users size={18} />
                  <span>{selectedEvent.participants} participants</span>
                </div>
              )}
            </div>
            
            {selectedEvent.description && (
              <div className="event-description-full">
                <h4>Event Description</h4>
                <p>{selectedEvent.description}</p>
              </div>
            )}
            
            {selectedEvent.winner && (
              <div className="event-results">
                <h4>Results</h4>
                <div className="winner-section">
                  <div className="winner-card">
                    <Trophy size={24} />
                    <div>
                      <h5>Winner</h5>
                      <p>{selectedEvent.winner}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {selectedEvent.runnerUp && (
              <div className="runner-up-section">
                <div className="runner-up-card">
                  <Medal size={24} />
                  <div>
                    <h5>Runner Up</h5>
                    <p>{selectedEvent.runnerUp}</p>
                  </div>
                </div>
              </div>
            )}
            
            {selectedEvent.scorecard && (
              <div className="scorecard-section">
                <h4>Scorecard</h4>
                <div className="scorecard">
                  <pre>{selectedEvent.scorecard}</pre>
                </div>
              </div>
            )}
            
            {selectedEvent.highlights && (
              <div className="highlights-section">
                <h4>Event Highlights</h4>
                <ul>
                  {selectedEvent.highlights.split(',').map((highlight, index) => (
                    <li key={index}>{highlight.trim()}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {selectedEvent.eventLink && (
              <div className="event-link-section">
                <a 
                  href={selectedEvent.eventLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="event-link-btn"
                >
                  View More Details
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="events-page">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading events...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="events-page">
        <div className="container">
          <div className="events-header">
            <h1>Past Events & Results</h1>
            <p>Explore our completed events, results, and achievements</p>
          </div>
          
          {events.length === 0 ? (
            <div className="no-events">
              <Award size={64} />
              <h3>No Past Events</h3>
              <p>Check back later for completed events and results!</p>
            </div>
          ) : (
            <>
              <div className="events-grid">
                {currentEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    onClick={prevPage} 
                    disabled={currentPage === 1}
                    className="pagination-btn"
                  >
                    <ChevronLeft size={20} />
                    Previous
                  </button>
                  
                  <span className="pagination-info">
                    Page {currentPage} of {totalPages}
                  </span>
                  
                  <button 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                  >
                    Next
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <EventDetailsModal />
    </>
  );
};

export default Events;