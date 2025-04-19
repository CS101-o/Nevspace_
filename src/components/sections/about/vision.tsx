'use client'
//import React, { useEffect } from 'react'
import { Rocket, Target, Quote } from 'lucide-react'
import Navigation from '@/components/UI/Navigation'
import Image from 'next/image'
import { useTranslation } from '@/components/i18n/I18nProvider' // useI18n, add later 
import Logo from '@/components/UI/logo'

const VisionPage = () => {

  const { t, i18n } = useTranslation('common');
  //const { dir } = useI18n();
  //const isRTL = dir =='rtl'; 

  // Check what's available in our translation namespace
  console.log("Available translations:", i18n.getResourceBundle(i18n.language, 'about'));



  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(0,1,45)] via-[rgb(0,1,65)] to-[rgb(0,1,45)] text-white relative overflow-hidden">
      <Navigation/>
      
      <header className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Logo />
        </div>
      </header>
        
      {/* Background elements */}

      <div className="absolute top-40 right-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl opacity-10 animate-pulse"></div>


      {/* Hero Image Section */}
      <section className="hero-section relative h-96 w-full">
        <div className="absolute inset-0">
          <Image 
            src="/images/vision.jpg" 
            alt={t('visionPage.about.heroAlt')}
            fill
            className="object-cover filter brightness-75"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040720] via-[#04072090] to-[#04072030]" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {t('about.visionPage.heroTitle')}
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-md">
            {t('about.visionPage.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {/* Header section */}
          <div className="relative">
            <div className="absolute -left-4 -top-4 w-20 h-20 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
            <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-blue-300 mb-2">
              {t('about.visionPage.title')}
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
          </div>

          <div className="space-y-8">
            {/* 2030 Goals Section */}
            <section className="backdrop-blur-sm bg-white/5 rounded-lg p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-white/90"></h2>
              </div>
              <p className="text-lg text-white/80 leading-relaxed">
              {t('about.visionPage.goalsContent')}
              </p>
            </section>

            {/* Long Term Vision Section */}
            <section className="backdrop-blur-sm bg-white/5 rounded-lg p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center space-x-2 mb-4">
                <Rocket className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-white/90">Uzun Vadeli Vizyon</h2>
              </div>
              <p className="text-lg text-white/80 leading-relaxed">
              {t('about.visionPage.longTermContent')}
              </p>
            </section>

            {/* Quote Section */}
            <section className="relative backdrop-blur-md bg-gradient-to-r from-white/10 to-white/5 p-8 rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="absolute -left-2 -top-2">
                <Quote className="w-8 h-8 text-blue-400 opacity-50" />
              </div>
              <blockquote className="text-xl italic text-white/70 pl-6">
              {t('about.visionPage.quote')}
              </blockquote>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisionPage