'use client'
import { useState } from 'react'
import { Menu, X, ChevronLeft } from 'lucide-react'
import { gsap } from 'gsap'
import { useRouter } from 'next/navigation'
import LanguageSwitcher from '../UI/LanguageSwitcher'
import { useI18n, useTranslation } from '../i18n/I18nProvider'

interface NavItem {
  label: string
  translationKey: string
  href: string
  subItems?: NavItem[]
}

const Navigation = () => {
  // translation hooks
  const { t } = useTranslation('common');
  const { dir } = useI18n();
  const isRTL = dir === 'rtl';

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
      label: t('nav.about'),
      translationKey: 'nav.about',
      href: '/about',
      subItems: [
        { label: t('about.whoWeAre'), translationKey: 'about.whoWeAre', href: '/about/who-we-are' },
        { label: t('about.workSchema'), translationKey: 'about.workSchema', href: '/about/work-schema' },
        { label: t('about.vision'), translationKey: 'about.vision', href: '/about/vision' },
        { label: t('about.team'), translationKey: 'about.team', href: '/about/team' },
        { label: t('about.advisors'), translationKey: 'about.advisors', href: '/about/advisors' },
        { label: t('about.identity'), translationKey: 'about.identity', href: '/about/identity' }
      ]
    },
    { 
      label: t('nav.missions'),
      translationKey: 'nav.missions',
      href: '/missions',
      subItems: [
        { label: t('missions.quasar'), translationKey: 'missions.quasar', href: '/missions/QUASAR' },
        { label: t('missions.pranga'), translationKey: 'missions.pranga', href: '/missions/PRANGA' },
        { label: t('missions.pulsar'), translationKey: 'missions.pulsar', href: '/missions/PULSAR' },
        { label: t('missions.toygar'), translationKey: 'missions.toygar', href: '/missions/TOYGAR' },
        { label: t('missions.operante'), translationKey: 'missions.operante', href: '/missions/OPERNATE' },
        { label: t('missions.caelifera'), translationKey: 'missions.caelifera', href: '/missions/CAELIFERA' },
        { label: t('missions.bitirim'), translationKey: 'missions.bitirim', href: '/missions/BITIRIM' }
      ] 
    },
    { 
      label: t('nav.platform'),
      translationKey: 'nav.platform',
      href: '/FilePlatform',
      subItems: [
        { label: t('platform.what'), translationKey: 'platform.what', href: '/FilePlatform/about' },
        { label: t('platform.application'), translationKey: 'platform.application', href: '/FilePlatform/platform' }
      ] 
    },
      
    { label: t('nav.announcements'), translationKey: 'nav.announcements', href: '/announcements'},  
    { label: t('nav.partners'), translationKey: 'nav.partners', href: '/paydaslar'},
    { label: t('nav.contact'), translationKey: 'nav.contact', href: '/contact' }
  ]

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
    if (!isSidebarOpen) {
      gsap.fromTo('.sidebar', 
        { x: isRTL ? '-100%' : '100%' },
        { x: 0, duration: 0.4, ease: 'power2.out' }
      )
    } else {
      gsap.to('.sidebar', {
        x: isRTL ? '-100%' : '100%',
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
        className={`fixed top-8 ${isRTL ? 'left-8' : 'right-8'} z-50 text-white hover:text-white/80 transition-colors p-2`}
        aria-label="Menu"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div 
        className={`sidebar fixed top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-80 bg-[rgb(0,1,45)] z-50 transform 
          ${isRTL ? '-translate-x-full' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col">
          {/* Close Button and Language Switcher */}
          <div className={`flex ${isRTL ? 'justify-between' : 'justify-end'} p-6`}>
            {isRTL && (
              <LanguageSwitcher />
            )}
            <button 
              onClick={toggleSidebar}
              className="text-white hover:text-white/80 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Language Switcher (shown only for LTR) */}
          {!isRTL && (
            <div className="px-6 mb-4">
              <LanguageSwitcher />
            </div>
          )}

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto py-6">
            {navItems.map((item) => (
              <div key={item.translationKey} className="px-8">
                <div 
                  className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} justify-between py-3 cursor-pointer
                    text-white hover:text-white/80 transition-colors duration-300`}
                  onClick={() => {
                    if (item.subItems) {
                      toggleSubmenu(item.translationKey)
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
                        ${activeSubmenu === item.translationKey ? '-rotate-90' : ''} 
                        ${isRTL ? 'rotate-180' : ''}`}
                    />
                  )}
                </div>

                {/* Submenu Items */}
                {item.subItems && activeSubmenu === item.translationKey && (
                  <div className={`${isRTL ? 'ml-4 border-l' : 'mr-4 border-r'} border-white/10`}>
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.translationKey}
                        onClick={(e) => handleNavClick(subItem.href, e)}
                        className={`block w-full ${isRTL ? 'text-left pl-4' : 'text-right pr-4'} py-2 text-white/60 hover:text-white 
                          transition-colors duration-300 text-sm tracking-wide`}
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
          <div className={`p-8 border-t border-white/10 ${isRTL ? 'text-right' : ''}`}>
            <div className="text-white/50 text-sm">
              {t('footer.copyright')}
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