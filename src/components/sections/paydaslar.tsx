import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import Navigation from '../UI/Navigation';
import { useI18n, useTranslation } from '../i18n/I18nProvider';
import Logo from "@/components/UI/logo"
interface Sponsor {
  id: number;
  name: string;
  logo: string;
}

interface SponsorSectionProps {
  title: string;
  sponsors: Sponsor[];
  delay?: number;
}

const SponsorSection: React.FC<SponsorSectionProps> = ({ title, sponsors, delay = 0 }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const { dir } = useI18n();
  const isRTL = dir === 'rtl';

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const section = sectionRef.current;
    if (!section) return;

    const titleElement = section.querySelector('.section-title');
    const cards = section.querySelectorAll('.sponsor-card');

    const ctx = gsap.context(() => {
      if (titleElement) {
        gsap.set(titleElement, { opacity: 0, y: 20 });
        gsap.to(titleElement, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: 'power3.out'
        });
      }

      gsap.set(cards, { opacity: 0, y: 50 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: delay + 0.2,
        ease: 'power3.out'
      });
    }, section);

    return () => ctx.revert();
  }, [delay, hasMounted]);

  return (
    <div ref={sectionRef} className="mb-16">
      <h2 className="section-title text-2xl font-bold mb-8 text-white opacity-0 border-b border-gray-700 pb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sponsors.map((sponsor) => (
          <div 
            key={sponsor.id}
            className="sponsor-card bg-[#0a0d2c] rounded-lg shadow-md overflow-hidden 
              transform transition-all duration-300 ease-in-out
              hover:shadow-2xl hover:scale-105 hover:-translate-y-1
              border border-gray-800 hover:border-gray-600 opacity-0"
          >
            <div className="p-6 flex flex-col items-center">
              <div className="w-48 h-48 relative mb-4 bg-white rounded-lg p-4
                transform transition-transform duration-300 hover:scale-110">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="object-contain"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <h3 className={`text-center text-lg font-semibold text-white mb-2
                transition-colors duration-300 ${isRTL ? 'text-right w-full' : ''}`}>
                {sponsor.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

const SponsorsPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  const { t } = useTranslation('common');
  const { dir } = useI18n();
  const isRTL = dir === 'rtl';

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const page = pageRef.current;
    if (!page) return;

    const header = page.querySelector('.page-header');

    const ctx = gsap.context(() => {
      if (header) {
        gsap.set(header, { opacity: 0, y: -50 });
        gsap.to(header, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out'
        });
      }
    }, page);

    return () => ctx.revert();
  }, [hasMounted]);

  const mainSponsors: Sponsor[] = [
    {
      id: 1,
      name: "LENTOSAN",
      logo: "/images/Lentosan.jpg"
    },
    {
      id: 2,
      name: "YILDIRIM İNŞAAT",
      logo: "/images/Yildirim.png"
    },
    {
      id: 3,
      name: "YILMAZ GRUP",
      logo: "/images/Yilmaz.jpg"
    }
  ];

  const primarySponsors: Sponsor[] = [
    {
      id: 4,
      name: "BAŞAKŞEHİR BELEDİYESİ",
      logo: "/images/basaksehir.png"
    },
    {
      id: 5,
      name: "LIVING LAB",
      logo: "/images/LivingLab.png"
    },
    {
        id: 6,
        name: "University of Bristol",
        logo: "/images/bristol.png"
      },
      {
        id: 7,
        name: "İSTANBUL TEKNİK ÜNİVERSİTESİ",
        logo: "/images/ITU.png"
      },
      {
        id: 8,
        name: "İBN HALDUN ÜNİVERSİTESİ",
        logo: "/images/ibn-haldun-universitesi.png"
      },
      {
        id: 9,
        name: "MASOOD BUSINESS CENTRE",
        logo: "/images/masood.jpeg"
      },
      {
        id: 10,
        name: "NECMETTIN ERBAKAN ÜNİVERSİTESİ",
        logo: "/images/erbakan.png"
      },
      {
        id: 11,
        name: "OXFORD UNIVERSITY",
        logo: "/images/oxford.png"
      },
      {
        id: 12,
        name: "Repkon",
        logo: "/images/repkon.png"
      },
      {
        id: 13,
        name: "University of Manchester",
        logo: "/images/MAN.png"
      },
      {
        id: 14,
        name: "YILDIZ TEKNİK ÜNİVERSİTESİ",
        logo: "/images/YTU.png"
      }
  ];

  return (
    <div ref={pageRef} className="min-h-screen bg-[#040720]">
      <Navigation/>
      
      {/* Header */}
      <header className="page-header bg-[#0a0d2c] border-b border-gray-800 opacity-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Logo />
            <div className={`${isRTL ? 'text-right' : ''}`}>
              <h1 className="text-3xl font-bold text-white">{t('partners.title')}</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SponsorSection 
          title={t('partners.mainSponsors')} 
          sponsors={mainSponsors}
          delay={0.5}
        />
        
        <SponsorSection 
          title={t('partners.partners')} 
          sponsors={primarySponsors}
          delay={0.7}
        />
      </main>
    </div>
  );
};

export default SponsorsPage;