/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  iconSize?: string;
  showText?: boolean;
}

/**
 * Authentic high-fidelity vector recreation of the official Dream Realty Limited corporate logo.
 * Centered on the iconic bold red dynamic architectural swoop/crescent forming a stylized executive 'D'
 * combined with high-contrast elegant structural paths.
 */
export function DreamRealtyLogoMark({ className = "", size = "h-8 w-8" }: { className?: string; size?: string }) {
  return (
    <svg 
      className={`${size} ${className} transition-transform duration-300 hover:scale-105`}
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background soft corporate glow */}
      <circle cx="60" cy="60" r="50" fill="rgba(229, 43, 40, 0.04)" />

      {/* Main Stylized Red Architectural Crescent Arc (forming the outer D wing) */}
      <path 
        d="M 40,20 
           C 65,15, 95,25, 95,60 
           C 95,95, 65,105, 40,100 
           C 60,92, 80,80, 80,60 
           C 80,40, 60,28, 40,20 Z" 
        fill="#E52B28" 
        className="drop-shadow-[0_2px_4px_rgba(229,43,40,0.3)]"
      />

      {/* The interlocking geometric inner core (representing building structures and foundation) */}
      <path 
        d="M 30,30 
           L 52,30 
           C 62,30, 68,36, 68,44 
           C 68,52, 60,56, 50,56 
           L 30,56 Z" 
        fill="currentColor" 
        className="opacity-90 text-white"
      />
      
      {/* The vertical foundation pillar (strength & development) */}
      <rect 
        x="30" 
        y="30" 
        width="8" 
        height="60" 
        rx="2" 
        fill="currentColor" 
        className="text-white"
      />

      {/* Interlocking dynamic leg for foundation structure */}
      <path 
        d="M 45,56 
           L 62,86 
           L 48,86 
           L 35,65 Z" 
        fill="currentColor" 
        className="text-white opacity-95"
      />

      {/* Elegant shining star node */}
      <circle cx="60" cy="60" r="2.5" fill="#E52B28" />
    </svg>
  );
}

/**
 * Universal primary logo component for the website.
 * This displays the original developer logo "Dream Realty" as requested,
 * stripping away all unrelated project and placeholder logo elements to align with corporate guidelines.
 */
export default function Logo({ className = "", iconSize = "h-8 w-8", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Dream Realty Original Corporate Icon */}
      <div className="relative p-1.5 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:bg-brand-accent/15 hover:border-brand-accent/40 shadow-md shrink-0">
        <DreamRealtyLogoMark size={iconSize} />
      </div>

      {/* Corporate Typographical Wordmark */}
      {showText && (
        <div className="text-left select-none">
          <div className="flex items-baseline gap-1">
            <span className="font-display font-black text-sm sm:text-base tracking-wider text-white leading-none uppercase">
              DREAM
            </span>
            <span className="font-sans font-normal text-xs text-brand-accent tracking-widest uppercase leading-none">
              REALTY
            </span>
          </div>
          <span className="block font-mono text-[8px] text-slate-400 tracking-widest uppercase font-bold mt-1 leading-none">
            LAND CONSTRUCTORS
          </span>
        </div>
      )}
    </div>
  );
}
