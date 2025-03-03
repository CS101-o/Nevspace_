// app/annocement/client-page.tsx
'use client'

import dynamic from 'next/dynamic'

const Announcements = dynamic(
  () => import('@/components/sections/announcements'),
  { ssr: false }
)

export default function paydaslarComponent() {
  return < Announcements/>;
  
}