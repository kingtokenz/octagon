/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, CalendarRange } from 'lucide-react';
import { ActiveTab, CORE_IDENTITY } from '../types';
import Logo from './Logo';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Overview' },
    { id: 'leasing', label: 'Office & Leasing' },
    { id: 'aparthotel', label: 'Apart Hotel & Suites' },
    { id: 'amenities', label: 'Amenities Suite' },
    { id: 'about', label: 'The Development' },
    { id: 'gallery', label: 'Visual Gallery' },
    { id: 'vrtour', label: 'Virtual VR Tour' },
    { id: 'contact', label: 'Inquiries & Tours' },
  ];

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        id="app_navbar_header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-brand-primary/95 backdrop-blur-md border-b border-brand-accent/20 py-3 shadow-lg'
            : 'bg-gradient-to-b from-brand-primary/80 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand Brand Accent & Typography Pairings */}
          <button
            id="nav_logo_btn"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
          >
            <Logo iconSize="h-8 w-8" />
          </button>

          {/* Fully styled desktop Navigation links */}
          <nav id="desktop_navigation" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav_link_${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 font-sans font-medium text-sm rounded-md transition-colors duration-200 focus:outline-none ${
                    isSelected
                      ? 'text-brand-accent'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isSelected && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Contact & Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              id="navbar_call_btn"
              href={`tel:${CORE_IDENTITY.contactPhone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-[11px] text-neutral-300 hover:text-brand-accent border border-neutral-700 hover:border-brand-accent/40 bg-brand-primary/45 transition-colors duration-200"
            >
              <Phone className="h-3 w-3 text-brand-accent" />
              {CORE_IDENTITY.contactPhone}
            </a>
            
            <button
              id="navbar_cta_btn"
              onClick={() => handleNavClick('contact')}
              className="flex items-center gap-2 px-4 py-2 rounded-md font-sans font-semibold text-xs text-brand-primary bg-brand-accent hover:bg-brand-accent-hover active:scale-95 transition-all duration-200 shadow-md"
            >
              <CalendarRange className="h-3.5 w-3.5" />
              Book Private Tour
            </button>
          </div>

          {/* Mobile responsive Hamburger drawer toggle button */}
          <div className="flex lg:hidden">
            <button
              id="mobile_hamburger_toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800/50 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer AnimatePresence Menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile_menu_drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed top-[62px] left-0 w-full z-40 bg-brand-primary/98 border-b border-brand-accent/20 shadow-2xl lg:hidden max-h-[calc(100vh-62px)] overflow-y-auto"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => {
                const isSelected = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile_nav_link_${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex w-full items-center px-4 py-3 text-base font-semibold rounded-lg transition-colors ${
                      isSelected
                        ? 'bg-brand-accent/15 text-brand-accent border-l-4 border-brand-accent'
                        : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              
              <div className="pt-4 border-t border-neutral-800 space-y-3">
                <a
                  id="mobile_call_btn"
                  href={`tel:${CORE_IDENTITY.contactPhone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-mono text-xs text-neutral-300 bg-neutral-900 border border-neutral-700"
                >
                  <Phone className="h-3.5 w-3.5 text-brand-accent" />
                  {CORE_IDENTITY.contactPhone}
                </a>

                <button
                  id="mobile_cta_booking_btn"
                  onClick={() => handleNavClick('contact')}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-sans font-bold text-sm text-brand-primary bg-brand-accent hover:bg-brand-accent-hover transition-colors shadow-md"
                >
                  <CalendarRange className="h-4 w-4" />
                  Book Private Tour
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
