/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bed, 
  Sparkles, 
  Calculator, 
  Utensils, 
  Waves, 
  Dumbbell, 
  Percent,
  Calendar, 
  Clock, 
  ShieldCheck, 
  Wifi, 
  Check, 
  ArrowRight,
  Tv,
  Coffee,
  PlaneTakeoff,
  UserCheck
} from 'lucide-react';

// Live generated visual assets
import studioImg from '../assets/images/octagon_hotel_studio_1781085370634.png';
import penthouseImg from '../assets/images/octagon_hotel_penthouse_1781085385993.png';
import officeImg from '../assets/images/octagon_office_premium_1781031143896.png'; // Used as fallback / 1-bed

interface SuiteListing {
  id: string;
  name: string;
  sizeSqM: number;
  baseRateUSD: number;
  imageSrc: string;
  capacity: string;
  description: string;
  highlightSpecs: string[];
}

interface ApartHotelProps {
  onNavigate?: (tabId: any) => void;
  onSelectBookingContext?: (details: string) => void;
}

export default function ApartHotel({ onNavigate, onSelectBookingContext }: ApartHotelProps) {
  // Suites Listing Data
  const suites: SuiteListing[] = [
    {
      id: 'studio',
      name: 'Executive Studio Suite',
      sizeSqM: 48,
      baseRateUSD: 175,
      imageSrc: studioImg,
      capacity: 'Up to 2 Guests',
      description: 'A finely tailored sanctuary for international executives and traveling founders. Integrated with premium space-saving furniture, a sleek micro-kitchenette, dedicated workstation desk, and insulated dual-pane windows.',
      highlightSpecs: ['King-size orthotic bed', 'Sleek glass shower stall', 'High-speed 100Mbps dedicated WiFi', 'Workspace coffee bar']
    },
    {
      id: 'one_bed',
      name: 'Deluxe One-Bedroom Apartment',
      sizeSqM: 78,
      baseRateUSD: 245,
      imageSrc: officeImg, // fallback high-end render
      capacity: 'Up to 2 Adult Guests',
      description: 'Spacious living featuring separate media lounge and study chambers. Perfect for extended executive assignments in Accra. Features a complete bespoke kitchen, custom integrated oven, and stunning views of the central courtyard gardens.',
      highlightSpecs: ['Full design marble kitchen', 'In-unit laundry and dryer combo', 'Dual smart TVs setup', 'Scenery balcony views']
    },
    {
      id: 'penthouse',
      name: 'Imperial Two-Bedroom Penthouse',
      sizeSqM: 142,
      baseRateUSD: 420,
      imageSrc: penthouseImg,
      capacity: 'Up to 4 Guests',
      description: 'The absolute pinnacle of luxury lodging on Level 11 of The Octagon. A expansive 142m² layout framing views of the Atlantic shoreline and Independence Square. Completed with master walk-in wardrobes, a grand quartz island kitchen, and dual vanity washrooms.',
      highlightSpecs: ['Coastal shoreline framings', 'Chef-grade marble prep-kitchen', 'Private elevator key access', 'Private open jacuzzi tub']
    }
  ];

  // Calculator State
  const [selectedSuiteId, setSelectedSuiteId] = useState<string>('one_bed');
  const [stayNights, setStayNights] = useState<number>(5);
  const [includeVipAirport, setIncludeVipAirport] = useState<boolean>(false);
  const [includeWorkspace, setIncludeWorkspace] = useState<boolean>(false);
  const [includePrivateChef, setIncludePrivateChef] = useState<boolean>(false);

  // Active Suite metadata
  const activeSuite = suites.find(s => s.id === selectedSuiteId) || suites[1];

  // Stay calculations
  const calculateCosts = () => {
    let pricePerNight = activeSuite.baseRateUSD;
    
    // Multi-night volume discount
    let discountPercent = 0;
    if (stayNights >= 14) {
      discountPercent = 20; // 20% off for 2 weeks long stays
    } else if (stayNights >= 7) {
      discountPercent = 12; // 12% off for 1 week stay
    } else if (stayNights >= 3) {
      discountPercent = 5;  // 5% off for basic stay extensions
    }

    const rawSubtotal = pricePerNight * stayNights;
    const discountAmount = rawSubtotal * (discountPercent / 100);
    
    // Add-on charges (One-off or night multiplier)
    const vipCharge = includeVipAirport ? 85 : 0; // One-off airport pickup
    const workspaceCharge = includeWorkspace ? 25 * stayNights : 0; // Daily business desk
    const chefCharge = includePrivateChef ? 120 * stayNights : 0; // Daily custom culinary

    const grandTotal = (rawSubtotal - discountAmount) + vipCharge + workspaceCharge + chefCharge;

    return {
      subtotal: rawSubtotal,
      discountPercent,
      discountAmount,
      addons: vipCharge + workspaceCharge + chefCharge,
      grandTotal: Math.round(grandTotal)
    };
  };

  const { subtotal, discountPercent, discountAmount, addons, grandTotal } = calculateCosts();

  // Handle immediate navigation to reserving standard form with context
  const handleInitiateBooking = () => {
    if (onNavigate) {
      // Create summary context to inject
      const details = `Selected ${activeSuite.name} for ${stayNights} nights. Budget estimation: $${grandTotal}. Add-ons: ${includeVipAirport ? 'Airport VIP, ' : ''}${includeWorkspace ? 'Office desk, ' : ''}${includePrivateChef ? 'Private chef, ' : ''}`;
      if (onSelectBookingContext) {
        onSelectBookingContext(details);
      }
      onNavigate('contact');
    }
  };

  return (
    <div id="aparthotel_tab_view" className="py-12 bg-brand-bg text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* SECTION HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-mono text-xs text-brand-accent tracking-widest font-bold uppercase block mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="h-4 w-4 text-brand-accent animate-pulse" />
            THE OCTAGON SERVICED APART-HOTEL
          </span>
          <h2 className="font-display font-light text-3xl sm:text-4xl text-white tracking-tight">
            Premium Executive <span className="font-serif italic text-brand-accent">Serviced Suites</span>
          </h2>
          <p className="font-sans text-slate-400 font-light mt-4 leading-relaxed text-sm">
            Designed for diplomatic circles, global financial tech advisors, and high-worth enterprise guests. Experience the spacious comforts of a private high-end layout paired with the meticulous, secure hospitality services of a 5-star lodging.
          </p>
        </div>

        {/* SUITES SELECTION CARDS & GALLERY */}
        <div className="space-y-12 mb-20">
          <div className="flex items-center gap-3">
            <h3 className="font-display font-bold text-lg text-white">Select Residences Category</h3>
            <span className="h-[1px] flex-grow bg-white/10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {suites.map((suite) => (
              <div 
                key={suite.id}
                className="border border-white/10 bg-[#14161B] rounded-3xl overflow-hidden flex flex-col justify-between hover:border-brand-accent/35 transition-all duration-300 shadow-xl group"
              >
                {/* Image block */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img 
                    src={suite.imageSrc} 
                    alt={suite.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Price Pill */}
                  <div className="absolute top-4 right-4 bg-brand-primary/95 border border-brand-accent/25 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold text-brand-accent">
                    ${suite.baseRateUSD} <span className="text-slate-400 font-light text-[10px]/none block">/ night</span>
                  </div>

                  {/* Room specs overlay */}
                  <div className="absolute bottom-4 left-4 flex gap-3 text-[10px] font-mono font-bold text-slate-300">
                    <span className="bg-black/50 backdrop-blur-sm border border-white/10 px-2 py-1 rounded-lg block">{suite.sizeSqM} m² Size</span>
                    <span className="bg-black/50 backdrop-blur-sm border border-white/10 px-2 py-1 rounded-lg block">{suite.capacity}</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 text-left flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-base text-white group-hover:text-brand-accent transition-colors leading-tight">
                      {suite.name}
                    </h4>
                    <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
                      {suite.description}
                    </p>
                  </div>

                  {/* Highlights checklist */}
                  <div className="space-y-1.5 pt-3 border-t border-white/5">
                    <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold">Suite Inclusions:</span>
                    <div className="grid grid-cols-1 gap-1">
                      {suite.highlightSpecs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-[11px] text-slate-300 font-sans font-light">
                          <Check className="h-3 w-3 text-brand-accent flex-shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Controller Booking action */}
                <div className="px-6 pb-6 pt-2">
                  <button
                    onClick={() => {
                      setSelectedSuiteId(suite.id);
                      const calcElem = document.getElementById('hospitality_estimation_dashboard');
                      calcElem?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-2.5 rounded-xl text-xs font-sans font-semibold border transition-all cursor-pointer ${
                      selectedSuiteId === suite.id 
                        ? 'bg-brand-accent border-brand-accent text-brand-primary font-bold' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    {selectedSuiteId === suite.id ? 'Suite Chosen in Configurator' : 'Configure This Suite Option'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2-COLUMN SECTION: INTERACTIVE PRICING CALCULATOR / HOSPITALITY DETAILS */}
        <div id="hospitality_estimation_dashboard" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
          
          {/* COLUMN 1: INTERACTIVE STAY CALCULATOR (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-[#14161B] border border-white/10 rounded-3xl p-6 sm:p-8 text-left space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-brand-accent/10 border border-brand-accent/20 rounded-xl">
                  <Calculator className="h-5 w-5 text-brand-accent" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">Hospitality Rent Calculator</h3>
                  <span className="text-[11px] font-sans text-slate-400 font-light">Simulate discount brackets and corporate add-ons accurately</span>
                </div>
              </div>

              {/* Selector suite and nights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                {/* Suite Category Dropdown selection */}
                <div className="space-y-1.5">
                  <label htmlFor="suite_type_sel" className="block font-mono text-[9px] text-slate-400 uppercase tracking-widest font-bold">Suite Category</label>
                  <select
                    id="suite_type_sel"
                    value={selectedSuiteId}
                    onChange={(e) => setSelectedSuiteId(e.target.value)}
                    className="w-full bg-[#1C1F26] border border-white/10 rounded-xl p-3 text-xs font-sans text-white focus:outline-none focus:border-brand-accent"
                  >
                    {suites.map(s => (
                      <option key={s.id} value={s.id}>{s.name} (${s.baseRateUSD}/n)</option>
                    ))}
                  </select>
                </div>

                {/* Duration select Input */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-[9px] text-slate-400 uppercase tracking-widest font-bold">
                    <label htmlFor="stay_nights_inp">Duration of stay</label>
                    <span className="text-brand-accent">{stayNights} Nights</span>
                  </div>
                  <input
                    id="stay_nights_inp"
                    type="range"
                    min="1"
                    max="60"
                    step="1"
                    value={stayNights}
                    onChange={(e) => setStayNights(Number(e.target.value))}
                    className="w-full accent-brand-accent bg-[#1C1F26] rounded-lg cursor-pointer h-2"
                  />
                  <div className="flex justify-between font-mono text-[8px] text-slate-500 font-bold">
                    <span>1 Night</span>
                    <span>1 Week (12% Disc)</span>
                    <span>2 Weeks+ (20% Disc)</span>
                  </div>
                </div>

              </div>

              {/* VIP Corporate Add-ons items */}
              <div className="space-y-2.5 pt-2">
                <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-widest font-bold">VIP Corporate Add-Ons Available</span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Airport VIP Transfer */}
                  <label className={`border rounded-2xl p-3.5 flex flex-col justify-between text-left cursor-pointer select-none transition-all ${
                    includeVipAirport 
                      ? 'bg-brand-accent/5 border-brand-accent' 
                      : 'bg-[#1C1F26] border-white/5 hover:bg-white/10'
                  }`}>
                    <input
                      type="checkbox"
                      checked={includeVipAirport}
                      onChange={(e) => setIncludeVipAirport(e.target.checked)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <PlaneTakeoff className={`h-4.5 w-4.5 ${includeVipAirport ? 'text-brand-accent' : 'text-slate-400'}`} />
                      <div className={`h-3 w-3 rounded-full border flex items-center justify-center ${includeVipAirport ? 'border-brand-accent bg-brand-accent' : 'border-white/20'}`}>
                        {includeVipAirport && <Check className="h-2 w-2 text-brand-primary stroke-[3]" />}
                      </div>
                    </div>
                    <div className="mt-3.5">
                      <strong className="block font-display font-bold text-[11px] text-white">Airport Transit</strong>
                      <span className="block font-mono text-[9px] text-slate-500 mt-0.5">$85 flat charge</span>
                    </div>
                  </label>

                  {/* High Performance workspace */}
                  <label className={`border rounded-2xl p-3.5 flex flex-col justify-between text-left cursor-pointer select-none transition-all ${
                    includeWorkspace 
                      ? 'bg-brand-accent/5 border-brand-accent' 
                      : 'bg-[#1C1F26] border-white/5 hover:bg-white/10'
                  }`}>
                    <input
                      type="checkbox"
                      checked={includeWorkspace}
                      onChange={(e) => setIncludeWorkspace(e.target.checked)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <Tv className={`h-4.5 w-4.5 ${includeWorkspace ? 'text-brand-accent' : 'text-slate-400'}`} />
                      <div className={`h-3 w-3 rounded-full border flex items-center justify-center ${includeWorkspace ? 'border-brand-accent bg-brand-accent' : 'border-white/20'}`}>
                        {includeWorkspace && <Check className="h-2 w-2 text-brand-primary stroke-[3]" />}
                      </div>
                    </div>
                    <div className="mt-3.5">
                      <strong className="block font-display font-bold text-[11px] text-white">Exclusive Workspace</strong>
                      <span className="block font-mono text-[9px] text-slate-500 mt-0.5">$25 / Night</span>
                    </div>
                  </label>

                  {/* Private Chef Culinary */}
                  <label className={`border rounded-2xl p-3.5 flex flex-col justify-between text-left cursor-pointer select-none transition-all ${
                    includePrivateChef 
                      ? 'bg-brand-accent/5 border-brand-accent' 
                      : 'bg-[#1C1F26] border-white/5 hover:bg-white/10'
                  }`}>
                    <input
                      type="checkbox"
                      checked={includePrivateChef}
                      onChange={(e) => setIncludePrivateChef(e.target.checked)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <Coffee className={`h-4.5 w-4.5 ${includePrivateChef ? 'text-brand-accent' : 'text-slate-400'}`} />
                      <div className={`h-3 w-3 rounded-full border flex items-center justify-center ${includePrivateChef ? 'border-brand-accent bg-brand-accent' : 'border-white/20'}`}>
                        {includePrivateChef && <Check className="h-2 w-2 text-brand-primary stroke-[3]" />}
                      </div>
                    </div>
                    <div className="mt-3.5">
                      <strong className="block font-display font-bold text-[11px] text-white">Bespoke Culinary</strong>
                      <span className="block font-mono text-[9px] text-slate-500 mt-0.5">$120 / Night</span>
                    </div>
                  </label>

                </div>
              </div>
            </div>

            {/* Price invoice output screen */}
            <div className="bg-[#1C1F26] border border-white/5 rounded-2xl p-5 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-sans text-slate-400">{activeSuite.name} x {stayNights} Nights</span>
                <span className="font-mono text-white">${subtotal}</span>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between items-center text-xs text-brand-accent font-bold">
                  <span className="flex items-center gap-1 font-sans">
                    <Percent className="h-3 w-3 text-brand-accent" /> Over-{stayNights >= 14 ? 'Fortnight' : 'Week'} Stay Discount ({discountPercent}%)
                  </span>
                  <span className="font-mono">-${Math.round(discountAmount)}</span>
                </div>
              )}

              {addons > 0 && (
                <div className="flex justify-between items-center text-xs">
                  <span className="font-sans text-slate-400">Selected VIP Inclusions</span>
                  <span className="font-mono text-white">+${addons}</span>
                </div>
              )}

              <div className="border-t border-dashed border-white/10 pt-3 flex justify-between items-end">
                <span className="font-sans text-[11px] text-slate-400 font-bold uppercase tracking-wider">Estimated Lodging invoice</span>
                <div className="text-right">
                  <span className="block font-mono text-xl sm:text-2xl font-bold text-white leading-none">${grandTotal}</span>
                  <span className="font-sans text-[9px] text-slate-500 uppercase block mt-1">USD Taxes Covered</span>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMN 2: APART HOTEL FEATURES & SERVICES (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 text-left">
            
            {/* IN HOUSE HOSPITALITY PRIVILEGES CARD */}
            <div className="bg-[#14161B] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 flex-grow">
              
              <div className="space-y-1">
                <h3 className="font-display font-bold text-sm text-brand-accent uppercase tracking-widest">Hospitality Perks</h3>
                <span className="block font-sans text-xs text-slate-400 font-light leading-relaxed">Integrated within Accra’s highest safety ecosystem:</span>
              </div>

              <div className="space-y-4">
                
                {/* Perk 1: Rooftop Pool */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-brand-accent/5 border border-brand-accent/20 rounded-xl mt-0.5">
                    <Waves className="h-4.5 w-4.5 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="font-display font-medium text-xs text-white">Level 11 Residents' Sky-pool</h4>
                    <p className="font-sans text-[11px] text-slate-400 leading-normal font-light">
                      Unwind on high-elevation ocean breezes facing Accra’s tropical waterfront backdrop.
                    </p>
                  </div>
                </div>

                {/* Perk 2: Active wellness Gym */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-brand-accent/5 border border-brand-accent/20 rounded-xl mt-0.5">
                    <Dumbbell className="h-4.5 w-4.5 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="font-display font-medium text-xs text-white">Olympic Scale Strength Center</h4>
                    <p className="font-sans text-[11px] text-slate-400 leading-normal font-light">
                      Technogym workout cages, personal coaches, and nutritional lounges for residents.
                    </p>
                  </div>
                </div>

                {/* Perk 3: Secure key locks */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-brand-accent/5 border border-brand-accent/20 rounded-xl mt-0.5">
                    <ShieldCheck className="h-4.5 w-4.5 text-brand-accent" />
                  </div>
                  <div>
                    <h4 className="font-display font-medium text-xs text-white">Dual Perimeter Security Gateways</h4>
                    <p className="font-sans text-[11px] text-slate-400 leading-normal font-light">
                      Exclusive guest card lift bypass, separate residents foyer, and 24/7 patrol officers coverages.
                    </p>
                  </div>
                </div>

                {/* Perk 4: fiber-tier */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-[#1C1F26] border border-white/5 rounded-xl mt-0.5">
                    <Wifi className="h-4.5 w-4.5 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="font-display font-medium text-xs text-slate-300">Continuous Fiber Optic Uplinks</h4>
                    <p className="font-sans text-[11px] text-slate-500 leading-normal font-light">
                      Zero-drop network backups supporting uninterrupted banking relays from your bedroom study.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* CALL TO ACTION BADGE CARD WITHIN THE APART-HOTEL SECTOR */}
            <div className="bg-[#14161B] border border-white/10 rounded-3xl p-6 text-left space-y-4">
              <strong className="block font-display font-bold text-xs text-white">
                Diplomatic & Corporate Relocations
              </strong>
              
              <p className="font-sans text-[11px] text-slate-400 leading-relaxed font-light">
                Do you require bulk corporate leases for diplomatic envoys, legal teams, or foreign business consultants? Let our portfolio coordinators prepare formal, highly-discounted executive accommodation proposals.
              </p>

              <button
                onClick={handleInitiateBooking}
                className="w-full py-3.5 rounded-xl font-sans font-bold text-xs bg-brand-accent text-brand-primary hover:bg-brand-accent-hover transition-colors flex items-center justify-center gap-2 cursor-pointer outline-none shadow-lg shadow-brand-accent/15"
              >
                <UserCheck className="h-4 w-4" />
                Proceed Booking Inquiry
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
