import { z } from "zod";

export const bookingSchema = z.object({
    tour_id: z.string().uuid("Select a valid tour"),
    booking_number: z.string().min(1, "Booking number is required"),
    booking_date: z.string().min(1, "Select a booking date"),
    departure_time: z.string().min(1, "Select a departure time"),
    guest_count: z.number().int().positive("Guest count must be at least 1"),
    total_price: z.number().nonnegative("Total price cannot be negative"),
    lead_name: z.string().min(1, "Lead name is required"),
    email: z.string().trim().email("Enter a valid email"),
    phone: z.string().min(1, "Phone number is required"),
    remarks: z.string().optional(),
    status: z.string().default("pending"),
    payment_status: z.string().default("pending"),
});

export const bookingPassengerSchema = z.object({
    first_name: z.string().min(1, "Passenger first name is required"),
    last_name: z.string().min(1, "Passenger last name is required"),
    country: z.string().min(1, "Passenger country is required"),
    is_lead: z.boolean().default(false),
});

export type BookingPayload = z.infer<typeof bookingSchema>;
export type BookingPassengerPayload = z.infer<typeof bookingPassengerSchema>;
