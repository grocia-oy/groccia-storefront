import { z } from 'zod';

export const feedbackSchema = z.object({
  email: z.string().email(),
  message: z.string().min(1),
});
