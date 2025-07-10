import { supabase } from "./supabase";

export const createBooking = async (bookingData) => {
  const { data, error } = await supabase
    .from("bookings")
    .insert([bookingData])
    .single();

  if (error) {
    console.error("Error creating booking:", error);
    return null;
  }

  return data;
};

