import React, { useEffect, useRef, useState } from 'react';
import { Linkedin, Users } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import Navigation from '@/components/UI/Navigation';

interface Advisor {
  id: number;
  name: string;
  role: string;
  category: "İdari Heyet" | "Teknik Heyet";
  image: string;
  linkedIn?: string;
  title?: string;
}

const AdvisorsPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  const advisors: Advisor[] = [
    // İdari Heyet
    {
      id: 1,
      name: "Ömer Faruk AKYÜZLÜ", // Replace with actual advisor
      title: "",
      role: "Yönetim Danışmanı",
      category: "İdari Heyet",
      image: "/advisors/placeholder.jpg",
      linkedIn: "https://linkedin.com/in/johndoe"
    },

    {
        id: 2,
        name: "Yusuf ELGÖRMÜŞ", // Replace with actual advisor
        title: "",
        role: "Yönetim Danışmanı",
        category: "İdari Heyet",
        image: "/advisors/placeholder.jpg",
        linkedIn: "https://linkedin.com/in/johndoe"
      },
  
   
    // Add more İdari Heyet members

    // Teknik Heyet
    {
      id: 3,
      name: "Anıl AKYOL", // Replace with actual advisor
      title: "",
      role: "Teknik Danışman",
      category: "Teknik Heyet",
      image: "/advisors/placeholder.jpg",
      linkedIn: "https://linkedin.com/in/janesmith"
    },
    {
        id: 4,
        name: "Eyyub Can ODACIOĞLU", // Replace with actual advisor
        title: "",
        role: "Teknik Danışman",
        category: "Teknik Heyet",
        image: "/advisors/placeholder.jpg",
        linkedIn: "https://linkedin.com/in/janesmith"
      },
      {
        id: 5,
        name: "Halit MİRAHMETOĞLU", // Replace with actual advisor
        title: "",
        role: "Teknik Danışman",
        category: "Teknik Heyet",
        image: "/advisors/placeholder.jpg",
        linkedIn: "https://linkedin.com/in/janesmith"
      },
      {
        id: 6,
        name: "Muhammed Tayyip GÜRBÜZ", // Replace with actual advisor
        title: "",
        role: "Teknik Danışman",
        category: "Teknik Heyet",
        image: "/advisors/placeholder.jpg",
        linkedIn: "https://linkedin.com/in/janesmith"
      },
      {
        id: 7,
        name: "Nebile Pelin MANTI", // Replace with actual advisor
        title: "",
        role: "Teknik Danışman",
        category: "Teknik Heyet",
        image: "/advisors/placeholder.jpg",
        linkedIn: "https://linkedin.com/in/janesmith"
      },
      {
        id: 8,
        name: "Ömer Faruk KOÇ", // Replace with actual advisor
        title: "",
        role: "Teknik Danışman",
        category: "Teknik Heyet",
        image: "/advisors/placeholder.jpg",
        linkedIn: "https://linkedin.com/in/janesmith"
      }
      
    // Add more Teknik Heyet members
  ];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const page = pageRef.current;
    if (!page) return;

    const header = page.querySelector('.page-header');
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

  // Group advisors by category
  const advisorsByCategory = advisors.reduce((acc, advisor) => {
    if (!acc[advisor.category]) {
      acc[advisor.category] = [];
    }
    acc[advisor.category].push(advisor);
    return acc;
  }, {} as Record<string, Advisor[]>);

  return (
    <div ref={pageRef} className="min-h-screen bg-[#040720]">
        <Navigation/>
      {/* Header */}
      <header className="page-header bg-[#0a0d2c] border-b border-gray-800 opacity-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Danışmanlar</h1>
          </div>
        </div>
      </header>

        
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Render each category */}
        {Object.entries(advisorsByCategory).map(([category, categoryAdvisors]) => (
          <div key={category} className="mb-16 last:mb-0">
            <h2 className="text-2xl font-bold text-white mb-8 pb-2 border-b border-gray-800">
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryAdvisors.map((advisor) => (
                <div
                  key={advisor.id}
                  className="advisor-card bg-[#0a0d2c] rounded-xl shadow-xl overflow-hidden 
                    transform transition-all duration-500 ease-out
                    hover:shadow-2xl hover:scale-105 hover:-translate-y-2
                    border border-gray-800 hover:border-blue-500/50 opacity-0"
                >
                  <div className="p-8 flex flex-col items-center">
                    {/* Profile Image */}
                    <div className="w-48 h-48 relative mb-6 rounded-xl overflow-hidden
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
                    <div className="text-center space-y-2">
                      <h3 className="text-2xl font-bold text-white">
                        {advisor.title && <span className="text-blue-400">{advisor.title} </span>}
                        {advisor.name}
                      </h3>
                      <p className="text-lg text-gray-300">{advisor.role}</p>
                      
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
          </div>
        ))}
      </main>
    </div>
    
  );
};

export default AdvisorsPage;