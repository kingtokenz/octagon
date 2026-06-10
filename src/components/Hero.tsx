/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Milestone, ArrowRight, Zap, Target, Flame } from 'lucide-react';
import { CORE_IDENTITY, ActiveTab } from '../types';
import facadeImage from '../assets/images/octagon_facade_render_1781031111344.png';

interface HeroProps {
  onNavigate: (tab: ActiveTab) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const highlightPoints = [
    { icon: ShieldCheck, title: "Grade A Standards", desc: "Premium structural design, reinforced systems, & 24/7 high security monitoring." },
    { icon: Zap, title: "Frictionless Operations", desc: "15 high-speed smart lifts, dedicated fiber networks, and continuous redundancy power." },
    { icon: Target, title: "Prestigious Location", desc: "Barnes Road, close to Supreme Court, central bank, and Independence Avenue." }
  ];

  return (
    <section id="hero_landing_section" className="relative pt-[72px] bg-brand-bg text-slate-200 overflow-hidden">
      {/* Background elegant abstract pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,168,128,0.06),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero text panel */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/30 rounded-full">
              <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
              <span className="font-mono text-[10px] text-brand-accent uppercase tracking-widest font-bold">
                Grade-A Landmark Development • Dream Realty
              </span>
            </div>

            <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
              The Ultimate <br />
              <span className="font-serif italic text-brand-accent">
                Standard of Business
              </span>
            </h1>

            <p className="font-sans text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed font-light">
              Elevate your organization at <strong className="text-white font-medium">{CORE_IDENTITY.name}</strong>. An architectural masterpiece on Barnes Road providing <strong className="text-brand-accent font-semibold">75,000 m²</strong> of state-of-the-art office plates, high-end retail showcases, and West Africa's premium rooftop helipad.
            </p>

            {/* Micro Call-to-actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 max-w-md sm:max-w-none">
              <button
                id="hero_cta_leasing"
                onClick={() => onNavigate('leasing')}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-sans font-bold text-xs uppercase tracking-widest bg-brand-accent text-brand-primary hover:bg-opacity-95 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 shadow-lg group cursor-pointer"
              >
                Leasing Options
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero_cta_book_tour"
                onClick={() => onNavigate('contact')}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-sans font-bold text-xs uppercase tracking-widest text-white bg-white/5 border border-white/10 hover:bg-white/10 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Book a Tour
              </button>
            </div>

            {/* Quick value assertions key details (Bento sub-grid style) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              {highlightPoints.map((pt, i) => {
                const Icon = pt.icon;
                return (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 bg-brand-accent/10 rounded-full flex items-center justify-center text-brand-accent">
                         <Icon className="h-3 w-3 shrink-0" />
                       </div>
                      <h4 className="font-display font-semibold text-sm text-neutral-100">{pt.title}</h4>
                    </div>
                    <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">{pt.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Hero Visual Card (Generated glass tower facade) - Perfectly formatted Bento container */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-brand-accent/10 blur-[130px] rounded-full translate-x-12 translate-y-12 pointer-events-none" />
            
            <div className="relative border border-white/10 bg-brand-primary p-3 rounded-2xl shadow-2xl overflow-hidden group">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-neutral-950">
                <img
                  id="hero_facade_img"
                  src={facadeImage}
                  referrerPolicy="no-referrer"
                  alt="The Octagon Accra Central Facade Render"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Premium floating glass-tags describing core stats */}
                <div className="absolute top-4 left-4 p-3 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-white/10 shadow-lg text-left">
                  <div className="font-display font-bold text-xs text-brand-accent tracking-wide uppercase">Core Complex</div>
                  <div className="font-mono text-xs font-bold text-white mt-1">Grade-A Space</div>
                </div>

                <div className="absolute bottom-4 right-4 p-3 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-brand-accent/20 shadow-lg text-left">
                  <div className="font-mono text-[10px] text-brand-accent uppercase tracking-wider font-semibold">Unique Stat</div>
                  <div className="font-display text-xs font-bold text-white mt-0.5">Commercial Helipad Enabled</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Building core technical specifications metrics dashboard strip */}
      <div id="hero_technical_metrics_panel" className="relative border-y border-white/10 bg-brand-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            
            <div className="text-center pt-0 md:px-4">
              <span className="block font-display font-extrabold text-3xl sm:text-4xl text-brand-accent">
                75,000 m²
              </span>
              <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-widest mt-1">
                Total Mixed-Use Development
              </span>
            </div>

            <div className="text-center pt-6 md:pt-0 md:px-4">
              <span className="block font-display font-extrabold text-3xl sm:text-4xl text-brand-accent">
                35,000 m²
              </span>
              <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-widest mt-1">
                Leasable Corporate Chambers
              </span>
            </div>

            <div className="text-center pt-6 md:pt-0 md:px-4">
              <span className="block font-display font-extrabold text-3xl sm:text-4xl text-brand-accent">
                1,500
              </span>
              <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-widest mt-1">
                Underground Parking Bays
              </span>
            </div>

            <div className="text-center pt-6 md:pt-0 md:px-4">
              <span className="block font-display font-extrabold text-3xl sm:text-4xl text-brand-accent">
                12 Levels
              </span>
              <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-widest mt-1">
                U-Shaped Glass Complex Block
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
