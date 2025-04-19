'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Mail, X } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ContactForm from './ContactForm';
import Navigation from '@/components/UI/Navigation';
import { useI18n, useTranslation } from '../i18n/I18nProvider';
import Logo from "@/components/UI/logo"

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFwbWFuZ29lc3Rvc3BhY2UiLCJhIjoiY203MmdoeXNmMDkzOTJxcW9vMzFhbzlyaiJ9.tQpj3FAVGzzqumf9YlsVxA';

// ContactLink component with RTL support
const ContactLink = ({ icon: Icon, href, children }) => {
  const { dir } = useI18n();
  const isRTL = dir === 'rtl';

  return (
    <a 
      href={href}
      className={`flex items-center gap-2 text-blue-200 hover:text-blue-300 transition-colors group ${isRTL ? 'flex-row-reverse' : ''}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
      <span>{children}</span>
    </a>
  );
};

// LocationPopup with translations and RTL support
const LocationPopup = ({ location, onClose }) => {
  const { dir } = useI18n();
  const isRTL = dir === 'rtl';

  return (
    <div className={`absolute bottom-8 ${isRTL ? 'right-8' : 'left-8'} bg-black/90 p-6 rounded-lg backdrop-blur-sm text-white max-w-md z-20 ${isRTL ? 'text-right' : ''}`}>
      <button 
        onClick={onClose}
        className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} p-1 hover:bg-gray-800 rounded-full transition-colors`}
        aria-label="Close location info"
      >
        <X className="w-4 h-4" />
      </button>
      
      <h3 className="text-xl font-bold mb-4">{location.name}</h3>
      <address className="text-gray-300 mb-4 not-italic">
        {location.address.map((line, i) => (
          <React.Fragment key={i}>
            {line}<br />
          </React.Fragment>
        ))}
      </address>
      
      <ContactLink icon={Mail} href={`mailto:${location.email}`}>
        {location.email}
      </ContactLink>
    </div>
  );
};

// OfficeSection with translations and RTL support
const OfficeSection = ({ title, offices }) => {
  const { dir } = useI18n();
  const isRTL = dir === 'rtl';

  return (
    <div className={`${isRTL ? 'border-r-2 pr-6' : 'border-l-2 pl-6'} border-blue-500 py-8`}>
      <h2 className={`text-blue-500 text-sm uppercase tracking-wider font-semibold mb-6 ${isRTL ? 'text-right' : ''}`}>
        {title}
      </h2>
      <div className="space-y-8">
        {offices.map((office, index) => (
          <div key={index} className={`bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm ${isRTL ? 'text-right' : ''}`}>
            <h3 className="text-white text-2xl font-bold mb-4">{office.name}</h3>
            <address className="text-gray-200 mb-4 not-italic">
              {office.address.map((line, i) => (
                <React.Fragment key={i}>
                  {line}<br />
                </React.Fragment>
              ))}
            </address>
            <ContactLink icon={Mail} href={`mailto:${office.email}`}>
              {office.email}
            </ContactLink>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactPage = () => {
  // Translation hooks
  const { t } = useTranslation('contact');
  const { dir } = useI18n();
  const isRTL = dir === 'rtl';

  // Define office locations with translation keys
  const officeLocations = useMemo( () => [
    {
      id: 'turkey-main',
      name: t('offices.mainOffice'),
      coordinates: [28.8460, 41.0082],
      address: ['Cumhuriyet Mahallesi', 'Sakıp Sabancı Caddesi No:42', '34180, Bahçelievler/İSTANBUL'],
      email: 'iletisim@nevspace.com'
    },
    {
      id: 'turkey-itu',
      name: t('offices.istanbulOffice'),
      coordinates: [29.0230, 41.1055],
      address: ['Reşitpaşa, 34485', 'Sarıyer/İSTANBUL'],
      email: 'iletisim@nevspace.com'
    },
    {
      id: 'uk-office',
      name: t('offices.ukOffice'),
      coordinates: [-2.2426, 53.4808],
      address: ['16 Tarleton Street', 'Manchester', 'M13 9BS'],
      email: 'hello@nevspace.com'
    }
  ], [t]);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapError, setMapError] = useState(null);
  const [isMapLoading, setIsMapLoading] = useState(true);

  useEffect(() => {
    if (!mapContainer.current) return;
    if (map.current) return;

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [15, 45],
        zoom: 3,
        attributionControl: false
      });

      map.current.on('load', () => {
        setIsMapLoading(false);
        
        // Clear any existing markers
        markers.current.forEach(marker => marker.remove());
        markers.current = [];

        // Add markers for each location
        officeLocations.forEach(location => {
          const el = document.createElement('div');
          el.className = 'w-4 h-4 bg-blue-500 rounded-full cursor-pointer hover:w-5 hover:h-5 transition-all';
          
          const marker = new mapboxgl.Marker(el)
            .setLngLat(location.coordinates)
            .addTo(map.current);
            
          markers.current.push(marker);
          
          el.addEventListener('click', () => {
            setSelectedLocation(location);
          });
        });

        // Add navigation controls
        map.current.addControl(
          new mapboxgl.NavigationControl(),
          'top-right'
        );
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setMapError(e.error?.message || 'An error occurred loading the map');
        setIsMapLoading(false);
      });

      const handleResize = () => {
        if (map.current) {
          map.current.resize();
        }
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        markers.current.forEach(marker => marker.remove());
        if (map.current) {
          map.current.remove();
          map.current = null;
        }
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError(error.message);
      setIsMapLoading(false);
    }
  }, [officeLocations]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-gray-900 text-white">
      <Navigation/>
      {/* Header bar with logo */}
      <div className="bg-[#0B1120]/80 backdrop-blur-md py-3 px-4 border-b border-blue-900/50">
        <div className="max-w-7xl mx-auto">
          <Logo />
        </div>
      </div>
      <div className={`flex h-screen ${isRTL ? 'flex-row-reverse' : ''}`}>
        {/* Contact Information Side */}
        <div className="w-2/5 overflow-y-auto px-8 py-12">
          {/* Turkey Offices */}
          <OfficeSection 
            title={t('offices.turkey')} 
            offices={officeLocations.filter(office => office.id.startsWith('turkey'))}
          />
          
          {/* UK Offices */}
          <OfficeSection
            title={t('offices.uk')}
            offices={officeLocations.filter(office => office.id.startsWith('uk'))}
          />
        </div>

        {/* Map Side */}
        <div className="w-3/5 relative">
          <div 
            ref={mapContainer} 
            className="absolute inset-0 w-full h-full"
            style={{ position: 'absolute' }}
          />
          
          {isMapLoading && (
            <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
              <div className="text-white">{t('map.loading')}</div>
            </div>
          )}
          
          {mapError && (
            <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
              <div className="text-red-500">{t('map.error')} {mapError}</div>
            </div>
          )}
          
          {!selectedLocation && !isMapLoading && !mapError && (
            <div className={`absolute bottom-8 ${isRTL ? 'right-8' : 'left-8'} z-10 bg-black/70 p-4 rounded-lg backdrop-blur-sm`}>
              <p className="text-white text-sm">{t('offices.clickInfo')}</p>
            </div>
          )}
          
          {selectedLocation && (
            <LocationPopup
              location={selectedLocation}
              onClose={() => setSelectedLocation(null)}
            />
          )}
        </div>
      </div>

      {/* Contact Form Section */}
      <ContactForm />
    </div>
  );
};

export default ContactPage;