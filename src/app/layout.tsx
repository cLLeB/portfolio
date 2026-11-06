import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

// Tells search engines who this site belongs to, so a search for the name can show a profile card.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Caleb Kwabena Kyere Boateng',
  alternateName: 'Caleb Kyere Boateng',
  url: 'https://www.kyere.tech/',
  image: 'https://www.kyere.tech/dp/me.jpg',
  jobTitle: 'Embedded Systems Engineering Student',
  description:
    'Embedded systems engineering student at JUNIA ISEN in Lille, working on electronics, microelectronics, PCB design and firmware.',
  email: 'mailto:caleb-kwabena.kyere@student.junia.com',
  address: { '@type': 'PostalAddress', addressLocality: 'Lille', addressCountry: 'FR' },
  affiliation: { '@type': 'CollegeOrUniversity', name: 'JUNIA ISEN', url: 'https://www.junia.com/' },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Kwame Nkrumah University of Science and Technology',
    url: 'https://www.knust.edu.gh/',
  },
  knowsAbout: [
    'Embedded systems',
    'Electronics',
    'Microelectronics',
    'PCB design',
    'Analog circuit design',
    'CMOS design',
    'ESP32',
    'KiCad',
    'LTspice',
    'Cadence Virtuoso',
    'Network security',
  ],
  knowsLanguage: ['English', 'French'],
  sameAs: ['https://www.linkedin.com/in/caleb-kyere-boateng', 'https://github.com/cLLeB'],
}

export const metadata: Metadata = {
  title: 'Caleb Kwabena Kyere Boateng | Embedded Systems, Electronics & Microelectronics',
  description: 'Embedded systems engineering student at JUNIA ISEN in Lille. Circuit simulation, PCB design, firmware and testing: an ESP32-C3 smart USB-C charge controller, an optical lock-in amplifier and a CMOS amplifier in Cadence Virtuoso.',
  keywords: ['Embedded Systems', 'Electronics', 'Microelectronics', 'ESP32-C3', 'KiCad', 'LTspice', 'ngspice', 'Cadence Virtuoso', 'PCB Design', 'Analog Design', 'CMOS', 'JUNIA ISEN', 'Lille'],
  authors: [{ name: 'Caleb Kyere Boateng' }],
  creator: 'Caleb Kyere Boateng',
  publisher: 'Caleb Kyere Boateng',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.kyere.tech/'),
  openGraph: {
    title: 'Caleb Kwabena Kyere Boateng | Embedded Systems, Electronics & Microelectronics',
    description: 'Embedded systems engineering student at JUNIA ISEN in Lille. Electronics, microelectronics, PCB design and firmware.',
    url: 'https://www.kyere.tech/',
    siteName: 'Caleb Kwabena Kyere Boateng',
    images: [
      {
        url: '/og-image.jpeg',
        width: 1200,
        height: 630,
        alt: 'Caleb Kwabena Kyere Boateng Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caleb Kwabena Kyere Boateng | Embedded Systems, Electronics & Microelectronics',
    description: 'Embedded systems engineering student at JUNIA ISEN in Lille. Electronics, microelectronics, PCB design and firmware.',
    images: ['/og-image.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
