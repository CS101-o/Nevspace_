'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronDown, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Navigation from '../UI/Navigation'
import Kadro from "../UI/kadro"
interface Section {
  id: string
  title: string
  image: string
  projectId: string
  description: string
}

export default function MissionSections() {
  const [hasMounted, setHasMounted] = useState(false)
  
  const missions = [
    { path: '/missions/quasar', name: 'QUASAR' },
    { path: '/missions/pranga', name: 'PRANGA' },
    { path: '/missions/pulsar', name: 'PULSAR' },
    { path: '/missions/toygar', name: 'TOYGAR' },
    { path: '/missions/operante', name: 'OPERANTE' },
    { path: '/missions/caelifera', name: 'CAELIFERA' }
  ]

  const sections: Section[] = [
    {
      id: 'quasar',
      title: 'QUASAR',
      image: '/images/r3.jpg',
      projectId: '7',
      description: "Türkiye'nin uzay teknolojileri alanındaki öncü girişimi"
    },
    {
      id: 'operante',
      title: 'OPERANTE',
      image: '/images/operante.jpg',
      projectId: '3',
      description: 'Gelecek nesil uzay operasyonları ve teknoloji geliştirme'
    },
    {
      id: 'caelifera',
      title: 'CAELIFERA',
      image: '/images/55.png',
      projectId: '2',
      description: 'Yenilikçi uzay taşımacılığı çözümleri'
    }, 
    {
      id: 'Pulsar',
      title: 'Pulsar',
      image: '/images/roket.png',
      projectId: '4',
      description: 'Yenilikçi uzay taşımacılığı çözümleri'
    }
  ]

  useEffect(() => {
    setHasMounted(true)
    
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger)
      
      // Create ScrollTrigger for each section after the first
      sections.forEach((_, index) => {
        if (index === 0) return // Skip first section
        
        ScrollTrigger.create({
          trigger: `#section-${index}`,
          start: 'top center',
          onEnter: () => {
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

      // Animate social icons
      gsap.from('.social-sidebar a', {
        opacity: 0,
        x: 50,
        duration: 0.8,
        stagger: 0.2,
        delay: 1
      })

      // Animate mission navigation
      gsap.from('.mission-nav a', {
        opacity: 0,
        y: -20,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5
      })
    }

    return () => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill())
      }
    }
  }, [])

  const scrollToNext = (index: number) => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: window.innerHeight * (index + 1),
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="relative">
      {/* Mission Navigation */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mission-nav flex items-center justify-center h-24">
            <div className="flex items-center space-x-8">
              {missions.map((mission) => (
                <a
                  key={mission.name}
                  href={mission.path}
                  className="text-white hover:text-white/80 transition-colors duration-300 
                    text-sm tracking-wider px-4"
                >
                  {mission.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Sidebar */}
      <div className="social-sidebar fixed right-6 top-1/2 transform -translate-y-1/2 z-30">
        <div className="flex flex-col space-y-6">
          <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
            <Instagram size={50} />
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
            <Twitter size={50} />
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
            <Facebook size={50} />
          </a>
          <a href="#" className="text-white/70 hover:text-white transition-colors duration-300">
            <Youtube size={50} />
          </a>
        </div>
      </div>


      <Navigation />
      
      
      <main className="relative">
        {hasMounted && sections.map((section, index) => (
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
            </div>
            
            {/* Content */}
            <div className={`content-wrapper relative h-full flex flex-col justify-between 
              px-8 sm:px-16 md:px-24 lg:px-32 z-10 
              ${index !== 0 ? 'opacity-0 translate-x-[-20px]' : ''}`}>
              
              {/* Top Content */}
              <div className="max-w-xl  p-6 rounded-lg  mt-28 -ml-20">
                {index === 0 ? (
                  <div className="space-heading-wrapper">
                  <div className="nevspace-badge inline-block text-sm font-light tracking-[0.4em] mb-6 text-gray-300
                    border border-white/20 py-2 px-4 rounded-full backdrop-blur-sm
                    hover:border-white/40 transition-all duration-300">
                    Nevspace
                  </div>
                  <div className="overflow-hidden">
                    <h1 className="space-heading">
                      <span className="title-slide title-slide-delay-1 block text-[8vw] md:text-[60px] font-bold leading-[1.2] tracking-wide text-white drop-shadow-lg mb-2">
                        MİLLİ
                      </span>
                      <span className="title-slide title-slide-delay-2 block text-[8vw] md:text-[60px] font-bold leading-[1.2] tracking-wide text-white drop-shadow-lg mb-2">
                        TEKNOLOJİ
                      </span>
                      <span className="title-slide title-slide-delay-3 block text-[8vw] md:text-[60px] font-bold leading-[1.2] tracking-wide text-white drop-shadow-lg">
                        HAMLESİ
                      </span>
                    </h1>
                  </div>
                  <div className="description-fade mt-8 text-lg tracking-wider text-gray-300 max-w-xl leading-relaxed">
                    {section.description}
                  </div>
                </div>
                ) : (
                  <div>
                    <div className="text-sm tracking-[0.3em] text-gray-300 mb-4">
                      PROJECT {section.projectId}
                    </div>
                    <h1 className="text-[80px] lg:text-[120px] font-bold text-white leading-none tracking-wide drop-shadow-lg mb-8">
                      {section.title}
                    </h1>
                    <div className="text-lg tracking-wider text-gray-300 max-w-xl leading-relaxed mb-8">
                      {section.description}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Content with Examine Button */}
              <div className="max-w-2xl mb-10">
                <div className="text-lg tracking-wider text-gray-300 max-w-xl leading-relaxed mb-6">
                  Projeyi daha detaylı inceleyin ve bizimle iletişime geçin.
                </div>
                <button
                  className={`examine-button group relative px-12 py-4 text-white border border-white/30
                    rounded-full overflow-hidden hover:border-white/60 transition-all duration-500
                    hover:bg-white/10 ${index === 0 ? '' : 'opacity-0 translate-y-5'}`}
                >
                  <span className="relative text-lg tracking-wider">
                    İNCELE
                  </span>
                </button>
              </div>
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
                <ChevronDown className="w-6 h-6 animate-bounce mx-auto opacity-70
                  group-hover:opacity-100" />
              </button>
            )}
          </section>
        ))}
      </main>
    </div>
  )
}