// app/paydaslar/client-page.tsx
'use client'

import dynamic from 'next/dynamic'

const Paydaslar = dynamic(
  () => import('@/components/sections/paydaslar'),
  { ssr: false }
)

export default function paydaslarComponent() {
  return <Paydaslar />;
}