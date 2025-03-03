'use client'
import { useState } from 'react'
//import Link from 'next/link'
import { Menu, X, ChevronLeft } from 'lucide-react'
import { gsap } from 'gsap'
import { useRouter } from 'next/navigation'

interface NavItem {
  label: string
  href: string
  subItems?: NavItem[]
}

const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const router = useRouter()

  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    e?.preventDefault()
    
    if (href.startsWith('#')) {
      const element = document.getElementById(href.slice(1))
      if (element) {
        setIsSidebarOpen(false)
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 400)
      }
    } else {
      setIsSidebarOpen(false)
      setTimeout(() => {
        router.push(href)
      }, 400)
    }
  }

  const navItems: NavItem[] = [
    {
      label: 'HAKKIMIZDA',
      href: '/about',
      subItems: [
        { label: 'Biz Kimiz', href: '/about/who-we-are' },
        { label: 'Çalışma Şeması', href: '/about/work-schema' },
        { label: 'Vizyon', href: '/about/vision' },
        { label: 'Kadro', href: '/about/team' },
        { label: 'Danışmanlar Kurulu', href: '/about/advisors' },
        { label: 'Kurumsal Kimlik', href: '/about/identity' }
      ]
    },
    { label: 'MİSYONLAR',
      href: '/missions',
      subItems: [
        { label: 'QUASAR', href: 'missions/QUASAR' },
        { label: 'PRANGA', href: 'missions/PRANGA' },
        { label: 'PULSAR', href: 'missions/PULSAR' },
        { label: 'TOYGAR', href: 'missions/TOYGAR' },
        { label: 'OPERANTE', href: '/missions/OPERNATE' },
        { label: 'CAELIFERA', href: '/missions/CAELIFERA' },
        //{ label: 'PAS', href: '/missions/pas' },
        { label: 'BİTİRİM', href: '/missions/BITIRIM' }
      ] },
    { label: 'PLATFORM',
      href: '/FilePlatform',
      subItems: [
        { label: 'Platform Nedir?', href: 'FilePlatform/about' },
        { label: 'Başvuru Formu', href: 'FilePlatform/platform' }
      ] },
      
    { label: 'DUYURULAR', href: '/announcements'},  
    { label: "PAYDAŞLAR", href: '/paydaslar'},
    { label: 'İLETİŞİM', href: '/contact' }
  ]

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    if (!isSidebarOpen) {
      gsap.fromTo('.sidebar', 
        { x: '100%' },
        { x: 0, duration: 0.4, ease: 'power2.out' }
      )
    } else {
      gsap.to('.sidebar', {
        x: '100%',
        duration: 0.4,
        ease: 'power2.in'
      })
    }
  }

  const toggleSubmenu = (label: string) => {
    setActiveSubmenu(activeSubmenu === label ? null : label)
  }

  return (
    <>
      {/* Menu Button */}
      <button 
        onClick={toggleSidebar}
        className="fixed top-8 right-8 z-50 text-white hover:text-white/80 transition-colors p-2"
        aria-label="Menu"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div 
        className={`sidebar fixed top-0 right-0 h-full w-80 bg-[rgb(0,1,45)] z-50 transform 
          translate-x-full transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col">
          {/* Close Button */}
          <div className="flex justify-end p-6">
            <button 
              onClick={toggleSidebar}
              className="text-white hover:text-white/80 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-6">
            {navItems.map((item) => (
              <div key={item.label} className="px-8">
                <div 
                  className="flex items-center justify-between py-3 cursor-pointer
                    text-white hover:text-white/80 transition-colors duration-300"
                  onClick={() => {
                    if (item.subItems) {
                      toggleSubmenu(item.label)
                    } else {
                      handleNavClick(item.href)
                    }
                  }}
                >
                  <span className="text-sm tracking-wider">
                    {item.label}
                  </span>
                  {item.subItems && (
                    <ChevronLeft 
                      size={20} 
                      className={`transform transition-transform duration-200
                        ${activeSubmenu === item.label ? '-rotate-90' : ''}`}
                    />
                  )}
                </div>

                {/* Submenu Items */}
                {item.subItems && activeSubmenu === item.label && (
                  <div className="mr-4 border-r border-white/10">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.label}
                        onClick={(e) => handleNavClick(subItem.href, e)}
                        className="block w-full text-right py-2 pr-4 text-white/60 hover:text-white 
                          transition-colors duration-300 text-sm tracking-wide"
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-white/10">
            <div className="text-white/50 text-sm">
              © 2024 Nevspace. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={toggleSidebar}
        />
      )}
    </>
  )
}

export default Navigation