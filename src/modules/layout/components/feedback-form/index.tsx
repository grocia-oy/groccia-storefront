'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@modules/common/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@modules/common/components/ui/form';
import { Input } from '@modules/common/components/ui/input';
import { Textarea } from '@modules/common/components/ui/textarea';
import { useDictionary } from '@lib/context/dictionary-context';
import { Label } from '@modules/common/components/ui/label';

const formSchema = z.object({
  email: z.string().email(),
  message: z.string().min(1),
});

function FeedbackForm() {
  const dictionary = useDictionary();
  const dictionaryFeedback = dictionary.layout.feedback;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      message: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <Label className="text-lg">{dictionaryFeedback.title}</Label>
      <FormDescription>{dictionaryFeedback.description}</FormDescription>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                {dictionary.common.email}
                <span className="text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={dictionaryFeedback.emailPlaceholder}
                  {...field}
                />
              </FormControl>
              {form.formState.errors.email && (
                <p className="font-medium text-sm text-destructive">
                  {dictionaryFeedback.emailError}
                </p>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                {dictionaryFeedback.title}
                <span className="text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={dictionaryFeedback.messagePlaceholder}
                  {...field}
                />
              </FormControl>
              {form.formState.errors.message && (
                <p className="font-medium text-sm text-destructive">
                  {dictionaryFeedback.messageError}
                </p>
              )}
            </FormItem>
          )}
        />
        <Button type="submit">{dictionaryFeedback.send}</Button>
      </form>
    </Form>
  );
}

export default FeedbackForm;
