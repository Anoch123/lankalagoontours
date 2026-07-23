import { z } from "zod";


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
        .optional(),

    description: z
        .string()
        .min(20, "Description is too short"),

    duration: z
        .string()
        .min(1, "Duration is required"),


    price: z
        .number()
        .positive("Price must be greater than 0"),


    image: z
        .string()
        .min(1, "Image is required"),


    type: z
        .string()
        .min(1, "Tour type is required"),


    departures: z
        .string()
        .optional(),


    groupMin: z
        .number()
        .min(1, "Minimum group size required"),


    groupMax: z
        .number()
        .min(1, "Maximum group size required"),


    ageLevel: z.string().optional(),

    fitness: z.string().optional(),

    departureLocation: z
        .string()
        .min(3, "Departure location required"),


    summary: z
        .string()
        .min(20, "Summary is too short"),


    details: z
        .array(z.string())
        .min(1, "Add at least one highlight"),


    included: z
        .array(z.string()),


    gallery: z
        .array(z.string()),


    itinerary: z
        .array(
            z.object({
                title:z.string(),
                time:z.string(),
                copy:z.string()
            })
        )
        .min(1,"Add itinerary")

});


export type BoatTourPayload = z.infer<typeof boatTourSchema>;