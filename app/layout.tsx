import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './rtl.css' // Add RTL styles
import { I18nProvider } from '../src/components/i18n/I18nProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nevspace',
  description: 'Space and Technology Solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Note: We can't dynamically set html attributes based on client state here
  // because this is a Server Component, so we'll do that in the I18nProvider
  return (
    <html lang="tr">
      <body className={inter.className}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}