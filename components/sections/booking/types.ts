// Booking types — mirrors the public client serializer from the Django
// backend at GET /api/client/bookings/<ref>/. Operator-only fields
// (client_rate, driver_rate, profit) are stripped on the client serializer
// and intentionally omitted here.

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type BookingCarPhoto = {
  id: number;
  cover_photos: string;
  order: number;
  is_featured: boolean;
};

export type BookingCar = {
  id: number;
  title: string;
  slug: string;
  vehicle_type?: string;
  number_of_seats?: number;
  category?: string;
  features?: string[];
  short_description?: string;
  cover_photos?: BookingCarPhoto[];
};

export type BookingDriver = {
  id: number;
  full_name: string;
  phone?: string;
  whatsapp?: string;
};

export type BookingDay = {
  id: number;
  date: string;        // "YYYY-MM-DD"
  day_type: "full_day" | "half_day";
  start_time: string | null;
  end_time: string | null;
  notes: string | null;
};

export type Booking = {
  id: number;
  booking_reference: string;
  title?: string;
  status: BookingStatus;
  car: BookingCar;
  driver?: BookingDriver | null;
  customer_name: string;
  customer_email?: string;
  customer_phone?: string;
  pickup_location?: string;
  dropoff_location?: string;
  trip_description?: string;
  days: BookingDay[];
  total_days: number;
  is_multi_day: boolean;
  created_at: string;
};
