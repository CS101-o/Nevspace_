'use client'

import React, { useState, useEffect, useCallback, memo } from 'react';
import { Tree as OrgTree, TreeNode } from 'react-organizational-chart';
import { Card, CardHeader } from '@/components/UI/card';
import { Avatar } from '@/components/UI/avatar';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/UI/tooltip';
import { Badge } from '@/components/UI/badge';
import Navigation from '@/components/UI/Navigation';
import { 
  ChevronDown,   
  ZoomIn, 
  ZoomOut, 
  RotateCcw
} from 'lucide-react';


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

// Memoized zoom controls component
const ZoomControls = memo<ZoomControlsProps>(({ zoom, setZoom }) => {
  const handleZoomIn = useCallback(() => {
    setZoom(prev => Math.min(prev + 0.1, 2.0)); // Allow zoom up to 200%
  }, [setZoom]);

  const handleZoomOut = useCallback(() => {
    setZoom(prev => Math.max(prev - 0.1, 0.5)); // Allow zoom down to 50%
  }, [setZoom]);

  const handleReset = useCallback(() => setZoom(1.0), [setZoom]); // Reset to 100%

  return (
    <div className="fixed bottom-8 right-8 flex gap-2 bg-navy-900/80 p-2 rounded-lg border border-white/10 backdrop-blur-sm z-50">
      <button
        onClick={handleZoomIn}
        className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white/80 transition-colors duration-300"
        title="Zoom In"
      >
        <ZoomIn className="h-5 w-5" />
      </button>
      <button
        onClick={handleZoomOut}
        className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white/80 transition-colors duration-300"
        title="Zoom Out"
      >
        <ZoomOut className="h-5 w-5" />
      </button>
      <button
        onClick={handleReset}
        className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white/80 transition-colors duration-300"
        title="Reset Zoom"
      >
        <RotateCcw className="h-5 w-5" />
      </button>
      <div className="absolute top-0 left-0 transform -translate-y-full px-2 py-1 bg-navy-900/80 rounded-t-lg text-white/60 text-sm">
        {Math.round(zoom * 100)}%
      </div>
    </div>
  );
});

ZoomControls.displayName = 'ZoomControls';

// Memoized organization node component with ultra-compact design
const OrganizationNode = memo<OrganizationNodeProps>(({ org, onCollapse, collapsed }) => {
  return (
    <Card className="bg-navy-900/30 backdrop-blur-md inline-block rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg max-w-[150px]">
      <CardHeader className="p-1 flex items-center space-x-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                className="cursor-pointer hover:bg-white/5 transition-colors duration-300 p-0"
                variant={collapsed ? "secondary" : "outline"}
                onClick={onCollapse}
              >
                <Avatar className="bg-[#0B1120] h-6 w-6 rounded-full border border-white/10">
                  <img
                    src="/images/schema.png"
                    alt="Icon"
                    className="h-4 w-4 object-contain"
                  />
                </Avatar>
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{org.id} - {`${org.organizationChildRelationship?.length || 0} Alt Birim`}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex-1">
          <h3 className="text-xs font-medium text-white/80 truncate">
            <span className="text-blue-300/60 text-xs">{org.id}</span>
            <span className="block text-[10px] leading-tight">{org.tradingName}</span>
          </h3>
        </div>

        <button 
          onClick={onCollapse}
          className={`p-0.5 rounded-full hover:bg-white/5 text-white/60 transform transition-all duration-300 ${
            collapsed ? '' : 'rotate-180'
          }`}
        >
          <ChevronDown className="h-2 w-2" />
        </button>
      </CardHeader>
    </Card>
  );
});

OrganizationNode.displayName = 'OrganizationNode';

// Memoized organization tree component with minimal spacing
const OrganizationTree = memo<OrganizationTreeProps>(({ org, parent }) => {
  const [collapsed, setCollapsed] = useState(org.collapsed);
  
  const handleCollapse = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  const TreeComponent = parent ? TreeNode : OrgTree;

  const nodeContent = (
    <OrganizationNode
      org={org}
      onCollapse={handleCollapse}
      collapsed={collapsed}
    />
  );

  const commonProps = {
    label: nodeContent,
    lineWidth: "1px", 
    lineColor: "rgba(255, 255, 255, 0.1)",
    lineBorderRadius: "8px",
    nodePadding: "0.25rem",
    lineHeight: "10px",
    children: null
  };

  if (collapsed) {
    return <TreeComponent {...commonProps} />;
  }

  return (
    <TreeComponent {...commonProps}>
      {org.organizationChildRelationship?.map((child, index) => (
        <OrganizationTree key={`${child.id}-${index}`} org={child} parent={org} />
      ))}
    </TreeComponent>
  );
});

OrganizationTree.displayName = 'OrganizationTree';

// Main organization chart component with responsive adjustments
const OrganizationChart = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [zoom, setZoom] = useState(1.0); // Start at 100%
  const [containerWidth, setContainerWidth] = useState("100%");

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
  }, []);

  // Optional responsive adjustments - commented out to maintain 100% zoom
  // If you want to enable responsive scaling, uncomment this block
  /*
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Calculate zoom based on both width and available height
      if (width < 640) {
        setZoom(0.5);
      } else if (width < 768) {
        setZoom(0.7);
      } else if (width < 1024) {
        setZoom(0.8);
      } else if (width < 1280) {
        setZoom(0.9);
      } else {
        setZoom(1.0); // Keep at 100% for large screens
      }
      
      // Always use 100% width to prevent horizontal scrolling
      setContainerWidth("100%");
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  */
  
  // Only set the container width, but maintain 100% zoom level
  useEffect(() => {
    const handleResize = () => {
      setContainerWidth("100%");
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen" />;
  }

  return (
    <section id="organization-chart" className="relative min-h-screen w-full bg-[#0B1120] py-16">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1120]/50 to-[#0B1120]" />
      <Navigation />
      <div className="absolute inset-0 opacity-30">
        <div className="h-full w-full bg-[url('/images/stars.png')] bg-repeat" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-2">
        <div className="mb-8">
          <h2 className="text-2xl md:text-4xl font-bold leading-tight tracking-wide text-white drop-shadow-lg text-center">
            ORGANİZASYON ŞEMASI
          </h2>
        </div>
        
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <div className="overflow-x-auto overflow-y-auto w-full h-full flex items-center justify-center">
            <div 
              style={{ 
                transform: `scale(${zoom})`,
                transformOrigin: 'center center',
                transition: 'transform 0.3s ease',
                width: containerWidth,
                height: 'auto',
                margin: '0 auto'
              }}
              className="flex justify-center items-center"
            >
              <OrganizationTree org={organizationData} />
            </div>
          </div>
        </div>
      </div>
      
      <ZoomControls zoom={zoom} setZoom={setZoom} />
    </section>
  );
};

export default OrganizationChart;