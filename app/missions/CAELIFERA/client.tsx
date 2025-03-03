'use client'
import dynamic from 'next/dynamic'

const MissionPage = dynamic(
  () => import('@/components/sections/missionPages/CAELIFERA'),
  { ssr: false }
)

export default function QUSARClientComponent() {
  return <MissionPage />;
}
