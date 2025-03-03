'use client'

import { use, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Navigation from '../UI/Navigation'
import { Space_Grotesk } from 'next/font/google'
import { Section } from './MissionSections'
import { useScrollDirection } from '../Hooks/UseScrollDirection'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

interface DesktopLayoutProps {
  sections: Section[]
  missions: { path: string; name: string }[]
  handleExamineClick: (sectionId: string) => void
  scrollToNext: (index: number) => void
}

export default function DesktopLayout({
  sections,
  missions,
  handleExamineClick,
  scrollToNext
}: DesktopLayoutProps) {
  const navRef = useRef<HTMLDivElement>(null)
  const {scrollDirection, pastFirstPage} = useScrollDirection()
  const [currentSection, setCurrentSection] = useState(0)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger)
      
      // Section animations
      sections.forEach((_, index) => {
        if (index === 0) return
        
        ScrollTrigger.create({
          trigger: `#section-${index}`,
          start: 'top center',
          onEnter: () => {
            setCurrentSection(index)
            gsap.to(`#section-${index} .content-wrapper`, {
              opacity: 1,
              x: 0,
              duration: 1.2
            })
            gsap.to(`#section-${index} .examine-button`, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 0.4
            })
          },
          onLeaveBack: () => {
            if (index > 0) {
              setCurrentSection(index -1)
            }
            gsap.to(`#section-${index} .content-wrapper`, {
              opacity: 0,
              x: -20,
              duration: 1.2
            })
            gsap.to(`#section-${index} .examine-button`, {
              opacity: 0,
              y: 20,
              duration: 0.8
            })
          }
        })
      })

      // Navigation and social media animations
      const ctx = gsap.context(() => {
        gsap.from('.social-sidebar a', {
          opacity: 0,
          x: 50,
          duration: 0.8,
          stagger: 0.2,
          delay: 1,
          clearProps: 'all'
        })

        gsap.from('.mission-nav a', {
          opacity: 0,
          y: -20,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.5,
          clearProps: 'all'
        })

        // Add animation for logo
        gsap.from('.logo-container', {
          opacity: 0,
          x: -30,
          duration: 0.8,
          delay: 0.3,
          clearProps: 'all'
        })
      })

      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        ctx.revert()
      }
    }
  }, [sections])

  return (
    <>
       {/* Mission Navigation with Logo */}
        <div 
          ref={navRef} 
          className={`fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/50 to-transparent
            ${pastFirstPage ? 'bg-blue-900/95' : 'bg-gradient-to-b from-black/50 to-transparent'}
            transition-transform duration-300 ease-in-out
            ${scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'}`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="mission-nav flex items-center justify-center h-24 relative">
              {/* Logo */}
              <div className="logo-container absolute left-4">
                <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
                  <div className="relative w-[140px] h-[45px]">
                    <Image
                      src="/images/logo.svg"
                      alt="Nevspace Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </Link>
              </div>
              {/* Navigation Links - Now Centered */}
              <div className="flex items-center justify-center space-x-8">
                {missions.map((mission) => (
                  <Link
                    key={mission.name}
                    href={mission.path}
                    className="text-white text-opacity-90 hover:text-opacity-100 transition-all duration-300 
                      text-sm tracking-wider px-4 font-medium"
                  >
                    {mission.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

      {/* Social Media Sidebar */}
      <div className={`social-sidebar fixed right-6 top-1/2 transform -translate-y-1/2 z-30 transition-opacity duration-500 ${pastFirstPage ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex flex-col space-y-6">
          <a href="https://instagram.com/nevspace" className="text-white text-opacity-90 hover:text-opacity-100 transition-all duration-300">
            <Instagram size={50} strokeWidth={1.5} />
          </a>
          <a href="https://x.com/NevSpaceX/status/1847564366897418434" className="text-white text-opacity-90 hover:text-opacity-100 transition-all duration-300">
            <Twitter size={50} strokeWidth={1.5} />
          </a>
          <a href='https://facebook.com/nevspace' className="text-white text-opacity-90 hover:text-opacity-100 transition-all duration-300">
            <Facebook size={50} strokeWidth={1.5} />
          </a>
          <a href="https://www.youtube.com/@nevspacex" className="text-white text-opacity-90 hover:text-opacity-100 transition-all duration-300">
            <Youtube size={50} strokeWidth={1.5} />
          </a>
          <a href='https://linkedin.com/company/nevspace' className="text-white text-opacity-90 hover:text-opacity-100 transition-all duration-300">
            <Linkedin size={50} strokeWidth={1.5} />
          </a>
        </div>
      </div>

      <Navigation />
      
      <main className="relative">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={`section-${index}`}
            className="relative h-screen w-full overflow-hidden"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority={index === 0}
                quality={100}
              />
              {index === 0 && (
                <div className="absolute bottom-8 right-8 text-white/80 text-lg tracking-wider">
                  2030, QUASAR Misyonu
                </div>
              )}
            </div>
            
            {/* Content */}
            <div className={`content-wrapper relative h-full flex flex-col justify-between 
              px-8 sm:px-16 md:px-24 lg:px-32 z-10 
              ${index !== 0 ? 'opacity-0 translate-x-[-20px]' : ''}`}>
              
              {/* Top Content */}
              <div className={`${index === 0 ? 'max-w-xl p-6 rounded-lg mt-28 -ml-20' : 'mt-48'}`}>
                {index === 0 ? (
                  <div className="space-heading-wrapper">
                    <div className="nevspace-badge inline-block text-sm font-light tracking-[0.4em] mb-6 text-gray-300
                      border border-white/20 py-2 px-4 rounded-full backdrop-blur-sm
                      hover:border-white/40 transition-all duration-300">
                      Nevspace
                    </div>
                    <div className="overflow-hidden">
                      <h1 className="space-heading">
                        {['MİLLİ', 'TEKNOLOJİ', 'HAMLESİ'].map((text, i) => (
                          <span 
                            key={text} 
                            className={`${spaceGrotesk.className} title-slide title-slide-delay-${i + 1} block text-[8vw] 
                              md:text-[70px] font-bold leading-[1.1] tracking-[0.04em] 
                              ${i < 2 ? 'mb-2' : ''}`}
                            style={{
                              textTransform: 'uppercase',
                              background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              textShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
                            }}>
                            {text}
                          </span>
                        ))}
                      </h1>
                    </div>
                    <div className="description-fade mt-8 text-lg tracking-wider text-gray-300 max-w-xl leading-relaxed">
                      {section.description}
                    </div>
                  </div>
                ) : (
                  // Simplified mission page layout
                  <div className='absolute bottom-32'>
                    <div className="text-sm uppercase tracking-[0.2em] text-gray-300 mb-4">
                      ...
                    </div>
                    <h1 className="text-[60px] font-bold text-white leading-none tracking-wide mb-8">
                      {section.title}
                    </h1>
                    <button
                      onClick={() => handleExamineClick(section.id)}
                      className="examine-button group relative px-12 py-4 text-white border border-white/30
                        rounded-full overflow-hidden hover:border-white/60 transition-all duration-500
                        hover:bg-white/10"
                    >
                      <span className="relative text-lg tracking-wider">
                        INCELE
                      </span>
                    </button>
                  </div>
                  
                  )}
              </div>

              {/* Bottom Content - Only show for opening page */}
              {index === 0 && (
                <div className="max-w-2xl mb-10">
                  <div className="text-lg tracking-wider text-gray-300 max-w-xl leading-relaxed mb-6">
                    Projeyi daha detaylı inceleyin ve bizimle iletişime geçin.
                  </div>
                  <button
                    onClick={() => handleExamineClick(section.id)}
                    className="examine-button group relative px-12 py-4 text-white border border-white/30
                      rounded-full overflow-hidden hover:border-white/60 transition-all duration-500
                      hover:bg-white/10"
                  >
                    <span className="relative text-lg tracking-wider">
                      İNCELE
                    </span>
                  </button>
                </div>
              )}
            </div>

            
            {/* Scroll Indicator */}
            {index < sections.length - 1 && (
              <button
                onClick={() => scrollToNext(index)}
                className="absolute bottom-12 left-1/2 -translate-x-1/2
                  text-white/70 hover:text-white transition-all duration-300 z-20
                  group"
              >
                <span className="block text-sm mb-2 tracking-wider transition-transform duration-300
                  group-hover:transform group-hover:-translate-y-1">
                  Aşağı Kaydır
                </span>
                <ChevronDown className="w-6 h-6 animate-bounce mx-auto opacity-70 group-hover:opacity-100" />
              </button>
            )}
          </section>
        ))}
      </main>

      {/* Footer */}
      <div className="bg-blue-900 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-24 text-white/70 text-sm">
            <div>NEVSPACE © 2025</div>
            <div className="flex space-x-8">
              <Link href="/privacy" className="hover:text-white transition-colors duration-300">
                GİZLİLİK POLİTİKASI
              </Link>
              <Link href="/suppliers" className="hover:text-white transition-colors duration-300">
                TEDARİKÇİLER
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )}