import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Caleb Kyere Boateng | Computer Science Student Portfolio',
  description: 'Computer Science student at KNUST specializing in programming language design, computer networking, and full-stack development. Seeking internship opportunities.',
  keywords: ['Computer Science', 'Software Engineer', 'Computer Networking', 'Programming Languages', 'Full Stack Developer', 'React', 'Node.js', 'Python', 'KNUST'],
  authors: [{ name: 'Caleb Kyere Boateng' }],
  creator: 'Caleb Kyere Boateng',
  publisher: 'Caleb Kyere Boateng',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://portfolio-chi-nine-93.vercel.app/'),
  openGraph: {
    title: 'Caleb Kyere Boateng | Computer Science Student Portfolio',
    description: 'Computer Science student at KNUST specializing in programming language design and computer networking.',
    url: 'https://portfolio-chi-nine-93.vercel.app/',
    siteName: 'Caleb Kyere Boateng Portfolio',
    images: [
      {
        url: '/og-image.jpeg',
        width: 1200,
        height: 630,
        alt: 'CS Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caleb Kyere Boateng | Computer Science Student Portfolio',
    description: 'Computer Science student at KNUST specializing in programming language design and computer networking.',
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          {children}
        </div>
      </body>
    </html>
  )
}
