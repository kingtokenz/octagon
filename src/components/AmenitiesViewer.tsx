/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trees, Plane, Navigation, ShieldAlert, Users, Calendar, Music, Wine, Compass, Car, Dumbbell, ArrowRight } from 'lucide-react';
import { AMENITIES_DATA, CORE_IDENTITY } from '../types';
import gardenImage from '../assets/images/octagon_central_garden_1781031127709.png';

export default function AmenitiesViewer() {
  const [activeAmenityId, setActiveAmenityId] = useState<string>('garden');
  
  // Interactive simulator variables for Garden
  const [eventType, setEventType] = useState<'wedding' | 'banquet' | 'concert' | 'cocktail'>('banquet');
  
  // Interactive simulator variables for Helipad
  const [startPoint, setStartPoint] = useState<'airport' | 'temaport' | 'accraplat'>('airport');

  // Garden Event capacity data mapping
  const gardenEventConfig = {
    banquet: { name: "Corporate Banquet Gala", maxCap: 650, layouts: "Circular tables, high-tier stage, backdrop rigs", setupHr: 8, amenities: "Full ambient lights & power feeds" },
    wedding: { name: "Garden Wedding Ceremony", maxCap: 800, layouts: "Ceremonial aisle, white tiffany seating, floral pillars", setupHr: 12, amenities: "Exclusive greenrooms & backup power ports" },
    concert: { name: "Standing Open-Air Concert", maxCap: 1500, layouts: "Heavy grid stage trussses, surrounding catering stalls", setupHr: 24, amenities: "Multi-zone PA acoustic structures" },
    cocktail: { name: "Twilight VIP Cocktail Mixer", maxCap: 1200, layouts: "Cocktail modular bars, high-boys stands, low lounge corners", setupHr: 6, amenities: "Led tree uplighting & ambient audio systems" },
  };

  // Helipad route parameters mapping
  const helipadRouteConfig = {
    airport: { name: "Kotoka International Airport (KIA)", groundMins: 35, heliMins: 4, elevationFt: 850, clearanceStatus: "Pre-Cleared" },
    temaport: { name: "Tema Industrial Sea Port Harbor", groundMins: 75, heliMins: 11, elevationFt: 1100, clearanceStatus: "Requires Permit" },
    accraplat: { name: "Accra Luxury Coastal Beach Resorts", groundMins: 25, heliMins: 3, elevationFt: 750, clearanceStatus: "Pre-Cleared" },
  };

  const selectedAmenity = AMENITIES_DATA.find(a => a.id === activeAmenityId) || AMENITIES_DATA[0];

  return (
    <div id="amenities_suite_view" className="py-12 bg-brand-bg text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="font-mono text-xs text-brand-accent tracking-widest font-bold uppercase block mb-2">
            PREMIUM AMENITIES IN ACCRA CENTRAL
          </span>
          <h2 className="font-display font-light text-3xl sm:text-4xl text-white tracking-tight">
            Designed for <span className="font-serif italic text-brand-accent">Peak Corporate Performance</span>
          </h2>
          <p className="font-sans text-slate-400 font-light mt-3 leading-relaxed text-sm md:text-base">
            From Ghana's pioneer rooftop helipad for rapid executive transport to a massive central oasis courtyard, discover amenities tailored to elevate your business operations.
          </p>
        </div>

        {/* Amenity Segment Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {AMENITIES_DATA.map((am) => {
            const isActive = am.id === activeAmenityId;
            return (
              <button
                key={am.id}
                id={`amenity_tab_${am.id}`}
                onClick={() => setActiveAmenityId(am.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-display font-bold text-xs sm:text-sm tracking-wide transition-all duration-200 outline-none cursor-pointer ${
                  isActive
                    ? 'bg-[#1C1F26] text-brand-accent border-brand-accent shadow-xl'
                    : 'bg-brand-primary/50 hover:bg-brand-primary border-white/5 text-slate-300'
                }`}
              >
                {am.id === 'garden' && <Trees className="h-4 w-4 text-brand-accent" />}
                {am.id === 'helipad' && <Navigation className="h-4 w-4 text-brand-accent" />}
                {am.id === 'parking' && <Car className="h-4 w-4 text-brand-accent" />}
                {am.id === 'gym' && <Dumbbell className="h-4 w-4 text-brand-accent" />}
                {am.id === 'concierge' && <Users className="h-4 w-4 text-brand-accent" />}
                {am.name}
              </button>
            );
          })}
        </div>

        {/* Content Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT: Text features & detail specifications */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 text-left">
            
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-[10px] text-brand-accent tracking-widest font-semibold uppercase block">
                  {selectedAmenity.tagline}
                </span>
                <h3 className="font-display font-bold text-xl sm:text-3xl text-white">
                  {selectedAmenity.name}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 bg-[#1C1F26] rounded-2xl border border-white/10 text-left">
                  <span className="font-mono text-[10px] text-slate-400 uppercase block">Scale Sizing</span>
                  <span className="font-display font-bold text-sm text-white mt-0.5 block">{selectedAmenity.size}</span>
                </div>
                {selectedAmenity.capacity && (
                  <div className="p-3.5 bg-[#1C1F26] rounded-2xl border border-white/10 text-left">
                    <span className="font-mono text-[10px] text-slate-400 block">Baseline Limit</span>
                    <span className="font-display font-bold text-sm text-white mt-0.5 block">{selectedAmenity.capacity}</span>
                  </div>
                )}
              </div>

              <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed font-light">
                {selectedAmenity.highlight}
              </p>

              {/* Specs Checks Checklist */}
              <ul className="space-y-2 border-t border-white/5 pt-4 text-left">
                {selectedAmenity.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-brand-accent mt-2 shrink-0" />
                    <span className="font-sans text-xs text-slate-300 leading-normal">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick trust reassurance badge */}
            <div className="p-5 bg-[#1C1F26] border border-white/10 rounded-2xl flex items-center justify-between gap-4 text-left">
              <div>
                <h5 className="font-display font-bold text-xs text-brand-accent uppercase tracking-wide">Emergency Services Redundancy</h5>
                <p className="font-sans text-[10px] text-slate-300 mt-1 leading-normal font-light">
                  All spaces connect instantly to emergency backup systems, with direct medical transit priority.
                </p>
              </div>
              <Compass className="h-8 w-8 text-brand-accent shrink-0 opacity-80" />
            </div>

          </div>

          {/* RIGHT: Dynamic Visual & Simulation Utilities */}
          <div className="lg:col-span-6 bg-[#14161B] border border-white/10 p-6 sm:p-8 rounded-2xl flex flex-col justify-between shadow-2xl text-left">
            
            {/* Interactive Section 1: Central Garden Event Planner */}
            {activeAmenityId === 'garden' && (
              <div className="space-y-6 flex flex-col h-full justify-between">
                <div>
                  <h4 className="font-display font-semibold text-sm text-white flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-brand-accent" />
                    Garden Space Capacity & Setup Simulator
                  </h4>
                  <p className="font-sans text-xs text-slate-400 mt-1 font-light leading-relaxed">
                    Choose an event category to estimate floor allocations, seating capacities, and equipment requirements for hosting on the 3,000 m² open lawn:
                  </p>
                </div>

                {/* Simulated category selector widgets */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setEventType('wedding')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      eventType === 'wedding'
                        ? 'bg-brand-accent/10 border-brand-accent text-brand-accent shadow-xl'
                        : 'bg-[#1C1F26] hover:bg-[#252a33] border-white/5 text-slate-300'
                    }`}
                  >
                    <Trees className="h-4 w-4 mx-auto text-brand-accent mb-1" />
                    <span className="font-display font-semibold text-[10px] block">Wedding Ceremony</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEventType('banquet')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      eventType === 'banquet'
                        ? 'bg-brand-accent/10 border-brand-accent text-brand-accent shadow-xl'
                        : 'bg-[#1C1F26] hover:bg-[#252a33] border-white/5 text-slate-300'
                    }`}
                  >
                    <Users className="h-4 w-4 mx-auto text-brand-accent mb-1" />
                    <span className="font-display font-semibold text-[10px] block">Corporate Banquet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEventType('concert')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      eventType === 'concert'
                        ? 'bg-brand-accent/10 border-brand-accent text-brand-accent shadow-xl'
                        : 'bg-[#1C1F26] hover:bg-[#252a33] border-white/5 text-slate-300'
                    }`}
                  >
                    <Music className="h-4 w-4 mx-auto text-brand-accent mb-1" />
                    <span className="font-display font-semibold text-[10px] block">Open Concert</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEventType('cocktail')}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      eventType === 'cocktail'
                        ? 'bg-brand-accent/10 border-brand-accent text-brand-accent shadow-xl'
                        : 'bg-[#1C1F26] hover:bg-[#252a33] border-white/5 text-slate-300'
                    }`}
                  >
                    <Wine className="h-4 w-4 mx-auto text-brand-accent mb-1" />
                    <span className="font-display font-semibold text-[10px] block">Cocktail Gala</span>
                  </button>
                </div>

                {/* Output simulation values */}
                <div className="p-4 bg-[#1C1F26] border border-white/10 rounded-2xl space-y-3">
                  <div className="flex justify-between items-center text-left">
                    <span className="font-sans text-xs text-slate-400">Selected Event Concept:</span>
                    <strong className="font-display text-xs text-brand-accent">{gardenEventConfig[eventType].name}</strong>
                  </div>

                  <div className="flex justify-between items-center border-t border-white/5 pt-2.5 text-left">
                    <span className="font-sans text-xs text-slate-400 flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-brand-accent" />
                      Audience Capacity
                    </span>
                    <strong className="font-mono text-xs text-white">{gardenEventConfig[eventType].maxCap} maximum attendees</strong>
                  </div>

                  <div className="flex justify-between items-center border-t border-white/5 pt-2.5 text-left">
                    <span className="font-sans text-xs text-slate-400 flex items-center gap-1">
                      Floor Layout Architecture:
                    </span>
                    <span className="font-sans text-[11px] text-slate-300 font-light">{gardenEventConfig[eventType].layouts}</span>
                  </div>

                  <div className="flex justify-between items-center border-t border-white/5 pt-2.5 text-left">
                    <span className="font-sans text-xs text-slate-400">Staging Assembly Windows:</span>
                    <strong className="font-mono text-xs text-white">{gardenEventConfig[eventType].setupHr} Hours pre-event</strong>
                  </div>
                </div>

                {/* Elegant real background rendering */}
                <div className="relative h-28 border border-white/10 rounded-xl overflow-hidden shrink-0 mt-2 shadow-inner bg-neutral-950">
                  <img
                    src={gardenImage}
                    referrerPolicy="no-referrer"
                    alt="Central landscaped garden setup template"
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent flex items-end p-2.5" />
                </div>
              </div>
            )}

            {/* Interactive Section 2: Rooftop Helipad Air Transit simulation */}
            {activeAmenityId === 'helipad' && (
              <div className="space-y-6 flex flex-col h-full justify-between">
                <div>
                  <h4 className="font-display font-semibold text-sm text-white flex items-center gap-2">
                    <Navigation className="h-4 w-4 text-brand-accent" />
                    Helipad Executive Flight Scheduler & Routing Estimator
                  </h4>
                  <p className="font-sans text-xs text-slate-400 mt-1 font-light leading-relaxed">
                    The Octagon is high-security air flight friendly. Toggle departure sectors across gold coast flight points to calculate transfer time vs. Accra high-hour road traffic:
                  </p>
                </div>

                {/* departure toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setStartPoint('airport')}
                    className={`p-2.5 rounded-xl border text-left sm:text-center transition-all cursor-pointer ${
                      startPoint === 'airport'
                        ? 'bg-brand-accent/10 border-brand-accent text-brand-accent shadow-xl'
                        : 'bg-[#1C1F26] hover:bg-[#252a33] border-white/5 text-slate-300'
                    }`}
                  >
                    <span className="font-display font-bold text-[10px] block">Airport (KIA)</span>
                    <span className="font-mono text-[9px] opacity-75 block mt-0.5">8 km away</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStartPoint('temaport')}
                    className={`p-2.5 rounded-xl border text-left sm:text-center transition-all cursor-pointer ${
                      startPoint === 'temaport'
                        ? 'bg-brand-accent/10 border-brand-accent text-brand-accent shadow-xl'
                        : 'bg-[#1C1F26] hover:bg-[#252a33] border-white/5 text-slate-300'
                    }`}
                  >
                    <span className="font-display font-bold text-[10px] block">Tema Port Harbor</span>
                    <span className="font-mono text-[9px] opacity-75 block mt-0.5">32 km away</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStartPoint('accraplat')}
                    className={`p-2.5 rounded-xl border text-left sm:text-center transition-all cursor-pointer ${
                      startPoint === 'accraplat'
                        ? 'bg-brand-accent/10 border-brand-accent text-brand-accent shadow-xl'
                        : 'bg-[#1C1F26] hover:bg-[#252a33] border-white/5 text-slate-300'
                    }`}
                  >
                    <span className="font-display font-bold text-[10px] block">Beach Resorts</span>
                    <span className="font-mono text-[9px] opacity-75 block mt-0.5">6 km away</span>
                  </button>
                </div>

                {/* Time comparison visual comparison (Extremely cool design metric!) */}
                <div className="space-y-4">
                  <div className="p-4 bg-[#1C1F26] border border-white/10 rounded-2xl space-y-3 text-left">
                    <span className="font-sans text-[11px] text-slate-400 block">Transit Time Comparison to Barnes Road</span>
                    
                    <div className="space-y-1 text-left">
                      <div className="flex justify-between font-mono text-[10px]">
                        <span className="text-slate-400">Barnes Road Car Transit</span>
                        <strong className="text-red-500">{helipadRouteConfig[startPoint].groundMins} minutes (Traffic)</strong>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-red-600" style={{ width: `${Math.min(100, (helipadRouteConfig[startPoint].groundMins / 80) * 100)}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1 pt-1 text-left">
                      <div className="flex justify-between font-mono text-[10px]">
                        <span className="text-slate-200 flex items-center gap-1 font-semibold">
                          <Plane className="h-3 w-3 text-brand-accent inline" />
                          Octagon Air Shuttle Flight
                        </span>
                        <strong className="text-brand-accent font-extrabold">{helipadRouteConfig[startPoint].heliMins} mins (Direct)</strong>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-accent" style={{ width: `${(helipadRouteConfig[startPoint].heliMins / 80) * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 p-3.5 bg-brand-accent/5 border border-brand-accent/20 rounded-2xl text-left">
                    <ShieldAlert className="h-4 w-4 text-brand-accent shrink-0" />
                    <p className="font-sans text-[10px] text-slate-300 leading-normal font-light">
                      <strong>Air Clearance Note:</strong> {helipadRouteConfig[startPoint].clearanceStatus}. Flight approaches must follow standard flight path maps coordinate procedures over coastal regions.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Section 3: Parking capacity details */}
            {activeAmenityId === 'parking' && (
              <div className="space-y-6 flex flex-col h-full justify-between">
                <div>
                  <h4 className="font-display font-semibold text-sm text-white flex items-center gap-2">
                    <Car className="h-4 w-4 text-brand-accent" />
                    Subterranean Parking Security & RFID Scanners
                  </h4>
                  <p className="font-sans text-xs text-slate-400 mt-1 font-light leading-relaxed">
                    We manage Accra's largest dedicated subterranean vehicle deck complex, built on three layered secure levels with high ventilation specifications:
                  </p>
                </div>

                <div className="border border-white/10 bg-[#1C1F26] p-4 rounded-2xl space-y-3.5 text-xs text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-sans">Automated Access Gate</span>
                    <span className="font-mono text-brand-accent font-semibold flex items-center gap-1">
                      RFID Plate-Reader Active
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-2.5 text-left">
                    <span className="text-slate-400 font-sans">Weather Protection status</span>
                    <span className="font-sans font-medium text-slate-200">100% Hermetically Screened</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-2.5 text-left">
                    <span className="text-slate-400 font-sans">Underground Air-Exchange</span>
                    <span className="font-sans font-medium text-slate-200">6 changes/hr continuous flow</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-2.5 text-left">
                    <span className="text-slate-400 font-sans">Total Parking Columns</span>
                    <strong className="font-mono text-white">1,500 Dedicated Slots</strong>
                  </div>
                </div>

                <div className="p-4 bg-brand-primary border border-white/10 rounded-2xl flex items-center gap-3 text-left">
                  <Car className="h-7 w-7 text-brand-accent shrink-0" />
                  <div>
                    <span className="block font-display font-bold text-[11px] text-brand-accent uppercase">Guest Ticket Integration</span>
                    <span className="block font-sans text-[10px] text-slate-300 mt-0.5 font-light leading-snug">
                      Tour bookings made online automatically issue a smartphone-friendly entry parking barcode, avoiding manual gate queuing.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Section 4: Gym & Wellness center info */}
            {activeAmenityId === 'gym' && (
              <div className="space-y-6 flex flex-col h-full justify-between">
                <div>
                  <h4 className="font-display font-semibold text-sm text-white flex items-center gap-2">
                    <Dumbbell className="h-4 w-4 text-brand-accent" />
                    Peak Performance Fitness Center Specs
                  </h4>
                  <p className="font-sans text-xs text-slate-400 mt-1 font-light leading-relaxed">
                    Designed strictly for corporate wellness, access is restricted to verified office tenants to prevent overcrowding and ensure a premium environment:
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-left border-0">
                  <div className="p-3 bg-[#1C1F26] border border-white/10 rounded-2xl">
                    <Users className="h-4 w-4 text-brand-accent mb-1.5" />
                    <span className="block font-display font-bold text-[11px] text-white">Corporate Pass</span>
                    <span className="block font-sans text-[10px] text-[#A1A1AA] mt-0.5 font-light leading-relaxed">Free entry for up to 10 key executives per office.</span>
                  </div>

                  <div className="p-3 bg-[#1C1F26] border border-white/10 rounded-2xl">
                    <Calendar className="h-4 w-4 text-brand-accent mb-1.5" />
                    <span className="block font-display font-bold text-[11px] text-white">24/7 Gatehours</span>
                    <span className="block font-sans text-[10px] text-[#A1A1AA] mt-0.5 font-light leading-relaxed">Safe workouts any hour of night or morning.</span>
                  </div>
                </div>

                <div className="p-4 bg-[#1C1F26] border border-white/10 rounded-2xl space-y-2 text-left">
                  <h5 className="font-display font-semibold text-xs text-brand-accent">Wellness Equipment Matrix</h5>
                  <p className="font-sans text-[10px] text-slate-300 leading-normal font-light">
                    Includes Technogym Run personal systems, power-rack cages, dumbbell columns reaching 40kg, steam rooms, private lockers, juice bars, and on-call kinesiologists.
                  </p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
