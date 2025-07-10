import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "../../Js/supabase";

const AdminDashboard = () => {
  const { user } = useUser();
  const [bookings, setBookings] = useState([]);

  const isAdmin = user?.fullName === "KOTHA ADARSH REDDY";

  useEffect(() => {
    const fetchBookings = async () => {
      const { data, error } = await supabase.from("bookings").select("*");
      if (!error) setBookings(data);
    };
    if (isAdmin) fetchBookings();
  }, [isAdmin]);

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);
    if (!error) {
      setBookings(prev =>
        prev.map(b => (b.id === id ? { ...b, status } : b))
      );
    }
  };

  if (!isAdmin) return <div>Unauthorized</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Dashboard</h1>
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>User</th><th>Email</th><th>Facility</th><th>Date</th><th>Time</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.name}</td>
              <td>{b.email}</td>  
              <td>{b.facility}</td>
              <td>{b.date}</td>
              <td>{b.start_time} - {b.end_time}</td>
              <td>{b.status}</td>
              <td>
                <button onClick={() => updateStatus(b.id, 'accepted')} disabled={b.status === 'accepted'}>Accept</button>
                <button onClick={() => updateStatus(b.id, 'rejected')} disabled={b.status === 'rejected'} style={{ marginLeft: '0.5rem' }}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
