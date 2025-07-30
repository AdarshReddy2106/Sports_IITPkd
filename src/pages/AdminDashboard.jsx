import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "../../Js/supabase";
import "./admindash.css";

const AdminDashboard = () => {
  const { user } = useUser();
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);

  const [event, setEvent] = useState({
    date: "",
    startTime: "",
    endTime: "",
    title: "",
    description: "",
    color: "bg-teal-600",
    eventLink: "", //  field for registrationLink and posterUrl
    linkText: "View Details", // Optional: custom text for the link
  });

  const adminEmails = [
    "102301018@smail.iitpkd.ac.in",
    "122301042@smail.iitpkd.ac.in",
  ];
  const isAdmin =
    user && adminEmails.includes(user.primaryEmailAddress?.emailAddress);

  useEffect(() => {
    if (!isAdmin) return;

    fetchBookings();
    fetchEvents();
  }, [isAdmin]);

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

  const updateStatus = async (id, status) => {
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
    const { date, startTime, endTime, title, description, color, eventLink, linkText } = event;
    
    const { error } = await supabase.from("events").insert([
      { 
        date, 
        startTime, 
        endTime, 
        title, 
        description, 
        color,
        eventLink: eventLink || null,
        linkText: linkText || "View Details"
      },
    ]);

    if (error) {
      alert("❌ Failed to add event: " + error.message);
    } else {
      alert("✅ Event added successfully");
      setEvent({
        date: "",
        startTime: "",
        endTime: "",
        title: "",
        description: "",
        color: "bg-teal-600",
        eventLink: "",
        linkText: "View Details",
      });
      fetchEvents();
    }
  };

  const handleDeleteEvent = async (id) => {
    const { error } = await supabase.from("events").delete().eq("id", id);
    if (!error) fetchEvents();
    else alert("Error deleting event: " + error.message);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  if (!isAdmin) return <div>Unauthorized</div>;

  return (
    <div className="admin-panel-container">
      {/* ➕ Add Event */}
      <div className="admin-panel-box">
        <h3>Add Event</h3>
        <form className="admin-form" onSubmit={handleAddEvent}>
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            required
          />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="time"
              name="startTime"
              placeholder="Start Time"
              value={event.startTime}
              onChange={handleChange}
            />
            <input
              type="time"
              name="endTime"
              placeholder="End Time"
              value={event.endTime}
              onChange={handleChange}
            />
          </div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={event.title}
            onChange={handleChange}
            required
          />

          <input
            type="url"
            name="eventLink"
            value={event.eventLink}
            onChange={handleChange}
            placeholder="Event Link(Form/Poster)"
          />
          <input
            type="text"
            name="linkText"
            value={event.linkText}
            onChange={handleChange}
            placeholder="Register Now, View Poster, More Info, etc."
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            value={event.description}
            onChange={handleChange}
            // required
          />
          
          <select
            name="color"
            value={event.color}
            onChange={handleChange}
          >

            <option value="bg-teal-600">Teal</option>
            <option value="bg-red-500">Red</option>
            <option value="bg-blue-900">Blue</option>
          </select>
          <button type="submit">➕ Add Event</button>
        </form>
      </div>

      {/* 📋 Existing Events */}
      <div className="admin-panel-box">
        <h3>Upcoming Events</h3>
        {events.length === 0 ? (
          <p>No events added yet.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {events.map((ev) => (
              <li key={ev.id} className="event-item">
                <div>
                  <strong>{ev.title}</strong>
                  <br />
                  {ev.date} @ {ev.startTime} - {ev.endTime}
                  <br />
                  <small>{ev.description}</small>
                </div>
                <button onClick={() => handleDeleteEvent(ev.id)}>❌</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 📅 Facility Bookings */}
      <div className="facility-bookings">
        <h2>Facility Bookings</h2>
        <table className="booking-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Facility</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.name}</td>
                <td>{b.email}</td>
                <td>{b.facility}</td>
                <td>{b.date}</td>
                <td>{b.start_time} - {b.end_time}</td>
                <td>{b.status}</td>
                <td>
                  <div className="booking-actions">
                    <button onClick={() => updateStatus(b.id, 'accepted')} disabled={b.status === 'accepted'}>
                      Accept
                    </button>
                    <button onClick={() => updateStatus(b.id, 'rejected')} disabled={b.status === 'rejected'}>
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
