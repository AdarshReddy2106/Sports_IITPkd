import { supabase } from "./supabase";

/**
 * Creates a new booking record in the database.
 * @param {object} bookingData - The data for the new booking.
 * @returns {Promise<object|null>} The created booking data or null on error.
 */
export const createBooking = async (bookingData) => {
  try {
    if (!bookingData.user_id || !bookingData.facility || !bookingData.date) {
      throw new Error('Missing required booking information.');
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert([bookingData])
      .select()
      .single();

    if (error) {
      console.error("Supabase error creating booking:", error);
      if (error.code === '23505') {
          throw new Error('This time slot is already booked or pending.');
      }
      throw error;
    }
    return data;
  } catch (err) {
    console.error("Error in createBooking function:", err);
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
            .in('facility', facilityNames)
            .eq('date', date);

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
    const API_ENDPOINT = 'http://localhost:2030/api/booking/send-email';
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
        return false;
    }
};