import { z } from 'zod';
import { feedbackSchema } from 'schemas';

export type Feedback = z.infer<typeof feedbackSchema>;
