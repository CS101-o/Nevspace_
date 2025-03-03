'use client'
import dynamic from 'next/dynamic'

const VisionPage = dynamic(
  () => import('@/components/sections/about/vision'),
  { ssr: false }
)

export default function ClientPage() {
  return <VisionPage/>
}