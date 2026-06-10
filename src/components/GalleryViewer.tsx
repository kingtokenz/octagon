/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X, ZoomIn, Image, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

// Relative imports for images
import facadeImage from '../assets/images/octagon_facade_render_1781031111344.png';
import gardenImage from '../assets/images/octagon_central_garden_1781031127709.png';
import officeImage from '../assets/images/octagon_office_premium_1781031143896.png';

interface GalleryItem {
  id: string;
  category: 'facade' | 'office' | 'garden';
  title: string;
  desc: string;
  imageSrc: string;
}

export default function GalleryViewer() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'facade' | 'office' | 'garden'>('all');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'facade_1',
      category: 'facade',
      title: 'U-Shaped Glass Facade Render',
      desc: 'Beautiful afternoon solar reflections bouncing off double-glazed, energy-saving curtain glass walls of The Octagon, Barnes Road.',
      imageSrc: facadeImage
    },
    {
      id: 'garden_1',
      category: 'garden',
      title: 'Central Oasis Courtyard Garden',
      desc: 'The 3,000 m² open-air lawn showcasing professional landscaping, twilight LED setup, and premium pathways enclosing corporate wings.',
      imageSrc: gardenImage
    },
    {
      id: 'office_1',
      category: 'office',
      title: 'Grade A Premium Executive Suite',
      desc: 'Elegant open-office configuration showing bespoke wood tables, soundproof panel partitions, and expansive Accra Central skylines views.',
      imageSrc: officeImage
    }
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  const filters: { id: 'all' | 'facade' | 'office' | 'garden'; label: string }[] = [
    { id: 'all', label: 'All Showcase Photos' },
    { id: 'facade', label: 'Exterior Facade' },
    { id: 'office', label: 'Leasable Workspaces' },
    { id: 'garden', label: 'Central Garden Courtyard' },
  ];

  // navigation for lightbox
  const showPrev = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const showNext = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <div id="gallery_showcase_view" className="py-12 bg-brand-bg text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="font-mono text-xs text-brand-accent tracking-widest font-bold uppercase block mb-2">
            PREMIUM REAL ESTATE PHOTOGRAPHY
          </span>
          <h2 className="font-display font-light text-3xl sm:text-4xl text-white tracking-tight">
            The Octagon <span className="font-serif italic text-brand-accent">Physical Showcases</span>
          </h2>
          <p className="font-sans text-slate-400 font-light mt-3 leading-relaxed text-sm md:text-base">
            Peruse high-fidelity architectural previews showcasing our Grade A corporate rooms, structural exterior facades, and tropical central open spaces.
          </p>
        </div>

        {/* Filter categories tabs link bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((fl) => (
            <button
               key={fl.id}
               onClick={() => setActiveFilter(fl.id)}
               className={`px-4 py-2 border rounded-xl font-sans font-bold text-xs tracking-wide transition-all duration-250 cursor-pointer outline-none ${
                 activeFilter === fl.id
                   ? 'bg-brand-accent text-brand-primary border-brand-accent shadow-xl'
                   : 'bg-[#1C1F26] hover:bg-[#252a33] border-white/5 text-slate-300'
               }`}
            >
              {fl.label}
            </button>
          ))}
        </div>

        {/* Grid layout of visual showcases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => {
            const absoluteIndex = galleryItems.findIndex((g) => g.id === item.id);
            return (
              <div
                key={item.id}
                id={`gallery_card_${item.id}`}
                onClick={() => setSelectedPhotoIndex(absoluteIndex)}
                className="group cursor-pointer border border-white/10 rounded-2xl overflow-hidden bg-[#14161B] hover:border-brand-accent/40 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-left"
              >
                {/* Image holder */}
                <div className="relative aspect-[4/3] bg-neutral-900 overflow-hidden">
                  <img
                    src={item.imageSrc}
                    referrerPolicy="no-referrer"
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Glass visual hover overlay */}
                  <div className="absolute inset-0 bg-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 font-bold">
                      <ZoomIn className="h-5 w-5" />
                    </div>
                  </div>
                  
                  {/* Category level badge tag */}
                  <span className="absolute top-3 left-3 px-2.5 base:px-3 py-1 rounded-lg bg-black/60 backdrop-blur-sm font-mono text-[9px] text-brand-accent font-bold uppercase tracking-wider border border-white/5">
                    {item.category === 'facade' ? 'Exterior Facade' : item.category === 'garden' ? 'Gardens & Courtyards' : 'Office Workspace'}
                  </span>
                </div>

                {/* Info Text wrapper */}
                <div className="p-5 text-left space-y-1">
                  <h4 className="font-display font-bold text-sm text-white group-hover:text-brand-accent transition-colors">
                    {item.title}
                  </h4>
                  <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical drafting secondary showcase */}
        <div className="mt-16 p-8 border border-dashed border-white/20 bg-[#1C1F26] rounded-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="p-4 bg-brand-accent/10 border border-brand-accent/20 rounded-xl shrink-0">
            <Layers className="h-8 w-8 text-brand-accent" />
          </div>
          <div className="text-left space-y-1">
            <h4 className="font-display font-semibold text-sm text-white">
              AutoCAD Floor Plates & CAD Blueprints Available
            </h4>
            <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
              Upon request through our booking portal, potential tenant corporate entities will receive complete AutoCAD .DWG vectors specifying pillar clearances, concrete loads, elevator grids, and supplemental shaft sizes.
            </p>
          </div>
        </div>

      </div>

      {/* Lightbox full-screen modal overlays */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            id="gallery_photo_lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-brand-primary/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-8"
          >
            {/* Close trigger anchor */}
            <button
              id="lightbox_close_btn"
              onClick={() => setSelectedPhotoIndex(null)}
              className="absolute top-4 right-4 p-2 text-white hover:text-brand-accent rounded-full bg-neutral-900/60 hover:bg-neutral-800 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Main Visual Carousel area */}
            <div className="relative max-w-5xl w-full flex items-center justify-center gap-4">
              
              {/* Prev Navigation */}
              <button
                id="lightbox_prev_btn"
                onClick={showPrev}
                className="absolute left-2 sm:-left-16 z-10 p-3 text-white hover:text-brand-accent rounded-full bg-neutral-900/60 hover:bg-neutral-800 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Central picture */}
              <div className="bg-neutral-950 p-2 border border-neutral-800 rounded-xl max-h-[70vh] flex items-center justify-center overflow-hidden">
                <img
                  id="lightbox_active_img"
                  src={galleryItems[selectedPhotoIndex].imageSrc}
                  referrerPolicy="no-referrer"
                  alt={galleryItems[selectedPhotoIndex].title}
                  className="max-h-[65vh] object-contain rounded-lg"
                />
              </div>

              {/* Next Navigation */}
              <button
                id="lightbox_next_btn"
                onClick={showNext}
                className="absolute right-2 sm:-right-16 z-10 p-3 text-white hover:text-brand-accent rounded-full bg-neutral-900/60 hover:bg-neutral-800 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

            </div>

            {/* Description card */}
            <div className="mt-6 max-w-2xl text-center text-white space-y-1">
              <span className="font-mono text-[10px] text-brand-accent tracking-widest font-bold uppercase">
                {galleryItems[selectedPhotoIndex].category.toUpperCase()} SEGMENT
              </span>
              <h3 className="font-display font-bold text-lg sm:text-2xl text-white">
                {galleryItems[selectedPhotoIndex].title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {galleryItems[selectedPhotoIndex].desc}
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
