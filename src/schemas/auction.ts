import { z } from "zod";

export const bidSchema = (currentHighestBid: number, increment: number) => 
  z.object({
    amount: z.coerce.number()
      .min(currentHighestBid + increment, { 
        message: `Your bid must exceed the current highest by at least $${increment.toLocaleString()}` 
      })
      .positive("Your bid must be a positive value in the Aureus ecosystem"),
  });

export type BidFormData = z.infer<ReturnType<typeof bidSchema>>;
