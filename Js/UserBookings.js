import { supabase } from "./supabase";

export const createBooking = async (bookingData) => {
  try {
    console.log('Attempting to insert booking:', bookingData);
    
    // Validate required fields
    if (!bookingData.user_id) {
      throw new Error('User ID is required');
    }
    if (!bookingData.name || !bookingData.email) {
      throw new Error('Name and email are required');
    }
    
    const { data, error } = await supabase
      .from("bookings")
      .insert([{ ...bookingData, status: 'pending' }])
      .select()
      .single();

    if (error) {
      console.error("Supabase error creating booking:", error);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log("Booking created successfully:", data);
    return data;
  } catch (err) {
    console.error("Error in createBooking function:", err);
    throw err; // Re-throw to be caught by the calling function
  }
};