import React, { useEffect, useRef, useState } from 'react';
import { Linkedin, Users } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import Navigation from '@/components/UI/Navigation';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  category: string;
  image: string;
  linkedIn?: string;
}

const TeamPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Mustafa Eymen YILDIRIM",
      role: "YÖNETİM KURULU BAŞKANI / TEKNOLOJİ LİDERİ",
      category: "Yönetim",
      image: "/team/mustafa-eymen.jpg", // Replace with actual image path
      linkedIn: "https://linkedin.com/in/mustafa-eymen-yildirim"
    },
    {
      id: 2,
      name: "Hamit YILDIRIM",
      role: "YÖNETİM KURULU ÜYESİ",
      category: "Yönetim Kurulu",
      image: "/team/placeholder.jpg"
    },
    {
      id: 3,
      name: "Murat YILMAZ",
      role: "YÖNETİM KURULU ÜYESİ",
      category: "Yönetim Kurulu",
      image: "/team/placeholder.jpg"
    },
    {
      id: 4,
      name: "Abdullah Eren YILDIRIM",
      role: "YÖNETİM KURULU ÜYESİ",
      category: "Yönetim Kurulu",
      image: "/team/placeholder.jpg"
    },

    // Proje Koordinatörleri
    {
      id: 5,
      name: "Arif Emre ŞEN",
      role: "PROJE KOORDİNATÖRÜ",
      category: "Proje Koordinatörlüğü",
      image: "/team/placeholder.jpg"
    },
    {
      id: 6,
      name: "Muhammed Eren ALBAYRAK",
      role: "PROJE KOORDİNATÖRÜ",
      category: "Proje Koordinatörlüğü",
      image: "/team/placeholder.jpg"
    },

    // Takım Kaptanları
    {
      id: 7,
      name: "İbrahim DİNÇSOY",
      role: "İTÜ TAKIM KAPTANI",
      category: "Takım Kaptanları",
      image: "/team/placeholder.jpg"
    },
    {
      id: 8,
      name: "İsmail BÖLER",
      role: "YTÜ TAKIM KAPTANI",
      category: "Takım Kaptanları",
      image: "/team/placeholder.jpg"
    },
    {
      id: 9,
      name: "Muhammed Zahid BULUT",
      role: "UoM TAKIM KAPTANI",
      category: "Takım Kaptanları",
      image: "/team/placeholder.jpg"
    },
    {
      id: 10,
      name: "Mustafa Ergin PÜSKÜLLÜOĞLU",
      role: "DONANIM TAKIM KAPTANI",
      category: "Takım Kaptanları",
      image: "/team/placeholder.jpg"
    },
    {
      id: 11,
      name: "Batuhan AKKOVA",
      role: "BALİSTİK TAKIM KAPTANI",
      category: "Takım Kaptanları",
      image: "/team/placeholder.jpg"
    },
    {
      id: 12,
      name: "Muhammed Emin YENİCE",
      role: "ANALİZ TAKIM KAPTANI",
      category: "Takım Kaptanları",
      image: "/team/placeholder.jpg"
    },

    // Birim Liderleri
    {
      id: 13,
      name: "Doruk Tan ATİLA",
      role: "AVİYONİK BİRİM LİDERİ",
      category: "Birim Liderleri",
      image: "/team/placeholder.jpg"
    },
    {
      id: 14,
      name: "Ali AKTAŞ",
      role: "MEDYA DİREKTÖRÜ",
      category: "Birim Liderleri",
      image: "/team/placeholder.jpg"
    },
    {
      id: 15,
      name: "Av.Anıl AKYOL",
      role: "HUKUK BİRİM LİDERİ",
      category: "Birim Liderleri",
      image: "/team/placeholder.jpg"
    },

    // Ekip Üyeleri
    {
      id: 16,
      name: "Muhenned El-Najjar",
      role: "Balistik Ekip Üyesi",
      category: "Ekip Üyeleri",
      image: "/team/placeholder.jpg"
    },
    {
      id: 17,
      name: "Mehmet Akif UĞUR",
      role: "Aviyonik Ekip Üyesi",
      category: "Ekip Üyeleri",
      image: "/team/placeholder.jpg"
    },
    {
      id: 18,
      name: "Mehmet Affan DURAN",
      role: "Mekanik Ekip Üyesi",
      category: "Ekip Üyeleri",
      image: "/team/placeholder.jpg"
    },
    {
      id: 19,
      name: "Asım Furkan GENÇ",
      role: "Mekanik Ekip Üyesi",
      category: "Ekip Üyeleri",
      image: "/team/placeholder.jpg"
    },
    {
      id: 20,
      name: "Kaan ÖKTEM",
      role: "Aviyonik Ekip Üyesi",
      category: "Ekip Üyeleri",
      image: "/team/placeholder.jpg"
    },
    {
      id: 21,
      name: "Ahmet BİLGİÇ",
      role: "Medya Ekip Üyesi",
      category: "Ekip Üyeleri",
      image: "/team/placeholder.jpg"
    },
    {
      id: 22,
      name: "Mehmet Anıl ARAS",
      role: "Medya Ekip Üyesi",
      category: "Ekip Üyeleri",
      image: "/team/placeholder.jpg"
    }
  ];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const page = pageRef.current;
    if (!page) return;

    const header = page.querySelector('.page-header');
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

      gsap.set(cards, { opacity: 0, y: 50 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.5,
        ease: 'power3.out'
      });
    }, page);

    return () => ctx.revert();
  }, [hasMounted]);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#040720]">
      <Navigation/>
      {/* Header */}
      <header className="page-header bg-[#0a0d2c] border-b border-gray-800 opacity-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Ekibimiz</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="team-card bg-[#0a0d2c] rounded-lg shadow-md overflow-hidden 
                transform transition-all duration-300 ease-in-out
                hover:shadow-2xl hover:scale-105 hover:-translate-y-1
                border border-gray-800 hover:border-gray-600 opacity-0"
            >
              <div className="p-6 flex flex-col items-center">
                {/* Profile Image */}
                <div className="team-image w-48 h-48 relative mb-6 rounded-full overflow-hidden
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
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-semibold text-white">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-400">{member.role}</p>
                  <p className="text-xs text-gray-500">{member.category}</p>
                  
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
      </main>
    </div>
  );
};

export default TeamPage;