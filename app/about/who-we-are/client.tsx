'use client'
import dynamic from 'next/dynamic'

const WhoWeArePage = dynamic(
  () => import('@/components/sections/about/who-we-are'),
  { 
    ssr: false,
    
  }
)

export default function ClientPage() {
  return (
      <WhoWeArePage />
    
  )
}