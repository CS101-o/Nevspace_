import React from 'react';

const QuasarMission = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-blue-950 min-h-screen text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 border-b border-blue-800 bg-blue-950 bg-opacity-95">
        <div className="text-2xl font-bold">MISSION CONTROL</div>
        <div className="flex space-x-6">
          <button 
            onClick={() => scrollToSection('overview')}
            className="hover:text-blue-200 transition-colors duration-200"
          >
            OVERVIEW
          </button>
          <button 
            onClick={() => scrollToSection('mission')}
            className="hover:text-blue-200 transition-colors duration-200"
          >
            MISSION
          </button>
          <button 
            onClick={() => scrollToSection('timeline')}
            className="hover:text-blue-200 transition-colors duration-200"
          >
            TIMELINE
          </button>
          <button 
            onClick={() => scrollToSection('gallery')}
            className="hover:text-blue-200 transition-colors duration-200"
          >
            GALLERY
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="overview" className="relative h-screen">
        <div className="absolute inset-0 bg-blue-900">
          <img 
            src="/images/r3.jpg" 
            alt="Toygar Mission"
            className="w-full h-full object-cover opacity-75"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 to-transparent" />
        <div className="relative z-10 container mx-auto px-4 pt-32">
          <h1 className="text-6xl font-bold mb-4">Quasar</h1>
          <p className="text-2xl text-blue-200">Mission Overview</p>
        </div>
      </section>

      {/* Mission Stats */}
      <section className="py-16 bg-blue-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border-t border-blue-800 pt-4">
              <div className="text-blue-300 text-sm">LAUNCH DATE</div>
              <div className="text-xl mt-2">NET 2030</div>
            </div>
            <div className="border-t border-blue-800 pt-4">
              <div className="text-blue-300 text-sm">LAUNCH SITE</div>
              <div className="text-xl mt-2">LC-39A</div>
            </div>
            <div className="border-t border-blue-800 pt-4">
              <div className="text-blue-300 text-sm">MISSION TYPE</div>
              <div className="text-xl mt-2">ORBITAL</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Details */}
      <section id="mission" className="py-16 bg-blue-900 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-8">MISSION OVERVIEW</h2>
              <p className="text-blue-100 leading-relaxed">
                The Quasar mission represents our vision to execute our first rocket launch in 2030 .
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-8">MISSION PARAMETERS</h2>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-blue-800 pb-2">
                  <span className="text-blue-300">-------</span>
                  <span>-----</span>
                </div>
                <div className="flex justify-between border-b border-blue-800 pb-2">
                  <span className="text-blue-300">Mission Duration</span>
                  <span>-------</span>
                </div>
                <div className="flex justify-between border-b border-blue-800 pb-2">
                  <span className="text-blue-300">Payload Mass</span>
                  <span>-------</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline" className="py-16 bg-blue-950 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">MISSION TIMELINE</h2>
          <div className="space-y-8">
            <div className="flex items-start">
              <div className="w-24 text-blue-300">T-0</div>
              <div>Liftoff</div>
            </div>
            <div className="flex items-start">
              <div className="w-24 text-blue-300">T+2:30</div>
              <div>Main Engine Cutoff (MECO)</div>
            </div>
            <div className="flex items-start">
              <div className="w-24 text-blue-300">T+8:30</div>
              <div>Payload Deployment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-16 bg-blue-900 scroll-mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">MISSION GALLERY</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Gallery Item 1 */}
            <div className="relative group">
              <img 
                src="/" 
                alt="Mission Preparation"
                className="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue-950 bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg font-bold">-----</span>
                </div>
              </div>
            </div>

            {/* Gallery Item 2 */}
            <div className="relative group">
              <img 
                src="/" 
                alt="Govde"
                className="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue-950 bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg font-bold">-----</span>
                </div>
              </div>
            </div>

            {/* Gallery Item 3 */}
            <div className="relative group">
              <img 
                src="/" 
                alt="open cut cylinder"
                className="w-full h-64 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-blue-950 bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-lg font-bold">-----</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuasarMission;