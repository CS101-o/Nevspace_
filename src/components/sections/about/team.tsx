import React, { useEffect, useRef, useState } from 'react';
import { Linkedin, Users, ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import Navigation from '@/components/UI/Navigation';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  category: string;
  image: string;
  description: string;
  linkedIn?: string;
}

const TeamPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const teamMembers: TeamMember[] = [
    // Leadership
    {
      id: 1,
      name: "Mustafa Eymen Yıldırım",
      role: "Founder, CEO",
      category: "Yönetim",
      description: "Teknoloji ve yönetim konusunda geniş tecrübeye sahip, stratejik vizyonuyla ekibi ileri taşıyan kurucu liderimiz.",
      image: "/team/mustafa-eymen.jpg",
      linkedIn: "https://linkedin.com/in/mustafa-eymen-yildirim"
    },
    {
      id: 2,
      name: "Arif Emre Şen",
      role: "COO",
      category: "Yönetim",
      description: "Operasyonel süreçleri yöneten, organizasyonel yapılanma ve süreç optimizasyonu konularında uzman, iş stratejilerini başarıyla uygulayan liderimiz.",
      image: "/team/placeholder.jpg"
    },
    {
      id: 3,
      name: "Batuhan Akkova",
      role: "CTO",
      category: "Yönetim",
      description: "Teknoloji stratejilerini belirleyen, inovasyon ve Ar-Ge süreçlerini yöneten, teknik altyapının geliştirilmesinde liderlik eden teknoloji direktörümüz.",
      image: "/team/placeholder.jpg"
    },
    {
      id: 4,
      name: "Muhammed Zahid Bulut",
      role: "CSO",
      category: "Yönetim",
      description: "Stratejik planlama ve şirket büyüme hedeflerinden sorumlu, sürdürülebilir büyüme stratejileri geliştiren üst düzey yöneticimiz.",
      image: "/team/placeholder.jpg"
    },

    // Birim Liderleri
    {
      id: 5,
      name: "Ali Aktaş",
      role: "Uzay Tarihi Birim Lideri",
      category: "Birim Liderleri",
      description: "Uzay tarihine ilişkin araştırmalar yürüten, bilgi birikimi ve analitik yaklaşımıyla ekibi yönlendiren değerli liderimiz.",
      image: "/team/placeholder.jpg"
    },
    {
      id: 6,
      name: "Av. Anıl Akyol",
      role: "Uzay Hukuku Birim Lideri",
      category: "Birim Liderleri",
      description: "Uzay hukuku alanındaki yasal düzenlemeler ve fikri mülkiyet haklarında uzmanlaşmış, uluslararası uzay hukuku çerçevesinde projelere yön veren avukat liderimiz.",
      image: "/team/placeholder.jpg"
    },
    {
      id: 7,
      name: "Ahmet Bilgiç",
      role: "Medya Direktörü",
      category: "Birim Liderleri",
      description: "İletişim stratejileri ve medya ilişkilerini yöneten, kurumsal kimliğimizin güçlendirilmesinde önemli rol oynayan direktörümüz.",
      image: "/team/placeholder.jpg"
    },
    {
      id: 8,
      name: "Doruk Tan Atila",
      role: "Aviyonik Birim Lideri",
      category: "Birim Liderleri",
      description: "Aviyonik sistemlerin geliştirilmesi ve entegrasyonunda uzmanlaşmış, yenilikçi çözümleriyle öne çıkan liderimiz.",
      image: "/team/placeholder.jpg"
    },
    {
      id: 9,
      name: "Utku Mutlu",
      role: "Balistik Birim Lideri",
      category: "Birim Liderleri",
      description: "Balistik sistemlerin tasarımı ve optimizasyonunda uzmanlaşmış, teknik hesaplamaları yöneten ve analitik çözümler sunan liderimiz.",
      image: "/team/placeholder.jpg"
    },

    // Takım Kaptanları
    {
      id: 10,
      name: "İbrahim Dinçsoy",
      role: "İTÜ Takım Kaptanı",
      category: "Takım Kaptanları",
      description: "İTÜ ekibini yöneten, teknik problemlere yaratıcı çözümler üreten, liderlik vasıflarıyla öne çıkan kaptanımız.",
      image: "/team/placeholder.jpg"
    },
    {
      id: 11,
      name: "İsmail Böler",
      role: "YTÜ Takım Kaptanı",
      category: "Takım Kaptanları",
      description: "YTÜ ekibinin başında, mühendislik alanındaki derin bilgisiyle ekibe rehberlik eden, sonuç odaklı kaptanımız.",
      image: "/team/placeholder.jpg"
    },
    {
      id: 12,
      name: "Kaan Öktem",
      role: "Yazılım Takım Kaptanı",
      category: "Takım Kaptanları",
      description: "Yazılım geliştirme süreçlerini yöneten, modern teknolojileri projelerimize entegre eden, yaratıcı çözümler sunan kaptanımız.",
      image: "/team/placeholder.jpg"
    },
    {
      id: 13,
      name: "Muhammed Emin Yenice",
      role: "Analiz Takım Kaptanı",
      category: "Takım Kaptanları",
      description: "Veri analizi ve performans değerlendirmesi konusunda uzman, ekibin istatistiksel çalışmalarını yöneten kaptanımız.",
      image: "/team/placeholder.jpg"
    },
    {
      id: 14,
      name: "Mustafa Ergin Püsküllüoğlu",
      role: "Donanım Takım Kaptanı",
      category: "Takım Kaptanları",
      description: "Donanım ekibinin başında, elektronik sistemlerin tasarım ve üretiminde uzmanlaşmış, detaycı yaklaşımıyla tanınan kaptanımız.",
      image: "/team/placeholder.jpg"
    },

    // Ekip Üyeleri
    {
      id: 15,
      name: "Asım Furkan Genç",
      role: "Balistik Ekip Üyesi",
      category: "Ekip Üyeleri",
      description: "Balistik hesaplamalar ve simülasyonlar konusunda çalışan, malzeme bilimi ve üretim teknikleri konusunda bilgi sahibi üyemiz.",
      image: "/team/placeholder.jpg"
    },
    {
      id: 16,
      name: "Mehmet Affan Duran",
      role: "Balistik Ekip Üyesi",
      category: "Ekip Üyeleri",
      description: "Mekanik tasarım ve balistik simülasyonlar alanında görev alan, analitik düşünce yapısıyla çözümler sunan ekip üyemiz.",
      image: "/team/placeholder.jpg"
    },
    {
      id: 17,
      name: "Muhenned Velid El-Najjar",
      role: "Balistik Ekip Üyesi",
      category: "Ekip Üyeleri",
      description: "Balistik hesaplamalar ve simülasyonlar konusunda çalışan, uluslararası deneyimiyle ekibe katkı sağlayan değerli üyemiz.",
      image: "/team/placeholder.jpg"
    },
    {
      id: 18,
      name: "Mehmet Anıl Aras",
      role: "Medya Ekip Üyesi",
      category: "Ekip Üyeleri",
      description: "Video prodüksiyon ve içerik geliştirme alanlarında çalışan, etkinliklerin belgelenmesinde görev alan medya ekibi üyemiz.",
      image: "/team/placeholder.jpg"
    },
    {
      id: 19,
      name: "Ömer Faruk Karaoğlu",
      role: "Medya Ekip Üyesi",
      category: "Ekip Üyeleri",
      description: "Sosyal medya yönetimi ve içerik stratejileri konusunda uzmanlaşmış, kurumsal iletişime katkı sağlayan ekip üyemiz.",
      image: "/team/placeholder.jpg"
    }
  ];

  // Group members by category
  const groupedMembers = teamMembers.reduce((acc, member) => {
    if (!acc[member.category]) {
      acc[member.category] = [];
    }
    acc[member.category].push(member);
    return acc;
  }, {} as Record<string, TeamMember[]>);

  // Category display order
  const categoryOrder = [
    "Yönetim",
    "Birim Liderleri",
    "Takım Kaptanları",
    "Ekip Üyeleri"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Ekibimiz</h1>
          </div>
        </div>
      </header>

      {/* Hero Image Section */}
      <section className="hero-section relative h-96 w-full">
        <div className="absolute inset-0">
          <Image 
            src="/images/kadro.jpg" 
            alt="Our Team"
            fill
            className="object-cover filter brightness-75"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040720] via-[#04072090] to-[#04072030]" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Başarılı Ekibimizle Tanışın
          </h2>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl drop-shadow-md">
            Yenilikçi çözümler ve teknolojik ilerlemeler için bir araya gelen uzman kadromuz
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {categoryOrder.map((category) => (
          <div key={category} className="mb-16">
            <div 
              className="category-header flex items-center justify-between cursor-pointer mb-6 pb-3 border-b border-gray-700"
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
                      <div className="text-center space-y-3">
                        <h3 className="text-xl font-semibold text-white">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-400">{member.role}</p>
                        <p className="text-sm text-gray-300 mt-3">{member.description}</p>
                        
                        {/* LinkedIn Button */}
                        {member.linkedIn && (
                          <a
                            href={member.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 p-2 rounded-full bg-white/5 hover:bg-white/10 
                              transition-colors duration-300 hover:text-blue-400 inline-flex"
                            aria-label={`Visit ${member.name}'s LinkedIn profile`}
                          >
                            <Linkedin className="w-5 h-5" />
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

export default TeamPage;