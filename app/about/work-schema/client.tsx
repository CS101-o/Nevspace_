// app/about/work-schema/client-page.tsx
'use client'

import dynamic from 'next/dynamic'

const OrganizationChart = dynamic(
  () => import('@/components/sections/about/work-schema'),
  { ssr: false }
)

export default function ClientPage() {
  return <OrganizationChart />;
}