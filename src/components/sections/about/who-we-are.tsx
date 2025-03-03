'use client'
import React, { useEffect } from 'react'
import { Star } from 'lucide-react'
import Navigation from '@/components/UI/Navigation'
import Image from 'next/image'

interface PrincipleProps {
  text: string
}

interface ContentSectionProps {
  title: string
  children: React.ReactNode
}

const Principle: React.FC<PrincipleProps> = ({ text }) => (
  <div className="flex items-center space-x-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
    <div className="w-2 h-2 bg-blue-400 rounded-full" aria-hidden="true"></div>
    <span className="text-lg text-white/80">{text}</span>
  </div>
)

const ContentSection: React.FC<ContentSectionProps> = ({ title, children }) => (
  <section className="backdrop-blur-sm bg-white/5 rounded-lg p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
    <div className="flex items-center space-x-2 mb-4">
      <Star className="w-6 h-6 text-blue-400" aria-hidden="true" />
      <h2 className="text-2xl font-semibold text-white/90">{title}</h2>
    </div>
    {children}
  </section>
)

const WhoWeArePage: React.FC = () => {
  useEffect(() => {
    document.body.classList.add('space-background')
    return () => document.body.classList.remove('space-background')
  }, [])

  const principles = [
    "Savaş değil, barış",
    "Çatışma değil, diyalog",
    "Çifte standart değil, adalet",
    "Üstünlük değil, eşitlik",
    "Sömürü değil, âdil düzen",
    "Baskı ve tahakküm değil, insan hakları ve hürriyet"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(0,1,45)] via-[rgb(0,1,65)] to-[rgb(0,1,45)] text-white relative overflow-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/about.jpg" 
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-7xl font-bold tracking-tight text-white mb-2 text-center">
            Biz Kimiz
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
          <div className="relative">
            <div 
              className="absolute -left-4 -top-4 w-20 h-20 bg-blue-500 rounded-full blur-3xl opacity-20"
              aria-hidden="true"
            />
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
          </div>

          <div className="space-y-8">
            <ContentSection title="Şahsen">
              <p className="text-lg text-white/80 leading-relaxed">
                Yeni dünya düzeninde teknolojisiyle söz sahibi olmayı amaçlayan, gün geçtikçe daha da önemli hale gelen 
                uzay ekosistemi alanında araştırma ve geliştirme yaparak geleceğin teknoloji çağı mimarı olmaya aday 
                Nevspace Uzay Teknolojileri, %100 yerli kaynak ve milli mühendislikle uzay sektörüne yönelik itki 
                sistemleri, roketler, uçuş kapsülleri ve uydu gibi teknolojilerin üretimi, geliştirilmesi ve test 
                edilmesi amacıyla 16 Ocak 2020 tarihinde İstanbul&apos;da kurulmuştur.
              </p>
            </ContentSection>

            <ContentSection title="Fiilen">
              <p className="text-lg text-white/80 leading-relaxed">
                Nevspace, uzay ile alakalı her alanda okur, araştırır, proje geliştirir ve fikir üretir; ekibinin 
                uzay teknolojileri ve özellikle bilimsel amaçlı çalışan roket sistemleri üzerine zihnen yetişmesine, 
                yeni fikirler üretip uygulanabilir projeler ortaya koymasına ve yerli kaynakların kullanılarak teknoloji 
                üretilmesine önem verir. Nevspace&apos;in bütün gelir ve giderleri &quot;Dışarıdan müdahaleye kapalı, yetkili kurum 
                ve kişilere karşı şeffaf&quot; ilkesiyle düzenlenir.
              </p>
            </ContentSection>

            <ContentSection title="Manen">
              <p className="text-lg text-white/80 leading-relaxed mb-6">
                Yeni ve yaşanılabilir bir dünyanın tesis edilmesi yolunda, özelde milletimizin genelde tüm insanlığın 
                saadet ve selameti için çalışmalar yapan kuruluşumuz, aşağıdaki ilkeleri benimsemiştir:
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