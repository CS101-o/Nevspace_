'use client'
//import React, { useEffect } from 'react'
import { Rocket, Target, Quote } from 'lucide-react'
import Navigation from '@/components/UI/Navigation'

const VisionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(0,1,45)] via-[rgb(0,1,65)] to-[rgb(0,1,45)] text-white relative overflow-hidden">
      <Navigation/>
      {/* Background elements */}
      <div className="absolute top-40 right-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl opacity-10 animate-pulse"></div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {/* Header section */}
          <div className="relative">
            <div className="absolute -left-4 -top-4 w-20 h-20 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
            <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-blue-300 mb-2">
              Vizyon
            </h1>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></div>
          </div>

          <div className="space-y-8">
            {/* 2030 Goals Section */}
            <section className="backdrop-blur-sm bg-white/5 rounded-lg p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-white/90">2030 Hedefimiz</h2>
              </div>
              <p className="text-lg text-white/80 leading-relaxed">
                2020 yılında tüm ekip üyeleri ile birlikte ortaya koyulan 10 yıl vizyonu neticesinde,
                Alçak Dünya Yörüngesi&apos;ne (LEO) minimum 100 kg faydalı yük taşıma kapasitesine sahip bir
                bilimsel amaçlı hizmet roketini tüm alt sistemleriyle beraber tasarlayıp, üretip fırlatmak
                isteyen &quot;Nevspace Uzay Teknolojileri&quot; ekibi, Türkiye&apos;nin ilk sivil milli fırlatıcı platformunu
                hayata geçirmek istemektedir.
              </p>
            </section>

            {/* Long Term Vision Section */}
            <section className="backdrop-blur-sm bg-white/5 rounded-lg p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="flex items-center space-x-2 mb-4">
                <Rocket className="w-6 h-6 text-blue-400" />
                <h2 className="text-2xl font-semibold text-white/90">Uzun Vadeli Vizyon</h2>
              </div>
              <p className="text-lg text-white/80 leading-relaxed">
                Aynı zamanda uzay ve teknoloji ile alakalı olabilecek her türlü inovasyon alanında çalışma
                yapabilme potansiyeline sahip Nevspace Uzay Teknolojileri, uzun vade kurululuş vizyonu olarak
                &quot;Toryum&quot; esaslı &quot;Nükleer Yakıtlı Roket Motorları&quot; üzerine de çalışmaları sahalarını bünyesinde
                barındırmaktadır.
              </p>
            </section>

            {/* Quote Section */}
            <section className="relative backdrop-blur-md bg-gradient-to-r from-white/10 to-white/5 p-8 rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="absolute -left-2 -top-2">
                <Quote className="w-8 h-8 text-blue-400 opacity-50" />
              </div>
              <blockquote className="text-xl italic text-white/70 pl-6">
                &quot;Türkiye&apos;nin ilk sivil uzay teknolojileri firması...&quot;
              </blockquote>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VisionPage