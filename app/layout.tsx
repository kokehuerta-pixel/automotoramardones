import type {Metadata} from 'next';
import { Teko, Poppins } from 'next/font/google';
import './globals.css'; // Global styles

const teko = Teko({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Autos usados en Rancagua | Automotora Mardones',
  description: 'Concesionario boutique de venta de autos usados en Rancagua con más de 50 años de experiencia. Financiamos tu auto con pie desde 20% y pre-aprobación rápida.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es" className={`${teko.variable} ${poppins.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="https://automotoramardones.cl/wp-content/uploads/2023/10/cropped-logoautomotoramardones-32x32.png" sizes="32x32" />
        <style>{`
          .font-display {
            font-family: var(--font-display), sans-serif;
          }
          .font-body {
            font-family: var(--font-body), sans-serif;
          }
        `}</style>
      </head>
      <body suppressHydrationWarning className="font-body bg-[#FAFAF9] text-[#111827] antialiased">
        {children}
      </body>
    </html>
  );
}
