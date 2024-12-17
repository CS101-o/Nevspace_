//work-scema
'use client'

import React, { useState, useEffect } from 'react';
import { Tree as OrgTree, TreeNode } from 'react-organizational-chart';
import { Card, CardHeader } from '@/components/UI/card';
import { Avatar } from '@/components/UI/avatar';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/UI/tooltip';
import { Badge } from '@/components/UI/badge';
import { 
  ChevronDown, 
  MoreVertical, 
  Building2, 
  ZoomIn as ZoomInIcon, 
  ZoomOut as ZoomOutIcon, 
  RotateCcw as ResetIcon 
} from 'lucide-react';
//import gsap from 'gsap';
//import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';




interface OrganizationData {
  tradingName: string;
  collapsed: boolean;
  organizationChildRelationship?: OrganizationData[];
  id?: string;
}

interface OrganizationNodeProps {
  org: OrganizationData;
  onCollapse: () => void;
  collapsed: boolean;
}

interface OrganizationTreeProps {
  org: OrganizationData;
  parent?: OrganizationData;
}

interface ZoomControlsProps {
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
}

// Custom Tree component wrapper to handle proper typing


const ZoomControls: React.FC<ZoomControlsProps> = ({ zoom, setZoom }) => {
  const handleZoomIn = () => {
    setZoom((prev) => {
      const newZoom = prev + 0.1;
      return newZoom > 1.5 ? 1.5 : newZoom;
    });
  };


  const handleZoomOut = () => {
    setZoom((prev) => {
      const newZoom = prev - 0.1;
      return newZoom < 0.3 ? 0.3 : newZoom;
    });
  };

  const handleReset = () => setZoom(1);

  return (
    <div className="fixed bottom-8 right-8 flex gap-2 bg-navy-900/80 p-2 rounded-lg border border-white/10 backdrop-blur-sm z-50">
      <button
        onClick={handleZoomIn}
        className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white/80 transition-colors duration-300"
        title="Zoom In"
      >
        <ZoomInIcon className="h-5 w-5" />
      </button>
      <button
        onClick={handleZoomOut}
        className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white/80 transition-colors duration-300"
        title="Zoom Out"
      >
        <ZoomOutIcon className="h-5 w-5" />
      </button>
      <button
        onClick={handleReset}
        className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white/80 transition-colors duration-300"
        title="Reset Zoom"
      >
        <ResetIcon className="h-5 w-5" />
      </button>
      <div className="absolute top-0 left-0 transform -translate-y-full px-2 py-1 bg-navy-900/80 rounded-t-lg text-white/60 text-sm">
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
};

const OrganizationNode: React.FC<OrganizationNodeProps> = ({ org, onCollapse, collapsed }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Card className="bg-navy-900/30 backdrop-blur-md inline-block rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg">
      <CardHeader className="p-4 flex items-center space-x-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                className="cursor-pointer hover:bg-white/5 transition-colors duration-300"
                variant={collapsed ? "secondary" : "outline"}
                onClick={onCollapse}
              >
                <Avatar className="bg-navy-800/50">
                  <Building2 className="h-6 w-6 text-blue-300/80" />
                </Avatar>
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{org.id} - {`${org.organizationChildRelationship?.length || 0} Alt Birim`}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex-1">
          <h3 className="text-sm font-medium text-white/80">
            {org.id && <span className="text-blue-300/60 mr-2">{org.id}</span>}
            {org.tradingName}
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-white/80 transition-colors duration-300"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
          
          <button 
            onClick={onCollapse}
            className={`p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-white/80 transform transition-all duration-300 ${
              collapsed ? '' : 'rotate-180'
            }`}
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </CardHeader>
    </Card>
  );
};

const OrganizationTree: React.FC<OrganizationTreeProps> = ({ org, parent }) => {
  const [collapsed, setCollapsed] = useState(org.collapsed);
  
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  type CommonTreeProps = {
    label: React.ReactNode;
    lineWidth?: string;
    lineColor?: string;
    lineBorderRadius?: string;
    children?: React.ReactNode; // Add children as optional
  };

  const TreeComponent = parent ? TreeNode : OrgTree;

  const nodeContent = (
    <OrganizationNode
      org={org}
      onCollapse={handleCollapse}
      collapsed={collapsed}
    />
  );

  const commonProps: CommonTreeProps = {
    label: nodeContent,
    lineWidth: "1px",
    lineColor: "rgba(255, 255, 255, 0.1)",
    lineBorderRadius: "12px"
  };

  if (collapsed) {
    return (
      <TreeComponent {...commonProps}>
        {null} {/* Add empty children */}
      </TreeComponent>
    );
  }

  return (
    <TreeComponent {...commonProps}>
      {org.organizationChildRelationship?.map((child, index) => (
        <OrganizationTree key={index} org={child} parent={org} />
      ))}
    </TreeComponent>
  );
};

