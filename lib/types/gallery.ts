export type Category = "Mangrove Tour" | "Sunset Tour" | "Fishing Tour" | "Bird Watching" | "Custom Tour";

export type Photo = {
  id: string;
  category: Category;
  title: string;
  seed: string;
  tall?: boolean;
};