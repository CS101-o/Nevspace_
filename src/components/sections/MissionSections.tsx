'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DesktopLayout from './DesktopLayout'
import MobileLayout from './MobileLayout'

export interface Section {
  id: string
  title: string
  image: string
  projectId: string
  description: string
}

export const missions = [
  { path: '/missions/QUASAR', name: 'QUASAR' },
  { path: '/missions/PULSAR', name: 'PULSAR' },
  { path: '/missions/TOYGAR', name: 'TOYGAR' },
  { path: '/missions/OPERNATE', name: 'OPERANTE' },
  { path: '/missions/CAELIFERA', name: 'CAELIFERA' },
  {path: '/missions/BITIRIM', name: 'BITIRIM'}
]

export const sections: Section[] = [
  {
    id: 'QUASAR',
    title: 'QUASAR',
    image: '/images/r3.jpg',
    projectId: '1',
    description: "Türkiye'nin uzay teknolojileri alanındaki öncü girişimi"
  },
  {
    id: 'TOYGAR',
    title: 'TOYGAR',
    image: '/images/Toygar5.png',
    projectId: '2',
    description: "Katı Kompozit Yakıtlı Roket Motoru"
  },
  {
    id: 'BITIRIM',
    title: 'BITIRIM',
    image: '/images/Bitirim.png',
    projectId: '3',
    description: "Türkiye'nin uzay teknolojileri alanındaki öncü girişimi"
  },
  {
    id: 'OPERNATE',
    title: 'OPERANTE',
    image: '/images/operante.jpg',
    projectId: '4',
    description: 'Gelecek nesil uzay operasyonları ve teknoloji geliştirme'
  },
  {
    id: 'CAELIFERA',
    title: 'CAELIFERA',
    image: '/images/55.png',
    projectId: '5',
    description: 'Yenilikçi uzay taşımacılığı çözümleri'
  },
  {
    id: 'PULSAR',
    title: 'PULSAR',
    image: '/images/roket.png',
    projectId: '6',
    description: 'Yenilikçi uzay taşımacılığı çözümleri'
  }
]

export default function MissionSections() {
  const [hasMounted, setHasMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    setHasMounted(true)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleExamineClick = (sectionId: string) => {
    router.push(`/missions/${sectionId}`)
  }

  const scrollToNext = (index: number) => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: window.innerHeight * (index + 1),
        behavior: 'smooth'
      })
    }
  }

  if (!hasMounted) return null

  return (
    <div className="relative">
      {isMobile ? (
        <MobileLayout
          sections={sections}
          missions={missions}
          handleExamineClick={handleExamineClick}
          scrollToNext={scrollToNext}
        />
      ) : (
        <DesktopLayout
          sections={sections}
          missions={missions}
          handleExamineClick={handleExamineClick}
          scrollToNext={scrollToNext}
        />
      )}
    </div>
  )
}