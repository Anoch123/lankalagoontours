export interface BookingPassenger {
    id: string;
    booking_id: string;
    first_name: string;
    last_name: string;
    country: string;
    is_lead: boolean;
}

export interface BookingCustomerGroup {
    booking_id: string;
    booking: {
        booking_number: string;
        booking_date: string;
        status: "pending" | "confirmed" | "cancelled" | "completed";
    };
    passengers: BookingPassenger[];
}

export interface BoatTourSummary {
    id: string;
    title: string;
    slug: string;
}

export interface Booking {
    id: string;
    booking_number: string;

    tour_id: string;
    booking_date: string;
    departure_time: string;

    guest_count: number;
    total_price: number;

    lead_name: string;
    email: string;
    phone: string;
    remarks: string;

    payment_status: "pending" | "paid" | "failed" | "refunded";
    status: "pending" | "confirmed" | "cancelled" | "completed";

    created_at: string;
    updated_at: string;

    // Joined relations (optional)
    boat_tours?: BoatTourSummary;
    booking_passengers?: BookingPassenger[];
}