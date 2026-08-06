export type Category = "Sunset" | "Wildlife" | "Mangroves" | "Guests" | "Fishing" | "Village";

export interface Photo {
    id: string;
    src: string;
    title: string;
    tourName: string;
    category: Category;
    tall?: boolean;
}