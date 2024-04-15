import DictionaryProvider from '@lib/context/dictionary-context';
import { ReactNode } from 'react';
import { getDictionary } from './dictionaries';

type Props = { children: ReactNode; lang: string };

export async function LocaleLevelProviders({ children, lang }: Props) {
  const dictionary = await getDictionary(lang);

  return (
    <DictionaryProvider dictionary={dictionary}>{children}</DictionaryProvider>
  );
}
