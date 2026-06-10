/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Ruler, Sparkles, Building, Briefcase, CarIcon, Table2, Info, Layout, Layers, ShieldCheck, DollarSign, ArrowRight } from 'lucide-react';
import { OCTAGON_FLOOR_DATA, FloorLevel, ActiveTab } from '../types';
import officeImage from '../assets/images/octagon_office_premium_1781031143896.png';

interface LeasingPlannerProps {
  onScheduleWithContext: (level: string, reqSize: number) => void;
}

export default function LeasingPlanner({ onScheduleWithContext }: LeasingPlannerProps) {
  // Local state for interactive floor matrix selection
  const [selectedFloorIndex, setSelectedFloorIndex] = useState<number>(1); // Defaults to Lower Office Levels 1-4
  
  // Local state for sliders/inputs
  const [reqSize, setReqSize] = useState<number>(450); // m² requirement
  const [extraParking, setExtraParking] = useState<number>(2); // extra parking spaces beyond baseline allocation

  const activeFloor = OCTAGON_FLOOR_DATA[selectedFloorIndex];

  // Calculations
  const calculatedMonthlyRent = reqSize * activeFloor.baseRateUSD;
  const calculatedQuarterlyRent = calculatedMonthlyRent * 3;
  
  // 1 dedicated parking slot per 50 m² of office workspace
  const baseParkingAllocation = Math.max(1, Math.floor(reqSize / 50));
  const totalParkingAllocation = baseParkingAllocation + extraParking;
  
  // Custom workspace seating capacity estimation based on standard premium office density (approx 8.5 m² per person)
  const estWorkspaceCapacity = Math.max(2, Math.floor(reqSize / 8.5));

  // Handle manual floor selection from matrix
  const selectFloor = (idx: number) => {
    setSelectedFloorIndex(idx);
    
    // Set typical sizing based on level type to make UI intuitive of what is physically possible
    if (idx === 0) {
      setReqSize(185); // typical showroom spacing m²
    } else if (idx === 4) {
      setReqSize(120); // helipad pavilion premium workspace size
    } else {
      setReqSize(450); // average premium office layout size
    }
  };

  return (
    <div id="leasing_planner_view" className="py-12 bg-brand-bg text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading Pairings */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-brand-accent tracking-widest font-bold uppercase block mb-2">
            ZONING MODEL & RENTAL ESTIMATOR
          </span>
          <h2 className="font-display font-light text-3xl sm:text-4xl text-white tracking-tight">
            Grade A Floor <span className="font-serif italic text-brand-accent">Configuration Studio</span>
          </h2>
          <p className="font-sans text-slate-400 font-light mt-3 leading-relaxed text-sm md:text-base">
            Select levels across The Octagon's U-shaped structure to map, optimize, and estimate workspaces suited for small flagship teams up to massive corporate floor layouts.
          </p>
        </div>

        {/* Master Interface Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Column A: Interactive 2D Elevator Segment Matrix (Visual Representation of The Octagon levels) */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-display font-semibold text-lg text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-brand-accent" />
              Structural Segment Selector
            </h3>
            
            <p className="font-sans text-xs text-slate-400 leading-relaxed font-light">
              Click on different horizontal sections of our 12-storey landmark building schematic to load custom specifications and lease calculations:
            </p>

            {/* Building 2D Isometric Stack Structure */}
            <div id="building_elevation_grid" className="space-y-2 border border-white/10 bg-brand-primary p-4 sm:p-6 rounded-2xl shadow-xl">
              
              {/* Helipad Overlay */}
              <button
                type="button"
                id="floor_btn_4"
                onClick={() => selectFloor(4)}
                className={`w-full text-left p-2.5 rounded-md border transition-all duration-200 relative overflow-hidden group cursor-pointer ${
                  selectedFloorIndex === 4
                    ? 'bg-brand-accent/10 text-brand-accent border-brand-accent'
                    : 'bg-[#1C1F26] hover:bg-[#252a33] border-white/5 text-slate-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] bg-brand-accent/20 text-brand-accent px-1.5 py-0.5 rounded font-bold uppercase">
                      L12
                    </span>
                    <span className="font-display font-bold text-xs tracking-tight">Rooftop Helipad Pavilion</span>
                  </div>
                  <span className="font-mono text-[9px] opacity-80">$60/m²</span>
                </div>
              </button>

              {/* Hospitality Suites */}
              <button
                type="button"
                id="floor_btn_3"
                onClick={() => selectFloor(3)}
                className={`w-full text-left p-3 rounded-md border transition-all duration-200 relative overflow-hidden group cursor-pointer ${
                  selectedFloorIndex === 3
                    ? 'bg-brand-accent/10 text-brand-accent border-brand-accent'
                    : 'bg-[#1C1F26] hover:bg-[#252a33] border-white/5 text-slate-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] bg-brand-accent/20 text-brand-accent px-1.5 py-0.5 rounded font-bold">
                      L10-11
                    </span>
                    <span className="font-display font-bold text-xs tracking-tight">Apart-Hotel Studios</span>
                  </div>
                  <span className="font-mono text-[9px] opacity-80">$40/m²</span>
                </div>
                <div className="mt-1 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-accent w-2/3" />
                </div>
              </button>

              {/* Mid-High Offices (Levels 5-9) */}
              <button
                type="button"
                id="floor_btn_2"
                onClick={() => selectFloor(2)}
                className={`w-full text-left p-4 rounded-md border transition-all duration-200 relative overflow-hidden group cursor-pointer ${
                  selectedFloorIndex === 2
                    ? 'bg-brand-accent/10 text-brand-accent border-brand-accent'
                    : 'bg-[#1C1F26] hover:bg-[#252a33] border-white/5 text-slate-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] bg-brand-accent/20 text-brand-accent px-1.5 py-0.5 rounded font-bold">
                      L5-9
                    </span>
                    <span className="font-display font-bold text-xs tracking-tight">Upper Office Haven</span>
                  </div>
                  <span className="font-mono text-[9px] opacity-80">$34/m²</span>
                </div>
                <div className="mt-1.5 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-accent w-1/2" />
                </div>
              </button>

              {/* Lower Corporate Offices (Levels 1-4) */}
              <button
                type="button"
                id="floor_btn_1"
                onClick={() => selectFloor(1)}
                className={`w-full text-left p-4 rounded-md border transition-all duration-200 relative overflow-hidden group cursor-pointer ${
                  selectedFloorIndex === 1
                    ? 'bg-brand-accent/10 text-brand-accent border-brand-accent'
                    : 'bg-[#1C1F26] hover:bg-[#252a33] border-white/5 text-slate-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] bg-brand-accent/20 text-brand-accent px-1.5 py-0.5 rounded font-bold">
                      L1-4
                    </span>
                    <span className="font-display font-bold text-xs tracking-tight">Lower Corporate Offices</span>
                  </div>
                  <span className="font-mono text-[9px] opacity-80">$30/m²</span>
                </div>
                <div className="mt-1.5 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-accent w-4/5" />
                </div>
              </button>

              {/* Ground Floor Retail */}
              <button
                type="button"
                id="floor_btn_0"
                onClick={() => selectFloor(0)}
                className={`w-full text-left p-3.5 rounded-md border transition-all duration-200 relative overflow-hidden group cursor-pointer ${
                  selectedFloorIndex === 0
                    ? 'bg-brand-accent/10 text-brand-accent border-brand-accent'
                    : 'bg-[#1C1F26] hover:bg-[#252a33] border-white/5 text-slate-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] bg-brand-accent/20 text-brand-accent px-1.5 py-0.5 rounded font-bold">
                      G-FL
                    </span>
                    <span className="font-display font-bold text-xs tracking-tight">Ground Retail Showrooms</span>
                  </div>
                  <span className="font-mono text-[9px] opacity-80">$45/m²</span>
                </div>
              </button>

            </div>

            {/* Premium architectural detail notes info panel */}
            <div className="p-4 bg-brand-accent/5 border border-brand-accent/20 rounded-2xl space-y-2 text-left">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-brand-accent shrink-0" />
                <h4 className="font-display font-bold text-xs text-brand-accent uppercase">Partition Flexibility</h4>
              </div>
              <p className="font-sans text-[11px] text-slate-300 leading-relaxed font-light">
                Our dynamic pillar divisions support customizable internal floor plans. You can configure full-plate divisions of <strong className="text-white">2,000 m²</strong> down to smart partition rows of <strong className="text-white">85 m²</strong>.
              </p>
            </div>
          </div>

          {/* Column B: Selected Level Meta Specs Overview & Estimator Sliders */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-8 bg-brand-primary border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl">
            
            {/* Upper half: Specific specs of selected level */}
            <div className="md:col-span-12 border-b border-white/5 pb-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] text-brand-accent tracking-widest font-bold uppercase block text-left">
                    {activeFloor.level} Plate specs
                  </span>
                  <h3 className="font-display font-bold text-lg sm:text-2xl text-white mt-0.5 text-left">
                    {activeFloor.name}
                  </h3>
                </div>
                
                <span className="inline-flex self-start sm:self-center px-3 py-1 bg-white/5 border border-white/10 rounded font-mono text-[11px] text-slate-300">
                  Ceiling clearance: {activeFloor.heightClearanceM}m
                </span>
              </div>

              <p className="font-sans text-xs text-slate-400 leading-relaxed font-light text-left font-light leading-relaxed">
                {activeFloor.blueprints}
              </p>

              {/* Dynamic Feature Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {activeFloor.features.map((feat, ix) => (
                  <span key={ix} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-xl font-sans text-[11px] text-slate-300">
                    <ShieldCheck className="h-3.5 w-3.5 text-brand-accent shrink-0" />
                    {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Left Lower: Calculators Sliders */}
            <div className="md:col-span-7 space-y-6 md:pr-6 md:border-r border-white/5">
              <h4 className="font-display font-semibold text-sm text-white flex items-center gap-2">
                <Layout className="h-4 w-4 text-brand-accent" />
                Setup Workspace Sizing
              </h4>

              {/* Sizing Slider */}
              <div className="space-y-2">
                <div id="leasing_slider_header" className="flex justify-between items-center text-xs">
                  <span className="font-sans text-slate-400">Required Space Area Sq. Meters</span>
                  <span className="font-mono font-bold text-white">{reqSize} m²</span>
                </div>
                
                <input
                  id="leasing_slider_input"
                  type="range"
                  min="85"
                  max="2000"
                  step="5"
                  value={reqSize}
                  onChange={(e) => setReqSize(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-accent"
                />
                
                <div id="leasing_slider_bounds" className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>85 m² (Suite Boundary)</span>
                  <span>2,000 m² (Full Floor Plate)</span>
                </div>
              </div>

              {/* Fine Sizing micro inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 text-left">
                  <label className="block font-sans text-xs text-slate-400">Exact Space Sizing</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="85"
                      max="2000"
                      value={reqSize}
                      onChange={(e) => {
                        const val = Math.max(85, Math.min(2000, Number(e.target.value)));
                        setReqSize(val);
                      }}
                      className="w-full p-2.5 border border-white/10 rounded-xl font-mono text-xs text-white bg-[#1C1F26] focus:border-brand-accent focus:outline-none"
                    />
                    <span className="absolute right-3 top-3 font-mono text-[10px] text-slate-500">m²</span>
                  </div>
                </div>

                <div className="space-y-1 text-left">
                  <label className="block font-sans text-xs text-slate-400">Supplemental Parking Slots</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={extraParking}
                      onChange={(e) => setExtraParking(Number(e.target.value))}
                      className="w-full p-2.5 border border-white/10 rounded-xl font-mono text-xs text-white bg-[#1C1F26] focus:border-brand-accent focus:outline-none"
                    />
                    <span className="absolute right-3 top-3 font-mono text-[10px] text-slate-500">Slots</span>
                  </div>
                </div>
              </div>

              {/* Technical drawing mockup preview of office floorplan */}
              <div className="border border-white/10 rounded-2xl p-4 bg-[#1C1F26] flex items-center gap-4 text-left">
                <div className="relative h-16 w-20 shrink-0 border border-white/10 bg-neutral-950 rounded-xl overflow-hidden">
                  <img
                    src={officeImage}
                    referrerPolicy="no-referrer"
                    alt="Workplace layout layout mockup"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-brand-primary/10" />
                </div>
                <div>
                  <h5 className="font-display font-semibold text-xs text-brand-accent">Grade-A Architectural Mock</h5>
                  <p className="font-sans text-[10px] text-slate-400 mt-0.5 leading-relaxed font-light">
                    Includes acoustic drop-ceilings, multi-zone direct ducts, pre-wired Cat6 connections, and smart access terminals.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Lower: Costs, Capacities & scheduling buttons */}
            <div className="md:col-span-5 space-y-6">
              <h4 className="font-display font-semibold text-sm text-white flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-brand-accent" />
                Commercial Lease Estimates
              </h4>

              {/* Key Indicators */}
              <div className="space-y-4">
                
                {/* Monthly Cost */}
                <div className="p-4 border border-white/10 rounded-2xl bg-[#1C1F26] text-left">
                  <span className="font-sans text-[10px] text-slate-400 uppercase tracking-wider block">Estimated Monthly Rent</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-display font-extrabold text-2xl text-white">
                      ${calculatedMonthlyRent.toLocaleString()}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">USD/Mo</span>
                  </div>
                  <span className="font-mono text-[9px] text-slate-500 mt-0.5 block">
                    Calculated at ${activeFloor.baseRateUSD}/m² rate
                  </span>
                </div>

                {/* Quarterly Cost (Standard practice in Ghana commercial leases) */}
                <div className="p-4 border border-white/10 rounded-2xl bg-[#1C1F26] text-left">
                  <span className="font-sans text-[10px] text-slate-400 uppercase tracking-wider block">Quarterly Commitment</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-display font-bold text-lg text-white">
                      ${calculatedQuarterlyRent.toLocaleString()}
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">USD</span>
                  </div>
                </div>

                {/* Allocated resources lists */}
                <div className="space-y-2 border-t border-white/5 pt-3 text-xs text-left">
                  <div className="flex justify-between">
                    <span className="font-sans text-slate-400 flex items-center gap-1">
                      <CarIcon className="h-3.5 w-3.5 text-slate-400" />
                      Parking Spots
                    </span>
                    <span className="font-mono font-medium text-white">{totalParkingAllocation} slots ({baseParkingAllocation} free)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans text-slate-400 flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                      Tenant Workspaces
                    </span>
                    <span className="font-mono font-medium text-white">~{estWorkspaceCapacity} workstations</span>
                  </div>
                </div>

              </div>

              {/* Direct Inquiry scheduler wrapper with pre-mapped details */}
              <button
                type="button"
                id="leasing_schedule_tour_btn"
                onClick={() => onScheduleWithContext(activeFloor.level, reqSize)}
                className="w-full py-3.5 rounded-full font-sans font-bold text-xs uppercase tracking-widest bg-brand-accent hover:bg-opacity-95 text-brand-primary active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-xl cursor-pointer"
              >
                Inquire For This Configuration
                <ArrowRight className="h-4 w-4" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
