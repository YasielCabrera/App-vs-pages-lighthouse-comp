import type { AppProps } from 'next/app';
import '../styles/globals.css'; // Assuming you have a global CSS file

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <Component {...pageProps} />
    </main>
  );
}
