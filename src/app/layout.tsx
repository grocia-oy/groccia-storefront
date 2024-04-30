import { Metadata } from 'next';
import localFont from 'next/font/local';
import 'styles/globals.css';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:8000';

// Fonts
const raleway = localFont({
  src: [
    {
      path: '../../public/fonts/Raleway/Raleway400.ttf',
      weight: '400',
    },
    {
      path: '../../public/fonts/Raleway/Raleway600.ttf',
      weight: '600',
    },
  ],
  variable: '--font-raleway',
});

const poppins = localFont({
  src: [
    {
      path: '../../public/fonts/Poppins/Poppins300.ttf',
      weight: '300',
    },
    {
      path: '../../public/fonts/Poppins/Poppins400.ttf',
      weight: '400',
    },
    {
      path: '../../public/fonts/Poppins/Poppins600.ttf',
      weight: '600',
    },
  ],
  variable: '--font-poppins',
});

const gotag = localFont({
  src: [{ path: '../../public/fonts/Gotag/Gotag.ttf', weight: '400' }],
  variable: '--font-gotag',
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
};

export default function RootLayout(props: { children: React.ReactNode }) {
  console.log(props);
  return (
    <html
      className={`${raleway.variable} ${poppins.variable} ${gotag.variable}`}
    >
      <body>
        <main className="relative font-poppins">{props.children}</main>
      </body>
    </html>
  );
}
