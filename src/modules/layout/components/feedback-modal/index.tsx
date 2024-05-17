import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@modules/common/components/ui/dialog';
import FeedbackForm from '../feedback-form';
import { getDictionary } from 'app/[lang]/dictionaries';

type FeedbackModalProps = {
  lang: string;
};

async function FeedbackModal({ lang }: FeedbackModalProps) {
  const dictionary = await getDictionary(lang).catch(() => {});

  return (
    <Dialog>
      <DialogTrigger className="text-primary-foreground">
        {dictionary.layout.feedback.giveFeedback}
      </DialogTrigger>
      <DialogContent>
        <FeedbackForm />
      </DialogContent>
    </Dialog>
  );
}

export default FeedbackModal;
