'use client'
import dynamic from 'next/dynamic'

const Page = dynamic(
  () => import('@/components/sections/about/danismanlar'),
  { ssr: false }
)

export default function ClientPage() {
  return <Page/>
}