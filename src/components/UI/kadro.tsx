// components/UI/kadro.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import { Card, CardHeader} from '@/components/UI/card';
import { Avatar } from '@/components/UI/avatar';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/UI/tooltip';
import { Badge } from '@/components/UI/badge';
import { ChevronDown, MoreVertical, Building2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OrganizationNode = ({ org, onCollapse, collapsed }) => {
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
              <p>{`${org.organizationChildRelationship?.length || 0} Alt Birim`}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex-1">
          <h3 className="text-sm font-medium text-white/80">{org.tradingName}</h3>
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


const OrganizationTree = ({ org, parent }) => {
  const [collapsed, setCollapsed] = useState(org.collapsed);
  
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const TreeComponent = parent ? TreeNode : (props) => (
    <Tree
      {...props}
      lineWidth="1px"
      lineColor="rgba(255, 255, 255, 0.1)"
      lineBorderRadius="12px"
    >
      {props.children}
    </Tree>
  );

  return collapsed ? (
    <TreeComponent
      label={
        <OrganizationNode
          org={org}
          onCollapse={handleCollapse}
          collapsed={collapsed}
        />
      }
    />
  ) : (
    <TreeComponent
      label={
        <OrganizationNode
          org={org}
          onCollapse={handleCollapse}
          collapsed={collapsed}
        />
      }
    >
      {org.organizationChildRelationship?.map((child, index) => (
        <OrganizationTree key={index} org={child} parent={org} />
      ))}
    </TreeComponent>
  );
};

export default function OrganizationChart() {
  const organizationData = {
    tradingName: "Yönetim Kurulu",
    collapsed: false,
    organizationChildRelationship: [
      {
        tradingName: "Başkan",
        collapsed: false,
        organizationChildRelationship: [
          {
            tradingName: "Hukuk Müşavirliği",
            collapsed: true,
            organizationChildRelationship: []
          },
          {
            tradingName: "Başkan Yardımcısı (Teknik)",
            collapsed: false,
            organizationChildRelationship: [
              {
                tradingName: "Uzay Sistemleri",
                collapsed: false,
                organizationChildRelationship: [
                  {
                    tradingName: "Uydu Projeleri",
                    collapsed: true
                  },
                  {
                    tradingName: "Roket Projeleri",
                    collapsed: true
                  }
                ]
              },
              {
                tradingName: "AR-GE Projeleri",
                collapsed: true
              }
            ]
          },
          {
            tradingName: "Başkan Yardımcısı (İdari)",
            collapsed: false,
            organizationChildRelationship: [
              {
                tradingName: "İnsan Kaynakları",
                collapsed: true
              },
              {
                tradingName: "Mali İşler",
                collapsed: true
              },
              {
                tradingName: "Strateji Geliştirme",
                collapsed: true
              }
            ]
          }
        ]
      }
    ]
  };

  useEffect(() => {
    gsap.from(".org-chart-container", {
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
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-[#0B1120] py-24">
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
        <div className="org-chart-container overflow-x-auto py-8">
          <OrganizationTree org={organizationData} />
        </div>
      </div>
    </section>
  );
}