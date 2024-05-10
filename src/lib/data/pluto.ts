import { plutoClient } from '@lib/config';
import { Feedback } from 'types/pluto';

export async function sendFeedback(feedback: Feedback) {
  return plutoClient.createFeedback(feedback).catch(() => {
    throw new Error('Cannot send feedback');
  });
}
