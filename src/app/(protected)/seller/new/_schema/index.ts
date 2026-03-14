import { z } from "zod";

export const newLotSchema = z.object({
  name: z
    .string()
    .min(5, "Lot title must be at least 5 characters for proper appraisal."),
  categoryId: z.string().min(1, "Please select a category."),
  reservePrice: z.coerce
    .number()
    .min(1, "A reserve price is required for institutional protection."),
  increment: z.coerce.number().min(100, "Minimum increment is $100."),
  startTime: z.string().min(1, "Exhibition commencement time is required."),
  endTime: z.string().min(1, "Exhibition conclusion time is required."),
  description: z
    .string()
    .min(20, "Please provide a detailed exhibition note for the connoisseurs."),
});

export type NewLotFormData = z.infer<typeof newLotSchema>;
