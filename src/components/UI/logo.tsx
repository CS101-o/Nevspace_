'use client'

import Image from 'next/image'
import Link from 'next/link'
//import { useI18n } from '../i18n/I18nProvider'

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ 
  width = 140, 
  height = 45,
  className = ""
}: LogoProps) {
  //const { dir } = useI18n();
  //const isRTL = dir === 'rtl';

  return (
    <div className={`logo-container ${className}`}>
      <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
        <div className="relative" style={{ width: `${width}px`, height: `${height}px` }}>
          <Image
            src="/images/logo.svg"
            alt="Nevspace Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>
    </div>
  );
}