export default function OrganizationChart() {
  const [isMounted, setIsMounted] = useState(false);
  const [zoom, setZoom] = useState<number>(1);


  const organizationData: OrganizationData = {
    tradingName: "YÖNETİM KURULU",
    id: "1",
    collapsed: false,
    organizationChildRelationship: [
      {
        tradingName: "DANIŞMANLAR KURULU",
        id: "1.1",
        collapsed: false,
        organizationChildRelationship: [
          {
            tradingName: "İDARİ HEYET",
            id: "1.1.1",
            collapsed: true
          },
          {
            tradingName: "TEKNİK HEYET",
            id: "1.1.2",
            collapsed: true
          }
        ]
      },
      {
        tradingName: "YÖNETİM KURULU BAŞKANI",
        id: "1.2",
        collapsed: false,
        organizationChildRelationship: [
          {
            tradingName: "PROJE KOORDİNATÖRLÜĞÜ",
            id: "1.2.1",
            collapsed: true
          },
          {
            tradingName: "ÜNİVERSİTE TAKIMLARI",
            id: "1.2.2",
            collapsed: true
          },
          {
            tradingName: "AVİYONİK BİRİM LİDERLİĞİ",
            id: "1.2.3",
            collapsed: false,
            organizationChildRelationship: [
              {
                tradingName: "YAZILIM TAKIMI",
                id: "1.2.3.1",
                collapsed: true
              },
              {
                tradingName: "DONANIM TAKIMI",
                id: "1.2.3.2",
                collapsed: true
              }
            ]
          },
          {
            tradingName: "MEKANİK BİRİM LİDERLİĞİ",
            id: "1.2.4",
            collapsed: false,
            organizationChildRelationship: [
              {
                tradingName: "BALİSTİK TAKIMI",
                id: "1.2.4.1",
                collapsed: true
              },
              {
                tradingName: "YAPISAL TAKIMI",
                id: "1.2.4.2",
                collapsed: true
              },
              {
                tradingName: "ANALİZ TAKIMI",
                id: "1.2.4.3",
                collapsed: true
              }
            ]
          },
          {
            tradingName: "MEDYA DİREKTÖRLÜĞÜ",
            id: "1.2.5",
            collapsed: true
          },
          {
            tradingName: "HUKUK BİRİMİ",
            id: "1.2.6",
            collapsed: true
          }
        ]
      }
    ]
  };

  useEffect(() => {
    setIsMounted(true);
    
    // Safe check for window and document
    if (typeof window !== 'undefined') {
      // Import GSAP and ScrollTrigger dynamically
      Promise.all([
        import('gsap'),
        import('gsap/dist/ScrollTrigger')
      ]).then(([gsap, { ScrollTrigger }]) => {
        gsap.default.registerPlugin(ScrollTrigger);
        
        const animation = gsap.default.from(".org-chart-container", {
          scrollTrigger: {
            trigger: ".org-chart-container",
            start: "top center",
            end: "bottom center",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out"
        });

        return () => {
          if (animation.scrollTrigger) {
            animation.scrollTrigger.kill();
          }
        };
      });
    }
  }, []);


  useEffect(() => {
    // Auto-adjust zoom based on window width on mount
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setZoom(0.5);
      } else if (width < 1024) {
        setZoom(0.7);
      } else {
        setZoom(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen" />;
  }

  return (
    <section id="organization-chart" className="relative min-h-screen w-full bg-[#0B1120] py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1120]/50 to-[#0B1120]" />
      
      <div className="absolute inset-0 opacity-30">
        <div className="h-full w-full bg-[url('/images/stars.png')] bg-repeat" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="space-heading-wrapper mb-16">
          <h2 className="text-[4vw] md:text-[60px] font-bold leading-[1.2] tracking-wide text-white drop-shadow-lg text-center">
            ORGANİZASYON ŞEMASI
          </h2>
        </div>
        <div className="org-chart-container overflow-auto py-8 min-h-[500px]">
          <div 
            style={{ 
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              transition: 'transform 0.3s ease',
              display: 'flex',
              justifyContent: 'center',
              padding: '20px',
              minWidth: '100%',
              minHeight: '100%'
            }}
          >
            <OrganizationTree org={organizationData} />
          </div>
        </div>
      </div>
      
      <ZoomControls zoom={zoom} setZoom={setZoom} />
    </section>
  );

}