import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { useInView } from 'react-intersection-observer';
import 'swiper/css/bundle';
import { Satellite, Lock, MapPin, Bell, Shield, Building2, Users, Landmark, Globe, Menu, BarChart3, Globe2, Truck, Zap, DollarSign, Route, Wrench, AlertTriangle, X, Bus, Warehouse, Briefcase, Building, Factory, Ambulance, ShieldCheck, Plane } from 'lucide-react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  label: string;
}

const Counter: React.FC<CounterProps> = ({ end, duration = 2000, suffix = '', label }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / duration;

        if (progress < 1) {
          setCount(Math.floor(end * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [inView, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl font-bold text-white mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-blue-100">{label}</div>
    </div>
  );
};
interface IndustryModalProps {
  isOpen: boolean;
  onClose: () => void;
  industry: {
    title: string;
    description: string;
    features: string[];
    specializedFeatures: string[];
  };
}

const IndustryModal: React.FC<IndustryModalProps> = ({ isOpen, onClose, industry }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl overflow-hidden w-full max-w-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <industry.icon className="w-12 h-12 text-blue-600" />
            <div>
              <h3 className="text-3xl font-bold text-blue-950">{industry.title}</h3>
              <p className="text-gray-600 mt-1">Industry-specific solutions</p>
            </div>
          </div>
          
          <div className="aspect-[21/9] rounded-xl overflow-hidden mb-6">
            <img 
              src={industry.image} 
              alt={industry.title}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-gray-600 text-lg mb-8">{industry.description}</p>
          
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-blue-950 mb-4">Core Features</h4>
            <ul className="grid grid-cols-2 gap-3">
              {industry.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h4 className="text-xl font-semibold text-blue-950 mb-4">Specialized Solutions</h4>
            <ul className="grid grid-cols-2 gap-3">
              {industry.specializedFeatures.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
              Book A Free Demo
            </button>
            <button className="flex-1 px-6 py-3 bg-blue-50 text-blue-600 rounded-full font-semibold hover:bg-blue-100 transition-colors">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 w-full max-w-4xl aspect-video">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/90 hover:text-white z-10 p-2 bg-white/10 backdrop-blur rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
        <iframe
          src="https://www.youtube.com/embed/liGrUiykFW0?autoplay=1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

const heroSlides = [
  {
    title: "Global Satellite Coverage",
    description: "Track and manage your assets anywhere on Earth with our advanced satellite network",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80",
    icon: Satellite,
    features: [
      { icon: DollarSign, title: 'Expense Management', description: 'Optimize fuel costs and maintenance expenses' },
      { icon: Route, title: 'Route Optimization', description: 'AI-powered route planning for maximum efficiency' },
      { icon: AlertTriangle, title: 'Risk Management', description: 'Proactive risk assessment and mitigation' },
      { icon: Wrench, title: 'Maintenance Alerts', description: 'Real-time vehicle health monitoring' },
      { icon: Lock, title: 'Security', description: 'Military-grade asset protection' },
      { icon: Bell, title: 'Notifications', description: 'Instant alerts for critical events' },
      { icon: Globe2, title: 'Coverage', description: 'Global satellite network access' }
    ]
  },
  {
    title: "Offgrid Tracking",
    description: "Continue tracking your assets in remote areas with zero connectivity, even in the most challenging environments",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80",
    icon: MapPin,
    features: [
      { icon: Globe2, title: 'Global Coverage', description: 'Track assets anywhere on Earth' },
      { icon: Shield, title: 'Security', description: 'Military-grade asset protection' },
      { icon: Bell, title: 'Real-time Alerts', description: 'Instant notifications for critical events' },
      { icon: Satellite, title: 'Satellite Backup', description: 'Redundant communication systems' }
    ]
  },
  {
    title: "AI-Powered Predictive Maintenance",
    description: "Prevent breakdowns before they happen with our advanced AI analytics and predictive maintenance system",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80",
    icon: BarChart3,
    features: [
      { icon: BarChart3, title: 'AI Analytics', description: 'Advanced predictive maintenance' },
      { icon: Wrench, title: 'Smart Repairs', description: 'Automated maintenance scheduling' },
      { icon: Zap, title: 'Performance', description: 'Real-time performance monitoring' },
      { icon: Lock, title: 'Compliance', description: 'Automated compliance tracking' }
    ]
  }
];

const segments = [
  {
    icon: Users,
    title: 'Individuals',
    image: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&q=80',
  },
  {
    icon: Building2,
    title: 'Businesses',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
  },
  {
    icon: Landmark,
    title: 'Governments',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80',
  },
  {
    icon: Globe,
    title: 'International Orgs',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80',
  }
];

const industries = [
  {
    title: 'Logistics',
    icon: Truck,
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80',
    description: 'Optimize your fleet operations with real-time tracking and advanced analytics.',
    features: [
      'Real-time fleet tracking',
      'Route optimization',
      'Fuel monitoring',
      'Driver behavior analysis'
    ],
    specializedFeatures: [
      'Cross-border tracking',
      'Temperature monitoring',
      'Load optimization',
      'Customs documentation'
    ]
  },
  {
    title: 'Education',
    icon: Bus,
    image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&q=80',
    description: 'Ensure student safety with advanced school bus tracking and monitoring.',
    features: [
      'Real-time bus tracking',
      'Student attendance',
      'Route optimization',
      'Parent notifications'
    ],
    specializedFeatures: [
      'Emergency alerts',
      'Speed monitoring',
      'Student manifest',
      'Zone management'
    ]
  },
  {
    title: 'Healthcare',
    icon: Ambulance,
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80',
    description: 'Streamline medical transportation and equipment tracking for better patient care.',
    features: [
      'Emergency response',
      'Asset tracking',
      'Temperature monitoring',
      'Route optimization'
    ],
    specializedFeatures: [
      'Patient transport',
      'Equipment tracking',
      'Compliance reporting',
      'Emergency protocols'
    ]
  },
  {
    title: 'Security',
    icon: ShieldCheck,
    image: 'https://images.unsplash.com/photo-1454117096348-e4abbeba002c?auto=format&fit=crop&q=80',
    description: 'Enhance security operations with advanced vehicle and personnel tracking.',
    features: [
      'Real-time tracking',
      'Incident response',
      'Geofencing',
      'Alert management'
    ],
    specializedFeatures: [
      'Panic button',
      'Video integration',
      'Guard tracking',
      'Access control'
    ]
  },
  {
    title: 'Aviation',
    icon: Plane,
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80',
    description: 'Optimize ground support equipment and airport vehicle management.',
    features: [
      'GSE tracking',
      'Fuel monitoring',
      'Maintenance alerts',
      'Zone management'
    ],
    specializedFeatures: [
      'Runway operations',
      'De-icing tracking',
      'Baggage handling',
      'Staff management'
    ]
  },
  {
    title: 'Manufacturing',
    icon: Factory,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80',
    description: 'Enhance production efficiency with comprehensive asset tracking.',
    features: [
      'Equipment tracking',
      'Maintenance alerts',
      'Inventory tracking',
      'Production monitoring'
    ],
    specializedFeatures: [
      'Supply chain visibility',
      'Quality control',
      'Workflow automation',
      'Safety compliance'
    ]
  },
  {
    title: 'Construction',
    icon: Building,
    image: 'https://images.unsplash.com/photo-1485996463739-9cb09adbe6c5?auto=format&fit=crop&q=80',
    description: 'Track and manage construction equipment and vehicles efficiently.',
    features: [
      'Equipment tracking',
      'Utilization monitoring',
      'Maintenance alerts',
      'Site management'
    ],
    specializedFeatures: [
      'Project tracking',
      'Safety compliance',
      'Resource allocation',
      'Site security'
    ]
  },
  {
    title: 'Mining',
    icon: Warehouse,
    image: 'https://images.unsplash.com/photo-1523246224990-496e9a19113a?auto=format&fit=crop&q=80',
    description: 'Optimize mining operations with advanced vehicle and equipment tracking.',
    features: [
      'Vehicle tracking',
      'Equipment monitoring',
      'Safety alerts',
      'Production tracking'
    ],
    specializedFeatures: [
      'Underground tracking',
      'Environmental monitoring',
      'Worker safety',
      'Asset utilization'
    ]
  }
];

const features = [
  {
    icon: Satellite,
    title: 'Global Coverage',
    description: 'Satellite-based tracking ensures your fleet is monitored anywhere on Earth, independent of local cellular networks.'
  },
  {
    icon: Shield,
    title: 'Advanced Security',
    description: 'Military-grade encryption and secure satellite communications protect your fleet data.'
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Advanced telemetry and analytics provide instant insights into your fleet performance.'
  },
  {
    icon: Globe2,
    title: 'Worldwide Access',
    description: 'Access your fleet data from anywhere in the world through our secure cloud platform.'
  },
  {
    icon: Zap,
    title: 'Instant Alerts',
    description: 'Receive immediate notifications about vehicle status, maintenance needs, and security events.'
  },
  {
    icon: Truck,
    title: 'Fleet Optimization',
    description: 'AI-powered route optimization and predictive maintenance to maximize efficiency.'
  }
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => (
  <div 
    className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
  >
    <div className="absolute inset-0 bg-blue-950/90 backdrop-blur-lg">
      <div className="flex flex-col h-full p-6">
        <div className="flex justify-between items-center mb-8">
          <a href="/" className="flex items-center gap-3">
            <img src="https://zuoix.com/onsat/assets/logo1.png" alt="onSAT Logo" className="h-8 w-auto" />
            <span className="text-2xl font-bold text-white">onSAT</span>
          </a>
          <button 
            onClick={onClose}
            className="text-white p-2"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <nav className="flex-1">
          <div className="space-y-6">
            <button className="w-full text-left text-white/90 hover:text-white font-medium py-2">
              Solutions
            </button>
            <button className="w-full text-left text-white/90 hover:text-white font-medium py-2">
              Industries
            </button>
            <a href="#" className="block text-white/90 hover:text-white font-medium py-2">
              About
            </a>
            <a href="#" className="block text-white/90 hover:text-white font-medium py-2">
              Contact
            </a>
          </div>
        </nav>
        <a
          href="https://portal.myonsat.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-6 py-3 bg-white/10 backdrop-blur text-white rounded-full hover:bg-white/20 transition-colors font-medium border border-white/20 text-center"
        >
          Login
        </a>
      </div>
    </div>
  </div>
);

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState<typeof industries[0] | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('hero-section');
      if (heroSection) {
        const scrollPosition = window.scrollY;
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        setIsScrolled(scrollPosition > heroBottom - 80);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-blue-950">
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />

      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-blue-950/80 backdrop-blur-lg shadow-lg' : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="/" className="flex items-center gap-3">
              <img src="https://zuoix.com/onsat/assets/logo1.png" alt="onSAT Logo" className="h-8 w-auto" />
              <span className="text-2xl font-bold text-white">onSAT</span>
            </a>
            
            <div className="md:flex items-center gap-8 hidden">
              <div className="flex items-center gap-6">
                <div className="group relative">
                  <button 
                    className="flex items-center gap-2 text-white/90 hover:text-white font-medium"
                    aria-expanded="false"
                    aria-haspopup="true"
                    aria-label="Solutions menu"
                  >
                    Solutions <Menu className="w-4 h-4" />
                  </button>
                  <div className="hidden group-hover:block absolute top-[calc(100%-0.5rem)] -left-4 pt-2 w-[480px]">
                    <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-blue-100/50 p-6 w-[720px]">
                      <div className="grid grid-cols-3 gap-4">
                        <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors">
                          <Satellite className="w-6 h-6 text-blue-600 mt-1" />
                          <div>
                            <h3 className="font-medium text-blue-950">Asset Tracking</h3>
                            <p className="text-sm text-gray-600 mt-1">Real-time asset location and status monitoring</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors">
                          <Truck className="w-6 h-6 text-blue-600 mt-1" />
                          <div>
                            <h3 className="font-medium text-blue-950">Fleet Management</h3>
                            <p className="text-sm text-gray-600 mt-1">Complete fleet operations and optimization</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors">
                          <Shield className="w-6 h-6 text-blue-600 mt-1" />
                          <div>
                            <h3 className="font-medium text-blue-950">Security Solutions</h3>
                            <p className="text-sm text-gray-600 mt-1">Military-grade asset protection systems</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors">
                          <BarChart3 className="w-6 h-6 text-blue-600 mt-1" />
                          <div>
                            <h3 className="font-medium text-blue-950">Analytics & Reporting</h3>
                            <p className="text-sm text-gray-600 mt-1">Advanced data analytics and insights</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors">
                          <Zap className="w-6 h-6 text-blue-600 mt-1" />
                          <div>
                            <h3 className="font-medium text-blue-950">Remote Control</h3>
                            <p className="text-sm text-gray-600 mt-1">Remote vehicle immobilization and control</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors">
                          <Globe2 className="w-6 h-6 text-blue-600 mt-1" />
                          <div>
                            <h3 className="font-medium text-blue-950">Global Connectivity</h3>
                            <p className="text-sm text-gray-600 mt-1">Worldwide satellite and cellular coverage</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="group relative">
                  <button 
                    className="flex items-center gap-2 text-white/90 hover:text-white font-medium"
                    aria-expanded="false"
                    aria-haspopup="true"
                    aria-label="Industries menu"
                  >
                    Industries <Menu className="w-4 h-4" />
                  </button>
                  <div className="hidden group-hover:block absolute top-[calc(100%-0.5rem)] -left-4 pt-2 w-[480px]">
                    <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-blue-100/50 p-6 w-[720px]">
                      <div className="grid grid-cols-3 gap-4">
                        <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors">
                          <Truck className="w-6 h-6 text-blue-600 mt-1" />
                          <div>
                            <h3 className="font-medium text-blue-950">Logistics</h3>
                            <p className="text-sm text-gray-600 mt-1">Supply chain and transportation</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors">
                          <Building2 className="w-6 h-6 text-blue-600 mt-1" />
                          <div>
                            <h3 className="font-medium text-blue-950">Construction</h3>
                            <p className="text-sm text-gray-600 mt-1">Heavy equipment management</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors">
                          <Globe className="w-6 h-6 text-blue-600 mt-1" />
                          <div>
                            <h3 className="font-medium text-blue-950">Agriculture</h3>
                            <p className="text-sm text-gray-600 mt-1">Agricultural fleet tracking</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors">
                          <Landmark className="w-6 h-6 text-blue-600 mt-1" />
                          <div>
                            <h3 className="font-medium text-blue-950">Government</h3>
                            <p className="text-sm text-gray-600 mt-1">Public sector fleet management</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors">
                          <Building2 className="w-6 h-6 text-blue-600 mt-1" />
                          <div>
                            <h3 className="font-medium text-blue-950">Mining</h3>
                            <p className="text-sm text-gray-600 mt-1">Mining equipment tracking</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors">
                          <Users className="w-6 h-6 text-blue-600 mt-1" />
                          <div>
                            <h3 className="font-medium text-blue-950">NGOs</h3>
                            <p className="text-sm text-gray-600 mt-1">Humanitarian fleet solutions</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors">
                          <Building2 className="w-6 h-6 text-blue-600 mt-1" />
                          <div>
                            <h3 className="font-medium text-blue-950">Oil & Gas</h3>
                            <p className="text-sm text-gray-600 mt-1">Energy sector fleet tracking</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors">
                          <Building2 className="w-6 h-6 text-blue-600 mt-1" />
                          <div>
                            <h3 className="font-medium text-blue-950">Security</h3>
                            <p className="text-sm text-gray-600 mt-1">Security fleet management</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50/50 transition-colors">
                          <Building2 className="w-6 h-6 text-blue-600 mt-1" />
                          <div>
                            <h3 className="font-medium text-blue-950">Utilities</h3>
                            <p className="text-sm text-gray-600 mt-1">Utility vehicle tracking</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="#" className="text-white/90 hover:text-white font-medium">About</a>
                <a href="#" className="text-white/90 hover:text-white font-medium">Contact</a>
              </div>
              
              <a
                href="https://portal.myonsat.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-white/10 backdrop-blur text-white rounded-full hover:bg-white/20 transition-colors font-medium border border-white/20"
              >
                Login
              </a>
            </div>
            
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      {/* Hero Section */}
      <div id="hero-section" className="relative overflow-hidden h-screen group">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          speed={1500}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          fadeEffect={{
            crossFade: true
          }}
          loop={true}
          navigation={{
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next'
          }}
          className="h-full"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950/70 via-blue-950/40 to-transparent" />
                <div className="relative h-full flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-2xl pt-32 relative">
                      <h2 className="text-4xl font-bold text-white mb-6">{slide.title}</h2>
                      <p className="text-xl text-white/90 mb-8">
                        {slide.description}
                      </p>
                      <div className="flex gap-6">
                        <button className="group px-8 py-4 bg-blue-600/20 backdrop-blur text-white rounded-full font-semibold hover:bg-blue-600/30 transition-all duration-300 flex items-center gap-2 border border-blue-400/30">
                          Schedule Demo
                          <span className="w-6 h-6 rounded-full bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                            →
                          </span>
                        </button>
                        <button className="group px-8 py-4 bg-white/10 backdrop-blur text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 flex items-center gap-2">
                          Learn More
                          <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                            →
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="swiper-button-prev opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20">
          <span className="sr-only">Previous slide</span>
          ←
        </button>
        <button className="swiper-button-next opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20">
          <span className="sr-only">Next slide</span>
          →
        </button>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-blue-950/30 flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-blue-950/30 rounded-full" />
          </div>
        </div>
      </div>

      {/* Floating Segments Section */}
      <div className="absolute left-0 right-0 bottom-[-20%] z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {segments.map((segment, index) => (
              <div
                key={index}
                className="flip-card w-[290px] h-[400px] mx-auto"
              >
                <div className="flip-card-inner">
                  {/* Front of the card */}
                  <div className="flip-card-front rounded-2xl overflow-hidden">
                    <img
                      src={segment.image}
                      alt={segment.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 to-transparent" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <segment.icon className="w-8 h-8 text-blue-200 mb-3" />
                      <h3 className="text-2xl font-semibold text-white">{segment.title}</h3>
                    </div>
                  </div>
                  
                  {/* Back of the card */}
                  <div className="flip-card-back rounded-2xl overflow-hidden bg-blue-950 p-6 flex flex-col">
                    <div className="flex-1 flex flex-col justify-center">
                      <segment.icon className="w-12 h-12 text-blue-400 mb-6 mx-auto" />
                      <h3 className="text-2xl font-semibold text-white text-center mb-4">{segment.title}</h3>
                      <p className="text-blue-200 text-center mb-6">
                        {segment.title === 'Individuals' && 'Track your personal vehicles with military-grade security and real-time monitoring.'}
                        {segment.title === 'Businesses' && 'Optimize your fleet operations with AI-powered analytics and predictive maintenance.'}
                        {segment.title === 'Governments' && 'Secure and efficient management of government fleets with advanced tracking capabilities.'}
                        {segment.title === 'International Orgs' && 'Global fleet management solutions for international organizations operating worldwide.'}
                      </p>
                      <a
                        href="https://www.youtube.com/watch?v=liGrUiykFW0"
                        target="_blank"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsVideoModalOpen(true);
                        }}
                        className="inline-flex items-center justify-center gap-2 bg-blue-600/20 backdrop-blur text-white px-6 py-3 rounded-full hover:bg-blue-600/30 transition-colors mx-auto border border-blue-400/30"
                      >
                        Watch Video
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 6.82001V17.18C8 17.97 8.87 18.45 9.54 18.02L17.68 12.84C18.3 12.45 18.3 11.55 17.68 11.15L9.54 5.98001C8.87 5.55001 8 6.03001 8 6.82001Z" fill="currentColor"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* As Seen On Section */}
      <div className="py-16 bg-blue-50 mt-[calc(20%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600 mb-8">AS SEEN ON</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-70">
            <img src="https://download.logo.wine/logo/CNN/CNN-Logo.wine.png" alt="CNN" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/BBC_Logo_2021.svg/2560px-BBC_Logo_2021.svg.png" alt="BBC" className="h-6" />
            <img src="https://logos-world.net/wp-content/uploads/2023/03/Canal-Logo.png" alt="Canal+" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Deutsche_Welle_Logo.svg/2560px-Deutsche_Welle_Logo.svg.png" alt="DW" className="h-8" />
            <img src="https://static.wikia.nocookie.net/logopedia/images/9/9b/Africanews_old_slogan.png" alt="AfricaNews" className="h-6" />
          </div>
        </div>
      </div>

      {/* Industries Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4 text-blue-950">Industries We Serve</h2>
            <p className="text-xl text-gray-600">Tailored fleet management solutions that address the unique challenges of your industry</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {industries.map((industry, index) => {
              const Icon = industry.icon;
              return (
              <div
                key={index}
                className="group overflow-hidden rounded-2xl cursor-pointer transform hover:-translate-y-1 transition-all duration-300 bg-white border border-gray-100 shadow-sm hover:shadow-lg"
                onClick={() => setSelectedIndustry(industry)}
              >
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                    <h3 className="text-2xl font-semibold text-blue-950">{industry.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{industry.description}</p>
                  <div className="flex items-center text-blue-600 font-medium">
                    Explore more
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>

      {selectedIndustry && (
        <IndustryModal
          isOpen={true}
          onClose={() => setSelectedIndustry(null)}
          industry={selectedIndustry}
        />
      )}

      {/* Stats Section */}
      <div className="relative py-24 bg-blue-600 overflow-hidden" id="stats">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80"
            alt="Space background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/95 to-blue-600/90" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Global Impact</h2>
            <p className="text-xl text-blue-100">Our reach and performance in numbers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <Counter end={1} suffix="M+" label="Connected Vehicles" />
            <Counter end={50} suffix="+" label="Countries Served" />
            <Counter end={99.9} suffix="%" label="Uptime Guarantee" />
            <Counter end={30} suffix="%" label="Fuel Savings" />
          </div>
        </div>
      </div>

      {/* Why onSAT Section */}
      <div className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation]}
            effect="fade"
            speed={1000}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
            }}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next'
            }}
            onSlideChange={(swiper) => {
              const dots = document.querySelectorAll('.feature-dot');
              dots.forEach((dot, index) => {
                if (index === swiper.realIndex) {
                  dot.classList.add('w-8', 'bg-blue-600');
                  dot.classList.remove('bg-gray-300');
                } else {
                  dot.classList.remove('w-8', 'bg-blue-600');
                  dot.classList.add('bg-gray-300');
                }
              });
            }}
            fadeEffect={{
              crossFade: true
            }}
            loop={true}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Global Satellite Coverage */}
            <SwiperSlide>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[600px]">
                  <img 
                    src="https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&q=80" 
                    alt="Global Coverage"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-12 lg:p-16 flex flex-col justify-center bg-white">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-8">
                    <Globe2 className="w-4 h-4" />
                    Feature 1/8
                  </div>
                  <h3 className="text-4xl font-bold text-blue-950 mb-6">Global Satellite Coverage</h3>
                  <p className="text-gray-600 text-lg mb-8">
                    Track and manage your fleet anywhere on Earth with our advanced satellite network. 
                    Industry-leading coverage ensures your assets are always connected, from urban centers 
                    to the most remote locations.
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-blue-600 font-semibold group w-fit">
                    Learn More
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </SwiperSlide>

            {/* Off-Grid Tracking */}
            <SwiperSlide>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[600px]">
                  <img 
                    src="https://www.shutterstock.com/image-photo/tabuk-saudi-arabia-trucks-driving-600nw-2490288965.jpg" 
                    alt="Off-Grid Tracking"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-12 lg:p-16 flex flex-col justify-center bg-white">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-8">
                    <Satellite className="w-4 h-4" />
                    Feature 2/8
                  </div>
                  <h3 className="text-4xl font-bold text-blue-950 mb-6">Off-Grid Tracking</h3>
                  <p className="text-gray-600 text-lg mb-8">
                    Never lose track of your assets, even in remote locations. Our hybrid tracking system combines 
                    satellite and cellular networks to maintain continuous coverage. Includes store-and-forward 
                    technology for areas with intermittent connectivity.
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-blue-600 font-semibold group w-fit">
                    Learn More
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </SwiperSlide>

            {/* Remote Immobilization */}
            <SwiperSlide>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[600px]">
                  <img 
                    src="https://gaadiwaadi.com/wp-content/uploads/2019/03/Hyundai-Venue-SUV-To-Offer-First-in-segment-Remote-Immobilisation-e1554012340541.jpg" 
                    alt="Remote Control"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-12 lg:p-16 flex flex-col justify-center bg-white">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-8">
                    <Lock className="w-4 h-4" />
                    Feature 3/8
                  </div>
                  <h3 className="text-4xl font-bold text-blue-950 mb-6">Remote Immobilization</h3>
                  <p className="text-gray-600 text-lg mb-8">
                    Take control of your assets from anywhere with military-grade security protocols. 
                    Instantly disable vehicles in case of theft or unauthorized use, ensuring only 
                    authorized personnel can access these controls.
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-blue-600 font-semibold group w-fit">
                    Learn More
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </SwiperSlide>

            {/* AI Analytics */}
            <SwiperSlide>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[600px]">
                  <img 
                    src="https://specials-images.forbesimg.com/imageserve/66ac6eff276498743b6dbcd8/960x0.jpg" 
                    alt="AI Analytics"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-12 lg:p-16 flex flex-col justify-center bg-white">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-8">
                    <BarChart3 className="w-4 h-4" />
                    Feature 4/8
                  </div>
                  <h3 className="text-4xl font-bold text-blue-950 mb-6">AI-Powered Analytics</h3>
                  <p className="text-gray-600 text-lg mb-8">
                    Transform raw data into actionable insights with our advanced AI analytics. 
                    Optimize routes, predict maintenance needs, and identify cost-saving opportunities 
                    automatically.
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-blue-600 font-semibold group w-fit">
                    Learn More
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </SwiperSlide>

            {/* Real-time Alerts */}
            <SwiperSlide>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[600px]">
                  <img 
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80" 
                    alt="Real-time Alerts"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-12 lg:p-16 flex flex-col justify-center bg-white">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-8">
                    <Bell className="w-4 h-4" />
                    Feature 5/8
                  </div>
                  <h3 className="text-4xl font-bold text-blue-950 mb-6">Real-time Alerts</h3>
                  <p className="text-gray-600 text-lg mb-8">
                    Stay informed with instant notifications about critical events. From security alerts 
                    to maintenance reminders, never miss important updates about your fleet.
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-blue-600 font-semibold group w-fit">
                    Learn More
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </SwiperSlide>

            {/* Predictive Maintenance */}
            <SwiperSlide>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[600px]">
                  <img 
                    src="https://media.licdn.com/dms/image/v2/D4E12AQFvOquPU8-sQA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1696429886535?e=2147483647&v=beta&t=gvLfdpDvKA51ffF6bZZKgPnzcERk-x0tKRvDYus684E" 
                    alt="Predictive Maintenance"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-12 lg:p-16 flex flex-col justify-center bg-white">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-8">
                    <Wrench className="w-4 h-4" />
                    Feature 6/8
                  </div>
                  <h3 className="text-4xl font-bold text-blue-950 mb-6">Predictive Maintenance</h3>
                  <p className="text-gray-600 text-lg mb-8">
                    Prevent breakdowns before they happen with AI-driven maintenance predictions. 
                    Monitor vehicle health in real-time and schedule maintenance at the optimal time.
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-blue-600 font-semibold group w-fit">
                    Learn More
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </SwiperSlide>

            {/* Route Optimization */}
            <SwiperSlide>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[600px]">
                  <img 
                    src="https://images.unsplash.com/photo-1647427017067-8f33ccbae493?auto=format&fit=crop&q=80" 
                    alt="Route Optimization"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-12 lg:p-16 flex flex-col justify-center bg-white">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-8">
                    <Route className="w-4 h-4" />
                    Feature 7/8
                  </div>
                  <h3 className="text-4xl font-bold text-blue-950 mb-6">Route Optimization</h3>
                  <p className="text-gray-600 text-lg mb-8">
                    Maximize efficiency with AI-powered route planning. Consider traffic, weather, and 
                    vehicle-specific parameters to find the most efficient routes for your fleet.
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-blue-600 font-semibold group w-fit">
                    Learn More
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </SwiperSlide>

            {/* Fuel Management */}
            <SwiperSlide>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-[600px]">
                  <img 
                    src="https://5.imimg.com/data5/SELLER/Default/2022/3/JK/AX/GG/12073430/fuel-monitoring-system-for-trucks.jpg" 
                    alt="Fuel Management"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-12 lg:p-16 flex flex-col justify-center bg-white">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-sm font-medium mb-8">
                    <DollarSign className="w-4 h-4" />
                    Feature 8/8
                  </div>
                  <h3 className="text-4xl font-bold text-blue-950 mb-6">Fuel Management</h3>
                  <p className="text-gray-600 text-lg mb-8">
                    Reduce fuel costs with advanced consumption monitoring and analysis. Track fuel usage, 
                    detect theft, and identify opportunities for improved efficiency.
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 text-blue-600 font-semibold group w-fit">
                    Learn More
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          
          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(8)].map((_, i) => (
              <button
                key={i}
                className={`feature-dot w-2 h-2 rounded-full transition-all ${i === 0 ? 'w-8 bg-blue-600' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => {
                  const swiper = document.querySelector('.swiper')?.swiper;
                  if (swiper) {
                    swiper.slideTo(i);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80"
            alt="Satellite background"
            className="w-full h-full object-cover opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/95" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-blue-950">Ready to Transform Your Fleet Management?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the future of fleet management with onSAT™'s advanced satellite technology.
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-4 bg-blue-950 text-white rounded-full text-lg font-semibold hover:bg-blue-900 transition-all duration-300">
              Contact Sales
            </button>
            <button className="px-8 py-4 bg-blue-100 backdrop-blur rounded-full text-lg font-semibold hover:bg-blue-200 transition-all duration-300 text-blue-950">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;