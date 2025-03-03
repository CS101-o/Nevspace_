import { useState, useEffect, useRef } from 'react'

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up')
  const [pastFirstPage, setPastFirstPage] = useState(false)
  const prevOffset = useRef(0)
  const lastScrollY = useRef(0)
  
  useEffect(() => {
    const threshold = 5;
    
    const onScroll = () => {
      const scrollY = Math.max(0, window.pageYOffset)
      const viewportHeight = window.innerHeight
      
      // Ignore very small differences in scroll position
      if (Math.abs(scrollY - lastScrollY.current) < threshold) {
        return;
      }
      
      setPastFirstPage(scrollY > viewportHeight * 0.8)
      
      if (scrollY === 0) {
        setScrollDirection('up')
      } else if (scrollY > prevOffset.current + threshold) {
        setScrollDirection('down')
      } else if (scrollY < prevOffset.current - threshold) {
        setScrollDirection('up')
      }
      
      prevOffset.current = scrollY
      lastScrollY.current = scrollY
    };
    
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  
  return { scrollDirection, pastFirstPage }
}