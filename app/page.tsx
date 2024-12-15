// app/page.tsx
'use client'

import { Suspense } from 'react'
import MissionSections from '@/components/sections/MissionSections'

function Loading() {
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>
  )
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <MissionSections />
      </Suspense>
    </main>
  )
}