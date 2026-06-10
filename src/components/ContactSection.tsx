/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Calendar,
  Compass,
  CheckCircle2,
  Trash2,
  Car,
  Receipt,
  Printer,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import { CORE_IDENTITY, LANDMARKS_NEARBY, InquiryBooking, AccraLandmark } from '../types';

interface ContactSectionProps {
  prefilledLevel?: string;
  prefilledSize?: number;
  prefilledNotes?: string;
  clearPrefills?: () => void;
}

export default function ContactSection({ prefilledLevel, prefilledSize, prefilledNotes, clearPrefills }: ContactSectionProps) {
  // Local state for submitted inquiries (fetched from localStorage)
  const [inquiries, setInquiries] = useState<InquiryBooking[]>([]);
  const [activeLandmark, setActiveLandmark] = useState<AccraLandmark>(LANDMARKS_NEARBY[2]); // Default: National Theatre
  
  // Wizards states
  const [formStep, setFormStep] = useState<number>(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [inquiryType, setInquiryType] = useState<InquiryBooking['inquiryType']>('lease-office');
  const [targetSizeSqM, setTargetSizeSqM] = useState<number>(prefilledSize || 150);
  const [preferredLevel, setPreferredLevel] = useState(prefilledLevel || 'Levels 1 - 4');
  const [tourDate, setTourDate] = useState('');
  const [tourTime, setTourTime] = useState('10:00');
  const [specialNotes, setSpecialNotes] = useState(prefilledNotes || '');
  const [successBookingId, setSuccessBookingId] = useState<string | null>(null);

  // Sync pre-filled context if they navigated from Leasing planner or ApartHotel
  useEffect(() => {
    if (prefilledLevel) {
      setPreferredLevel(prefilledLevel);
    }
    if (prefilledSize) {
      setTargetSizeSqM(prefilledSize);
    }
    if (prefilledNotes) {
      setSpecialNotes(prefilledNotes);
      setInquiryType('apart-hotel');
      setPreferredLevel('Level 10 - 11'); // Apart-Hotel levels
    }
  }, [prefilledLevel, prefilledSize, prefilledNotes]);

  // Load bookings from localStorage on mounting
  useEffect(() => {
    const saved = localStorage.getItem('octagon_inquiries');
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        console.error("Failed parsing inquiries localStorage:", e);
      }
    }
  }, []);

  const saveInquiries = (updatedList: InquiryBooking[]) => {
    setInquiries(updatedList);
    localStorage.setItem('octagon_inquiries', JSON.stringify(updatedList));
  };

  // Submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phoneNumber) {
      alert("Please provide required contact information (Name, Email, and Phone) before booking.");
      return;
    }

    const newBookingId = `OCT-${Math.floor(10000 + Math.random() * 90000)}`;
    const newInquiry: InquiryBooking = {
      id: newBookingId,
      fullName,
      email,
      phoneNumber,
      companyName: companyName || 'Private Individual',
      inquiryType,
      targetSizeSqM,
      preferredLevel,
      tourDate: tourDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], // default 2 days out
      tourTime,
      specialNotes: specialNotes || 'None specfied.',
      submittedAt: new Date().toLocaleString(),
      status: 'confirmed'
    };

    const updated = [newInquiry, ...inquiries];
    saveInquiries(updated);
    setSuccessBookingId(newBookingId);
    
    // Clear fields
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setCompanyName('');
    setSpecialNotes('');
    setFormStep(3); // Go to success ticket page

    if (clearPrefills) {
      clearPrefills();
    }
  };

  const deleteInquiry = (id: string) => {
    const filtered = inquiries.filter(inq => inq.id !== id);
    saveInquiries(filtered);
    if (successBookingId === id) {
      setSuccessBookingId(null);
    }
  };

  const resetFormWizard = () => {
    setFormStep(1);
    setSuccessBookingId(null);
  };

  return (
    <div id="contact_and_tours_view" className="py-12 bg-brand-bg text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-mono text-xs text-brand-accent tracking-widest font-bold uppercase block mb-2">
            PLAN SITE VISITS & CORPORATE TOURS
          </span>
          <h2 className="font-display font-light text-3xl sm:text-4xl text-white tracking-tight">
            Schedule a <span className="font-serif italic text-brand-accent">Private Consultation</span>
          </h2>
          <p className="font-sans text-slate-400 font-light mt-3 leading-relaxed text-sm md:text-base">
            Visit Barnes Road. Plan an escorted site tour of corporate floors, experience our subsurface parking density, and test our penthouse rooftop helipad.
          </p>
        </div>

        {/* Triple Split Grid: Left (Offices Spec/Proximity), Center (Wizard Scheduler), Right (Submitted Tickets) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* COLUMN 1: Physical location particulars and Map Landmarks indicator (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <h3 className="font-display font-semibold text-lg text-white flex items-center gap-2">
              <Compass className="h-4.5 w-4.5 text-brand-accent animate-spin-slow" />
              Barnes Road Proximity Map
            </h3>

            {/* Custom Interactive vector landmarks layout representing surrounding map */}
            <div className="border border-white/10 bg-[#14161B] p-5 rounded-2xl shadow-xl text-left space-y-4">
              <div className="flex gap-2.5 items-start">
                <MapPin className="h-5 w-5 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-display font-bold text-xs text-white uppercase">Physical Address</h4>
                  <p className="font-sans text-xs text-slate-400 mt-0.5 leading-relaxed font-light">{CORE_IDENTITY.address}</p>
                </div>
              </div>

              {/* Landmark proximity selector */}
              <div className="border-t border-white/5 pt-3">
                <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-wider mb-2">
                  Select nearby landmark to view distance:
                </span>
                
                <div className="grid grid-cols-2 gap-1.5">
                  {LANDMARKS_NEARBY.map((lm, i) => {
                    const isActive = activeLandmark.name === lm.name;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveLandmark(lm)}
                        className={`p-2 rounded font-sans text-[11px] text-left transition-all truncate border outline-none cursor-pointer ${
                          isActive
                            ? 'bg-brand-accent text-brand-primary border-brand-accent font-semibold'
                            : 'bg-[#1C1F26] hover:bg-[#252a33] border-white/5 text-slate-300'
                        }`}
                      >
                        {lm.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected landmark meta */}
              <div className="p-3.5 bg-[#1C1F26] border border-white/5 rounded-xl space-y-1.5 animate-fadeIn duration-200">
                <div className="flex justify-between items-center text-xs">
                  <strong className="font-display font-bold text-white text-[11px]">{activeLandmark.name}</strong>
                  <span className="font-mono text-[9px] text-brand-accent font-bold uppercase tracking-wide bg-brand-accent/15 border border-brand-accent/20 px-2.5 py-0.5 rounded-lg">
                    ~{activeLandmark.distanceMinutes} Min Drive
                  </span>
                </div>
                <p className="font-sans text-[11px] text-slate-400 font-light leading-relaxed">
                  {activeLandmark.description}
                </p>
              </div>
            </div>

            {/* Quick Contact Numbers specs panel */}
            <div className="border border-white/10 bg-[#1C1F26] text-white p-5 rounded-2xl shadow-xl text-left space-y-4">
              <h4 className="font-display font-bold text-xs text-brand-accent tracking-widest uppercase">
                DIRECT LEASING DIVISION
              </h4>
              
              <div className="space-y-3 font-sans text-xs">
                <a
                  href={`tel:${CORE_IDENTITY.contactPhone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3 text-slate-300 hover:text-white"
                >
                  <Phone className="h-4 w-4 text-brand-accent" />
                  <span>Call: <strong className="text-white font-mono">{CORE_IDENTITY.contactPhone}</strong></span>
                </a>

                <a
                  href={`mailto:${CORE_IDENTITY.contactEmail}`}
                  className="flex items-center gap-3 text-slate-300 hover:text-white"
                >
                  <Mail className="h-4 w-4 text-brand-accent" />
                  <span>Email: <strong className="text-white font-mono">{CORE_IDENTITY.contactEmail}</strong></span>
                </a>

                <div className="flex items-center gap-3 text-slate-300">
                  <Clock className="h-4 w-4 text-brand-accent" />
                  <span>Hours: <strong className="text-white font-mono">{CORE_IDENTITY.officeHours}</strong></span>
                </div>
              </div>
            </div>

          </div>

          {/* COLUMN 2: Elegant Tour and leasing Wizard Scheduler Form (lg:col-span-5) */}
          <div className="lg:col-span-5 border border-white/10 bg-[#14161B] p-6 sm:p-8 rounded-2xl shadow-xl">
            
            {/* Context Notice if Prefilled */}
            {prefilledLevel && formStep === 1 && (
              <div className="mb-6 p-3 bg-brand-accent/5 border border-brand-accent/20 rounded-xl text-left flex items-start gap-2 animate-fadeIn">
                <Info className="h-4 w-4 text-brand-accent shrink-0 mt-0.5" />
                <div>
                  <span className="block font-display font-bold text-[10px] text-white uppercase">Configuration Mapped</span>
                  <p className="font-sans text-[10px] text-slate-300 mt-0.5 font-light">
                    Carrying over preference: <strong className="text-white">{prefilledLevel}</strong> ({prefilledSize} m²) into your leasing request.
                  </p>
                </div>
              </div>
            )}

            {/* Wizard Header / Step Indicator */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
              <h3 className="font-display font-medium text-sm sm:text-base text-white text-left">
                {formStep === 1 && "Office Requirements"}
                {formStep === 2 && "Representative details"}
                {formStep === 3 && "Booking Success"}
              </h3>
              
              <span className="font-mono text-[9px] text-brand-accent font-bold uppercase bg-brand-accent/10 border border-brand-accent/15 px-2.5 py-1 rounded-lg">
                Step {formStep} of 3
              </span>
            </div>

            {/* FORM MULTI-STEP IMPLEMENTATION */}
            <form onSubmit={handleFormSubmit} className="space-y-4">

              {formStep === 1 && (
                <div className="space-y-4 text-left">
                  
                  {/* Category of Inquire */}
                  <div className="space-y-1">
                    <label className="block font-sans text-xs text-slate-400 font-semibold mb-1">Inquiry Purpose</label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value as any)}
                      className="w-full p-2.5 border border-white/10 rounded-xl font-sans text-xs text-white bg-[#1C1F26] focus:border-brand-accent focus:bg-[#252a33] focus:outline-none cursor-pointer"
                    >
                      <option value="lease-office">Grade A Office Lease</option>
                      <option value="lease-retail">Flagship Retail Showroom Lease</option>
                      <option value="garden-event">Central Garden Event Venue Booking</option>
                      <option value="apart-hotel">Apart-Hotel Executive Lodging</option>
                      <option value="helipad-tour">Helipad Terminal Tour</option>
                      <option value="general">General Corporate Inquiry</option>
                    </select>
                  </div>

                  {/* Sizing Pref */}
                  <div className="space-y-1">
                    <label className="block font-sans text-xs text-slate-400 font-semibold mb-1">Target Space Sizing (m²)</label>
                    <input
                      type="number"
                      min="10"
                      max="10000"
                      value={targetSizeSqM}
                      onChange={(e) => setTargetSizeSqM(Number(e.target.value))}
                      className="w-full p-2.5 border border-white/10 rounded-xl font-mono text-xs text-white bg-[#1C1F26] focus:border-brand-accent focus:bg-[#252a33] focus:outline-none"
                    />
                  </div>

                  {/* Level selection */}
                  <div className="space-y-1">
                    <label className="block font-sans text-xs text-slate-400 font-semibold mb-1">Target Complex Floor Level</label>
                    <select
                      value={preferredLevel}
                      onChange={(e) => setPreferredLevel(e.target.value)}
                      className="w-full p-2.5 border border-white/10 rounded-xl font-sans text-xs text-white bg-[#1C1F26] focus:border-brand-accent focus:bg-[#252a33] focus:outline-none cursor-pointer"
                    >
                      <option value="Ground Floor">Ground Floor (Retail Outlets)</option>
                      <option value="Levels 1 - 4">Levels 1 - 4 (Lower Offices Wing)</option>
                      <option value="Levels 5 - 9">Levels 5 - 9 (Upper Suites Wing)</option>
                      <option value="Level 10 - 11">Levels 10 - 11 (Apart-Hotel studios)</option>
                      <option value="Rooftop (Level 12)">Level 12 Rooftop (Helideck / air deck)</option>
                    </select>
                  </div>

                  {/* Calendar details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block font-sans text-xs text-slate-400 font-semibold mb-1">Desired Tour Date</label>
                      <input
                        type="date"
                        required
                        value={tourDate}
                        onChange={(e) => setTourDate(e.target.value)}
                        className="w-full p-2.5 border border-white/10 rounded-xl font-mono text-xs text-white bg-[#1C1F26] focus:border-brand-accent focus:bg-[#252a33] focus:outline-none cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block font-sans text-xs text-slate-400 font-semibold mb-1">Desired Tour Time</label>
                      <select
                        value={tourTime}
                        onChange={(e) => setTourTime(e.target.value)}
                        className="w-full p-2.5 border border-white/10 rounded-xl font-mono text-xs text-white bg-[#1C1F26] focus:border-brand-accent focus:bg-[#252a33] focus:outline-none cursor-pointer"
                      >
                        <option value="09:00">09:00 AM</option>
                        <option value="10:30">10:30 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:30">03:30 PM</option>
                        <option value="17:00">05:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFormStep(2)}
                    className="w-full py-3.5 mt-4 rounded-xl font-sans font-bold text-xs text-brand-primary bg-brand-accent hover:bg-brand-accent-hover flex items-center justify-center gap-2 cursor-pointer outline-none"
                  >
                    Continue to Details
                    <ChevronRight className="h-4 w-4" />
                  </button>

                </div>
              )}

              {formStep === 2 && (
                <div className="space-y-4 text-left animate-fadeIn">
                  
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="block font-sans text-xs text-slate-400 font-semibold mb-1">Contact Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ama Serwaa"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2.5 border border-white/10 rounded-xl font-sans text-xs text-white bg-[#1C1F26] focus:border-brand-accent focus:bg-[#252a33] focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block font-sans text-xs text-slate-400 font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. serwaa@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 border border-white/10 rounded-xl font-sans text-xs text-white bg-[#1C1F26] focus:border-brand-accent focus:bg-[#252a33] focus:outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="block font-sans text-xs text-slate-400 font-semibold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +233 24 123 4567"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full p-2.5 border border-white/10 rounded-xl font-sans text-xs text-white bg-[#1C1F26] focus:border-brand-accent focus:bg-[#252a33] focus:outline-none"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="space-y-1">
                    <label className="block font-sans text-xs text-slate-400 font-semibold mb-1">Corporation / Company Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Serwaa Legal Partners"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full p-2.5 border border-white/10 rounded-xl font-sans text-xs text-white bg-[#1C1F26] focus:border-brand-accent focus:bg-[#252a33] focus:outline-none"
                    />
                  </div>

                  {/* Notes */}
                  <div className="space-y-1">
                    <label className="block font-sans text-xs text-slate-400 font-semibold mb-1">Special Partitioning / Access Needs</label>
                    <textarea
                      placeholder="Please note specialized requirements e.g. server columns spacing, parking permit, medical access needs here..."
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      rows={2}
                      className="w-full p-2.5 border border-white/10 rounded-xl font-sans text-xs text-white bg-[#1C1F26] focus:border-brand-accent focus:bg-[#252a33] focus:outline-none resize-none"
                    />
                  </div>

                  {/* Navigation buttons */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="w-full py-3.5 rounded-xl font-sans font-semibold text-xs text-white bg-white/5 hover:bg-white/10 cursor-pointer outline-none transition-all"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="col-span-2 w-full py-3.5 rounded-xl font-sans font-bold text-xs text-brand-primary bg-brand-accent hover:bg-brand-accent-hover cursor-pointer outline-none transition-all"
                    >
                      Process Tour Ticket
                    </button>
                  </div>

                </div>
              )}

              {/* SUCCESS ENVELOPE (formStep === 3) */}
              {formStep === 3 && successBookingId && (
                <div className="space-y-6 text-center animate-fadeIn py-4">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  </div>
                  
                  <div className="space-y-1">
                    <h4 className="font-display font-semibold text-base text-white">Tour Reference Assigned</h4>
                    <span className="font-mono text-xl font-black text-brand-accent uppercase tracking-wide block">
                      {successBookingId}
                    </span>
                    <p className="font-sans text-xs text-slate-400 font-light leading-relaxed max-w-sm mx-auto">
                      Your consultation schedules have been written into standard files. Our representative Ama Serwaa will reach you within 2 business hours.
                    </p>
                  </div>

                  {/* Print Pass Button */}
                  <div className="p-4 bg-[#1C1F26] border border-white/10 rounded-2xl space-y-2 text-left text-xs">
                    <strong className="font-display text-white block">Checked-in Lane Access Pass</strong>
                    <div className="font-mono text-[11px] text-slate-400 space-y-1">
                      <div>Lobby Box: Lane Box 4, Sublevel -2 Parking Entry</div>
                      <div>Access Gate Barcode: Pre-Cleared RFID Scan Active</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={resetFormWizard}
                    className="w-full py-3 rounded-xl font-sans font-bold text-xs bg-white/5 hover:bg-white/10 text-white cursor-pointer outline-none transition-all"
                  >
                    Schedule Another Appointment
                  </button>
                </div>
              )}

            </form>
          </div>

          {/* COLUMN 3: Active boarding coupons desk panel (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-6 text-left">
            <h3 className="font-display font-semibold text-lg text-white flex items-center gap-2">
              <Receipt className="h-4.5 w-4.5 text-brand-accent" />
              Corporate Tours board
            </h3>

            {inquiries.length === 0 ? (
              <div className="border border-white/10 border-dashed bg-[#14161B] p-6 rounded-2xl text-center text-xs text-slate-400 space-y-2">
                <p className="font-sans">No active requested tours for this session.</p>
                <p className="font-sans text-[10px] font-light leading-relaxed">Schedule a private tour using the workspace estimator configuration to generate access badges.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="border border-white/10 bg-[#1C1F26] p-4 rounded-2xl text-left space-y-3 relative shadow-xl group hover:border-brand-accent/40 transition-colors"
                  >
                    {/* Delete action */}
                    <button
                      type="button"
                      onClick={() => deleteInquiry(inq.id)}
                      className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-red-400 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer"
                      title="Cancel Tour Reservation"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>

                    {/* Ticket details */}
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-brand-accent font-bold uppercase block tracking-wider">
                        {inq.inquiryType === 'lease-office' ? 'Office tour' : inq.inquiryType === 'lease-retail' ? 'Retail tour' : 'Amenities tour'}
                      </span>
                      <h4 className="font-display font-bold text-sm text-white leading-tight">
                        {inq.companyName !== 'Private Individual' ? inq.companyName : inq.fullName}
                      </h4>
                      <span className="font-mono text-[9px] text-slate-400 block">
                        ID: {inq.id}
                      </span>
                    </div>

                    <div className="border-t border-dashed border-white/5 pt-2 font-mono text-[10px] text-slate-400 space-y-1">
                      <div>Date: {inq.tourDate} @ {inq.tourTime}</div>
                      <div>Plate: {inq.preferredLevel}</div>
                      <div>Space limit: {inq.targetSizeSqM} m²</div>
                    </div>

                    {/* parking ticket design element */}
                    <div className="flex items-center gap-1.5 p-2 bg-[#14161B] border border-white/5 rounded-xl text-[9px] font-mono text-slate-400">
                      <Car className="h-3 w-3 text-brand-accent" />
                      <span>Sublevel B2 Entry • Lane 4 RFID</span>
                    </div>

                  </div>
                ))}
              </div>
            )}
            
            {inquiries.length > 0 && (
              <p className="font-sans text-[10px] text-slate-400 leading-relaxed font-light text-center">
                Show ticket ID barcodes to Barnes Road gate-guards upon visual driveway arrival for security clearances.
              </p>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
