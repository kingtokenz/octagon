/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Application Navigation States
export type ActiveTab = 'home' | 'leasing' | 'aparthotel' | 'amenities' | 'about' | 'gallery' | 'vrtour' | 'contact';

// Office/Retail Floor Plate Definitions
export interface FloorLevel {
  level: string; // e.g., "Ground", "Levels 1-3", "Level 11"
  name: string; // e.g., "Premium Retail Showrooms", "Grade A Corporate Office Plates"
  useCase: 'retail' | 'office' | 'hospitality' | 'special';
  totalAreaSqM: number;
  availableAreaSqM: number;
  baseRateUSD: number; // Base rent rate per sq meter monthly
  heightClearanceM: number;
  features: string[];
  maxOccupancy: number;
  blueprints: string; // Architectural description
}

// Interactive Amenity Structure
export interface AmenitySpec {
  id: string;
  name: string;
  tagline: string;
  size: string;
  capacity?: string;
  highlight: string;
  details: string[];
  iconName: string;
}

// Submitted Booking / Real Estate Inquiry
export interface InquiryBooking {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  inquiryType: 'lease-office' | 'lease-retail' | 'garden-event' | 'apart-hotel' | 'helipad-tour' | 'general';
  targetSizeSqM: number;
  preferredLevel: string;
  tourDate: string;
  tourTime: string;
  specialNotes: string;
  submittedAt: string;
  status: 'pending' | 'confirmed' | 'completed';
}

// Local Directory Landmarks for Accra Central proximity map
export interface AccraLandmark {
  name: string;
  category: 'government' | 'finance' | 'culture' | 'transit';
  distanceMinutes: number;
  description: string;
}

// Global Core Identity Data
export const CORE_IDENTITY = {
  name: "The Octagon, Accra Central",
  tagline: "The Pinnacle of Grade-A Corporate Excellence in West Africa",
  developer: "Dream Realty Limited",
  inauguratedYear: 2017,
  address: "Barnes Road, Tudu, Accra Central, Ghana",
  locationDirections: "Strategically bordered by Barnes Road and Independence Avenue, near the National Theatre & Accra High Court.",
  contactPhone: "+233 30 263 1422",
  contactEmail: "leasing@dreamrealty.com.gh", // Custom mock but actual developer domains are clean
  officeHours: "Monday - Friday, 8:00 AM - 6:00 PM",
  specs: {
    totalLeasableSpace: 75000,
    officeSpaceSqM: 35000,
    retailSpaceSqM: 7000,
    gardenSpaceSqM: 3000,
    parkingSpaces: 1500,
    elevators: 15,
    levels: 12
  }
};

// Floor Levels Metadata definitions
export const OCTAGON_FLOOR_DATA: FloorLevel[] = [
  {
    level: "Ground Floor",
    name: "Luxury Retail & Showrooms Bloc",
    useCase: "retail",
    totalAreaSqM: 7000,
    availableAreaSqM: 1450,
    baseRateUSD: 45,
    heightClearanceM: 4.5,
    features: ["Double-glazed safety double doors", "Barnes Road high-footfall visual display window", "Integrated backup water supply", "Direct street-level central entrances"],
    maxOccupancy: 800,
    blueprints: "Premium open-layout modules optimized for upscale cafes, flagship retail showrooms, pharmacies, and bank branches."
  },
  {
    level: "Levels 1 - 4",
    name: "Lower Office Hub (Corporate Headquarters)",
    useCase: "office",
    totalAreaSqM: 14000,
    availableAreaSqM: 3200,
    baseRateUSD: 30,
    heightClearanceM: 3.2,
    features: ["Flexible zoning plates", "Acoustic insulation panels", "High-speed fiber connectivity trunks", "Double climate control zoning"],
    maxOccupancy: 1500,
    blueprints: "Spacious modular office spaces perfect for large local institutions, financial tech hubs, and corporate services."
  },
  {
    level: "Levels 5 - 9",
    name: "Upper Office Haven (Multinational & Legal Hub)",
    useCase: "office",
    totalAreaSqM: 15000,
    availableAreaSqM: 4800,
    baseRateUSD: 34,
    heightClearanceM: 3.2,
    features: ["Accra Central panoramic viewing angles", "VIP keycard access locks", "Dedicated smart climate zones", "Continuous high-speed backup trunking"],
    maxOccupancy: 1600,
    blueprints: "Premium mid-to-high elevation offices tailored for legal firms, multinational embassies, energy conglomerates, and diplomatic circles."
  },
  {
    level: "Level 10 - 11",
    name: "Apart-Hotel Executive Suites & Studios",
    useCase: "hospitality",
    totalAreaSqM: 6000,
    availableAreaSqM: 1800,
    baseRateUSD: 40,
    heightClearanceM: 3.1,
    features: ["Fully furnished kitchenette units", "24/7 dedicated concierge foyer", "Insulated dual-pane views of Independence Square", "Private residents' pool access"],
    maxOccupancy: 350,
    blueprints: "Luxury studios and 1-2 bedroom apart-hotel units, offering temporary business visitors a seamless corporate stay."
  },
  {
    level: "Rooftop (Level 12)",
    name: "Rooftop Air Deck & Helipad Pavilion",
    useCase: "special",
    totalAreaSqM: 2000,
    availableAreaSqM: 500,
    baseRateUSD: 60,
    heightClearanceM: 5.0,
    features: ["Ghana's first ever rooftop commercial helipad", "360-degree Accra coastal panorama view", "Secure heli-security transit lobby", "VIP private lounge and reception"],
    maxOccupancy: 200,
    blueprints: "Exquisite visual rooftop holding area allowing direct helicopter pick-up services, executive transfer routes, and high-security air transit."
  }
];

