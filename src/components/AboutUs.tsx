/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Landmark, Compass, Award, Building, Sparkles, Sprout, Milestone, Clock } from 'lucide-react';
import { CORE_IDENTITY } from '../types';

export default function AboutUs() {
  const pillars = [
    {
      icon: Award,
      title: "Dream Realty Heritage",
      desc: "Developed with meticulous focus by Dream Realty Ltd, pushing boundaries of urban design to construct Grade A structural icons that withstand coastal elements."
    },
    {
      icon: Compass,
      title: "U-Shaped Architecture",
      desc: "An innovative open layout enclosing the 3,000 m² central tropical garden, allowing massive amounts of passive daylight to envelope inner workspaces."
    },
    {
      icon: Sprout,
      title: "Green Environmental Standards",
      desc: "Low-E double glazed glass panels that mitigate UV heat index, heavy smart ventilation ducts, and localized efficient LED illumination matrices."
    }
  ];

  const milestones = [
    { year: "2013", title: "Excavation and Substructure Groundbreaking", desc: "Initiating the structural foundation for Accra's deepest 3-tier underground parking system." },
    { year: "2015", title: "Upper Towers Top-Out Ceremony", desc: "Beating weight limits to construct the 12 levels of the U-shaped structural wings masterfully." },
    { year: "2017", title: "Grand Official Inauguration", desc: "The Octagon opens its doors, establishing a premium flagship address for corporate and retail firms." },
    { year: "2021", title: "Helipad Air Safety Certification", desc: "Commissioning Ghana's first urban rooftop commercial helideck for priority air transits." }
  ];

  return (
    <div id="about_the_octagon_view" className="py-12 bg-brand-bg text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout: Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-mono text-xs text-brand-accent tracking-widest font-bold uppercase block mb-2">
            THE ARCHITECTURAL VISION OF ACCRA
          </span>
          <h2 className="font-display font-light text-3xl sm:text-4xl text-white tracking-tight">
            The Historical Journey of <span className="font-serif italic text-brand-accent">The Octagon</span>
          </h2>
          <p className="font-sans text-slate-400 font-light mt-3 leading-relaxed text-sm md:text-base">
            Constructed by Dream Realty Limited in 2017, learn about the engineering, corporate integrity, and sustainable core that defines our commercial landmark.
          </p>
        </div>

        {/* Column layout: Content breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left panel: Story writing & summary text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="font-display font-bold text-2xl text-white tracking-tight">
              A Flagship Benchmark for West African Office Infrastructure
            </h3>
            
            <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Situated in Tudu at the entrance of Accra Central, <strong className="text-white font-medium">The Octagon</strong> was envisioned as an alternative to typical crowded business towers. By engineering a massive, U-shaped layout wrapper enclosing a quiet central garden oasis, companies enjoy premium city atmospheres without sacrificing peaceful work conditions.
            </p>

            <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Since its 2017 inauguration, it has grown into a prestigious landmark workspace housing diplomatic missions, foreign representations, major retail showrooms, elite clinics, legal corporate headquarters, and high-footfall banking branches. Backed by 15 lightning lifts and 1,500 subterranean parking lockers, operations continue smoothly non-stop.
            </p>

            {/* Quick specifications timeline */}
            <div className="p-5 bg-[#1C1F26] border border-white/10 rounded-2xl">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-brand-accent shrink-0" />
                <h4 className="font-display font-bold text-xs text-white tracking-wider uppercase">Built-up Specifications Overview</h4>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 font-mono text-[11px]">
                <div>
                  <span className="text-slate-400 block uppercase">Leasable Plate</span>
                  <strong className="text-brand-accent text-xs block mt-0.5 font-bold">75,000 m²</strong>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase">Developer</span>
                  <strong className="text-white text-xs block mt-0.5">Dream Realty</strong>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase">Elevators</span>
                  <strong className="text-white text-xs block mt-0.5">15 high-speed</strong>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase">Status</span>
                  <strong className="text-emerald-500 text-xs block mt-0.5">Active & Grade A</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Modern key values list */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-display font-bold text-sm text-brand-accent uppercase tracking-wide text-left mb-2 pl-1">
              Core Design Standards
            </h4>
            
            <div className="space-y-4">
              {pillars.map((pill, idx) => {
                const Icon = pill.icon;
                return (
                  <div key={idx} className="bg-[#14161B] border border-white/10 p-5 rounded-2xl shadow-xl text-left flex gap-4">
                    <div className="p-3 bg-brand-accent/10 rounded-xl shrink-0 h-fit self-start">
                      <Icon className="h-5 w-5 text-brand-accent" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm text-white">{pill.title}</h4>
                      <p className="font-sans text-xs text-slate-400 mt-1 leading-relaxed font-light">{pill.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Milestone Roadmap Section */}
        <div className="border-t border-white/5 pt-16">
          <h3 className="font-display font-bold text-lg sm:text-2xl text-white text-center mb-10 flex items-center justify-center gap-2">
            <Milestone className="h-5 w-5 text-brand-accent" />
            Development Timeline & Landmarks
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {milestones.map((mil, idx) => (
              <div key={idx} className="relative bg-[#14161B] border border-white/10 p-6 rounded-2xl shadow-xl text-left hover:border-brand-accent/40 transition-all duration-300">
                {/* Year tag indicator */}
                <span className="inline-block px-2.5 py-1 bg-brand-accent/15 rounded-lg text-brand-accent font-mono text-xs font-extrabold mb-3">
                  {mil.year}
                </span>
                
                <h4 className="font-display font-bold text-sm text-white leading-tight">
                  {mil.title}
                </h4>
                
                <p className="font-sans text-xs text-slate-430 font-light leading-relaxed mt-2 text-slate-400">
                  {mil.desc}
                </p>
                
                {/* Connector lines on desktop */}
                {idx < 3 && (
                  <div className="hidden md:block absolute top-[32px] -right-[15px] w-[30px] border-t-2 border-dashed border-white/10 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
