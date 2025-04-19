import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Linkedin, Users, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import Navigation from '@/components/UI/Navigation';
import { useI18n, useTranslation } from '@/components/i18n/I18nProvider';
import Logo from "@/components/UI/logo"

interface TeamMember {
  id: number;
  name: string;
  role: string;
  category: string;
  image: string;
  description: string;
  linkedIn?: string;
  roleTranslationKey?: string;
  descriptionTranslationKey?: string;
  categoryTranslationKey?: string;
}

const TeamPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Translation hooks
  const { t } = useTranslation('teams');
  const { dir } = useI18n();
  const isRTL = dir === 'rtl';

  const teamMembers: TeamMember[] = [
    // Leadership
    {
      id: 1,
      name: "Mustafa Eymen Yıldırım",
      role: "Founder, CEO",
      roleTranslationKey: "roles.founderCEO",
      category: "Yönetim",
      categoryTranslationKey: "categories.management",
      description: "Teknoloji ve yönetim konusunda geniş tecrübeye sahip, stratejik vizyonuyla ekibi ileri taşıyan kurucu liderimiz.",
      descriptionTranslationKey: "descriptions.mustafaEymen",
      image: "/team/mustafa-eymen.jpg",
      linkedIn: "https://linkedin.com/in/mustafa-eymen-yildirim"
    },
    {
      id: 2,
      name: "Arif Emre Şen",
      role: "COO",
      roleTranslationKey: "roles.coo",
      category: "Yönetim",
      categoryTranslationKey: "categories.management",
      description: "Operasyonel süreçleri yöneten, organizasyonel yapılanma ve süreç optimizasyonu konularında uzman, iş stratejilerini başarıyla uygulayan liderimiz.",
      descriptionTranslationKey: "descriptions.arifEmre",
      image: "/team/placeholder.jpg"
    },
    {
      id: 3,
      name: "Batuhan Akkova",
      role: "CTO",
      roleTranslationKey: "roles.cto",
      category: "Yönetim",
      categoryTranslationKey: "categories.management",
      description: "Teknoloji stratejilerini belirleyen, inovasyon ve Ar-Ge süreçlerini yöneten, teknik altyapının geliştirilmesinde liderlik eden teknoloji direktörümüz.",
      descriptionTranslationKey: "descriptions.batuhanAkkova",
      image: "/team/placeholder.jpg"
    },
    {
      id: 4,
      name: "Muhammed Zahid Bulut",
      role: "CSO",
      roleTranslationKey: "roles.cso",
      category: "Yönetim",
      categoryTranslationKey: "categories.management",
      description: "Stratejik planlama ve şirket büyüme hedeflerinden sorumlu, sürdürülebilir büyüme stratejileri geliştiren üst düzey yöneticimiz.",
      descriptionTranslationKey: "descriptions.muhammedZahid",
      image: "/team/placeholder.jpg"
    },

    // Birim Liderleri
    {
      id: 5,
      name: "Ali Aktaş",
      role: "Uzay Tarihi Birim Lideri",
      roleTranslationKey: "roles.spaceHistoryLeader",
      category: "Birim Liderleri",
      categoryTranslationKey: "categories.departmentLeaders",
      description: "Uzay tarihine ilişkin araştırmalar yürüten, bilgi birikimi ve analitik yaklaşımıyla ekibi yönlendiren değerli liderimiz.",
      descriptionTranslationKey: "descriptions.aliAktas",
      image: "/team/placeholder.jpg"
    },
    {
      id: 6,
      name: "Av. Anıl Akyol",
      role: "Uzay Hukuku Birim Lideri",
      roleTranslationKey: "roles.spaceLawLeader",
      category: "Birim Liderleri",
      categoryTranslationKey: "categories.departmentLeaders",
      description: "Uzay hukuku alanındaki yasal düzenlemeler ve fikri mülkiyet haklarında uzmanlaşmış, uluslararası uzay hukuku çerçevesinde projelere yön veren avukat liderimiz.",
      descriptionTranslationKey: "descriptions.anilAkyol",
      image: "/team/placeholder.jpg"
    },
    {
      id: 7,
      name: "Ahmet Bilgiç",
      role: "Medya Direktörü",
      roleTranslationKey: "roles.mediaDirector",
      category: "Birim Liderleri",
      categoryTranslationKey: "categories.departmentLeaders",
      description: "İletişim stratejileri ve medya ilişkilerini yöneten, kurumsal kimliğimizin güçlendirilmesinde önemli rol oynayan direktörümüz.",
      descriptionTranslationKey: "descriptions.ahmetBilgic",
      image: "/team/placeholder.jpg"
    },
    {
      id: 8,
      name: "Doruk Tan Atila",
      role: "Aviyonik Birim Lideri",
      roleTranslationKey: "roles.avionicsLeader",
      category: "Birim Liderleri",
      categoryTranslationKey: "categories.departmentLeaders",
      description: "Aviyonik sistemlerin geliştirilmesi ve entegrasyonunda uzmanlaşmış, yenilikçi çözümleriyle öne çıkan liderimiz.",
      descriptionTranslationKey: "descriptions.dorukTan",
      image: "/team/placeholder.jpg"
    },
    {
      id: 9,
      name: "Utku Mutlu",
      role: "Balistik Birim Lideri",
      roleTranslationKey: "roles.ballisticsLeader",
      category: "Birim Liderleri",
      categoryTranslationKey: "categories.departmentLeaders",
      description: "Balistik sistemlerin tasarımı ve optimizasyonunda uzmanlaşmış, teknik hesaplamaları yöneten ve analitik çözümler sunan liderimiz.",
      descriptionTranslationKey: "descriptions.utkuMutlu",
      image: "/team/placeholder.jpg"
    },

    // Takım Kaptanları
    {
      id: 10,
      name: "İbrahim Dinçsoy",
      role: "İTÜ Takım Kaptanı",
      roleTranslationKey: "roles.ituCaptain",
      category: "Takım Kaptanları",
      categoryTranslationKey: "categories.teamCaptains",
      description: "İTÜ ekibini yöneten, teknik problemlere yaratıcı çözümler üreten, liderlik vasıflarıyla öne çıkan kaptanımız.",
      descriptionTranslationKey: "descriptions.ibrahimDincsoy",
      image: "/team/placeholder.jpg"
    },
    {
      id: 11,
      name: "İsmail Böler",
      role: "YTÜ Takım Kaptanı",
      roleTranslationKey: "roles.ytuCaptain",
      category: "Takım Kaptanları",
      categoryTranslationKey: "categories.teamCaptains",
      description: "YTÜ ekibinin başında, mühendislik alanındaki derin bilgisiyle ekibe rehberlik eden, sonuç odaklı kaptanımız.",
      descriptionTranslationKey: "descriptions.ismailBoler",
      image: "/team/placeholder.jpg"
    },
    {
      id: 12,
      name: "Kaan Öktem",
      role: "Yazılım Takım Kaptanı",
      roleTranslationKey: "roles.softwareCaptain",
      category: "Takım Kaptanları",
      categoryTranslationKey: "categories.teamCaptains",
      description: "Yazılım geliştirme süreçlerini yöneten, modern teknolojileri projelerimize entegre eden, yaratıcı çözümler sunan kaptanımız.",
      descriptionTranslationKey: "descriptions.kaanOktem",
      image: "/team/placeholder.jpg"
    },
    {
      id: 13,
      name: "Muhammed Emin Yenice",
      role: "Analiz Takım Kaptanı",
      roleTranslationKey: "roles.analysisCaptain",
      category: "Takım Kaptanları",
      categoryTranslationKey: "categories.teamCaptains",
      description: "Veri analizi ve performans değerlendirmesi konusunda uzman, ekibin istatistiksel çalışmalarını yöneten kaptanımız.",
      descriptionTranslationKey: "descriptions.muhammedEmin",
      image: "/team/placeholder.jpg"
    },
    {
      id: 14,
      name: "Mustafa Ergin Püsküllüoğlu",
      role: "Donanım Takım Kaptanı",
      roleTranslationKey: "roles.hardwareCaptain",
      category: "Takım Kaptanları",
      categoryTranslationKey: "categories.teamCaptains",
      description: "Donanım ekibinin başında, elektronik sistemlerin tasarım ve üretiminde uzmanlaşmış, detaycı yaklaşımıyla tanınan kaptanımız.",
      descriptionTranslationKey: "descriptions.mustafaErgin",
      image: "/team/placeholder.jpg"
    },

    // Ekip Üyeleri
    {
      id: 15,
      name: "Asım Furkan Genç",
      role: "Balistik Ekip Üyesi",
      roleTranslationKey: "roles.ballisticsMember",
      category: "Ekip Üyeleri",
      categoryTranslationKey: "categories.teamMembers",
      description: "Balistik hesaplamalar ve simülasyonlar konusunda çalışan, malzeme bilimi ve üretim teknikleri konusunda bilgi sahibi üyemiz.",
      descriptionTranslationKey: "descriptions.asimFurkan",
      image: "/team/placeholder.jpg"
    },
    {
      id: 16,
      name: "Mehmet Affan Duran",
      role: "Balistik Ekip Üyesi",
      roleTranslationKey: "roles.ballisticsMember",
      category: "Ekip Üyeleri",
      categoryTranslationKey: "categories.teamMembers",
      description: "Mekanik tasarım ve balistik simülasyonlar alanında görev alan, analitik düşünce yapısıyla çözümler sunan ekip üyemiz.",
      descriptionTranslationKey: "descriptions.mehmetAffan",
      image: "/team/placeholder.jpg"
    },
    {
      id: 17,
      name: "Muhenned Velid El-Najjar",
      role: "Balistik Ekip Üyesi",
      roleTranslationKey: "roles.ballisticsMember",
      category: "Ekip Üyeleri",
      categoryTranslationKey: "categories.teamMembers",
      description: "Balistik hesaplamalar ve simülasyonlar konusunda çalışan, uluslararası deneyimiyle ekibe katkı sağlayan değerli üyemiz.",
      descriptionTranslationKey: "descriptions.muhennedVelid",
      image: "/team/placeholder.jpg"
    },
    {
      id: 18,
      name: "Mehmet Anıl Aras",
      role: "Medya Ekip Üyesi",
      roleTranslationKey: "roles.mediaMember",
      category: "Ekip Üyeleri",
      categoryTranslationKey: "categories.teamMembers",
      description: "Video prodüksiyon ve içerik geliştirme alanlarında çalışan, etkinliklerin belgelenmesinde görev alan medya ekibi üyemiz.",
      descriptionTranslationKey: "descriptions.mehmetAnil",
      image: "/team/placeholder.jpg"
    },
    {
      id: 19,
      name: "Ömer Faruk Karaoğlu",
      role: "Medya Ekip Üyesi",
      roleTranslationKey: "roles.mediaMember",
      category: "Ekip Üyeleri",
      categoryTranslationKey: "categories.teamMembers",
      description: "Sosyal medya yönetimi ve içerik stratejileri konusunda uzmanlaşmış, kurumsal iletişime katkı sağlayan ekip üyemiz.",
      descriptionTranslationKey: "descriptions.omerFarukKaraoglu",
      image: "/team/placeholder.jpg"
    }
  ];

  // Category translation map
  const categoryTranslationMap = {
    "Yönetim": "categories.management",
    "Birim Liderleri": "categories.departmentLeaders",
    "Takım Kaptanları": "categories.teamCaptains",
    "Ekip Üyeleri": "categories.teamMembers"
  };

  // Group members by category using translated category names
  const groupedMembers = teamMembers.reduce((acc, member) => {
    const categoryKey = member.categoryTranslationKey || categoryTranslationMap[member.category];
    const translatedCategory = t(categoryKey);
    
    if (!acc[translatedCategory]) {
      acc[translatedCategory] = [];
    }
    acc[translatedCategory].push(member);
    return acc;
  }, {} as Record<string, TeamMember[]>);

  // Category display order with translations - wrapped in useMemo to prevent recreation on every render
  const categoryOrder = useMemo(() => [
    t("categories.management"),
    t("categories.departmentLeaders"),
    t("categories.teamCaptains"),
    t("categories.teamMembers")
  ], [t]); // Only recreate when the translation function changes

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
  }, []); // Run only once on component mount

  useEffect(() => {
    if (!hasMounted) return;

    const page = pageRef.current;
    if (!page) return;

    const header = page.querySelector('.page-header');
    const heroSection = page.querySelector('.hero-section');
    const categoryHeaders = page.querySelectorAll('.category-header');
    const cards = page.querySelectorAll('.team-card');

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
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ${isRTL ? 'text-right' : ''}`}>
          <div className="flex items-center justify-between">   
            <Logo className = 'm-2'/>
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse space-x-reverse' : 'space-x-3'}`}>
              <Users className="w-8 h-8 text-blue-400" />
              <h1 className={`text-3xl font-bold text-white ${isRTL ? 'mr-3' : ''}`}>
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
            src="/images/kadro.jpg" 
            alt={t('heroAltText')}
            fill
            className="object-cover filter brightness-75"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040720] via-[#04072090] to-[#04072030]" />
        </div>
        <div className={`relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 ${isRTL ? 'items-end text-right' : ''}`}>
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
          <div key={category} className="mb-16">
            <div 
              className={`category-header flex items-center ${isRTL ? 'flex-row-reverse' : 'justify-between'} cursor-pointer mb-6 pb-3 border-b border-gray-700`}
              onClick={() => toggleCategory(category)}
            >
              <h2 className={`text-2xl font-bold text-white ${isRTL ? 'text-right' : ''}`}>{category}</h2>
              <button className="p-1 rounded-full hover:bg-white/10">
                {expandedCategories[category] ? (
                  <ChevronUp className="w-5 h-5 text-blue-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-blue-400" />
                )}
              </button>
            </div>
            
            {expandedCategories[category] && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupedMembers[category]?.map((member) => (
                  <div
                    key={member.id}
                    className="team-card bg-[#0a0d2c] rounded-lg shadow-md overflow-hidden 
                      transform transition-all duration-300 ease-in-out hover:shadow-2xl 
                      hover:scale-105 hover:-translate-y-1 border border-gray-800 
                      hover:border-gray-600"
                  >
                    <div className="p-6 flex flex-col items-center">
                      {/* Profile Image */}
                      <div className="team-image w-36 h-36 relative mb-6 rounded-full overflow-hidden
                        transform transition-transform duration-500 hover:scale-105 
                        bg-gradient-to-br from-blue-400/20 to-blue-600/20
                        shadow-lg hover:shadow-blue-500/20"
                      >
                        <Image
                          src={member.image}
                          alt={member.name}
                          className="object-cover"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>

                      {/* Member Info */}
                      <div className={`${isRTL ? 'text-right' : 'text-center'} space-y-3 w-full`}>
                        <h3 className="text-xl font-semibold text-white">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {member.roleTranslationKey ? t(member.roleTranslationKey) : member.role}
                        </p>
                        <p className="text-sm text-gray-300 mt-3">
                          {member.descriptionTranslationKey ? t(member.descriptionTranslationKey) : member.description}
                        </p>
                        
                        {/* LinkedIn Button */}
                        {member.linkedIn && (
                          <div className={`${isRTL ? 'text-right' : 'text-center'}`}>
                            <a
                              href={member.linkedIn}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 p-2 rounded-full bg-white/5 hover:bg-white/10 
                                transition-colors duration-300 hover:text-blue-400 inline-flex"
                              aria-label={t('visitLinkedIn', { name: member.name })}
                            >
                              <Linkedin className="w-5 h-5" />
                            </a>
                          </div>
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

export default TeamPage;