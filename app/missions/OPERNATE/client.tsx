'use client'
import dynamic from 'next/dynamic'

const MissionPage = dynamic(
  () => import('@/components/sections/missionPages/OPERNATE'),
  { ssr: false }
)

export default function QUSARClientComponent() {
  return <MissionPage />;
}
