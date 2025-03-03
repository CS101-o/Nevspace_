import React, { useEffect, useRef, useState } from 'react';
import {Mail, X } from 'lucide-react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ContactForm from './ContactForm';
import Navigation from '@/components/UI/Navigation';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFwbWFuZ29lc3Rvc3BhY2UiLCJhIjoiY203MmdoeXNmMDkzOTJxcW9vMzFhbzlyaiJ9.tQpj3FAVGzzqumf9YlsVxA';

// Contact information data structure (same as before)
const officeLocations = [
  {
    id: 'turkey-main',
    name: 'Merkez Ofis',
    coordinates: [28.8460, 41.0082],
    address: ['Cumhuriyet Mahallesi', 'Sakıp Sabancı Caddesi No:42', '34180, Bahçelievler/İSTANBUL'],
    email: 'iletisim@nevspace.com'
  },
  {
    id: 'turkey-itu',
    name: 'Nevspace - İTÜ',
    coordinates: [29.0230, 41.1055],
    address: ['Reşitpaşa, 34485', 'Sarıyer/İSTANBUL'],
    email: 'iletisim@nevspace.com'
  },
  {
    id: 'uk-office',
    name: 'UK Ofis',
    coordinates: [-2.2426, 53.4808],
    address: ['16 Tarleton Street', 'Manchester', 'M13 9BS'],
    email: 'hello@nevspace.com'
  }
];

// Components remain the same
const ContactLink = ({ icon: Icon, href, children }) => (
  <a 
    href={href}
    className="flex items-center gap-2 text-blue-200  hover:text-blue-300 transition-colors group"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
    <span>{children}</span>
  </a>
);

const LocationPopup = ({ location, onClose }) => (
  <div className="absolute bottom-8 left-8 bg-black/90 p-6 rounded-lg backdrop-blur-sm text-white max-w-md z-20">
    <button 
      onClick={onClose}
      className="absolute top-4 right-4 p-1 hover:bg-gray-800 rounded-full transition-colors"
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

const OfficeSection = ({ title, offices }) => (
  <div className="border-l-2 border-blue-500 pl-6 py-8">
    <h2 className="text-blue-500 text-sm uppercase tracking-wider font-semibold mb-6">
      {title}
    </h2>
    <div className="space-y-8">
      {offices.map((office, index) => (
        <div key={index} className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm">
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

const ContactPage = () => {
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
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-gray-900 text-white">
      <Navigation/>
      <div className="flex h-screen">
        {/* Left side - Contact Information */}
        <div className="w-2/5 overflow-y-auto px-8 py-12">
          {/* Turkey Offices */}
          <OfficeSection 
            title="TÜRKİYE" 
            offices={officeLocations.filter(office => office.id.startsWith('turkey'))}
          />
          
          {/* UK Offices */}
          <OfficeSection
            title="BİRLEŞİK KRALLIK"
            offices={officeLocations.filter(office => office.id.startsWith('uk'))}
          />
        </div>

        {/* Right side - Map */}
        <div className="w-3/5 relative">
          <div 
            ref={mapContainer} 
            className="absolute inset-0 w-full h-full"
            style={{ position: 'absolute' }}
          />
          
          {isMapLoading && (
            <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
              <div className="text-white">Loading map...</div>
            </div>
          )}
          
          {mapError && (
            <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center">
              <div className="text-red-500">Error loading map: {mapError}</div>
            </div>
          )}
          
          {!selectedLocation && !isMapLoading && !mapError && (
            <div className="absolute bottom-8 left-8 z-10 bg-black/70 p-4 rounded-lg backdrop-blur-sm">
              <p className="text-white text-sm">Click blue dots for contact info</p>
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