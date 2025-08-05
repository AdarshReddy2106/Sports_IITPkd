import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "../../Js/supabase";
import "./admindash.css";

const AdminDashboard = () => {
  const { isLoaded, user } = useUser();
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [galleryItems, setGalleryItems] = useState([]);
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

  // State for gallery form - updated for file uploads
  const [galleryItem, setGalleryItem] = useState({
    title: "",
    category: "",
    colorClass: "teal",
  });

  // New state for file uploads
  const [selectedFiles, setSelectedFiles] = useState({
    image1: null,
    image2: null,
    image3: null
  });
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const [summaryText, setSummaryText] = useState("");

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
      fetchGalleryItems();
    }
  }, [isLoaded, isAuthorized, isSuperAdmin]);
  
  // --- Filter events into past and upcoming ---
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events.filter(e => new Date(e.date) >= today);
  const pastEvents = events.filter(e => new Date(e.date) < today);

  // --- Fetch functions ---
  const fetchBookings = async () => {
    const { data, error } = await supabase.from("bookings").select("*").order('date', { ascending: false });
    if (!error) {
      const sortedData = (data || []).sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (b.status === 'pending' && a.status !== 'pending') return 1;
        return 0;
      });
      setBookings(sortedData);
    }
  };

  const fetchEvents = async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });
    if (!error) setEvents(data);
  };

  const fetchGalleryItems = async () => {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setGalleryItems(data || []);
  };

  const updateStatus = async (id, status) => {
    if (!isSuperAdmin) return;
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (!error) {
      fetchBookings();
    } else {
      alert("Error updating status: " + error.message);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("events").insert([{ ...event, eventLink: event.eventLink || null, linkText: event.linkText || "View Details", user_id: user.id }]);
    if (error) {
      alert("❌ Failed to add event: " + error.message);
    } else {
      alert("✅ Event added successfully");
      setEvent({ date: "", startTime: "", endTime: "", title: "", description: "", color: "bg-teal-600", eventLink: "", linkText: "View Details" });
      fetchEvents();
    }
  };

  const handleDeleteEvent = async (id) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) fetchEvents();
    else alert("Error deleting event: " + error.message);
  };

  // New file handling functions
  const handleFileChange = (e, imageNumber) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        alert('Please select a valid image file (JPEG, PNG, WebP, or GIF)');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setSelectedFiles(prev => ({
        ...prev,
        [imageNumber]: file
      }));
    }
  };

  const uploadImageToSupabase = async (file, fileName) => {
    try {
      const { data, error } = await supabase.storage
        .from('gallery-images') // Make sure this bucket exists in your Supabase storage
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  // Updated gallery management function
  const handleAddGalleryItem = async (e) => {
    e.preventDefault();
    if (!galleryItem.title.trim()) {
      alert("Please enter a title for the gallery item");
      return;
    }

    if (!selectedFiles.image1) {
      alert("Please select at least one image");
      return;
    }

    setUploadingGallery(true);

    try {
      const timestamp = Date.now();
      const sanitizedTitle = galleryItem.title.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
      
      // Upload files and get URLs
      const imageUrls = {};
      
      for (let i = 1; i <= 3; i++) {
        const file = selectedFiles[`image${i}`];
        if (file) {
          const fileName = `${sanitizedTitle}_${timestamp}_${i}.${file.name.split('.').pop()}`;
          const url = await uploadImageToSupabase(file, fileName);
          imageUrls[`imageUrl${i}`] = url;
        }
      }

      // Insert into database
      const { error } = await supabase.from("gallery").insert([{
        ...galleryItem,
        ...imageUrls,
        user_id: user.id,
        created_at: new Date().toISOString()
      }]);

      if (error) throw error;

      alert("✅ Gallery item added successfully");
      
      // Reset form
      setGalleryItem({
        title: "",
        category: "",
        colorClass: "teal",
      });
      setSelectedFiles({
        image1: null,
        image2: null,
        image3: null
      });
      
      // Reset file inputs
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach(input => input.value = '');
      
      fetchGalleryItems();
    } catch (error) {
      alert("❌ failed to add gallery item: " + error.message);
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (!error) {
        fetchGalleryItems();
        alert("✅ Gallery item deleted successfully");
      } else {
        alert("Error deleting gallery item: " + error.message);
      }
    }
  };
  
  // --- Results Modal Logic ---
  const openResultsModal = (event) => {
    setSelectedEventForResults(event);
    setSummaryText(event.eventSummary || ""); 
    setShowResultsModal(true);
  };

  const closeResultsModal = () => {
    setShowResultsModal(false);
    setSelectedEventForResults(null);
    setSummaryText(""); 
  };
  
  const handleUpdateEventResults = async (e) => {
    e.preventDefault();
    if (!selectedEventForResults) return;
    try {
      const { error } = await supabase
        .from("events")
        .update({ eventSummary: summaryText })
        .eq("id", selectedEventForResults.id);

      if (error) throw error;

      alert("✅ Event results updated successfully!");
      closeResultsModal();
      fetchEvents();
    } catch (error) {
      alert("❌ Failed to update event results: " + error.message);
    }
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
        {isSuperAdmin && (<button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>Bookings</button>)}
      </div>

      {activeTab === 'events' && (
        <div className="admin-tab-content">
          <div className="admin-panel-box form-column">
            <h3>Add New Event</h3>
            <form className="admin-form" onSubmit={handleAddEvent}>
               <input type="date" name="date" value={event.date} onChange={(e) => setEvent(prev => ({ ...prev, date: e.target.value }))} required />
               <div style={{ display: "flex", gap: "0.5rem" }}>
                 <input type="time" name="startTime" placeholder="Start Time" value={event.startTime} onChange={(e) => setEvent(prev => ({ ...prev, startTime: e.target.value }))} />
                 <input type="time" name="endTime" placeholder="End Time" value={event.endTime} onChange={(e) => setEvent(prev => ({ ...prev, endTime: e.target.value }))} />
               </div>
               <input type="text" name="title" placeholder="Title" value={event.title} onChange={(e) => setEvent(prev => ({ ...prev, title: e.target.value }))} required />
               <input type="url" name="eventLink" value={event.eventLink} onChange={(e) => setEvent(prev => ({ ...prev, eventLink: e.target.value }))} placeholder="Event Link(Form/Poster)" />
               <input type="text" name="linkText" value={event.linkText} onChange={(e) => setEvent(prev => ({ ...prev, linkText: e.target.value }))} placeholder="Register Now, View Poster, etc." />
               <textarea name="description" placeholder="Description" rows="3" value={event.description} onChange={(e) => setEvent(prev => ({ ...prev, description: e.target.value }))} />
               <select name="color" value={event.color} onChange={(e) => setEvent(prev => ({ ...prev, color: e.target.value }))}>
                 <option value="bg-teal-600">Teal</option>
                 <option value="bg-red-500">Red</option>
                 <option value="bg-blue-900">Blue</option>
               </select>
               <button type="submit">➕ Add Event</button>
            </form>
          </div>

          <div className="events-column">
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
                      <div><strong>{ev.title}</strong><br />{ev.date} </div>
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
        </div>
      )}

      {activeTab === 'gallery' && (
        <div className="admin-tab-content">
          <div className="admin-panel-box form-column">
            <h3>Add Gallery Item</h3>
            <form className="admin-form" onSubmit={handleAddGalleryItem}>
              <input 
                type="text" 
                name="title" 
                placeholder="Title (e.g., Cricket Ground)" 
                value={galleryItem.title} 
                onChange={(e) => setGalleryItem(prev => ({ ...prev, title: e.target.value }))} 
                required 
              />
              <input 
                type="text" 
                name="category" 
                placeholder="Category (e.g., Facilities, Events)" 
                value={galleryItem.category} 
                onChange={(e) => setGalleryItem(prev => ({ ...prev, category: e.target.value }))} 
                required 
              />
              <select 
                name="colorClass" 
                value={galleryItem.colorClass} 
                onChange={(e) => setGalleryItem(prev => ({ ...prev, colorClass: e.target.value }))}
              >
                <option value="teal">Teal</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
              </select>
              
              {/* File upload inputs */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Image 1 (Required) *
                </label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'image1')}
                  required
                  style={{ width: '100%', padding: '0.5rem', border: '2px solid #ccc', borderRadius: '4px' }}
                />
                {selectedFiles.image1 && (
                  <p style={{ fontSize: '0.8rem', color: 'green', margin: '0.25rem 0' }}>
                    ✓ {selectedFiles.image1.name}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Image 2 (Optional)
                </label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'image2')}
                  style={{ width: '100%', padding: '0.5rem', border: '2px solid #ccc', borderRadius: '4px' }}
                />
                {selectedFiles.image2 && (
                  <p style={{ fontSize: '0.8rem', color: 'green', margin: '0.25rem 0' }}>
                    ✓ {selectedFiles.image2.name}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Image 3 (Optional)
                </label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, 'image3')}
                  style={{ width: '100%', padding: '0.5rem', border: '2px solid #ccc', borderRadius: '4px' }}
                />
                {selectedFiles.image3 && (
                  <p style={{ fontSize: '0.8rem', color: 'green', margin: '0.25rem 0' }}>
                    ✓ {selectedFiles.image3.name}
                  </p>
                )}
              </div>

              <button type="submit" disabled={uploadingGallery}>
                {uploadingGallery ? '📤 Uploading...' : '🖼️ Add Gallery Item'}
              </button>
            </form>
          </div>

          <div className="events-column">
            <div className="admin-panel-box">
              <h3>Gallery Items ({galleryItems.length})</h3>
              {galleryItems.length === 0 ? (
                <p>No gallery items found.</p>
              ) : (
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {galleryItems.map((item) => (
                      <li key={item.id} className="event-item">
                        <div>
                          <strong>{item.title}</strong><br />
                          <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                            {item.category} • {item.colorClass}
                          </span>
                          <br />
                          <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>
                            Images: {[item.imageUrl1, item.imageUrl2, item.imageUrl3].filter(Boolean).length}/3
                          </span>
                        </div>
                        <button onClick={() => handleDeleteGalleryItem(item.id)}>❌</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="admin-panel-box">
              <h3>Gallery Guidelines</h3>
              <div style={{ fontSize: '0.9rem', lineHeight: '1.5', color: 'var(--text-secondary)' }}>
                <p><strong>Image Requirements:</strong></p>
                <ul style={{ paddingLeft: '1rem' }}>
                  <li>At least one image is required</li>
                  <li>Supported formats: JPG, PNG, WebP, GIF</li>
                  <li>Maximum file size: 5MB per image</li>
                  <li>Recommended size: 800x600px or higher</li>
                </ul>
                <p><strong>Categories:</strong> Facilities, Events, Training, Awards, etc.</p>
                <p><strong>Colors:</strong> Choose based on content type for visual consistency</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSuperAdmin && activeTab === 'bookings' && (
        <div className="admin-tab-content">
          <div className="facility-bookings admin-panel-box" style={{ flex: '1 1 100%' }}>
            <h3>Facility Bookings</h3>
            {bookings.length > 0 ? (
              <table className="booking-table">
                <thead>
                  <tr>
                    <th>Email</th><th>Facility</th><th>Date</th><th>Time</th><th>Status</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.email}</td>
                      <td>{booking.facility}</td>
                      <td>{new Date(booking.date).toLocaleDateString()}</td>
                      <td>{`${booking.start_time} - ${booking.end_time}`}</td>
                      <td><span className={`status-badge status-${booking.status.toLowerCase()}`}>{booking.status}</span></td>
                      <td className="booking-actions">
                        {booking.status === 'pending' ? (
                          <>
                            <button onClick={() => updateStatus(booking.id, 'accepted')}>Approve</button>
                            <button onClick={() => updateStatus(booking.id, 'rejected')}>Reject</button>
                          </>
                        ) : ('Handled')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (<p>No bookings found.</p>)}
          </div>
        </div>
      )}

      {showResultsModal && selectedEventForResults && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-primary)' }}>
            <h3>Add/Edit Results: {selectedEventForResults.title}</h3>
            <form onSubmit={handleUpdateEventResults}>
              <textarea
                name="eventSummary"
                placeholder="Write anything about the event: highlights, winners, scorecards, or notes"
                value={summaryText}
                onChange={(e) => setSummaryText(e.target.value)}
                style={{ 
                  width: '100%', 
                  minHeight: '200px', 
                  marginBottom: '1rem', 
                  padding: '0.75rem',
                  border: '3px solid black',
                  borderRadius: '6px',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  resize: 'vertical'
                }}
              />
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', padding: '0.75rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
                  Save Summary
                </button>
                <button type="button" onClick={closeResultsModal} style={{ background: '#6b7280', color: 'white', border: 'none', padding: '0.75rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
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