'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DesktopLayout from './DesktopLayout'
import MobileLayout from './MobileLayout'
import { useTranslation } from '../i18n/I18nProvider'

export interface Section {
  id: string
  title: string
  image: string
  projectId: string
  description: string
}

export default function MissionSections() {
  const { t } = useTranslation('common');
  const [hasMounted, setHasMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  // Generate missions array with translations
  const missions = [
    { path: '/missions/QUASAR', name: t('missions.quasar') },
    { path: '/missions/PULSAR', name: t('missions.pulsar') },
    { path: '/missions/TOYGAR', name: t('missions.toygar') },
    { path: '/missions/OPERNATE', name: t('missions.operante') },
    { path: '/missions/CAELIFERA', name: t('missions.caelifera') },
    { path: '/missions/BITIRIM', name: t('missions.bitirim') }
  ]

  // Generate sections with translations
  const sections: Section[] = [
    {
      id: 'QUASAR',
      title: t('missions.quasar'),
      image: '/images/r3.jpg',
      projectId: '1',
      description: t('heroSection.description')
    },
    {
      id: 'TOYGAR',
      title: t('missions.toygar'),
      image: '/images/Toygar5.png',
      projectId: '2',
      description: t('missions.toygarDesc') || "Katı Kompozit Yakıtlı Roket Motoru"
    },
    {
      id: 'BITIRIM',
      title: t('missions.bitirim'),
      image: '/images/Bitirim.png',
      projectId: '3',
      description: t('heroSection.description')
    },
    {
      id: 'OPERNATE',
      title: t('missions.operante'),
      image: '/images/operante.jpg',
      projectId: '4',
      description: t('missions.operanteDesc') || 'Gelecek nesil uzay operasyonları ve teknoloji geliştirme'
    },
    {
      id: 'CAELIFERA',
      title: t('missions.caelifera'),
      image: '/images/55.png',
      projectId: '5',
      description: t('missions.caeliferaDesc') || 'Yenilikçi uzay taşımacılığı çözümleri'
    },
    {
      id: 'PULSAR',
      title: t('missions.pulsar'),
      image: '/images/roket.png',
      projectId: '6',
      description: t('missions.pulsarDesc') || 'Yenilikçi uzay taşımacılığı çözümleri'
    }
  ]

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