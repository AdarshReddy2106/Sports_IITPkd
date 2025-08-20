import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useUser, SignInButton } from '@clerk/clerk-react';
import { supabase } from '../../../Js/supabase';
import { createBooking, getBookingsByFacilityAndDate, getBookingsByUserId, sendBookingNotification } from '../../../Js/UserBookings';
import './Bookings.css';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

// --- Helper Components ---
const TimeClock = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);
    return <div className="time-display">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</div>;
};

const DateDisplay = ({ date, setDate }) => (
    <div className="date-selector">
        <button onClick={() => setDate(d => new Date(d.setDate(d.getDate() - 1)))}>‹</button>
        <span className="date-text">{date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        <button onClick={() => setDate(d => new Date(d.setDate(d.getDate() + 1)))}>›</button>
    </div>
);

const SportTabs = ({ sports, selectedSport, setSelectedSport }) => (
    <div className="sport-tabs">
        {sports.map(sport => (
            <button key={sport.id} className={`sport-tab-btn ${selectedSport === sport.id ? 'active' : ''}`} onClick={() => setSelectedSport(sport.id)}>
                {sport.name}
            </button>
        ))}
    </div>
);

const Legend = () => (
    <div className="legend">
        <div className="legend-item"><span className="dot available"></span>Available</div>
        <div className="legend-item"><span className="dot pending"></span>Pending</div>
        <div className="legend-item"><span className="dot booked"></span>Booked</div>
    </div>
);

const BookingModal = ({ slot, facility, date, onClose, onBookingSuccess }) => {
    const { user, isSignedIn } = useUser();
    const [notes, setNotes] = useState('');
    const [participants, setParticipants] = useState(1);
    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // If not signed in, show a login prompt instead of the booking form
    if (!isSignedIn) {
        return (
            <div className="modal-backdrop" onClick={onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2>Login Required</h2>
                        <button onClick={onClose} className="close-btn">&times;</button>
                    </div>
                    <div className="modal-body" style={{ textAlign: 'center' }}>
                        <p style={{ marginBottom: '1.5rem' }}>Please sign in to book this facility.</p>
                        <SignInButton mode="modal">
                            <button className="submit-btn" style={{ width: 'auto', display: 'inline-block', margin: '0 auto' }}>
                                Sign In to Continue
                            </button>
                        </SignInButton>
                    </div>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus('Processing your booking...');

        const bookingData = {
            user_id: user.id,
            name: user.fullName,
            email: user.primaryEmailAddress.emailAddress,
            facility: facility.name,
            date: date.toISOString().split('T')[0],
            start_time: `${String(slot.hour).padStart(2, '0')}:00`,
            end_time: `${String(slot.hour + 1).padStart(2, '0')}:00`,
            participants: parseInt(participants, 10),
            notes: notes,
            status: 'pending'
        };

        try {
            const result = await createBooking(bookingData);
            if (result) {
                setStatus('Booking...');
                await sendBookingNotification(result);
                setStatus('Booking sent! Waiting for confirmation.');
                setTimeout(() => {
                    onBookingSuccess();
                    onClose();
                }, 2000);
            } else {
                throw new Error('Failed to create booking.');
            }
        } catch (error) {
            console.error("Booking failed:", error);
            setStatus(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header"><h2>Book Slot</h2><button onClick={onClose} className="close-btn">&times;</button></div>
                <div className="modal-body">
                    <p><strong>Facility:</strong> {facility.name}</p>
                    <p><strong>Date:</strong> {date.toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {slot.label}</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group"><label htmlFor="participants">Number of Participants</label><input type="number" id="participants" value={participants} onChange={(e) => setParticipants(e.target.value)} min="1" required /></div>
                        <div className="form-group"><label htmlFor="notes">Additional Notes</label><textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Any special requests?" /></div>
                        <button type="submit" className="submit-btn" disabled={isLoading}>{isLoading ? 'Booking...' : 'Confirm Booking'}</button>
                        {status && <p className="status-message">{status}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

const AvailabilityGrid = ({ facility, date, bookings, onSlotClick }) => {
    const timeSlots = useMemo(() => {
        const slots = [];
        for (let hour = 7; hour < 22; hour++) {
            const period = hour < 12 ? 'AM' : 'PM';
            const displayHour = hour <= 12 ? (hour === 0 ? 12 : hour) : hour - 12;
            
            const bookingForSlot = bookings.find(b => {
                const bookingStartHour = parseInt(b.start_time.split(':')[0]);
                return hour === bookingStartHour && (b.status === 'accepted' || b.status === 'pending');
            });
            
            let status = 'available';
            if (bookingForSlot) {
                status = bookingForSlot.status === 'accepted' ? 'booked' : 'pending';
            }

            slots.push({ hour, label: `${displayHour}:00 ${period}`, status });
        }
        return slots;
    }, [bookings, date]);

    return (
        <div className="availability-grid-container">
            <div className="grid-header">
                <div className="header-cell court-name">Court / Time</div>
                {timeSlots.map(slot => <div key={slot.hour} className="header-cell time-label">{slot.label}</div>)}
            </div>
            <div className="grid-body">
                <div className="body-row">
                    <div className="body-cell court-name">{facility.name}</div>
                    {timeSlots.map(slot => (
                        <div key={slot.hour} className={`body-cell status-${slot.status}`} onClick={() => slot.status === 'available' && onSlotClick(slot)}>
                            {slot.status === 'available' ? 'A' : ''}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const UserBookingsList = ({ bookings, isLoading }) => {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'accepted': return <CheckCircle className="status-icon accepted" />;
            case 'rejected': return <XCircle className="status-icon rejected" />;
            case 'pending':
            default: return <Clock className="status-icon pending" />;
        }
    };
    
    if (isLoading) return <div className="user-bookings-list"><h3>My Bookings</h3><p>Loading...</p></div>;
    if (!bookings || bookings.length === 0) return <div className="user-bookings-list"><h3>My Bookings</h3><p>You have no active bookings.</p></div>;

    return (
        <div className="user-bookings-list">
            <h3>My Bookings</h3>
            <ul>
                {bookings.map(booking => (
                    <li key={booking.id} className={`booking-list-item status-bg-${booking.status}`}>
                        <div className="item-icon">{getStatusIcon(booking.status)}</div>
                        <div className="item-details">
                            <strong>{booking.facility}</strong>
                            <span>{new Date(booking.date).toLocaleDateString()} at {booking.start_time}</span>
                        </div>
                        <div className={`item-status status-text-${booking.status}`}>{booking.status}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// --- Main Component ---
const Bookings = () => {
    const { user, isSignedIn } = useUser();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedSport, setSelectedSport] = useState('badminton');
    const [allBookings, setAllBookings] = useState([]);
    const [userBookings, setUserBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const sports = [
        { id: 'badminton', name: 'Badminton' },
        { id: 'basketball', name: 'Basketball' },
         { id: 'cricket', name: 'Cricket' },
        { id: 'football', name: 'Football' },
        { id: 'table_tennis', name: 'Table Tennis' },
        { id: 'volleyball', name: 'Volleyball' },
    ];
    
    const facilities = {
        badminton: [{ id: 'badminton', name: 'Badminton Court' }],
        basketball: [{ id: 'basketball', name: 'Basketball Court' }],
        cricket: [{ id: 'cricket', name: 'Cricket Ground' }],
        football: [{ id: 'football_ground', name: 'Football Ground' }],
        table_tennis: [{ id: 'tt_table_1', name: 'Table Tennis 1' }, { id: 'tt_table_2', name: 'Table Tennis 2' }],
        volleyball: [{ id: 'volleyball_court_1', name: 'Volleyball Court' }],
    };

    const selectedFacilities = facilities[selectedSport] || [];

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        const dateString = currentDate.toISOString().split('T')[0];
        const facilityNames = selectedFacilities.map(f => f.name);

        const allBookingsRes = await getBookingsByFacilityAndDate(facilityNames, dateString);
        if (allBookingsRes.error) console.error("Error fetching all bookings:", allBookingsRes.error);
        else setAllBookings(allBookingsRes.data || []);
        
        // Only fetch user bookings if the user is signed in
        if (isSignedIn) {
            const userBookingsRes = await getBookingsByUserId(user.id);
            if (userBookingsRes.error) console.error("Error fetching user bookings:", userBookingsRes.error);
            else setUserBookings(userBookingsRes.data || []);
        } else {
            setUserBookings([]);
        }
        
        setIsLoading(false);
    }, [currentDate, selectedSport, user, isSignedIn]);

    useEffect(() => {
        fetchData();
        const channel = supabase
            .channel('bookings-realtime')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, 
                (payload) => {
                    console.log('Change received!', payload);
                    fetchData();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchData]);
    
    const handleSlotClick = (facility, slot) => {
        setSelectedSlot({ facility, ...slot });
    };

    return (
        <div className="booking-status-page">
            {selectedSlot && (
                <BookingModal
                    slot={selectedSlot}
                    facility={selectedSlot.facility}
                    date={currentDate}
                    onClose={() => setSelectedSlot(null)}
                    onBookingSuccess={fetchData}
                />
            )}
            <div className="page-header">
                <h1>IIT Palakkad Sports Facility Booking Status</h1>
                <div className="header-controls"><DateDisplay date={currentDate} setDate={setCurrentDate} /><TimeClock /></div>
            </div>

            <SportTabs sports={sports} selectedSport={selectedSport} setSelectedSport={setSelectedSport} />
            
            <div className="main-content">
                <Legend />
                {isLoading ? (
                    <div className="loading-indicator">Loading availability...</div>
                ) : (
                    <div className="grids-container">
                        {selectedFacilities.length > 0 ? (
                            selectedFacilities.map(facility => (
                                <AvailabilityGrid
                                    key={facility.id}
                                    facility={facility}
                                    date={currentDate}
                                    bookings={allBookings.filter(b => b.facility === facility.name)}
                                    onSlotClick={(slot) => handleSlotClick(facility, slot)}
                                />
                            ))
                        ) : <p>No facilities found for this sport.</p>}
                    </div>
                )}
            </div>

            {/* Bottom layout container */}
            <div className="bottom-layout-container">
                {/* Left Column - Only show user bookings if signed in */}
                <div className="left-column">
                    {isSignedIn ? (
                        <div className="user-bookings-section">
                            <UserBookingsList bookings={userBookings} isLoading={isLoading} />
                        </div>
                    ) : (
                        <div className="user-bookings-section">
                            <div className="info-card">
                                <h3 className="info-title">My Bookings</h3>
                                <p style={{ textAlign: 'center', margin: '1.5rem 0' }}>
                                    Sign in to view and manage your bookings
                                </p>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <SignInButton mode="modal">
                                        <button className="submit-btn" style={{ width: 'auto' }}>
                                            Sign In
                                        </button>
                                    </SignInButton>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div className="right-column">
                    {/* Keep existing info-card and help-card unchanged */}
                    <div className="info-card">
                        <h3 className="info-title">Booking Information</h3>
                        <h4 className="info-title" style={{ marginTop: '2rem', marginBottom: '1rem' }}>Booking Policies</h4>
                        <ul className="policies-list">
                            <li className="policy-item">Bookings must be made at least 24 hours in advance</li>
                            <li className="policy-item">Cancellations must be made 12 hours before the scheduled time</li>
                        </ul>
                    </div>
                    
                    <div className="help-card">
                        <h3 className="help-title">Need Help?</h3>
                        <p className="help-description">Our team is ready to assist you with your booking needs. Contact us for personalized assistance.</p>
                        <div className="contact-info">
                            <div className="contact-item">
                                <span>+91 8977276836</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bookings;