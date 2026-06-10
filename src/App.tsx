/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Landmark, ShieldCheck, Mail, Phone, Clock, ArrowUpRight } from 'lucide-react';
import { ActiveTab, CORE_IDENTITY } from './types';

// Custom sub-components
import Logo from './components/Logo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LeasingPlanner from './components/LeasingPlanner';
import ApartHotel from './components/ApartHotel';
import AmenitiesViewer from './components/AmenitiesViewer';
import AboutUs from './components/AboutUs';
import GalleryViewer from './components/GalleryViewer';
import ContactSection from './components/ContactSection';
import VRTour from './components/VRTour';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  
  // Prefill coordinates handed off from "Leasing & Configurator" tab to "Inquiries/Tours" tab
  const [prefilledLevel, setPrefilledLevel] = useState<string | undefined>(undefined);
  const [prefilledSize, setPrefilledSize] = useState<number | undefined>(undefined);
  const [prefilledNotes, setPrefilledNotes] = useState<string | undefined>(undefined);

  // Transition handler that pre-configures options and forces navigation to scheduler
  const handleScheduleWithContext = (level: string, reqSize: number) => {
    setPrefilledLevel(level);
    setPrefilledSize(reqSize);
    setActiveTab('contact');
    window.scrollTo({ top: 350, behavior: 'smooth' }); // Scroll to Form area on Contact Tab
  };

  const handleSelectApartHotelContext = (details: string) => {
    setPrefilledNotes(details);
    setActiveTab('contact');
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  const clearPrefills = () => {
    setPrefilledLevel(undefined);
    setPrefilledSize(undefined);
    setPrefilledNotes(undefined);
  };

  // Scroll to top on direct menu item switches
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [activeTab]);

  return (
    <div id="octagon_corporate_app" className="min-h-screen bg-brand-bg text-slate-200 flex flex-col justify-between">
      
      {/* Sleek dynamic navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Primary interactive view space panel */}
      <main className="flex-grow pt-[64px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            id={`tab_container_${activeTab}`}
          >
            {activeTab === 'home' && (
              <>
                <Hero onNavigate={setActiveTab} />
                
                {/* Visual Intersecting highlight: Why Choose us section */}
                <section className="py-16 bg-brand-bg border-b border-white/5 text-left">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="space-y-5">
                        <span className="font-mono text-xs text-brand-accent tracking-widest font-bold uppercase">
                          ACCRA CENTRAL FINANCIAL COMPLEX
                        </span>
                        <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white leading-tight">
                          The Ultimate Location For Prestige & Proximity
                        </h2>
                        <p className="font-sans text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                          Secure your firm's spot at Barnes Road. Strategically positioned next to central banks, ministries, high courts, and five-star lodging complexes, The Octagon establishes unmatched structural presence ensuring brand prestige and instant logistical ease.
                        </p>
                        
                        <div className="pt-2">
                          <button
                            id="home_learn_more_btn"
                            onClick={() => setActiveTab('about')}
                            className="inline-flex items-center gap-2 font-display font-bold text-xs text-brand-accent hover:text-white transition-colors cursor-pointer"
                          >
                            Read Full Architectural Vision
                            <ArrowUpRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Technical specifications checklist cards in Bento Style */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-6 border border-white/10 rounded-2xl bg-brand-primary hover:border-brand-accent/40 transition-all duration-300 shadow-xl group">
                          <strong className="block font-display font-bold text-sm text-white group-hover:text-brand-accent transition-colors">15 Smart Elevators</strong>
                          <p className="font-sans text-xs text-slate-400 leading-normal font-light mt-1.5">
                            High-speed modular elevators guaranteeing minimum lobbies queues & fast transport.
                          </p>
                        </div>

                        <div className="p-6 border border-white/10 rounded-2xl bg-brand-primary hover:border-brand-accent/40 transition-all duration-300 shadow-xl group">
                          <strong className="block font-display font-bold text-sm text-white group-hover:text-brand-accent transition-colors">Fiber Network Trunks</strong>
                          <p className="font-sans text-xs text-slate-400 leading-normal font-light mt-1.5">
                            Pre-wired redundant fiber connectivity hubs supporting continuous high-speed digital relays.
                          </p>
                        </div>

                        <div className="p-6 border border-white/10 rounded-2xl bg-brand-primary hover:border-brand-accent/40 transition-all duration-300 shadow-xl group">
                          <strong className="block font-display font-bold text-sm text-white group-hover:text-brand-accent transition-colors">24/7 CCTV & Patrols</strong>
                          <p className="font-sans text-xs text-slate-400 leading-normal font-light mt-1.5">
                            Active camera coverages on building perimeters, office lobbies, & underground vehicle decks.
                          </p>
                        </div>

                        <div className="p-6 border border-white/10 rounded-2xl bg-brand-primary hover:border-brand-accent/40 transition-all duration-300 shadow-xl group">
                          <strong className="block font-display font-bold text-sm text-white group-hover:text-brand-accent transition-colors">Continuity Power Vents</strong>
                          <p className="font-sans text-xs text-slate-400 leading-normal font-light mt-1.5">
                            Twin high-load automatic switching generators ensuring unbroken power loops.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </section>
              </>
            )}

            {activeTab === 'leasing' && (
              <LeasingPlanner onScheduleWithContext={handleScheduleWithContext} />
            )}

            {activeTab === 'aparthotel' && (
              <ApartHotel onNavigate={setActiveTab} onSelectBookingContext={handleSelectApartHotelContext} />
            )}

            {activeTab === 'amenities' && (
              <AmenitiesViewer />
            )}

            {activeTab === 'about' && (
              <AboutUs />
            )}

            {activeTab === 'gallery' && (
              <GalleryViewer />
            )}

            {activeTab === 'vrtour' && (
              <VRTour onNavigate={setActiveTab} />
            )}

            {activeTab === 'contact' && (
              <ContactSection
                prefilledLevel={prefilledLevel}
                prefilledSize={prefilledSize}
                prefilledNotes={prefilledNotes}
                clearPrefills={clearPrefills}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Premium stylized footer details */}
      <footer id="app_footer" className="bg-brand-primary text-slate-300 border-t border-white/10 pt-16 pb-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
            
            {/* Column 1: Core logo */}
            <div className="md:col-span-4 space-y-4 text-left">
              <Logo iconSize="h-7 w-7" />
              
              <p className="font-sans text-xs text-slate-400 font-light leading-relaxed max-w-sm">
                Ghana's premier modern corporate complex on Barnes Road, combining Grade A offices, underground safety vehicle decks, and rooftop air helipads under one integrated skyline.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 space-y-4 text-left">
              <h4 className="font-display font-bold text-xs text-brand-accent tracking-widest uppercase font-semibold">Complex Sections</h4>
              
              <ul className="space-y-2 font-sans text-xs text-slate-300">
                <li><button onClick={() => setActiveTab('home')} className="hover:text-brand-accent transition-colors cursor-pointer">Overview Dashboard</button></li>
                <li><button onClick={() => setActiveTab('leasing')} className="hover:text-brand-accent transition-colors cursor-pointer">Office Leasing Plates</button></li>
                <li><button onClick={() => setActiveTab('aparthotel')} className="hover:text-brand-accent transition-colors cursor-pointer">Apart Hotel & Residences</button></li>
                <li><button onClick={() => setActiveTab('amenities')} className="hover:text-brand-accent transition-colors cursor-pointer">Central Garden & Helipad</button></li>
                <li><button onClick={() => setActiveTab('about')} className="hover:text-brand-accent transition-colors cursor-pointer">Development Story</button></li>
              </ul>
            </div>

            {/* Column 3: Contacts list */}
            <div className="md:col-span-3 space-y-4 text-left">
              <h4 className="font-display font-bold text-xs text-brand-accent tracking-widest uppercase font-semibold">Office Hours</h4>
              
              <ul className="space-y-2 font-sans text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-brand-accent shrink-0" />
                  <span>{CORE_IDENTITY.officeHours}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-brand-accent shrink-0" />
                  <span>{CORE_IDENTITY.contactPhone}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-brand-accent shrink-0" />
                  <span>{CORE_IDENTITY.contactEmail}</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Development stamp */}
            <div className="md:col-span-2 space-y-4 text-left">
              <h4 className="font-display font-bold text-xs text-brand-accent tracking-widest uppercase font-semibold text-[11px]">Joint Development</h4>
              <span className="block font-sans text-[11px] text-slate-400 font-light leading-normal">
                Officially inaugurated in <strong className="text-white">2017</strong>. Structured & owned under property assets managed by <strong className="text-brand-accent font-medium">Dream Realty Limited</strong>.
              </span>
            </div>

          </div>

          {/* Lower Copyright Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-[10px] text-slate-500">
            <p>© {new Date().getFullYear()} The Octagon, Accra Central. All rights reserved.</p>
            <div className="flex gap-4">
              <span>Managed by Dream Realty Limited</span>
              <span>•</span>
              <span>Barnes Road, Tudu, Accra</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
