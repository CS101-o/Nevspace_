'use client'

// Import necessary hooks and components
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger' // Ensure ScrollTrigger is imported
import Navigation from '../UI/Navigation' // Assuming this component exists
import { Space_Grotesk } from 'next/font/google'
import { Section } from './MissionSections' // Assuming this type/interface exists
import { useI18n, useTranslation } from '../i18n/I18nProvider' // Assuming these hooks exist
import LanguageSwitcher from '../UI/LanguageSwitcher' // Assuming this component exists
import Logo from '@/components/UI/logo' // Assuming this component exists

// Load the Space Grotesk font
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

// Define the props interface
interface MobileLayoutProps {
  sections: Section[] // Array of section data
  missions: { path: string; name: string }[] // Array of mission links
  handleExamineClick: (sectionId: string) => void // Function to handle examine button click
  scrollToNext: (index: number) => void // Function to scroll to the next section
}

// Export the MobileLayout component
export default function MobileLayout({
  sections,
  missions,
  handleExamineClick,
  scrollToNext
}: MobileLayoutProps) {
  // --- Hooks ---
  const { t } = useTranslation('common'); // Translation hook
  const { dir } = useI18n(); // Internationalization hook for text direction
  const isRTL = dir === 'rtl'; // Check if layout is Right-to-Left

  // State for the mission dropdown visibility
  const [isMissionDropdownOpen, setIsMissionDropdownOpen] = useState(false);

  // Ref for the main container to scope GSAP animations
  const mobileMainRef = useRef<HTMLDivElement>(null);

  // --- Effects ---
  useEffect(() => {
    // Ensure code runs only on the client-side
    if (typeof window !== 'undefined') {
      // Register GSAP plugins
      gsap.registerPlugin(ScrollTrigger);

      // Create a GSAP context for cleanup
      const ctx = gsap.context(() => {
        // --- Initial Load Animations ---

        // Animate logo (using autoAlpha for performance)
        gsap.from('.mobile-logo', {
          autoAlpha: 0, // Use autoAlpha (opacity + visibility)
          y: -20,
          duration: 0.7,
          delay: 0.2,
          ease: 'power2.out',
          clearProps: 'all' // Clear GSAP styles after animation
        });

        // Animate hero section elements
        gsap.from('.mobile-hero-badge', {
          autoAlpha: 0,
          y: 20,
          duration: 0.8,
          delay: 0.5,
          ease: 'power2.out',
          clearProps: 'all'
        });

        gsap.from('.mobile-hero-title span', {
          autoAlpha: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.15, // Stagger animation for each word
          delay: 0.7,
          ease: 'power2.out',
          clearProps: 'all'
        });

        gsap.from('.mobile-hero-description', {
          autoAlpha: 0,
          y: 20,
          duration: 0.9,
          delay: 1.2,
          ease: 'power2.out',
          clearProps: 'all'
        });

        // Animate social media icons
        gsap.from('.mobile-social-icons a', {
          autoAlpha: 0,
          scale: 0.8,
          duration: 0.5,
          stagger: 0.1,
          delay: 1.5,
          ease: 'back.out(1.7)', // Add a slight bounce effect
          clearProps: 'all'
        });

        // Initial background image scale animation (slight adjustment)
        gsap.from('.mobile-background-image', {
          scale: 1.15, // Start slightly more zoomed
          duration: 1.5,
          ease: 'power2.out',
          clearProps: 'transform' // Let ScrollTrigger handle transform later
        });


        // --- Scroll-Triggered Animations for Sections ---
        sections.forEach((section, index) => {
          const sectionEl = `#mobile-section-${index}`;
          const contentWrapper = `${sectionEl} .mobile-content-wrapper`;
          const examineButton = `${sectionEl} .mobile-examine-button`;
          const imageEl = `${sectionEl} .mobile-background-image`;

          // --- Parallax Effect for Background Image (using GSAP ScrollTrigger) ---
          gsap.to(imageEl, {
            yPercent: -15, // Move image up 15% as section scrolls up (adjust as needed)
            ease: 'none', // Linear movement matches scroll exactly
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top bottom', // Start when section top enters viewport bottom
              end: 'bottom top', // End when section bottom leaves viewport top
              scrub: 0.5, // Smoothly link animation to scroll (value > 0 adds smoothing)
              // markers: true, // Uncomment for debugging trigger points
            }
          });

          // --- Content Fade-in/out Animations ---
          if (index > 0) { // Only animate sections after the first one on scroll
            // Set initial state for elements to be animated (hidden)
            gsap.set([contentWrapper, examineButton], { autoAlpha: 0, y: 30 });

            ScrollTrigger.create({
              trigger: sectionEl,
              start: 'top center+=100', // Trigger when the top is 100px past the center
              end: 'bottom center-=100', // End when the bottom is 100px before the center
              // markers: true, // Uncomment for debugging
              onEnter: () => gsap.to([contentWrapper, examineButton], {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2, // Stagger content and button animation
                ease: 'power2.out',
                overwrite: 'auto' // Prevent conflicting animations
              }),
              onLeave: () => gsap.to([contentWrapper, examineButton], {
                autoAlpha: 0,
                y: 30, // Move down slightly on exit
                duration: 0.6,
                ease: 'power2.in',
                overwrite: 'auto'
              }),
              onEnterBack: () => gsap.to([contentWrapper, examineButton], {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                overwrite: 'auto'
              }),
              onLeaveBack: () => gsap.to([contentWrapper, examineButton], {
                autoAlpha: 0,
                y: 30,
                duration: 0.6,
                ease: 'power2.in',
                overwrite: 'auto'
              }),
            });
          } else {
            // Ensure first section's content is initially visible (handled by load animations)
            // No ScrollTrigger needed here for the initial fade-in
             gsap.set([contentWrapper, examineButton], { autoAlpha: 1, y: 0 });
          }
        });

      }, mobileMainRef); // Scope animations to the main ref

      // Cleanup function to kill animations and ScrollTriggers on component unmount
      return () => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Kill all ScrollTriggers
        ctx.revert(); // Revert GSAP animations
      };
    }
  }, [sections]); // Rerun effect if sections data changes

  // --- Event Handlers ---

  // Toggle the mission dropdown menu
  const toggleMissionDropdown = () => {
    setIsMissionDropdownOpen(!isMissionDropdownOpen);
  };

  
  return (
    // Main container - Removed onScroll handler
    <div
      ref={mobileMainRef}
      className="min-h-screen bg-[rgb(0,1,45)] overflow-y-auto relative" // Added relative for potential absolute positioned children inside
    >
      {/* Assuming Navigation is a standard header/nav component */}
      <Navigation />

      {/* Fixed header with logo */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm">
        <div className="flex justify-between items-center p-4">
          {/* Logo with initial animation class */}
          <Logo className={`mobile-logo ${isRTL ? 'order-2' : 'order-1'}`} width={120} height={36} />
          {/* Consider adding LanguageSwitcher back here if needed */}
          {/* <LanguageSwitcher /> */}
        </div>
      </header>

      {/* Mission selector dropdown fixed at the bottom */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 ${isRTL ? 'text-right' : 'text-left'}`}>
        {/* Button to toggle the dropdown */}
        <button
          onClick={toggleMissionDropdown}
          className="bg-[rgb(0,1,45)]/90 backdrop-blur-md w-full py-3 px-4 text-white border-t border-white/20 flex items-center justify-between transition-colors hover:bg-[rgb(10,11,55)]/90"
          aria-haspopup="true" // Accessibility: Indicates it controls a popup menu
          aria-expanded={isMissionDropdownOpen} // Accessibility: Communicates open/closed state
          aria-controls="mission-dropdown-list" // Accessibility: Links button to the list
        >
          <span className="text-sm font-medium">{t('missions.quasar', 'Select Mission')}</span> {/* Provide default text */}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${isMissionDropdownOpen ? 'rotate-180' : ''}`}
            aria-hidden="true" // Hide decorative icon from screen readers
          />
        </button>

        {/* Dropdown list */}
        {/* Basic transition for dropdown visibility */}
        <div
          id="mission-dropdown-list" // Accessibility: ID linked by aria-controls
          className={`bg-[rgb(0,1,45)]/95 backdrop-blur-md border-t border-white/10 max-h-60 overflow-y-auto
                     transition-all duration-300 ease-in-out ${isMissionDropdownOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
          style={{ overflow: 'hidden' }} // Hide content when max-height is 0
        >
          {missions.map((mission) => (
            <Link
              key={mission.name}
              href={mission.path}
              className={`block w-full py-3 px-6 text-white/80 hover:text-white hover:bg-white/5
                transition-colors text-sm ${isRTL ? 'text-right' : ''}`}
              onClick={() => setIsMissionDropdownOpen(false)} // Close dropdown on selection
            >
              {mission.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Main content area with scroll snapping */}
      <main className="snap-y snap-mandatory overflow-y-auto">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={`mobile-section-${index}`}
            className="relative min-h-screen w-full snap-center flex flex-col" // Use flex column
          >
            {/* Background Image Container */}
            <div className="absolute inset-0 overflow-hidden bg-[rgb(0,1,45)]">
              <div className="absolute inset-0 brightness-110 contrast-110 z-0">
                <Image
                  src={section.image}
                  alt="" // Decorative image, alt text provided by section content
                  fill
                  className="mobile-background-image object-cover object-center" // Removed transform/scale here, GSAP handles it
                  priority={index === 0} // Prioritize loading the first image
                  quality={90} // Slightly reduced quality for mobile performance
                  sizes="100vw" // Image covers full viewport width
                  style={{
                    objectPosition: 'center center', // Ensure image is centered
                    transformOrigin: 'center center', // Scale/transform from center
                  }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[rgb(0,1,45)]/50 to-black/70 mix-blend-multiply" />
                {/* Subtle animated particle overlay - slowed down pulse */}
                <div className="absolute inset-0 bg-[url('/stars.png')] opacity-20 z-10 animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
              </div>
            </div>

            {/* Content Area (Relative, z-index higher than background) */}
            <div className="relative flex flex-col flex-grow min-h-screen z-20"> {/* Use flex-grow */}
              {/* Top content area */}
              <div className="flex-1 flex flex-col justify-center px-5 pt-24 pb-10 sm:pt-28 sm:pb-16"> {/* Adjust padding */}
                {index === 0 ? (
                  // Hero Section Content
                  <div className="mobile-content-wrapper text-center"> {/* Centered text */}
                    <div className={`mobile-hero-title overflow-hidden mb-6 sm:mb-8 ${spaceGrotesk.className}`}>
                      {t('heroSection.nationalTech', 'National Technology Initiative').split(' ').map((text, i) => (
                        <span
                        key={`${text}-${i}`}
                        className={`block text-4xl sm:text-5xl font-bold leading-tight tracking-tight uppercase
                          ${isRTL ? 'text-right' : ''} ${i < 2 ? 'mb-2 sm:mb-3' : ''}
                          bg-gradient-to-b from-white to-blue-200 bg-clip-text text-transparent
                          drop-shadow-lg`}>
                        {text}
                        </span>
                      ))}
                    </div>
                    <div className={`mobile-hero-description max-w-xl mx-auto text-base sm:text-lg text-white/90 leading-relaxed
                      backdrop-blur-sm p-4 rounded-lg bg-black/20 shadow-lg border border-white/10
                      ${isRTL ? 'text-right' : ''}`}>
                      {t('heroSection.description', 'Default description text.')}
                    </div>
                  </div>
                ) : (
                  // Subsequent Section Content
                  <div className={`mobile-content-wrapper backdrop-blur-sm p-5 rounded-lg
                    bg-gradient-to-b from-black/10 to-black/1 border border-white/10 shadow-lg
                    ${isRTL ? 'text-right' : 'text-left'}`}> {/* Apply text-alignment based on RTL */}
                    <div className="text-xs sm:text-sm uppercase tracking-[0.2em] text-blue-300 mb-2 sm:mb-3">
                      {t('mission', 'Mission')}
                    </div>
                    <h2 className={`text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight `}>
                      {section.title}
                    </h2>
                    <p className={`text-base text-white/90 mb-6 `}>
                      {section.description}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom area (CTA, Social, Scroll Indicator) */}
              <div className="px-6 pb-28 sm:pb-32 space-y-6 sm:space-y-8 z-20 mt-auto"> {/* Push to bottom, adjust padding */}
                {/* Examine Button */}
                <button
                  onClick={() => handleExamineClick(section.id)}
                  className={`mobile-examine-button w-full max-w-sm mx-auto block bg-gradient-to-r from-blue-800/80 to-indigo-800/80
                    backdrop-blur-md border border-white/30 rounded-xl py-3.5 sm:py-4 text-white text-base
                    font-medium tracking-wide shadow-lg active:scale-95 transition-all duration-200
                    hover:from-blue-700/90 hover:to-indigo-700/90 hover:shadow-xl`}
                >
                  {t('cta.examine', 'Examine')}
                </button>

                {/* Social media icons - in a row for mobile with improved styling */}
                <div className="mobile-social-icons flex justify-center space-x-8 py-4">
                  <a href="https://instagram.com/nevspace" 
                     className="text-white text-opacity-90 hover:text-opacity-100 
                              transition-all duration-300 hover:scale-110 transform">
                    <Instagram size={24} strokeWidth={1.5} />
                  </a>
                  <a href="https://x.com/NevSpaceX/status/1847564366897418434" 
                     className="text-white text-opacity-90 hover:text-opacity-100 
                              transition-all duration-300 hover:scale-110 transform">
                    <Twitter size={24} strokeWidth={1.5} />
                  </a>
                  <a href='https://facebook.com/nevspace' 
                     className="text-white text-opacity-90 hover:text-opacity-100 
                              transition-all duration-300 hover:scale-110 transform">
                    <Facebook size={24} strokeWidth={1.5} />
                  </a>
                  <a href="https://www.youtube.com/@nevspacex" 
                     className="text-white text-opacity-90 hover:text-opacity-100 
                              transition-all duration-300 hover:scale-110 transform">
                    <Youtube size={24} strokeWidth={1.5} />
                  </a>
                  <a href='https://linkedin.com/company/nevspace' 
                     className="text-white text-opacity-90 hover:text-opacity-100 
                              transition-all duration-300 hover:scale-110 transform">
                    <Linkedin size={24} strokeWidth={1.5} />
                  </a>
                </div>

                {/* Scroll down indicator */}
                {index < sections.length - 1 && (
                  <div className="text-center pt-2">
                    <button
                      onClick={() => scrollToNext(index)}
                      aria-label={t('cta.scrollToNextSection', 'Scroll to next section')}
                      className="text-white/80 hover:text-white transition-colors duration-300
                        py-2 px-4 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/30
                        border border-white/10 shadow-lg group inline-flex flex-col items-center"
                    >
                      <span className="block text-xs sm:text-sm mb-1 tracking-wide group-hover:transform group-hover:-translate-y-0.5 transition-transform duration-200">
                        {t('cta.scrollDown', 'Scroll Down')}
                      </span>
                      <ChevronDown className="w-5 h-5 mx-auto animate-bounce" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="relative z-30 bg-gradient-to-t from-[rgb(0,1,45)]/95 to-[rgb(0,1,35)]/95 backdrop-blur-md border-t border-white/10 py-5 px-6 shadow-lg mt-[-1px]"> {/* Added z-index and negative margin */}
        <div className={`flex flex-col ${isRTL ? 'items-end text-right' : 'items-start'} space-y-3`}>
          <div className="text-white/80 text-xs sm:text-sm font-medium">
            {t('footer.copyright', '© Nevspace. All rights reserved.')}
          </div>
          <div className="flex space-x-4 sm:space-x-6">
            <Link href="/privacy" className="text-white/60 hover:text-white text-xs sm:text-sm transition-colors duration-300 hover:underline">
              {t('footer.privacy', 'Privacy Policy')}
            </Link>
            <Link href="/suppliers" className="text-white/60 hover:text-white text-xs sm:text-sm transition-colors duration-300 hover:underline">
              {t('footer.suppliers', 'Suppliers')}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
