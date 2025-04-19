'use client'
import React, { useEffect, useRef } from 'react'
import { Star } from 'lucide-react'
import Navigation from '@/components/UI/Navigation'
import Image from 'next/image'
import { useI18n, useTranslation } from '@/components/i18n/I18nProvider'
import Logo from '@/components/UI/logo'

interface PrincipleProps {
  text: string
}

interface ContentSectionProps {
  title: string
  children: React.ReactNode
}

const Principle: React.FC<PrincipleProps> = ({ text }) => {
  const { dir } = useI18n();
  const isRTL = dir === 'rtl'; 
  
  return (
    <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300`}>
      <div className="w-2 h-2 bg-blue-400 rounded-full" aria-hidden="true"></div>
      <span className="text-lg text-white/80">{text}</span>
    </div>
  )
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, children }) => {
  const { dir } = useI18n();
  const isRTL = dir === 'rtl';
  
  return (
    <section className={`backdrop-blur-sm bg-white/5 rounded-lg p-8 border border-white/10 hover:border-white/20 transition-all duration-300 ${isRTL ? 'text-right' : ''}`}>
      <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : ''} space-x-2 mb-4`}>
        <Star className="w-6 h-6 text-blue-400" aria-hidden="true" />
        <h2 className="text-2xl font-semibold text-white/90">{title}</h2>
      </div>
      {children}
    </section>
  )
}

const WhoWeArePage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  //const [hasMounted, setHasMounted] = useState(false);
  
  // Translation hooks
  const { t } = useTranslation('whoWeAre');
  const { dir } = useI18n();
  const isRTL = dir === 'rtl';
  
  useEffect(() => {
    //setHasMounted(true);
    document.body.classList.add('space-background')
    return () => document.body.classList.remove('space-background')
  }, [])

  // Get principles from translations
  const principles = [
    t('about.whoWeArePage.principles.peace'),
    t('about.whoWeArePage.principles.dialogue'),
    t('about.whoWeArePage.principles.justice'),
    t('about.whoWeArePage.principles.equality'),
    t('about.whoWeArePage.principles.fairOrder'),
    t('about.whoWeArePage.principles.humanRights')
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-b from-[rgb(0,1,45)] via-[rgb(0,1,65)] to-[rgb(0,1,45)] text-white relative overflow-hidden">
      <Navigation />
      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Logo />
          
          
        </div>
      </header>
      
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/about.jpg" 
            alt={t('about.whoWeArePage.heroAlt')}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-7xl font-bold tracking-tight text-white mb-2 text-center">
            {t('about.whoWeArePage.title')}
          </h1>
        </div>
      </div>

      {/* Background elements */}
      <div 
        className="absolute inset-0 bg-[url('/stars.png')] opacity-30"
        aria-hidden="true"
      />
      
      {/* Main content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {/* Content Header */}
          <div className={`relative ${isRTL ? 'text-right' : ''}`}>
            <div 
              className={`absolute ${isRTL ? '-right-4' : '-left-4'} -top-4 w-20 h-20 bg-blue-500 rounded-full blur-3xl opacity-20`}
              aria-hidden="true"
            />
            <div className={`h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent rounded-full ${isRTL ? 'mr-0' : 'ml-0'}`} />
          </div>

          <div className="space-y-8">
            <ContentSection title={t('about.whoWeArePage.personalTitle')}>
              <p className={`text-lg text-white/80 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                {t('about.whoWeArePage.personalContent')}
              </p>
            </ContentSection>

            <ContentSection title={t('about.whoWeArePage.practicalTitle')}>
              <p className={`text-lg text-white/80 leading-relaxed ${isRTL ? 'text-right' : ''}`}>
                {t('about.whoWeArePage.practicalContent')}
              </p>
            </ContentSection>

            <ContentSection title={t('about.whoWeArePage.spiritualTitle')}>
              <p className={`text-lg text-white/80 leading-relaxed mb-6 ${isRTL ? 'text-right' : ''}`}>
                {t('about.whoWeArePage.spiritualContent')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {principles.map((principle, index) => (
                  <Principle key={index} text={principle} />
                ))}
              </div>
            </ContentSection>
          </div>
        </div>
      </main>

      {/* Decorative elements */}
      <div 
        className="absolute top-40 right-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-20 left-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl opacity-10 animate-pulse"
        aria-hidden="true"
      />
    </div>
  )
}

export default WhoWeArePage