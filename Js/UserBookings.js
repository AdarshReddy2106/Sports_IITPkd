import { supabase } from "./supabase";

/**
 * Creates a new booking record in the database.
 * @param {object} bookingData - The data for the new booking.
 * @returns {Promise<object|null>} The created booking data or null on error.
 */
export const createBooking = async (bookingData) => {
  try {
    // Basic validation
    if (!bookingData.user_id || !bookingData.facility || !bookingData.date) {
      throw new Error('Missing required booking information.');
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert([bookingData]) // Inserts the booking data as a new row
      .select()
      .single(); // Assumes you want to get the single created record back

    if (error) {
      console.error("Supabase error creating booking:", error);
      // More specific error for unique constraint violation
      if (error.code === '23505') {
          throw new Error('This time slot is already booked or pending.');
      }
      throw error;
    }

    console.log("Booking created successfully in Supabase:", data);
    return data;

  } catch (err) {
    console.error("Error in createBooking function:", err);
    // Re-throw the error so the calling component can handle it
    throw err;
  }
};


/**
 * Fetches all bookings for a given set of facilities on a specific date.
 * @param {string[]} facilityNames - An array of facility names to fetch bookings for.
 * @param {string} date - The date in 'YYYY-MM-DD' format.
 * @returns {Promise<{data: object[]|null, error: object|null}>} The fetched data and any error.
 */
export const getBookingsByFacilityAndDate = async (facilityNames, date) => {
    if (!facilityNames || facilityNames.length === 0 || !date) {
        return { data: [], error: null };
    }

    try {
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .in('facility', facilityNames) // Use 'in' to match any facility in the array
            .eq('date', date); // Match the specific date
            // We fetch all statuses to correctly display them (pending, accepted, etc.)

        if (error) {
            console.error("Supabase error fetching bookings:", error);
            throw error;
        }

        return { data, error: null };

    } catch (err) {
        console.error("Error in getBookingsByFacilityAndDate:", err);
        return { data: null, error: err };
    }
};

/**
 * Fetches all bookings for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<{data: object[]|null, error: object|null}>} The user's bookings and any error.
 */
export const getBookingsByUserId = async (userId) => {
    if (!userId) {
        return { data: [], error: { message: "User ID is required." } };
    }

    try {
        const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('user_id', userId)
            .order('date', { ascending: false });

        if (error) {
            console.error("Supabase error fetching user bookings:", error);
            throw error;
        }
        
        return { data, error: null };

    } catch (err) {
        console.error("Error in getBookingsByUserId:", err);
        return { data: null, error: err };
    }
};

/**
 * Sends a booking notification by calling the backend API.
 * @param {object} bookingDetails - The details of the booking.
 * @returns {Promise<boolean>} True if the email was sent successfully, false otherwise.
 */
export const sendBookingNotification = async (bookingDetails) => {
    // The URL for your backend email service
    const API_ENDPOINT = 'http://localhost:3001/api/send-booking-email';

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingDetails),
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || 'Failed to send booking notification.');
        }

        const result = await response.json();
        console.log('Notification API response:', result.message);
        return true;

    } catch (error) {
        console.error('Error sending booking notification:', error);
        // This error could be a network failure or an error from the API
        return false;
    }
};