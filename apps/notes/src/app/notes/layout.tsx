import type { Metadata } from 'next'
import { Noto_Serif, Raleway } from 'next/font/google'
import '../globals.css'
import { Providers } from '@/components/Providers'

const raleway = Raleway({
  variable: "--font-raleway-sans",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Notes app",
  description: "a challenge for keyless",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSerif.variable} ${raleway.variable} antialiased`}>
        <div className="font-sans flex  w-screen min-h-screen   gap-16 ">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
