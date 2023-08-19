import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import { Inter } from 'next/font/google';
import { QueryProvider } from './query-provider';
import { Toaster } from '../components/toaster';

export const metadata = {
  title: 'Purly',
  description: 'Purly platform',
};

const font = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={font.className}>
      <body>
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
