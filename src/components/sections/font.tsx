import { 
    Space_Grotesk,
    Chakra_Petch,
    Share_Tech_Mono,
    Orbitron,
    Bruno_Ace_SC,
    Audiowide,
    Exo_2,
    Syncopate
  } from 'next/font/google'
  
  // Initialize fonts
  const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['700'] })
  const chakraPetch = Chakra_Petch({ subsets: ['latin'], weight: ['700'] })
  const shareTechMono = Share_Tech_Mono({ subsets: ['latin'], weight: ['400'] })
  const orbitron = Orbitron({ subsets: ['latin'], weight: ['700'] })
  const brunoAceSC = Bruno_Ace_SC({ subsets: ['latin'], weight: ['400'] })
  const audiowide = Audiowide({ subsets: ['latin'], weight: ['400'] })
  const exo2 = Exo_2({ subsets: ['latin'], weight: ['700'] })
  const syncopate = Syncopate({ subsets: ['latin'], weight: ['700'] })
  
  const fonts = [
    { name: 'Space Grotesk', font: spaceGrotesk },
    { name: 'Chakra Petch', font: chakraPetch },
    { name: 'Share Tech Mono', font: shareTechMono },
    { name: 'Orbitron', font: orbitron },
    { name: 'Bruno Ace SC', font: brunoAceSC },
    { name: 'Audiowide', font: audiowide },
    { name: 'Exo 2', font: exo2 },
    { name: 'Syncopate', font: syncopate }
  ]
  
  const FontShowcase = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-8">
        <h2 className="text-gray-400 mb-8 text-xl">Font Options for Space/Tech Theme</h2>
        <div className="space-y-12">
          {fonts.map(({ name, font }) => (
            <div key={name} className="bg-gray-900/50 p-8 rounded-lg">
              <div className="text-gray-500 mb-4 text-sm tracking-wider">{name}</div>
              <div className={`${font.className} space-y-2`}>
                {['MİLLİ', 'TEKNOLOJİ', 'HAMLESİ'].map((text) => (
                  <div
                    key={text}
                    className="text-[60px] font-bold tracking-[0.04em]"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      textTransform: 'uppercase'
                    }}
                  >
                    {text}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default FontShowcase

  