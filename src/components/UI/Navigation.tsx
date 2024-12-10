// Navigation.tsx
'use client'
import { useState } from 'react'
//import Image from 'next/image'
import Link from 'next/link'
import { Menu, X, ChevronLeft } from 'lucide-react'
import { gsap } from 'gsap'

interface NavItem {
  label: string
  href: string
  subItems?: NavItem[]
}

const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)

  const navItems: NavItem[] = [
    {
      label: 'HAKKIMIZDA',
      href: '#hakkimizda',
      subItems: [
        { label: 'Biz Kimiz', href: '/about/who-we-are' },
        { label: 'Çalışma Şeması', href: '/about/work-schema' }
      ]
    },
    { label: 'MİSYONLAR', href: '#misyonlar' },
    { label: 'PLATFORM', href: '#platform' },
    { label: 'DUYURULAR', href: '#duyurular' },
    { label: 'PAYDAŞLAR', href: '#paydaslar' },
    { label: 'İLETİŞİM', href: '#iletisim' }
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
      {/* Right Sidebar */}
      <button 
        onClick={toggleSidebar}
        className="fixed top-8 right-8 z-50 text-white hover:text-white/80 transition-colors p-2"
        aria-label="Menu"
      >
        <Menu size={24} />
      </button>

      <div 
        className={`sidebar fixed top-0 right-0 h-full w-80 bg-black z-50 transform 
          translate-x-full transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col">
          <div className="flex justify-end p-6">
            <button 
              onClick={toggleSidebar}
              className="text-white hover:text-white/80 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6">
            {navItems.map((item) => (
              <div key={item.label} className="px-8">
                <div 
                  className="flex items-center justify-between py-3 cursor-pointer
                    text-white hover:text-white/80 transition-colors duration-300"
                  onClick={() => item.subItems ? toggleSubmenu(item.label) : null}
                >
                  <Link 
                    href={item.href}
                    onClick={(e) => item.subItems && e.preventDefault()}
                    className="text-sm tracking-wider"
                  >
                    {item.label}
                  </Link>
                  {item.subItems && (
                    <ChevronLeft 
                      size={20} 
                      className={`transform transition-transform duration-200
                        ${activeSubmenu === item.label ? '-rotate-90' : ''}`}
                    />
                  )}
                </div>

                {item.subItems && activeSubmenu === item.label && (
                  <div className="mr-4 border-r border-white/10">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block py-2 pr-4 text-right text-white/60 hover:text-white 
                          transition-colors duration-300 text-sm tracking-wide"
                        onClick={toggleSidebar}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

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