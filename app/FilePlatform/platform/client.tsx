// app/paltform/apply/client-page.tsx
'use client'

import dynamic from 'next/dynamic'

const PlatformPage = dynamic(
  () => import('@/components/sections/platform'),
  { ssr: false }
)

export default function ClientPage() {
  return <PlatformPage />;
}