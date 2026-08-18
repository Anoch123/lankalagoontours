import { z } from "zod";


export const guestPricingSchema = z.object({
    guest_count: z.number().int().positive("Guest count must be at least 1"),
    price: z.number().positive("Price must be greater than 0"),
});

export const boatTourSchema = z.object({

    id: z
        .string()
        .min(3, "Slug is required"),

    title: z
        .string()
        .min(5, "Title must be at least 5 characters"),

    currency: z
        .string()
        .min(1, "Currency is required"),

    tagline: z
        .string()
        .min(1, "Tagline is required"),

    description: z
        .string()
        .min(20, "Description is too short"),

    duration: z
        .string()
        .min(1, "Duration is required"),

    price: z
        .number()
        .positive("Price must be greater than 0"),

    guest_pricing: z
        .array(guestPricingSchema)
        .optional(),

});


export type BoatTourPayload = z.infer<typeof boatTourSchema>;