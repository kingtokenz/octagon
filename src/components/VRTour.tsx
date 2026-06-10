/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  MoveHorizontal, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Eye, 
  Layers, 
  ZoomIn, 
  Info, 
  MessageSquare, 
  ArrowRight, 
  Sparkles, 
  CircleDot, 
  UserCheck, 
  HelpCircle,
  Maximize2
} from 'lucide-react';
import { CORE_IDENTITY } from '../types';

// Load generated widescreen assets
import lobby360 from '../assets/images/octagon_lobby_360_1781037639807.png';
import suite360 from '../assets/images/octagon_suite_360_1781037657888.png';

interface Hotspot {
  id: string;
  leftPerc: number;
  topPerc: number;
  title: string;
  metric: string;
  desc: string;
}

interface Scene {
  id: 'lobby' | 'suite';
  name: string;
  tagline: string;
  imageSrc: string;
  description: string;
  hotspots: Hotspot[];
}

interface VRTourProps {
  onNavigate?: (tabId: any) => void;
}

export default function VRTour({ onNavigate }: VRTourProps) {
  // Active scene state
  const [activeScene, setActiveScene] = useState<'lobby' | 'suite'>('lobby');
  
  // Custom interactive dashboard states
  const [panOffset, setPanOffset] = useState<number>(35); // Horizontal offset percentage (0 to 100)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.04); // Speed multiplier per render tick
  const [viewMode, setViewMode] = useState<'realistic' | 'cad' | 'thermal'>('realistic');
  const [zoomFactor, setZoomFactor] = useState<number>(1.1); // Range 1.0 to 1.6
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  
  // Audio state (Synthesizer hum simulation)
  const [isSoundOn, setIsSoundOn] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Chat Guide Assistant States
  const [guideQuestionIdx, setGuideQuestionIdx] = useState<number | null>(null);
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'assistant'; text: string }[]>([
    { sender: 'assistant', text: "Hello! I am Ama Serwaa from Dream Realty. Welcome to high-fidelity virtual tours of The Octagon, Barnes Road. Choose a scene above and drag the viewport horizontally, or ask me any question!" }
  ]);

  // Viewport drag constraints
  const dragStartRef = useRef<number>(0);
  const panStartRef = useRef<number>(0);

  // Scene definitions
  const scenes: Scene[] = [
    {
      id: 'lobby',
      name: 'Grand Executive Lobby',
      tagline: 'Grade A Main Entrance Foyer',
      imageSrc: lobby360,
      description: 'Experience corporate majesty right as you enter Tudu from Barnes Road. Double-height ceilings, filtered clean air currents, security RFID lane controls, and architectural sleek panels design define our welcoming footprint.',
      hotspots: [
        {
          id: 'lobby_reception',
          leftPerc: 25,
          topPerc: 48,
          title: 'Premium Concierge Desk',
          metric: '24/7 Operations',
          desc: 'Visitor vetting, express courier desks, and high-frequency guest clearance badges are processed in this marble-clad reception harbor.'
        },
        {
          id: 'lobby_elevators',
          leftPerc: 55,
          topPerc: 42,
          title: 'High-Speed Lift Bays',
          metric: '15 Intelligent Lifts',
          desc: 'Destination dispatch elevator tubes with zero queues design, linking parking levels and rooftops seamlessly.'
        },
        {
          id: 'lobby_security',
          leftPerc: 78,
          topPerc: 52,
          title: 'RFID Speed Gates',
          metric: 'Biometric Ready',
          desc: 'Automated rapid physical entrance gates supporting secure tenant keycard scanning to maximize workforce safety.'
        },
        {
          id: 'lobby_glass',
          leftPerc: 12,
          topPerc: 30,
          title: 'Curtain Safety Glass',
          metric: 'Double-glazed 12mm',
          desc: 'High-performance acoustic insulation blocking Barnes Road traffic frequencies while absorbing solar heat.'
        }
      ]
    },
    {
      id: 'suite',
      name: 'Executive Floor Suite',
      tagline: 'Level 9 High-Elevation Open Office',
      imageSrc: suite360,
      description: 'A showcase of our flexible, modular floor plates. Features floor-to-ceiling double-glazed panels with premium sound attenuation, fiber optic infrastructure, custom partition opportunities, and scenic views of Accra city.',
      hotspots: [
        {
          id: 'suite_conf',
          leftPerc: 18,
          topPerc: 55,
          title: 'Boardroom Configuration',
          metric: '24-Seat Capacity',
          desc: 'Fully modular power connections, visual HDMI presentation links, and acoustic suspended ceilings for optimal speaking environments.'
        },
        {
          id: 'suite_windows',
          leftPerc: 48,
          topPerc: 35,
          title: 'Panoramic Accra Framing',
          metric: '360° Coastal Angles',
          desc: 'Natural daytime illumination flood with view directions highlighting Ministries, Independence Square, and the Atlantic Coastline.'
        },
        {
          id: 'suite_fiber',
          leftPerc: 68,
          topPerc: 62,
          title: 'Fiber Data Hub Terminal',
          metric: 'Pre-wired 10Gbps',
          desc: 'Redundant sub-ground fiber cables ensuring high-availability network connections for fintech, foreign missions, and legal firms.'
        },
        {
          id: 'suite_ac',
          leftPerc: 85,
          topPerc: 25,
          title: 'Zoned Climate Command',
          metric: 'Eco-VAV Smart System',
          desc: 'Variable air volume temperature controllers enabling distinct temperature brackets within partitioned office chambers.'
        }
      ]
    }
  ];

  const currentScene = scenes.find(s => s.id === activeScene) || scenes[0];

  // Auto-rotating animation frame logic
  useEffect(() => {
    let frameId: number;
    const rotate = () => {
      if (isAutoRotating && !isDragging) {
        setPanOffset(prev => {
          let next = prev + rotationSpeed;
          if (next > 100) next = 0; // Wrap around smoothly
          return next;
        });
      }
      frameId = requestAnimationFrame(rotate);
    };
    frameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(frameId);
  }, [isAutoRotating, isDragging, rotationSpeed]);

  // Audio Synthesizer Loop (Generates tranquil, high-end server room / ambient hum)
  useEffect(() => {
    if (isSoundOn) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Gain node to control quiet overall volume
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.04, ctx.currentTime); // Low non-intrusive sound
        gainRef.current = gain;

        // Main low oscillator (ambient foundation)
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(110, ctx.currentTime); // A2 low quiet frequency
        oscillatorRef.current = osc;

        // Bandpass Filter to make it sound like a luxurious air conditioner / white noise hum
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);
        filter.Q.setValueAtTime(1.5, ctx.currentTime);
        filterRef.current = filter;

        // Connect
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
      } catch (err) {
        console.warn("Web Audio API not supported or blocked by sandbox permissions.", err);
      }
    } else {
      stopSynthesizer();
    }

    return () => {
      stopSynthesizer();
    };
  }, [isSoundOn]);

  const stopSynthesizer = () => {
    if (oscillatorRef.current) {
      try { oscRefStop(); } catch (e) {}
    }
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch (e) {}
      audioCtxRef.current = null;
    }
  };

  const oscRefStop = () => {
    oscillatorRef.current?.stop();
    oscillatorRef.current = null;
  };

  // Drag interaction handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    dragStartRef.current = e.clientX;
    panStartRef.current = panOffset;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current;
    // Proportional dampening based on pixel width of typical viewport containers
    const deltaPercentage = (deltaX / 800) * 100;
    let newPan = panStartRef.current - deltaPercentage;
    
    // Smooth wrapping bounds
    if (newPan < 0) newPan += 100;
    if (newPan > 100) newPan -= 100;
    
    setPanOffset(newPan);
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Mobile Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoRotating(false);
    dragStartRef.current = e.touches[0].clientX;
    panStartRef.current = panOffset;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - dragStartRef.current;
    const deltaPercentage = (deltaX / 400) * 100;
    let newPan = panStartRef.current - deltaPercentage;
    
    if (newPan < 0) newPan += 100;
    if (newPan > 100) newPan -= 100;
    
    setPanOffset(newPan);
  };

  // FAQ Guide responses
  const qaDatabase = [
    {
      q: "What is the monthly lease rate for office rooms?",
      a: "The base rate ranges between $30 to $34 per square meter monthly depending on client elevation and specific lease plate size. This rate covers high-grade secure lobbies transit, dedicated elevator allocation, and robust safety services."
    },
    {
      q: "How adaptable are office layout partitions?",
      a: "Highly customized. Each tenant is provided complete AutoCAD .DWG vectors specifying pillar clearances. You can design custom partition configurations, server cages, and bespoke client lounges with ease."
    },
    {
      q: "Tell me more about the subterrenean parking.",
      a: "The Octagon features high-density 3-level subsurface parking holding 1,500 spaces. Lobbies are pre-scanned via RFID readers, giving tenants frictionless vehicle lane security clearances."
    },
    {
      q: "Is there access for rooftop VIP helicopter arrivals?",
      a: "Yes! There is a fully commercial CAA-registered helipad and VIP holding lounge on Level 12. A dedicated glass high-speed elevator delivers guests straight to corporate suites."
    }
  ];

  const handleAskQuestion = (idx: number) => {
    setGuideQuestionIdx(idx);
    const selectedQA = qaDatabase[idx];
    setChatLog(prev => [
      ...prev,
      { sender: 'user', text: selectedQA.q },
      { sender: 'assistant', text: selectedQA.a }
    ]);
  };

  // Switch scene custom helper
  const handleSceneSwitch = (sceneId: 'lobby' | 'suite') => {
    setActiveScene(sceneId);
    setActiveHotspot(null);
    setPanOffset(35); // Reset pan center
  };

  // Pre-configure options and take the potential tenant to scheduling tab
  const handleTakeAction = () => {
    if (onNavigate) {
      onNavigate('contact');
    }
  };

  return (
    <div id="vrtour_showcase_view" className="py-12 bg-brand-bg text-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* UPPER TITLE */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="font-mono text-xs text-brand-accent tracking-widest font-bold uppercase block mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="h-4 w-4 text-brand-accent animate-pulse" />
            HIGH-FIDELITY IMMERSIVE PERSPECTIVES
          </span>
          <h2 className="font-display font-light text-3xl sm:text-4xl text-white tracking-tight">
            Virtual Reality <span className="font-serif italic text-brand-accent">360° Visualizer</span>
          </h2>
          <p className="font-sans text-slate-400 font-light mt-3 leading-relaxed text-sm">
            Frictionlessly pan across physical views of The Octagon's signature chambers. Experience Grade A suites, premium structural double glazing, and double-height reception lobbies without leaving your screen.
          </p>
        </div>

        {/* INTERACTIVE CONTROLS RAIL HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* VIEWPORT COLUMN: lg:col-span-8 */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Viewport Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#14161B] border border-white/10 px-5 py-3 rounded-2xl">
              {/* Scene toggler buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSceneSwitch('lobby')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer ${
                    activeScene === 'lobby' 
                      ? 'bg-brand-accent text-brand-primary' 
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  Grand Entrance Lobby
                </button>
                <button
                  onClick={() => handleSceneSwitch('suite')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-sans font-bold transition-all cursor-pointer ${
                    activeScene === 'suite' 
                      ? 'bg-brand-accent text-brand-primary' 
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  Corporate Office Suite
                </button>
              </div>

              {/* Status Indicator Badge */}
              <div className="flex items-center gap-2 font-mono text-[10px] text-brand-accent">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="uppercase tracking-widest">{currentScene.name} (Loop active)</span>
              </div>
            </div>

            {/* THE VISUAL 360 COMPASS CANVAS VIEWPORT CONTAINER */}
            <div 
              id="viewport_vr_box"
              className="relative aspect-[16/9] w-full rounded-3xl border border-white/10 overflow-hidden bg-neutral-950 select-none shadow-2xl cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUpOrLeave}
            >
              {/* IMMERSIVE SPATIAL LENSES FILTER OVERLAYS */}
              <div 
                className="absolute inset-0 w-full h-full bg-cover bg-repeat-x transition-all duration-300 pointer-events-none"
                style={{ 
                  backgroundImage: `url(${currentScene.imageSrc})`,
                  backgroundPosition: `${panOffset}% 50%`,
                  transform: `scale(${zoomFactor})`,
                  filter: 
                    viewMode === 'cad' ? 'grayscale(100%) brightness(80%) contrast(150%) invert(90%)' :
                    viewMode === 'thermal' ? 'hue-rotate(180deg) saturate(250%) contrast(120%)' : 
                    'none'
                }}
              />

              {/* Blueprint / CAD layout lines overlay */}
              {viewMode === 'cad' && (
                <div className="absolute inset-0 bg-[linear-gradient(rgba(20,110,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(20,110,255,0.08)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              )}
              {viewMode === 'thermal' && (
                <div className="absolute inset-0 bg-yellow-500/5 mix-blend-color-dodge pointer-events-none" />
              )}

              {/* DYNAMIC SPATIAL HOTSPOTS OVERLAY - PANS WITH COMPASS GRADIENT */}
              {currentScene.hotspots.map((hotspot) => {
                // Calculate dynamic horizontal left translation based on matching panOffset
                // The panorama wraps. We calculate localized translation to align with the panorama offset
                const baseLeft = hotspot.leftPerc;
                // Shift based on panOffset (as panOffset changes 0-100, we offset position smoothly)
                // We map panOffset to a shifting factor so hotspots scroll in perfect sync from right to left!
                let mappedLeft = baseLeft - (panOffset - 50) * 1.5;
                if (mappedLeft < -20) mappedLeft += 100;
                if (mappedLeft > 120) mappedLeft -= 100;

                const isVisible = mappedLeft >= 0 && mappedLeft <= 100;
                
                if (!isVisible) return null;

                const isSelected = activeHotspot?.id === hotspot.id;

                return (
                  <div
                    key={hotspot.id}
                    className="absolute z-20 pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-250"
                    style={{ 
                      left: `${mappedLeft}%`, 
                      top: `${hotspot.topPerc}%`,
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspot(hotspot);
                      }}
                      className="group/node relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
                    >
                      {/* Pulsing Outer Radar Ring */}
                      <span className="absolute inline-flex h-8 w-8 rounded-full bg-brand-accent/30 animate-ping group-hover/node:bg-brand-accent/50" />
                      
                      {/* Inner solid tracking node */}
                      <div className={`relative h-5 w-5 bg-black/80 rounded-full border flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'border-brand-accent scale-125' 
                          : 'border-white/45 hover:border-brand-accent hover:scale-115'
                      }`}>
                        <div className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
                      </div>

                      {/* Small visual hover tag on the canvas node */}
                      <span className="absolute top-7 bg-brand-primary/90 text-white font-sans text-[10px] px-2 py-0.5 rounded-lg border border-white/10 font-bold whitespace-nowrap opacity-0 group-hover/node:opacity-100 transition-opacity pointer-events-none">
                        {hotspot.title}
                      </span>
                    </button>
                  </div>
                );
              })}

              {/* VIEWPORT GESTURAL HINT COVER OVERLAY */}
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full flex items-center gap-2 pointer-events-none text-[11px] text-slate-300">
                <MoveHorizontal className="h-3.5 w-3.5 text-brand-accent animate-bounce" />
                <span>Drag to pan 360° cylindrical chamber scene</span>
              </div>

              {/* AUDIO STATUS EQUALIZER OVERLAY */}
              {isSoundOn && (
                <div className="absolute top-5 left-5 bg-black/40 backdrop-blur-sm border border-white/5 p-2 rounded-xl flex items-center gap-1 pointer-events-none">
                  <div className="w-1 h-3 bg-brand-accent animate-[bounce_0.8s_infinite]" />
                  <div className="w-1 h-5 bg-brand-accent animate-[bounce_0.5s_infinite_0.1s]" />
                  <div className="w-1 h-2 bg-brand-accent animate-[bounce_0.7s_infinite_0.2s]" />
                </div>
              )}
            </div>

            {/* VIEWPORT CONTROLS BAR: Zoom/Modes/Rotate Speed dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#14161B] border border-white/10 p-5 rounded-3xl text-left">
              
              {/* View Optics Controller */}
              <div className="space-y-1">
                <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-widest">OPTICAL FILTER GLASS</span>
                <div className="flex gap-1.5 pt-0.5">
                  <button 
                    onClick={() => setViewMode('realistic')}
                    title="Real Photo View"
                    className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] font-sans font-bold flex items-center justify-center gap-1 border transition-all cursor-pointer ${
                      viewMode === 'realistic' ? 'bg-brand-accent text-brand-primary border-brand-accent' : 'bg-[#1C1F26] border-white/5 hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <Eye className="h-3 w-3" /> Real
                  </button>
                  <button 
                    onClick={() => setViewMode('cad')}
                    title="Futuristic blueprint vector wireframe design"
                    className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] font-sans font-bold flex items-center justify-center gap-1 border transition-all cursor-pointer ${
                      viewMode === 'cad' ? 'bg-brand-accent text-brand-primary border-brand-accent' : 'bg-[#1C1F26] border-white/5 hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <Layers className="h-3 w-3" /> CAD
                  </button>
                  <button 
                    onClick={() => setViewMode('thermal')}
                    title="Simulate thermal and climate controls layout"
                    className={`flex-1 py-1.5 px-2 rounded-xl text-[10px] font-sans font-bold flex items-center justify-center gap-1 border transition-all cursor-pointer ${
                      viewMode === 'thermal' ? 'bg-brand-accent text-brand-primary border-brand-accent' : 'bg-[#1C1F26] border-white/5 hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <CircleDot className="h-3 w-3" /> Heat
                  </button>
                </div>
              </div>

              {/* Focal Lens / Zoom level */}
              <div className="space-y-1.5 flex flex-col justify-center">
                <div className="flex justify-between font-mono text-[9px] text-slate-400 uppercase tracking-widest">
                  <span>CAMERA ZOOM</span>
                  <span className="text-brand-accent">{(zoomFactor * 10).toFixed(0)}mm Focal</span>
                </div>
                <div className="flex items-center gap-3">
                  <ZoomIn className="h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="range"
                    min="1.0"
                    max="1.5"
                    step="0.05"
                    value={zoomFactor}
                    onChange={(e) => setZoomFactor(Number(e.target.value))}
                    className="w-full h-1 bg-[#1C1F26] rounded-lg appearance-none cursor-pointer accent-brand-accent"
                  />
                </div>
              </div>

              {/* SENSORY SETTINGS: Sound / Auto-Rotation */}
              <div className="space-y-1.5 flex flex-col justify-center">
                <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-widest">SENSORY HARDWARE</span>
                <div className="flex items-center gap-3">
                  {/* Sound Trigger */}
                  <button
                    onClick={() => setIsSoundOn(!isSoundOn)}
                    title={isSoundOn ? "Turn off ambient environment soundtrack loops" : "Excite your spatial experience by turning on ambient workstation acoustics"}
                    className={`p-2 rounded-xl border cursor-pointer transition-all ${
                      isSoundOn 
                        ? 'bg-brand-accent text-brand-primary border-brand-accent shadow-lg shadow-brand-accent/25' 
                        : 'bg-[#1C1F26] border-white/5 hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    {isSoundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </button>

                  {/* Auto-Rotation switch */}
                  <button
                    onClick={() => setIsAutoRotating(!isAutoRotating)}
                    className={`flex-grow py-2 px-3 rounded-xl border text-[10px] font-sans font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                      isAutoRotating 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                        : 'bg-[#1C1F26] border-white/5 hover:bg-white/5 text-slate-400'
                    }`}
                  >
                    <RotateCw className={`h-3 w-3 ${isAutoRotating ? 'animate-spin' : ''}`} />
                    <span>Auto-Rotate: {isAutoRotating ? 'ACTIVE' : 'PAUSED'}</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* DYNAMIC METRIC DETAILS & CHAT GUIDE SIDE RAIL: lg:col-span-4 */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* HOTSPOT INFO DRAWER CARD */}
            <div className="bg-[#14161B] border border-white/10 rounded-3xl p-6 text-left space-y-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-brand-accent/10 border border-brand-accent/20 rounded-xl">
                  <Compass className="h-4 w-4 text-brand-accent" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xs text-brand-accent uppercase tracking-widest">Spatial Focal Point</h4>
                  <span className="font-sans text-[11px] text-slate-400 block mt-0.5">Click any virtual node on the scene</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {activeHotspot ? (
                  <motion.div
                    key={activeHotspot.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-3"
                  >
                    <div className="p-3.5 bg-[#1C1F26] border border-white/5 rounded-2xl">
                      <span className="font-mono text-[9px] text-brand-accent font-bold uppercase tracking-wider bg-brand-accent/10 border border-brand-accent/15 px-2 py-0.5 rounded-md">
                        {activeHotspot.metric}
                      </span>
                      <h3 className="font-display font-bold text-sm text-white mt-1.5">{activeHotspot.title}</h3>
                      <p className="font-sans text-xs text-slate-300 font-light leading-relaxed mt-2.5">
                        {activeHotspot.desc}
                      </p>
                    </div>

                    {/* Quick schedule prefill coordinator action */}
                    <button
                      onClick={handleTakeAction}
                      className="w-full py-2.5 rounded-xl font-sans font-bold text-[10px] text-brand-primary bg-brand-accent hover:bg-brand-accent-hover flex items-center justify-center gap-1.5 cursor-pointer outline-none transition-all shadow-md mt-2"
                    >
                      Apply To Real Site Tour
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-6 px-4 bg-[#1C1F26] border border-dashed border-white/10 rounded-2xl text-slate-400 relative">
                    <Info className="h-5 w-5 text-slate-500 mb-2" />
                    <p className="font-sans text-[11px] leading-relaxed">
                      Tap the pulsing target rings inside the viewport to explore engineering specifications within {currentScene.name}.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* ONSITE LEASING VIRTUAL GUIDE BOT (AMA SERWAA) */}
            <div className="bg-[#14161B] border border-white/10 rounded-3xl p-6 text-left flex flex-col justify-between flex-grow">
              <div className="space-y-4">
                
                {/* Assistant header */}
                <div className="flex items-center gap-3 pb-3 border-b border-white/5">
                  <div className="relative">
                    <div className="w-10 h-10 bg-slate-800 rounded-full border border-brand-accent/30 overflow-hidden flex items-center justify-center font-serif text-brand-accent font-extrabold text-sm uppercase">
                      AS
                    </div>
                    {/* Active online dot */}
                    <span className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 rounded-full border-2 border-[#14161B]" />
                  </div>
                  <div>
                    <strong className="block font-display font-semibold text-xs text-white">Ama Serwaa</strong>
                    <span className="block font-mono text-[9px] text-slate-400 uppercase tracking-widest">Leasing Portfolio Head</span>
                  </div>
                </div>

                {/* Simulated message chat panel */}
                <div id="guide_chat_log" className="h-[140px] overflow-y-auto space-y-3 pr-1 font-sans text-xs scrollbar-thin">
                  {chatLog.map((chat, i) => (
                    <div key={i} className={`flex flex-col ${chat.sender === 'user' ? 'items-end' : 'items-start animate-fadeIn'}`}>
                      <div className={`p-3 max-w-[90%] rounded-2xl leading-relaxed text-[11px] ${
                        chat.sender === 'user' 
                          ? 'bg-brand-accent/20 text-brand-accent rounded-br-none border border-brand-accent/20' 
                          : 'bg-[#1C1F26] text-slate-300 rounded-bl-none border border-white/5'
                      }`}>
                        {chat.text}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pre-formatted Questions */}
                <div className="space-y-1.5 pt-2">
                  <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1 font-bold">
                    <HelpCircle className="h-3 w-3 text-brand-accent" />
                    SELECT CONCERNS REFERENCE TO ASK AMA:
                  </span>
                  
                  <div className="flex flex-col gap-1.5 max-h-[110px] overflow-y-auto pr-1">
                    {qaDatabase.map((qa, idx) => {
                      const isPicked = guideQuestionIdx === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAskQuestion(idx)}
                          className={`w-full p-2 rounded-xl text-left font-sans text-[10px] leading-relaxed transition-all truncate border cursor-pointer outline-none ${
                            isPicked
                              ? 'bg-brand-accent/10 border-brand-accent text-brand-accent font-bold'
                              : 'bg-[#1C1F26] border-white/5 text-slate-300 hover:bg-[#252a33]'
                          }`}
                        >
                          {qa.q}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Take-action button inside GUIDE BOT */}
              <div className="pt-4 mt-4 border-t border-white/5">
                <button
                  onClick={handleTakeAction}
                  className="w-full py-3 rounded-xl font-sans font-bold text-xs text-brand-primary bg-brand-accent hover:bg-brand-accent-hover flex items-center justify-center gap-2 cursor-pointer outline-none transition-all"
                >
                  <UserCheck className="h-4 w-4" />
                  Request Private On-Site Tour
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* CAD Blueprint technical note panel */}
        <div className="mt-12 p-8 border border-dashed border-white/20 bg-[#1C1F26] rounded-3xl max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="p-4 bg-brand-accent/10 border border-brand-accent/20 rounded-2xl shrink-0">
            <Maximize2 className="h-8 w-8 text-brand-accent" />
          </div>
          <div className="text-left space-y-1">
            <h4 className="font-display font-semibold text-sm text-white">
              Spatially Configured & Registered for Augmented Reality (AR) Glasses
            </h4>
            <p className="font-sans text-xs text-slate-400 font-light leading-relaxed">
              Potential diplomatic occupants and enterprise tenants can download our spatial layout configuration profile. Compatible with Apple Vision Pro and Meta Quest 3, experience real-time 3D walking drafts specifying floor weight loads and elevator conduits from your office suite.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
