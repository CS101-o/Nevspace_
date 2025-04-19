import React, { useEffect, useRef, useState } from 'react';
import { Linkedin, Users, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import Navigation from '@/components/UI/Navigation';
import { useTranslation } from '@/components/i18n/I18nProvider'; // useI18n, add later 
import Logo from '../../UI/logo'

interface Advisor {
  id: number;
  name: string;
  role: string;
  category: "İdari Heyet" | "Teknik Heyet";
  image: string;
  description?: string; // Added description field
  linkedIn?: string;
  title?: string;
  roleTranslationKey?: string;       
  descriptionTranslationKey?: string;
}

const AdvisorsPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Add translation hooks
  const { t } = useTranslation('advisors');
  //const { dir } = useI18n();
  //const isRTL = dir === 'rtl';

  const advisors: Advisor[] = [
    // İdari Heyet
    {
      id: 1,
      name: "Ömer Faruk Akyüzlü",
      title: "",
      role: "Yönetim Danışmanı",
      roleTranslationKey: "roles.managementConsultant",
      category: "İdari Heyet",
      description: "Stratejik yönetim ve kurumsal yapılanma alanında uzmanlığıyla projelerimize değer katan deneyimli danışmanımız.",
      descriptionTranslationKey: "descriptions.omerFaruk",
      image: "/advisors/placeholder.jpg",
      linkedIn: "https://linkedin.com/in/johndoe"
    },
    {
      id: 2,
      name: "Yusuf Elgörmüş",
      title: "",
      role: "Yönetim Danışmanı",
      roleTranslationKey: "roles.managementConsultant",
      category: "İdari Heyet",
      description: "Finansal planlama ve risk yönetimi konularında geniş tecrübe sahibi, kurumsal süreçlere yön veren değerli danışmanımız.",
      descriptionTranslationKey: "descriptions.yusufElgormus",
      image: "/advisors/placeholder.jpg",
      linkedIn: "https://linkedin.com/in/johndoe"
    },
    
    // Teknik Heyet
    {
      id: 3,
      name: "Eyyub Can Odacıoğlu",
      title: "",
      role: "Teknik Danışman",
      roleTranslationKey: "roles.technicalConsultant",
      category: "Teknik Heyet",
      description: "Mühendislik çözümleri ve teknoloji entegrasyonu konularında uzmanlaşmış, inovatif yaklaşımlarıyla projelere değer katan danışmanımız.",
      descriptionTranslationKey: "descriptions.eyyubCan",
      image: "/advisors/placeholder.jpg",
      linkedIn: "https://linkedin.com/in/janesmith"
    },
    {
      id: 4,
      name: "Halit Mirahmetoğlu",
      title: "",
      role: "Teknik Danışman",
      roleTranslationKey: "roles.technicalConsultant",
      category: "Teknik Heyet",
      description: "Teknoloji geliştirme ve sistem optimizasyonu alanında deneyimli, analitik yaklaşımıyla teknik çözümler sunan danışmanımız.",
      descriptionTranslationKey: "descriptions.halitMirahmetoglu",
      image: "/advisors/placeholder.jpg",
      linkedIn: "https://linkedin.com/in/janesmith"
    },
    {
      id: 5,
      name: "Muhammed Tayyip Gürbüz",
      title: "",
      role: "Teknik Danışman",
      roleTranslationKey: "roles.technicalConsultant",
      category: "Teknik Heyet",
      description: "Yazılım mimarisi ve veri yönetimi konularında uzman, modern teknolojileri projelerimize adapte eden danışmanımız.",
      descriptionTranslationKey: "descriptions.muhammedTayyip",
      image: "/advisors/placeholder.jpg",
      linkedIn: "https://linkedin.com/in/janesmith"
    },
    {
      id: 6,
      name: "Ömer Faruk Koç",
      title: "",
      role: "Teknik Danışman",
      roleTranslationKey: "roles.technicalConsultant",
      category: "Teknik Heyet",
      description: "Elektronik sistemler ve donanım entegrasyonu konusunda uzmanlaşmış, teknik altyapının güçlendirilmesinde önemli rol oynayan danışmanımız.",
      descriptionTranslationKey: "descriptions.omerFarukKoc",
      image: "/advisors/placeholder.jpg",
      linkedIn: "https://linkedin.com/in/janesmith"
    },
    {
      id: 9,
      name: "Eyüp Can",
      title: "",
      role: "Sanayici / İş Adamı",
      roleTranslationKey: "roles.industrialist",
      category: "Teknik Heyet",
      description: "Can Plastik Kalıp İmalat ve İhracat",
      descriptionTranslationKey: "descriptions.eyupCan",
      image: "/advisors/placeholder.jpg",
      linkedIn: "https://linkedin.com/in/janesmith"
    },
    {
      id: 7,
      name: "Prof. Dr. İbrahim Özkol",
      title: "",
      role: "İTÜ - ARC Genel Müdürü",
      roleTranslationKey: "roles.academicDirector",
      category: "Teknik Heyet",
      description: "Mühendislik bilimleri alanında uluslararası deneyime sahip, akademik bilgi birikimini pratik uygulamalarla harmanlayan değerli profesörümüz.",
      descriptionTranslationKey: "descriptions.ibrahimOzkol",
      image: "/advisors/placeholder.jpg",
      linkedIn: "https://linkedin.com/in/janesmith"
    },
    {
      id: 8,
      name: "Yusuf Ata",
      title: "",
      role: "Sanayi Danışmanı",
      roleTranslationKey: "roles.industryConsultant",
      category: "Teknik Heyet",
      description: "Endüstriyel üretim ve sanayi entegrasyonu konularında geniş tecrübeye sahip, pratik çözümler sunan değerli danışmanımız.",
      descriptionTranslationKey: "descriptions.yusufAta",
      image: "/advisors/placeholder.jpg",
      linkedIn: "https://linkedin.com/in/janesmith"
    }
  ];

  
  // Get translation keys for categories
  const categoryTranslationKeys = {
    "İdari Heyet": "categories.administrative",
    "Teknik Heyet": "categories.technical"
  };

  // Group advisors by category using translated category names
  const advisorsByCategory = advisors.reduce((acc, advisor) => {
    const categoryKey = categoryTranslationKeys[advisor.category];
    const translatedCategory = t(categoryKey);
    
    if (!acc[translatedCategory]) {
      acc[translatedCategory] = [];
    }
    acc[translatedCategory].push(advisor);
    return acc;
  }, {} as Record<string, Advisor[]>);

  // Category display order with translations
  const categoryOrder = [
    t("categories.administrative"),
    t("categories.technical")
  ];

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  useEffect(() => {
    // Initialize all categories as expanded
    const initialExpanded = Object.fromEntries(
      categoryOrder.map(category => [category, true])
    );
    setExpandedCategories(initialExpanded);
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const page = pageRef.current;
    if (!page) return;

    const header = page.querySelector('.page-header');
    const heroSection = page.querySelector('.hero-section');
    const categoryHeaders = page.querySelectorAll('.category-header');
    const cards = page.querySelectorAll('.advisor-card');

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

      if (heroSection) {
        gsap.set(heroSection, { opacity: 0 });
        gsap.to(heroSection, {
          opacity: 1,
          duration: 1.2,
          delay: 0.3,
          ease: 'power3.out'
        });
      }

      gsap.set(categoryHeaders, { opacity: 0, y: 30 });
      gsap.to(categoryHeaders, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.7,
        ease: 'power3.out'
      });

      gsap.set(cards, { opacity: 0, y: 50 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 1,
        ease: 'power3.out'
      });
    }, page);

    return () => ctx.revert();
  }, [hasMounted]);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#040720]">
      <Navigation/>
      {/* Header */}
      <header className="page-header bg-[#0a0d2c] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo - properly positioned */}
            <Logo className="mt-2" />
            
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-blue-400" />
              <h1 className="text-3xl font-bold text-white">
                {t('title')}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image Section */}
      <section className="hero-section relative h-96 w-full">
        <div className="absolute inset-0">
          <Image 
            src="/images/danisman.jpg"
            alt="Our Advisors"
            fill
            className="object-cover filter brightness-75"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040720] via-[#04072090] to-[#04072030]" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {t('heroTitle')}
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-md">
            {t('heroDescription')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categoryOrder.map((category) => (
          <div key={category} className="mb-16 last:mb-0">
            <div 
              className="category-header flex items-center justify-between cursor-pointer mb-8 pb-3 border-b border-gray-700"
              onClick={() => toggleCategory(category)}
            >
              <h2 className="text-2xl font-bold text-white">{category}</h2>
              <button className="p-1 rounded-full hover:bg-white/10">
                {expandedCategories[category] ? (
                  <ChevronUp className="w-5 h-5 text-blue-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-400" />
                )}
              </button>
            </div>
            
            {expandedCategories[category] && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {advisorsByCategory[category as keyof typeof advisorsByCategory]?.map((advisor) => (
                  <div
                    key={advisor.id}
                    className="advisor-card bg-[#0a0d2c] rounded-xl shadow-xl overflow-hidden
                      transform transition-all duration-500 ease-out
                      hover:shadow-2xl hover:scale-105 hover:-translate-y-2
                      border border-gray-800 hover:border-blue-500/50"
                  >
                    <div className="p-8 flex flex-col items-center">
                      {/* Profile Image */}
                      <div className="w-40 h-40 relative mb-6 rounded-xl overflow-hidden
                        transform transition-transform duration-300 hover:scale-105
                        bg-gradient-to-br from-blue-400/20 to-blue-600/20
                        shadow-lg hover:shadow-blue-500/20"
                      >
                        <Image
                          src={advisor.image}
                          alt={advisor.name}
                          className="object-cover"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      
                      {/* Advisor Info */}
                      <div className="text-center space-y-3">
                        <h3 className="text-2xl font-bold text-white">
                          {advisor.title && <span className="text-blue-400">{advisor.title} </span>}
                          {advisor.name}
                        </h3>
                        <p className="text-lg text-gray-300">
                          {advisor.roleTranslationKey ? t(advisor.roleTranslationKey) : advisor.role}
                        </p>
                        
                        {/* Description */}
                        {(advisor.description || advisor.descriptionTranslationKey) && (
                          <p className="text-sm text-gray-400 mt-2">
                            {advisor.descriptionTranslationKey 
                              ? t(advisor.descriptionTranslationKey) 
                              : advisor.description}
                          </p>
                        )}
                        
                        {/* LinkedIn Button */}
                        {advisor.linkedIn && (
                          <a
                            href={advisor.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 p-3 rounded-full bg-white/5 hover:bg-blue-500/20
                              transition-all duration-300 hover:text-blue-400 inline-flex
                              transform hover:scale-110"
                            aria-label={`Visit ${advisor.name}'s LinkedIn profile`}
                          >
                            <Linkedin className="w-6 h-6" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
};

export default AdvisorsPage;