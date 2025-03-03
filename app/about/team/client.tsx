'use client'
import dynamic from 'next/dynamic'

const TeamPage = dynamic(
  () => import('@/components/sections/about/team'),
  { ssr: false }
)

export default function ClientPage() {
  return <TeamPage/>
}