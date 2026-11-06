import type { Metadata } from 'next'
import Home from '../page'

const title = 'Caleb Kwabena Kyere Boateng | Systèmes embarqués, électronique et microélectronique'
const description =
  "Étudiant ingénieur en systèmes embarqués à JUNIA ISEN à Lille. Simulation de circuits, conception de PCB, firmware et tests : un contrôleur de charge USB-C intelligent sur ESP32-C3, un amplificateur optique à détection synchrone et un amplificateur CMOS sous Cadence Virtuoso."

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/fr/',
    languages: { en: '/', fr: '/fr/', 'x-default': '/' },
  },
  openGraph: {
    title,
    description,
    url: 'https://www.kyere.tech/fr/',
    siteName: 'Caleb Kwabena Kyere Boateng',
    images: [{ url: '/og-image.jpeg', width: 1200, height: 630, alt: 'Caleb Kwabena Kyere Boateng' }],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title, description, images: ['/og-image.jpeg'] },
}

export default Home
