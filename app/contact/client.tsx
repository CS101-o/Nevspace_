// app/paydaslar/client-page.tsx
'use client'

import dynamic from 'next/dynamic'

const Iletisim = dynamic(
  () => import('@/components/sections/Iletisim'),
  { ssr: false }
)

export default function paydaslarComponent() {
  return <Iletisim />;
}