// Key Landmarks nearby
export const LANDMARKS_NEARBY: AccraLandmark[] = [
  { name: "Independence Avenue", category: "transit", distanceMinutes: 1, description: "Direct arterial access road to all major government buildings and highways." },
  { name: "Central Bank of Ghana", category: "finance", distanceMinutes: 3, description: "Financial nerve center of the republic, immediate banking convenience." },
  { name: "National Theatre of Ghana", category: "culture", distanceMinutes: 4, description: "Iconic historical and cultural arts auditorium, immediately across from Barnes Road." },
  { name: "Kempinski Gold Coast Hotel", category: "hospitality" as any, distanceMinutes: 3, description: "Luxury 5-star lodging, ideal for international clients and high-scale corporate events." },
  { name: "Supreme Court Complex", category: "government", distanceMinutes: 5, description: "The heart of judicial services, legal consultations, and governmental ministries." },
  { name: "Kotoka International Airport", category: "transit", distanceMinutes: 18, description: "Main international gateway, directly accessible via the Liberation Road freeway pipeline." }
];

// Amenities definitions
export const AMENITIES_DATA: AmenitySpec[] = [
  {
    id: "garden",
    name: "Central Courtyard Garden",
    tagline: "Eco-Friendly Open-Air Oasis",
    size: "3,000 m²",
    capacity: "Up to 1,500 guests",
    highlight: "Ghana's premier open-air modular lawn for high-society corporate banquets, concerts, private events, and open-sky cocktail galas.",
    details: [
      "Lush manicured grass and stone-paved surrounding alleys",
      "Integrated electrical conduits for stage production",
      "Professional acoustics and sound-containment architecture",
      "Beautiful evening ambient led uplighting"
    ],
    iconName: "Trees"
  },
  {
    id: "helipad",
    name: "Rooftop Commercial Helipad",
    tagline: "Ghana's Pioneer Urban Air Gateway",
    size: "Standard Air Terminal",
    capacity: "VIP Exclusive Access",
    highlight: "Conquer traffic loops. Land directly on Barnes Road via private helicopter transfers from the airport or gold coast regions.",
    details: [
      "Civil Aviation approved technical landing safety features",
      "Dedicated high-security glass elevator linking lobby to helideck",
      "Secure executive lounge and weather radar center",
      "Night flight approach landing beacons"
    ],
    iconName: "Navigation"
  },
  {
    id: "parking",
    name: "Underground Sub-Level Parking",
    tagline: "Unrivaled Parking Density",
    size: "3 underground levels",
    capacity: "1,500 secure spaces",
    highlight: "Accra Central's largest secure vehicle hub, completely shielded from weather conditions and congested streets.",
    details: [
      "Automated electronic RFID number plate and guest barcode scanner",
      "24/7 high-definition camera tracking on all parking boxes",
      "Internal climate-control vents and smoke-exhaust infrastructure",
      "Direct elevator connections to all major office lifts"
    ],
    iconName: "ParkingCircle"
  },
  {
    id: "gym",
    name: "Apex Corporate Gym & Wellness Centre",
    tagline: "Peak Physical Performance On-Site",
    size: "500 m² Suite",
    capacity: "24/7 keycard access for tenants",
    highlight: "High-tier cardiovascular workout systems, luxury steam rooms, and expert personal coaches available all day.",
    details: [
      "Premium Technogym selectorized equipment lines",
      "Acoustical flooring to isolate weights impact noise",
      "Locker facilities, rain-showers, and nutritious juice bar",
      "Exclusive group fitness classes for busy executives"
    ],
    iconName: "Dumbbell"
  }
];
