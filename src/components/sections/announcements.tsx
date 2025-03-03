import React, { useState, useEffect } from 'react';
import { ChevronDown, Calendar, ExternalLink, Linkedin, Instagram } from 'lucide-react';
import Image from 'next/image';
import Navigation from '@/components/UI/Navigation';

const AnnouncementsPage = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState('linkedin'); // 'linkedin' or 'instagram'
  
  useEffect(() => {
    fetchAnnouncements();
  }, [selectedYear, source]);
  
  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      // In a real implementation, you would use the actual API endpoints
      const endpoint = source === 'linkedin' 
        ? `/api/linkedin-posts?year=${selectedYear}` 
        : `/api/instagram-posts?year=${selectedYear}`;
        
      // For demo purposes, we'll simulate the API response
      setTimeout(() => {
        let data;
        
        if (source === 'linkedin') {
          data = mockLinkedInPosts.filter(post => 
            new Date(post.date).getFullYear().toString() === selectedYear
          );
        } else {
          data = mockInstagramPosts.filter(post => 
            new Date(post.date).getFullYear().toString() === selectedYear
          );
        }
        
        setAnnouncements(data);
        setLoading(false);
      }, 800);
      
      // Uncomment for real implementation:
      // const response = await fetch(endpoint);
      // const data = await response.json();
      // setAnnouncements(data);
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setLoading(false);
    }
  };
  
  // Mock data for demonstration
  const mockLinkedInPosts = [
    {
      id: 1,
      date: '2025-01-15',
      title: 'Bittirim',
      description: 'Aviyonik birimimiz tarafından uzun süredir araştırma ve geliştirme süreci yürütülen Bitirim (Çift Kademeli Sonda Roket Uçuş Kontrolörü) projemiz geçtiğimiz günlerde ilk ürünlerini verdi ve pazara sürülmeye neredeyse hazır durumda. Bu süreçte emeği geçen tüm arkadaşlarımızın eline emeğine sağlık. Bunun karşılığını alabilmemiz için aşağıdaki gönderileri beğenip paylaşmanız, marka görünürlüğü elde etmemiz adına çok önemli. Hepinizden bu konuda destek bekliyoruz 🙌🏻',
      category: 'Görev Güncellemesi',
      url: 'https://linkedin.com/post/1',
      likes: 45,
      comments: 8
    },
    {
      id: 2,
      date: '2025-01-20',
      title: 'Ilerlemeye Devam',
      description: 'Güzel haberler gelmeye devam ediyor, çalışmalarımızın karşılığını almaya başlıyoruz arkadaşlar! Binlerce ekip arasından  İTÜ Çekirdek Ön Kuluçka programına katılmaya hak kazandık. 🚀Her zaman olduğu gibi paylaşımlarımıza etkileşime girerek ve kendi çevrenizle paylaşarak desteklerinizi bekliyoruz',
      category: 'Şirket Haberleri',
      url: 'https://linkedin.com/post/2',
      likes: 112,
      comments: 24
    },
    {
      id: 3,
      date: '2024-12-15',
      title: 'Teknoloji Atılımı',
      description: 'Yeni geliştirdiğimiz teknoloji ile uzay endüstrisinde önemli bir atılım yapıyoruz. Detayları yakında paylaşacağız.',
      category: 'Ar-Ge',
      url: 'https://linkedin.com/post/3',
      likes: 78,
      comments: 15
    }
  ];
  
  const mockInstagramPosts = [
    {
      id: 101,
      date: '2025-01-10',
      title: 'Yeni Ofisimiz',
      description: 'Yeni ofisimize taşındık! Daha geniş ve modern çalışma alanımızda projelerimize hız kesmeden devam ediyoruz.',
      category: 'Şirket Haberleri',
      imageUrl: '/images/office.jpg',
      url: 'https://instagram.com/p/123456',
      likes: 230,
      comments: 45
    },
    {
      id: 102,
      date: '2025-02-05',
      title: 'Ekip Buluşması',
      description: 'Aylık ekip buluşmamızda yeni projelerimizi değerlendirdik ve gelecek hedeflerimizi belirledik.',
      category: 'Etkinlik',
      imageUrl: '/images/team-meeting.jpg',
      url: 'https://instagram.com/p/234567',
      likes: 185,
      comments: 32
    },
    {
      id: 103,
      date: '2024-11-20',
      title: 'Ödül Töreni',
      description: 'Teknoloji İnovasyon Ödülleri\'nde "En İyi Uzay Teknolojisi" kategorisinde finale kaldık!',
      category: 'Başarılar',
      imageUrl: '/images/award.jpg',
      url: 'https://instagram.com/p/345678',
      likes: 312,
      comments: 67
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

          {/* Filters and Source Toggle */}
          <div className="flex flex-wrap gap-4 mb-8 description-fade">
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="examine-button bg-opacity-30 border border-blue-800 rounded-lg px-4 py-2 text-gray-300 backdrop-blur-sm"
            >
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
            
            <div className="flex items-center gap-3 ml-4">
              <button 
                onClick={() => setSource('linkedin')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  source === 'linkedin' 
                    ? 'border-blue-500 text-blue-400 bg-blue-900/30' 
                    : 'border-blue-800/50 text-gray-300 bg-opacity-30'
                } backdrop-blur-sm transition-all`}
              >
                <Linkedin size={18} />
                LinkedIn
              </button>
              <button 
                onClick={() => setSource('instagram')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  source === 'instagram' 
                    ? 'border-blue-500 text-blue-400 bg-blue-900/30' 
                    : 'border-blue-800/50 text-gray-300 bg-opacity-30'
                } backdrop-blur-sm transition-all`}
              >
                <Instagram size={18} />
                Instagram
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center p-12">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Empty State */}
          {!loading && announcements.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold mb-2">Henüz Duyuru Yok</h3>
              <p className="text-gray-400">Bu yıl için {source === 'linkedin' ? 'LinkedIn' : 'Instagram'}'da paylaşılan herhangi bir duyuru bulunamadı.</p>
            </div>
          )}

          {/* Announcements Grid */}
          {!loading && announcements.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {announcements.map((announcement, index) => (
                <div 
                  key={announcement.id}
                  className={`bg-opacity-30 backdrop-blur-sm rounded-lg p-6 border border-blue-800/50 
                    description-fade title-slide-delay-${index + 1}`}
                >
                  {/* Source Icon */}
                  <div className="absolute top-4 right-4">
                    {source === 'linkedin' ? 
                      <Linkedin size={18} className="text-blue-400" /> : 
                      <Instagram size={18} className="text-blue-400" />
                    }
                  </div>

                  {/* Instagram Post Image */}
                  {source === 'instagram' && announcement.imageUrl && (
                    <div className="relative h-40 w-full mb-4 rounded-md overflow-hidden">
                      <Image
                        src={announcement.imageUrl || '/api/placeholder/400/320'}
                        alt={announcement.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-blue-400 mb-4">
                    <Calendar size={16} />
                    <span>{new Date(announcement.date).toLocaleDateString('tr-TR')}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 menu-item">
                    {announcement.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-4 line-clamp-3">{announcement.description}</p>
                  
                  {/* Social Stats */}
                  <div className="flex gap-4 mb-4">
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <span>❤️</span>
                      <span>{announcement.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <span>💬</span>
                      <span>{announcement.comments}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm px-3 py-1 bg-opacity-50 backdrop-blur-sm rounded-full border border-blue-800/50">
                      {announcement.category}
                    </span>
                    <a 
                      href={announcement.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="examine-button text-blue-400 flex items-center gap-1"
                    >
                      Gönderiye Git
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {!loading && announcements.length >= 3 && (
            <div className="flex justify-center mt-12 description-fade">
              <button className="examine-button flex items-center gap-2 text-blue-400 bg-opacity-30 backdrop-blur-sm 
                px-6 py-3 rounded-lg border border-blue-800/50">
                Daha Fazla Göster
                <ChevronDown size={20} className="animate-bounce" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AnnouncementsPage;