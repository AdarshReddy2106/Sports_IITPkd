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
  });

  const adminEmails = [
    "102301018@smail.iitpkd.ac.in",
    "122301042@smail.iitpkd.ac.in",
  ];
  const isAdmin =
    user && adminEmails.includes(user.primaryEmailAddress?.emailAddress);

  // Fetch bookings and events
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
    try {
      const res = await fetch("http://localhost:2030/events");
      const data = await res.json();
      setEvents(data);
    } catch {
      alert("Error fetching events");
    }
  };

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);
    if (!error) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();

    const eventToSave = {
      ...event,
      date: event.date, // Already in YYYY-MM-DD format from date input
    };

    try {
      const res = await fetch("http://localhost:2030/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventToSave),
      });

      if (res.ok) {
        alert("✅ Event added successfully");

        // Reset form
        setEvent({
          date: "",
          startTime: "",
          endTime: "",
          title: "",
          description: "",
          color: "bg-teal-600",
        });

        // Fetch updated events
        fetchEvents();
      } else {
        alert("❌ Failed to add event");
      }
    } catch (err) {
      alert("Server error: " + err.message);
    }
  };

  const handleDeleteEvent = async (index) => {
    try {
      const res = await fetch(`http://localhost:2030/events/${index}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchEvents();
      } else {
        alert("Failed to delete event");
      }
    } catch {
      alert("Error deleting event");
    }
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
              required
            />
            <input
              type="time"
              name="endTime"
              placeholder="End Time"
              value={event.endTime}
              onChange={handleChange}
              required
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
          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            value={event.description}
            onChange={handleChange}
            required
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
            {events.map((ev, index) => (
              <li key={index} className="event-item">
                <div>
                  <strong>{ev.title}</strong>
                  <br />
                  {ev.date} @ {ev.startTime} - {ev.endTime}
                  <br />
                  <small>{ev.description}</small>
                </div>
                <button onClick={() => handleDeleteEvent(index)}>❌</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 📅 Facility Bookings Full Width */}
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