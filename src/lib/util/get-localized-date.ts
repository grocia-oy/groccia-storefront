import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

// Import locales
import 'dayjs/locale/vi';
import 'dayjs/locale/en';
import 'dayjs/locale/fi';

dayjs.extend(localizedFormat);

export function getLocalizedDate(
  date: Date,
  format: string = 'lll',
  locale: string = 'en'
) {
  return dayjs(date).locale(locale).format(format);
}
