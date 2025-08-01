import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "../../Js/supabase";
import "./admindash.css";

const AdminDashboard = () => {
  const { isLoaded, user } = useUser();
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]); // Single state for all events
  const [galleryImages, setGalleryImages] = useState([]);
  const [activeTab, setActiveTab] = useState('events');
  const [selectedEventForResults, setSelectedEventForResults] = useState(null);
  const [showResultsModal, setShowResultsModal] = useState(false);

  // State for forms
  const [event, setEvent] = useState({
    date: "",
    startTime: "",
    endTime: "",
    title: "",
    description: "",
    color: "bg-teal-600",
    eventLink: "",
    linkText: "View Details",
  });

  const [eventResults, setEventResults] = useState({
    eventSummary: "",
  });

  const [galleryItem, setGalleryItem] = useState({
    title: "",
    category: "Facilities",
    colorClass: "teal",
    imageUrl1: "",
    imageUrl2: "",
    imageUrl3: "",
  });

  // Authorization Logic
  const superAdminEmails = [
    "102301018@smail.iitpkd.ac.in",
    "122301042@smail.iitpkd.ac.in",
  ];
  
  const eventAdminEmails = [
    "ace@iitpkd.ac.in",
  ];

  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const isSuperAdmin = user && superAdminEmails.includes(userEmail);
  const isEventAdmin = user && (eventAdminEmails.includes(userEmail) || isSuperAdmin);
  const isAuthorized = isSuperAdmin || isEventAdmin;

  useEffect(() => {
    if (isLoaded && isAuthorized) {
      if (isSuperAdmin) {
        fetchBookings();
      }
      fetchEvents();
      fetchGalleryImages();
    }
  }, [isLoaded, isAuthorized, isSuperAdmin]);
  
  // --- Filter events into past and upcoming ---
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

  const upcomingEvents = events.filter(e => new Date(e.date) >= today);
  const pastEvents = events.filter(e => new Date(e.date) < today);


  // --- Fetch functions ---
  const fetchBookings = async () => {
    const { data, error } = await supabase.from("bookings").select("*");
    if (!error) setBookings(data);
  };

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });
    if (!error) setEvents(data);
  };

  const fetchGalleryImages = async () => {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setGalleryImages(data || []);
  };

  const updateStatus = async (id, status) => {
    if (!isSuperAdmin) return;
    
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);
    if (!error) {
      setBookings((prev) => prev.filter(b => b.id !== id));
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("events").insert([
      { 
        ...event,
        eventLink: event.eventLink || null,
        linkText: event.linkText || "View Details",
        user_id: user.id,
      },
    ]);

    if (error) {
      alert("❌ Failed to add event: " + error.message);
    } else {
      alert("✅ Event added successfully");
      setEvent({
        date: "", startTime: "", endTime: "", title: "", description: "",
        color: "bg-teal-600", eventLink: "", linkText: "View Details",
      });
      fetchEvents();
    }
  };

  const handleDeleteEvent = async (id) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) fetchEvents();
    else alert("Error deleting event: " + error.message);
  };
  
  // --- Results Modal Logic ---
  const openResultsModal = (event) => {
    setSelectedEventForResults(event);
    setEventResults({
      eventSummary: event.eventSummary || "", 
    });
    setShowResultsModal(true);
  };

  const closeResultsModal = () => {
    setShowResultsModal(false);
    setSelectedEventForResults(null);
  };
  
  const handleUpdateEventResults = async (e) => {
    e.preventDefault();
    if (!selectedEventForResults) return;

    try {
      const { error } = await supabase
        .from("events") // Update the main 'events' table
        .update({
          ...eventResults
        })
        .eq("id", selectedEventForResults.id);

      if (error) throw error;

      alert("✅ Event results updated successfully!");
      closeResultsModal();
      fetchEvents();
    } catch (error) {
      alert("❌ Failed to update event results: " + error.message);
    }
  };

  // --- Gallery Functions ---
  const handleAddGalleryItem = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("gallery").insert([{ ...galleryItem, user_id: user.id }]);
    if (error) {
      alert("❌ Failed to add gallery item: " + error.message);
    } else {
      alert("✅ Gallery item added successfully");
      setGalleryItem({ title: "", category: "Facilities", colorClass: "teal", imageUrl1: "", imageUrl2: "", imageUrl3: "" });
      fetchGalleryImages();
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    if (!error) fetchGalleryImages();
    else alert("Error deleting gallery item: " + error.message);
  };

  const handleChange = (e, setter) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  if (!isLoaded) {
    return <div className="admin-panel-container"><div className="admin-header"><h2>Admin Dashboard</h2><p>Loading user...</p></div></div>;
  }

  if (!isAuthorized) {
    return <div className="admin-panel-container"><div className="admin-header"><h2>Unauthorized</h2><p>You do not have permission to view this page.</p></div></div>;
  }

  return (
    <div className="admin-panel-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <p>Access Level: {isSuperAdmin ? 'Super Admin' : 'Event Admin'}</p>
      </div>

      <div className="admin-tabs">
        <button className={activeTab === 'events' ? 'active' : ''} onClick={() => setActiveTab('events')}>Events</button>
        <button className={activeTab === 'gallery' ? 'active' : ''} onClick={() => setActiveTab('gallery')}>Gallery</button>
        {isSuperAdmin && (
          <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>Bookings</button>
        )}
      </div>

      {/* Events Tab */}
      {activeTab === 'events' && (
        <div className="admin-tab-content">
          <div className="admin-panel-box">
            <h3>Add New Event</h3>
            <form className="admin-form" onSubmit={handleAddEvent}>
              {/* Add event form inputs... */}
               <input type="date" name="date" value={event.date} onChange={(e) => handleChange(e, setEvent)} required />
               <div style={{ display: "flex", gap: "0.5rem" }}>
                 <input type="time" name="startTime" placeholder="Start Time" value={event.startTime} onChange={(e) => handleChange(e, setEvent)} />
                 <input type="time" name="endTime" placeholder="End Time" value={event.endTime} onChange={(e) => handleChange(e, setEvent)} />
               </div>
               <input type="text" name="title" placeholder="Title" value={event.title} onChange={(e) => handleChange(e, setEvent)} required />
               <input type="url" name="eventLink" value={event.eventLink} onChange={(e) => handleChange(e, setEvent)} placeholder="Event Link(Form/Poster)" />
               <input type="text" name="linkText" value={event.linkText} onChange={(e) => handleChange(e, setEvent)} placeholder="Register Now, View Poster, etc." />
               <textarea name="description" placeholder="Description" rows="3" value={event.description} onChange={(e) => handleChange(e, setEvent)} />
               <select name="color" value={event.color} onChange={(e) => handleChange(e, setEvent)}>
                 <option value="bg-teal-600">Teal</option>
                 <option value="bg-red-500">Red</option>
                 <option value="bg-blue-900">Blue</option>
               </select>
               <button type="submit">➕ Add Event</button>
            </form>
          </div>

          <div className="admin-panel-box">
            <h3>Upcoming Events</h3>
            {upcomingEvents.length === 0 ? (<p>No upcoming events.</p>) : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {upcomingEvents.map((ev) => (
                  <li key={ev.id} className="event-item">
                    <div><strong>{ev.title}</strong><br />{ev.date} @ {ev.startTime}</div>
                    <button onClick={() => handleDeleteEvent(ev.id)}>❌</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="admin-panel-box">
            <h3>Past Event Results</h3>
            {pastEvents.length === 0 ? (<p>No past events yet.</p>) : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {pastEvents.map((ev) => (
                  <li key={ev.id} className="event-item">
                    <div><strong>{ev.title}</strong><br />{ev.date} | Winner: {ev.winner || 'N/A'}</div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => openResultsModal(ev)} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem' }}>✏️ Add/Edit Results</button>
                      <button onClick={() => handleDeleteEvent(ev.id)}>❌</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Gallery Tab */}
      {activeTab === 'gallery' && (
         <div className="admin-tab-content">{/* Gallery content remains the same */}</div>
      )}

      {/* Bookings Tab (Super Admin Only) */}
      {isSuperAdmin && activeTab === 'bookings' && (
        <div className="admin-tab-content">{/* Bookings content remains the same */}</div>
      )}

      {/* Event Results Modal */}
      {showResultsModal && selectedEventForResults && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ background: 'white', padding: '2rem', borderRadius: '0.5rem', maxWidth: '500px', width: '90%', maxHeight: '80vh', overflow: 'auto' }}>
            <h3>Add/Edit Results: {selectedEventForResults.title}</h3>
            <form onSubmit={handleUpdateEventResults}>
              <textarea
                name="eventSummary"
                placeholder="Write anything about the event: highlights, winners, scorecards, or notes"
                value={eventResults.eventSummary}
                onChange={(e) => handleChange(e, setEventResults)}
                style={{ width: '100%', minHeight: '200px', marginBottom: '1rem', padding: '0.75rem' }}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" style={{ background: '#10b981', color: 'white', border: 'none', padding: '0.75rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}>
                  Save Summary
                </button>
                <button type="button" onClick={closeResultsModal} style={{ background: '#6b7280', color: 'white', border: 'none', padding: '0.75rem 1rem', borderRadius: '0.25rem', cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;