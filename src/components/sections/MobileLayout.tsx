'use client'

//import { useState } from 'react'
import Image from 'next/image'
//import Link from 'next/link'
import { ChevronDown, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react'
import { Space_Grotesk } from 'next/font/google'
import { Section } from './MissionSections'
import Navigation from '../UI/Navigation'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

interface MobileLayoutProps {
  sections: Section[]
  missions: { path: string; name: string }[]
  handleExamineClick: (sectionId: string) => void
  scrollToNext: (index: number) => void
}

export default function MobileLayout({
  sections,
  //missions,
  handleExamineClick,
  scrollToNext
}: MobileLayoutProps) {
  //const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
     
      {/* Mobile Menu */}

      
      
        <Navigation/>

        

      

      {/* Mobile Content */}
      <main>
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={`section-${index}`}
            className="relative min-h-screen w-full"
          >
            <div className="absolute inset-0">
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover"
                priority={index === 0}
                quality={100}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
            </div>

            <div className="relative flex flex-col min-h-screen">
              <div className="flex-1 flex flex-col justify-center p-6">
                {index === 0 ? (
                  <>
                    <div className="space-heading-wrapper">
                      <div className="nevspace-badge inline-block text-sm tracking-wide mb-6 text-white/90 border border-white/30 py-2 px-4 rounded-full backdrop-blur-sm">
                        Nevspace
                      </div>
                      <h1 className="space-heading mb-6">
                        {['MİLLİ', 'TEKNOLOJİ', 'HAMLESİ'].map((text, i) => (
                          <div
                            key={text}
                            className={`${spaceGrotesk.className} title-slide title-slide-delay-${i + 1} text-4xl font-bold leading-tight tracking-wide text-white mb-2`}
                          >
                            {text}
                          </div>
                        ))}
                      </h1>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div className="text-sm tracking-[0.3em] text-white/70">
                        PROJECT {section.projectId}
                      </div>
                      <h2 className="text-5xl font-bold text-white tracking-wide">
                        {section.title}
                      </h2>
                    </div>
                  </>
                )}
                <p className="mt-6 text-lg text-white/90 leading-relaxed">
                  {section.description}
                </p>
              </div>

              <div className="p-6 space-y-6">
                <button
                  onClick={() => handleExamineClick(section.id)}
                  className="w-full bg-white/10 backdrop-blur border border-white/30 rounded-xl py-4 text-white text-lg font-medium tracking-wide active:scale-95 transition-all duration-300"
                >
                  İNCELE
                </button>

                <div className="flex justify-center space-x-6 py-4">
                  <a href="https://instagram.com/nevspace" className="text-white text-opacity-90 hover:text-opacity-100 transition-all duration-300">
                    <Instagram size={24} strokeWidth={1.5} />
                  </a>
                  <a href="https://x.com/NevSpaceX/status/1847564366897418434" className="text-white text-opacity-90 hover:text-opacity-100 transition-all duration-300">
                    <Twitter size={24} strokeWidth={1.5} />
                  </a>
                  <a href='https://facebook.com/nevspace' className="text-white text-opacity-90 hover:text-opacity-100 transition-all duration-300">
                    <Facebook size={24} strokeWidth={1.5} />
                  </a>
                  <a href="https://www.youtube.com/@nevspacex" className="text-white text-opacity-90 hover:text-opacity-100 transition-all duration-300">
                    <Youtube size={24} strokeWidth={1.5} />
                  </a>
                  <a href='https://linkedin.com/company/nevspace' className="text-white text-opacity-90 hover:text-opacity-100 transition-all duration-300">
                    <Linkedin size={24} strokeWidth={1.5} />
                  </a>
                </div>


                {index < sections.length - 1 && (
                  <div className="text-center pb-6">
                    <button
                      onClick={() => scrollToNext(index)}
                      className="text-white/70 hover:text-white transition-colors duration-300"
                    >
                      <span className="block text-sm mb-2">Aşağı Kaydır</span>
                      <ChevronDown className="w-5 h-5 mx-auto animate-bounce" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}
      </main>
    </>
  )
}