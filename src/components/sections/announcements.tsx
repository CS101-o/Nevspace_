import React, { useState } from 'react';
import { ChevronDown, Calendar, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/UI/Navigation';

const AnnouncementsPage = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  
  const announcements = [
    {
      id: 1,
      date: '2025-01-15',
      title: 'Bittirim',
      description: 'Aviyonik birimimiz tarafından uzun süredir araştırma ve geliştirme süreci yürütülen Bitirim (Çift Kademeli Sonda Roket Uçuş Kontrolörü) projemiz geçtiğimiz günlerde ilk ürünlerini verdi ve pazara sürülmeye neredeyse hazır durumda. Bu süreçte emeği geçen tüm arkadaşlarımızın eline emeğine sağlık. Bunun karşılığını alabilmemiz için aşağıdaki gönderileri beğenip paylaşmanız, marka görünürlüğü elde etmemiz adına çok önemli. Hepinizden bu konuda destek bekliyoruz 🙌🏻',
      category: 'Görev Güncellemesi'
    },
    {
      id: 2,
      date: '2025-01-20',
      title: 'Ilerlemeye Devam',
      description: 'Güzel haberler gelmeye devam ediyor, çalışmalarımızın karşılığını almaya başlıyoruz arkadaşlar! Binlerce ekip arasından  İTÜ Çekirdek Ön Kuluçka programına katılmaya hak kazandık. 🚀Her zaman olduğu gibi paylaşımlarımıza etkileşime girerek ve kendi çevrenizle paylaşarak desteklerinizi bekliyoruz  ',
      category: 'Şirket Haberleri'
    },
    {
      id: 3,
      date: '2025-02-15',
      title: 'Teknoloji Atılımı',
      description: '',
      category: 'Ar-Ge'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[rgb(1,0,45)] via-[rgb(1,0,65)] to-[rgb(1,0,45)] text-white relative overflow-hidden">
      <Navigation/>
      {/* Background pattern */}
      <div
        className="absolute inset-0 bg-[url('/stars.png')] opacity-30"
        aria-hidden="true"
      />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/announcements.jpg"
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-7xl font-bold tracking-tight text-white mb-2 text-center title-slide">
            DUYURULAR
          </h1>
        </div>
      </div>

      {/* Main content */}
      <main className="content-wrapper relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {/* Content Header */}
          <div className="relative nevspace-badge">
            <div
              className="absolute -left-4 -top-4 w-20 h-20 bg-blue-500 rounded-full blur-3xl opacity-20"
              aria-hidden="true"
            />
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent rounded-full" />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8 description-fade">
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="examine-button bg-opacity-30 border border-blue-800 rounded-lg px-4 py-2 text-gray-300 backdrop-blur-sm"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>

          {/* Announcements Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {announcements.map((announcement, index) => (
              <div 
                key={announcement.id}
                className={`bg-opacity-30 backdrop-blur-sm rounded-lg p-6 border border-blue-800/50 
                  description-fade title-slide-delay-${index + 1}`}
              >
                <div className="flex items-center gap-2 text-blue-400 mb-4">
                  <Calendar size={16} />
                  <span>{new Date(announcement.date).toLocaleDateString('tr-TR')}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 menu-item">
                  {announcement.title}
                </h3>
                <p className="text-gray-300 mb-4">{announcement.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm px-3 py-1 bg-opacity-50 backdrop-blur-sm rounded-full border border-blue-800/50">
                    {announcement.category}
                  </span>
                  <button className="examine-button text-blue-400 flex items-center gap-1">
                    Detaylar
                    <ExternalLink size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-12 description-fade">
            <button className="examine-button flex items-center gap-2 text-blue-400 bg-opacity-30 backdrop-blur-sm 
              px-6 py-3 rounded-lg border border-blue-800/50">
              Daha Fazla Göster
              <ChevronDown size={20} className="animate-bounce" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnnouncementsPage;