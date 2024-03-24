import 'server-only';

const dictionaries: Record<string, any> = {
  en: () =>
    import('../../dictionaries/en.json').then((module) => module.default),
  vi: () =>
    import('../../dictionaries/vi.json').then((module) => module.default),
  fi: () =>
    import('../../dictionaries/fi.json').then((module) => module.default),
};

export const getDictionary = async (lang: string) => dictionaries[lang]();
