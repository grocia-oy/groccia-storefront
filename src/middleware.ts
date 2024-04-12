import { Region } from '@medusajs/medusa';
import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import { i18n } from '../i18-config';

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
const DEFAULT_LOCALE_ISO3 =
  process.env.NEXT_PUBLIC_DEFAULT_LOCALE_ISO3 || 'fin';
const DEFAULT_LOCALE_ISO2 = process.env.NEXT_PUBLIC_DEFAULT_LOCALE_ISO3 || 'fi';

type CountryISO3 = string;
type AvailableLocalesMap = Map<CountryISO3, { iso_2: string }>;

function findBestLocales(
  request: NextRequest,
  availableLocales: AvailableLocalesMap
) {
  try {
    let locale: string = DEFAULT_LOCALE_ISO3;

    const vercelDetectedLocale = request.headers
      .get('x-vercel-ip-country')
      ?.toLowerCase();
    const availableLocalesArray = Array.from(
      availableLocales,
      ([name, value]) => ({ name, value })
    );
    const vercelDetectedLocaleISO3 = availableLocalesArray.find(
      (element) => element.value.iso_2 === vercelDetectedLocale
    )?.name;

    const splittedPathname = request.nextUrl.pathname.split('/');
    const localeFromPathname = splittedPathname[2];

    if (localeFromPathname && availableLocales.has(localeFromPathname)) {
      locale = localeFromPathname;
    } else if (vercelDetectedLocale && vercelDetectedLocaleISO3) {
      locale = vercelDetectedLocaleISO3;
    } else if (availableLocales.has(DEFAULT_LOCALE_ISO2)) {
      locale = DEFAULT_LOCALE_ISO3;
    } else if (availableLocales.keys().next().value) {
      locale = availableLocales.keys().next().value;
    }

    return locale;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(
        'Middleware.ts: Error getting the locale, check the NEXT_PUBLIC_MEDUSA_BACKEND_URL'
      );
    }
  }
}

function findBestLang(request: NextRequest) {
  const { availableLanguages, defaultLanguage } = i18n;

  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const langFromPathname = request.nextUrl.pathname.split('/')[1];
  if (availableLanguages.includes(langFromPathname)) {
    return langFromPathname;
  }

  let languages: string[] = new Negotiator({
    headers: negotiatorHeaders,
  }).languages();

  const matchedLocale = matchLocale(
    languages,
    availableLanguages,
    defaultLanguage
  );

  return matchedLocale;
}

async function getAvailableLocales() {
  try {
    const { regions } = await fetch(`${BACKEND_URL}/store/regions`, {
      next: {
        revalidate: 3600,
        tags: ['regions'],
      },
    }).then((res) => res.json());
    const localeMap: AvailableLocalesMap = new Map();

    regions.forEach((region: Region) => {
      region.countries.forEach((country) => {
        localeMap.set(country.iso_3, { iso_2: country.iso_2 });
      });
    });

    return localeMap;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error(
        'Middleware.ts: Error fetching regions and locales. Did you set up regions in your Medusa Admin and define a NEXT_PUBLIC_MEDUSA_BACKEND_URL environment variable?'
      );
    }
  }
}

/**
 * Middleware to handle region selection and onboarding status.
 */
export async function middleware(request: NextRequest) {
  const splittedPathname = request.nextUrl.pathname.split('/');
  const availableLocales = await getAvailableLocales();

  const locale = availableLocales && findBestLocales(request, availableLocales);

  const urlHasLocale = splittedPathname[2]
    ? locale && splittedPathname[2].includes(locale)
    : false;

  const lang = findBestLang(request);
  const urlHasLang = lang && splittedPathname[1].includes(lang);

  if (urlHasLang && urlHasLocale) {
    return NextResponse.next();
  }

  let response = NextResponse.error();

  if (urlHasLang && !urlHasLocale && locale) {
    const redirectPath = request.nextUrl.pathname.replace(
      `/${lang}`,
      `${lang}/${locale}`
    );

    response = NextResponse.redirect(
      `${request.nextUrl.origin}/${redirectPath}`
    );
  }

  if (!urlHasLang && lang && !urlHasLocale && locale) {
    const redirectPath =
      request.nextUrl.pathname === '/'
        ? `${lang}/${locale}`
        : `${lang}/${locale}/${request.nextUrl.pathname}`;

    response = NextResponse.redirect(
      `${request.nextUrl.origin}/${redirectPath}`
    );
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico|images).*)'],
};
