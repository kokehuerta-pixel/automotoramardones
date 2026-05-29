'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Gauge,
  Fuel,
  Users,
  ChevronDown,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Mail,
  Menu,
  X,
  CheckCircle2,
  DollarSign,
  Award,
  ShieldCheck,
  ThumbsUp,
  Star,
  Sparkles,
  Building,
  ArrowRight,
  Plus
} from 'lucide-react';

// --- BASE DE DATOS LOCAL (JSON) ---
interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  originalPrice: number;
  type: string;
  fuel: string;
  transmission: string;
  kms: number;
  images: string[];
}

const VEHICLES_DATABASE: Vehicle[] = [
  {
    "id": 1,
    "brand": "PEUGEOT",
    "model": "2008",
    "year": 2024,
    "price": 15500000,
    "originalPrice": 15500000,
    "type": "SUV",
    "fuel": "Diesel",
    "transmission": "Manual",
    "kms": 12000,
    "images": [
      "https://automotoramardones.cl/wp-content/uploads/2026/05/2008.jpeg"
    ]
  },
  {
    "id": 2,
    "brand": "FORD",
    "model": "EXPEDITION",
    "year": 2023,
    "price": 49500000,
    "originalPrice": 49500000,
    "type": "SUV",
    "fuel": "Bencina",
    "transmission": "Automática",
    "kms": 8500,
    "images": [
      "https://automotoramardones.cl/wp-content/uploads/2026/05/ford.jpeg"
    ]
  },
  {
    "id": 3,
    "brand": "KIA",
    "model": "MORNING",
    "year": 2018,
    "price": 7500000,
    "originalPrice": 7500000,
    "type": "Hatchback",
    "fuel": "Bencina",
    "transmission": "Manual",
    "kms": 54000,
    "images": [
      "https://automotoramardones.cl/wp-content/uploads/2026/05/kia.jpeg"
    ]
  },
  {
    "id": 4,
    "brand": "MAZDA",
    "model": "3",
    "year": 2022,
    "price": 13900000,
    "originalPrice": 13900000,
    "type": "Sedán",
    "fuel": "Bencina",
    "transmission": "Manual",
    "kms": 21000,
    "images": [
      "https://automotoramardones.cl/wp-content/uploads/2026/05/mazda-1.jpeg"
    ]
  },
  {
    "id": 5,
    "brand": "MERCEDES BENZ",
    "model": "A200",
    "year": 2024,
    "price": 28000000,
    "originalPrice": 28000000,
    "type": "Hatchback",
    "fuel": "Bencina",
    "transmission": "Automática",
    "kms": 4000,
    "images": [
      "https://automotoramardones.cl/wp-content/uploads/2026/05/mercedes.jpeg"
    ]
  },
  {
    "id": 6,
    "brand": "NISSAN",
    "model": "NAVARA",
    "year": 2022,
    "price": 17900000,
    "originalPrice": 17900000,
    "type": "Camioneta",
    "fuel": "Diesel",
    "transmission": "Manual",
    "kms": 43000,
    "images": [
      "https://automotoramardones.cl/wp-content/uploads/2026/05/nissan.jpeg"
    ]
  },
  {
    "id": 7,
    "brand": "CHERY",
    "model": "TIGGO 8 PRO",
    "year": 2021,
    "price": 12500000,
    "originalPrice": 12500000,
    "type": "SUV",
    "fuel": "Bencina",
    "transmission": "Automática",
    "kms": 39000,
    "images": [
      "https://automotoramardones.cl/wp-content/uploads/2026/04/chery.jpeg"
    ]
  },
  {
    "id": 8,
    "brand": "SUZUKI",
    "model": "ALTO",
    "year": 2018,
    "price": 4800000,
    "originalPrice": 5200000,
    "type": "Hatchback",
    "fuel": "Bencina",
    "transmission": "Manual",
    "kms": 67000,
    "images": [
      "https://automotoramardones.cl/wp-content/uploads/2026/03/SUZUKI-ALTO.jpeg"
    ]
  },
  {
    "id": 9,
    "brand": "MAXUS",
    "model": "T60",
    "year": 2022,
    "price": 10900000,
    "originalPrice": 10900000,
    "type": "Camioneta",
    "fuel": "Diesel",
    "transmission": "Manual",
    "kms": 48000,
    "images": [
      "https://automotoramardones.cl/wp-content/uploads/2026/05/t60.jpeg"
    ]
  },
  {
    "id": 10,
    "brand": "TOYOTA",
    "model": "RAV4",
    "year": 2019,
    "price": 16500000,
    "originalPrice": 16500000,
    "type": "SUV",
    "fuel": "Bencina",
    "transmission": "Manual",
    "kms": 78000,
    "images": [
      "https://automotoramardones.cl/wp-content/uploads/2025/11/TOYOTA-RAV4.jpeg"
    ]
  }
];

export default function Home() {
  // Mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Search & Filters State
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedFuel, setSelectedFuel] = useState('Todos');

  // Interactive dynamic simulator inside vehicle cards
  const [simulatedPiePercs, setSimulatedPiePercs] = useState<{ [key: number]: number }>({});

  // Credit Pre-approval form states
  const [formName, setFormName] = useState('');
  const [formRut, setFormRut] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('+56 9 ');
  const [formInterestVehicle, setFormInterestVehicle] = useState('General');
  const [formPie, setFormPie] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // FAQS Accordion state
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Fallback state for broken image URLs (from scrapers)
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  // Effect to track scroll and update navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format currencies appropriately (e.g. $15.500.000)
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Chilean RUT Formatting
  const formatRut = (value: string) => {
    // Clean non-alphanumerics
    const clean = value.replace(/[^0-9kK]/g, '');
    if (clean.length === 0) return '';
    if (clean.length === 1) return clean.toUpperCase();
    
    // Split body and dv
    const dv = clean.slice(-1).toUpperCase();
    const body = clean.slice(0, -1);
    
    // Pattern body with dots
    let formattedBody = '';
    const reversed = body.split('').reverse().join('');
    for (let i = 0; i < reversed.length; i++) {
      if (i > 0 && i % 3 === 0) {
        formattedBody = '.' + formattedBody;
      }
      formattedBody = reversed[i] + formattedBody;
    }
    
    return `${formattedBody}-${dv}`;
  };

  const handleRutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const clean = raw.replace(/[^0-9kK]/g, '');
    if (clean.length <= 9) {
      setFormRut(formatRut(clean));
    }
  };

  // Simple RUT validation helper
  const validateRut = (rut: string): boolean => {
    const clean = rut.replace(/[^0-9kK]/g, '');
    if (clean.length < 8) return false;
    const body = clean.slice(0, -1);
    const dv = clean.slice(-1).toUpperCase();
    
    let sum = 0;
    let multiplier = 2;
    for (let i = body.length - 1; i >= 0; i--) {
      sum += parseInt(body[i]) * multiplier;
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }
    
    const expectedDv = 11 - (sum % 11);
    let expectedDvStr = '';
    if (expectedDv === 11) expectedDvStr = '0';
    else if (expectedDv === 10) expectedDvStr = 'K';
    else expectedDvStr = expectedDv.toString();
    
    return dv === expectedDvStr;
  };

  // Standard Form Submission validator
  const handleCreditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!formName.trim() || formName.trim().length < 4) {
      errors.name = 'Por favor, ingresa tu nombre completo.';
    }

    if (!validateRut(formRut)) {
      errors.rut = 'Por favor, ingresa un RUT válido (ej: 12.345.678-K).';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formEmail)) {
      errors.email = 'Por favor, ingresa un correo electrónico válido.';
    }

    // Must be +569 followed by 8 numbers or similar
    const cleanPhone = formPhone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 9) {
      errors.phone = 'Por favor, ingresa un número de teléfono válido de 9 dígitos.';
    }

    if (!formPie || isNaN(Number(formPie.replace(/[^0-9]/g, ''))) || Number(formPie.replace(/[^0-9]/g, '')) < 0) {
      errors.pie = 'Por favor, ingresa un monto válido de pie.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setFormSuccess(true);
    
    // Save locally for persistence mock
    const submissions = JSON.parse(localStorage.getItem('cre_submissions') || '[]');
    submissions.push({
      name: formName,
      rut: formRut,
      email: formEmail,
      phone: formPhone,
      vehicle: formInterestVehicle,
      pie: formPie,
      date: new Date().toISOString()
    });
    localStorage.setItem('cre_submissions', JSON.stringify(submissions));

    // Optional redirect after custom action
    setTimeout(() => {
      // Create Whatsapp link with customer data
      const message = `Hola Automotora Mardones, completé mi solicitud de pre-aprobación:\n- Nombre: ${formName}\n- RUT: ${formRut}\n- Email: ${formEmail}\n- Teléfono: ${formPhone}\n- Auto de interés: ${formInterestVehicle}\n- Mi Pie: ${formPie}`;
      window.open(`https://wa.me/56961927870?text=${encodeURIComponent(message)}`, '_blank');
    }, 2000);
  };

  const handleSetVehicleInterest = (modelName: string) => {
    setFormInterestVehicle(modelName);
    const element = document.getElementById('financiamiento');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter vehicles through user text input, car type, and fuel selections
  const filteredVehicles = useMemo(() => {
    return VEHICLES_DATABASE.filter((car) => {
      const brandMatch = car.brand.toLowerCase().includes(searchText.toLowerCase());
      const modelMatch = car.model.toLowerCase().includes(searchText.toLowerCase());
      const textMatch = brandMatch || modelMatch;

      const typeMatch = selectedType === 'Todos' || car.type.toLowerCase() === selectedType.toLowerCase();
      const fuelMatch = selectedFuel === 'Todos' || car.fuel.toLowerCase() === selectedFuel.toLowerCase();

      return textMatch && typeMatch && fuelMatch;
    });
  }, [searchText, selectedType, selectedFuel]);

  const handleResetFilters = () => {
    setSearchText('');
    setSelectedType('Todos');
    setSelectedFuel('Todos');
  };

  // Toggle FAQ entries
  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // FAQS list
  const faqs = [
    {
      q: '¿Qué requisitos necesito para financiar un vehículo?',
      a: 'Los requisitos básicos de las financieras locales (como Santander Consumer o Amicar) incluyen: Ser mayor de 21 años, contar con un buen historial financiero (sin DICOM), tener al menos 1 año de antigüedad laboral contratado o declaraciones de renta para independientes, y contar con un pie mínimo desde el 20%. Con un pie del 40% o superior, la probabilidad de aprobación express sin validación estricta de renta aumenta exponencialmente.'
    },
    {
      q: '¿Puedo entregar mi auto actual en parte de pago?',
      a: '¡Sí, por supuesto! En Automotora Mardones recibimos tu vehículo actual como parte de pago. Evaluamos tu auto de manera justa, rápida y al mejor valor comercial de Rancagua, y dicho valor se abona directamente al pie de tu nuevo vehículo.'
    },
    {
      q: '¿Cómo funciona el servicio de Consignación de vehículos?',
      a: 'Si quieres vender tu vehículo de forma profesional sin complicaciones, nos lo dejas en concesión. Nosotros nos encargamos de lavarlo, exhibirlo en nuestra sucursal de alta afluencia (San Martín #718), publicarlo en toda nuestra red fotográfica premium y plataformas de venta, gestionar las visitas de los interesados e incluso ofrecer financiamiento a los compradores. Todo esto con total seguridad jurídica y respaldado por nuestros 50 años de experiencia prestigiada.'
    },
    {
      q: '¿Cuál es el proceso de transferencia y origen de los autos?',
      a: 'Todos los vehículos de nuestra flota boutique pasan por un exhaustivo chequeo mecánico predictivo y legal de antecedentes (TAG, multas, prendas). Realizamos transferencias directas inmediatas en notaría o mediante plataformas digitales de alta confianza, asegurando que adquieras un vehículo transparente e impecable.'
    },
    {
      q: '¿Cuáles son los horarios de atención y formas de pago?',
      a: 'Atendemos presencialmente en San Martín #718 de Lunes a Viernes de 09:30 a 19:00 hrs y Sábados de 10:00 a 14:30 hrs. Aceptamos pagos con transferencia bancaria directa (vale vista), crédito automotriz pre-aprobado y tarjeta de crédito (Webpay transbank).'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col relative" id="inicio">
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-100 py-3' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <a href="#inicio" className="flex items-center space-x-2 shrink-0 transition-transform active:scale-95">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://automotoramardones.cl/wp/wp-content/uploads/2023/10/LOGO-HORIZONTAL.png" 
                alt="Automotora Mardones Logo" 
                className="h-10 sm:h-12 w-auto object-contain"
                onError={(e) => {
                  // Fallback logo in case of blocked source
                  (e.target as HTMLImageElement).src = '/LOGO-HORIZONTAL.png';
                }}
              />
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#catalogo" className="text-slate-700 hover:text-[#1B73E8] font-medium text-sm tracking-wide transition-colors">Stock</a>
              <a href="#financiamiento" className="text-slate-700 hover:text-[#1B73E8] font-medium text-sm tracking-wide transition-colors">Financiamiento</a>
              <a href="#consignacion" className="text-slate-700 hover:text-[#1B73E8] font-medium text-sm tracking-wide transition-colors">Dejar en Pago</a>
              <a href="#eeat" className="text-slate-700 hover:text-[#1B73E8] font-medium text-sm tracking-wide transition-colors">Nosotros</a>
              <a href="#contacto" className="text-slate-700 hover:text-[#1B73E8] font-medium text-sm tracking-wide transition-colors">Contacto</a>
            </div>

            {/* Header CTA & Toggle button */}
            <div className="flex items-center space-x-4">
              <a 
                href="tel:+56961927870" 
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B73E8] hover:bg-[#155fc2] text-white rounded-lg font-medium text-sm transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                id="cta-call"
              >
                <Phone className="w-4 h-4" />
                <span>Llamar ahora</span>
              </a>

              {/* Mobile hamburger button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#1B73E8] transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu container */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                <a 
                  href="#catalogo" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-[#1B73E8]"
                >
                  Stock Disponible
                </a>
                <a 
                  href="#financiamiento" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-[#1B73E8]"
                >
                  Financiamiento
                </a>
                <a 
                  href="#consignacion" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-[#1B73E8]"
                >
                  Recibimos Vehículo / Consignación
                </a>
                <a 
                  href="#eeat" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-[#1B73E8]"
                >
                  Sobre Nosotros
                </a>
                <a 
                  href="#contacto" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-800 hover:bg-slate-50 hover:text-[#1B73E8]"
                >
                  Preguntas y Ubicación
                </a>
                
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                  <a 
                    href="tel:+56961927870" 
                    className="flex justify-center items-center gap-2 w-full py-3 bg-[#1B73E8] text-white rounded-lg font-medium text-center hover:bg-[#155fc2] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Llamar ahora</span>
                  </a>
                  <a 
                    href="https://wa.me/56961927870" 
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-center items-center gap-2 w-full py-3 bg-[#25D366] text-white rounded-lg font-medium text-center hover:bg-[#20ba59] transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Directo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-tr from-[#FAFAF9] via-[#edf3fcf6] to-[#FAFAF9]" id="hero-sec">
        {/* Soft elegant ambient lighting spheres */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#1B73E8]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[0] right-[-10%] w-[600px] h-[600px] bg-[#4F6ACA]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold tracking-wider text-[#1B73E8] bg-blue-100/60 rounded-full w-fit uppercase">
                <Sparkles className="w-3.5 h-3.5" /> 50 AÑOS DE TRAYECTORIA BOUTIQUE
              </span>
              
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-display font-medium tracking-tight text-[#2A3039] uppercase leading-[0.9] drop-shadow-sm">
                Autos usados en Rancagua <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B73E8] to-[#4F6ACA]">
                  Automotora Mardones
                </span>
              </h1>

              <p className="font-body text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
                Seleccionamos rigurosamente los mejores vehículos seminuevos de la Región de O’Higgins. Calidad certificada, financiamiento inmediato con aprobación express y la confianza de tres generaciones que respaldan tu compra.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="#catalogo" 
                  className="px-8 py-4 bg-[#1B73E8] hover:bg-[#155fc2] text-white text-base font-semibold rounded-lg shadow-lg hover:shadow-[#1B73E8]/20 transition-all hover:-translate-y-0.5 text-center"
                >
                  Ver Catálogo
                </a>
                <a 
                  href="#financiamiento" 
                  className="px-8 py-4 bg-white hover:bg-slate-50 text-[#2A3039] border-2 border-slate-200 text-base font-semibold rounded-lg transition-all text-center hover:border-slate-300"
                >
                  Simular Financiamiento
                </a>
              </div>

              {/* Trust Metric list */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200/50 max-w-lg">
                <div>
                  <h4 className="text-2xl sm:text-3xl font-display font-bold text-[#2A3039]">+50</h4>
                  <p className="text-xs text-slate-500 font-medium font-body uppercase tracking-wider">Años de Calidad</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-display font-bold text-[#2A3039]">100%</h4>
                  <p className="text-xs text-slate-500 font-medium font-body uppercase tracking-wider">Autos Revisados</p>
                </div>
                <div>
                  <h4 className="text-2xl sm:text-3xl font-display font-bold text-[#2A3039]">+10k</h4>
                  <p className="text-xs text-slate-500 font-medium font-body uppercase tracking-wider">Clientes Felices</p>
                </div>
              </div>
            </div>

            {/* Right Interactive Card Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl bg-white/70 backdrop-blur-md p-6 border border-white/40 shadow-xl overflow-hidden">
                {/* Visual Glassmorphism highlight */}
                <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-white/80 to-transparent pointer-events-none" />
                
                <h3 className="font-display text-4xl text-[#2A3039] font-semibold tracking-wide uppercase mb-4">
                  Buscador Inteligente
                </h3>
                <p className="text-xs text-slate-500 mb-6 font-body">
                  Usa nuestros filtros rápidos en tiempo real para encontrar el auto ideal para tu presupuesto.
                </p>

                {/* SEARCH INPUTS */}
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="Marca o modelo (ej: Peugeot, Ford)"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#1B73E8] focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-body">Tipo de Auto</label>
                      <div className="relative">
                        <select 
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-full appearance-none px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-body focus:outline-none focus:ring-2 focus:ring-[#1B73E8] transition-all"
                        >
                          <option>Todos</option>
                          <option>SUV</option>
                          <option>Camioneta</option>
                          <option>Hatchback</option>
                          <option>Sedán</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-4 h-4 w-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-body">Combustible</label>
                      <div className="relative">
                        <select 
                          value={selectedFuel}
                          onChange={(e) => setSelectedFuel(e.target.value)}
                          className="w-full appearance-none px-3.5 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-body focus:outline-none focus:ring-2 focus:ring-[#1B73E8] transition-all"
                        >
                          <option>Todos</option>
                          <option>Bencina</option>
                          <option>Diesel</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-4 h-4 w-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Quick Filters Reset */}
                  {(searchText !== '' || selectedType !== 'Todos' || selectedFuel !== 'Todos') && (
                    <button 
                      onClick={handleResetFilters}
                      className="w-full mt-2 text-xs text-center font-semibold text-[#1B73E8] hover:underline focus:outline-none py-1.5 transition-all text-body bg-blue-50/55 rounded-lg border border-blue-100/50"
                    >
                      Limpiar todos los filtros
                    </button>
                  )}

                  <a 
                    href="#catalogo"
                    className="flex justify-center items-center gap-2 w-full py-3.5 bg-[#2A3039] hover:bg-slate-800 text-white font-semibold rounded-lg text-sm transition-all shadow-md group mt-6"
                  >
                    <span>Ir a Resultados ({filteredVehicles.length})</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- STOCK CATALOGUE SECTION (STOCK GRID) --- */}
      <section className="py-20 bg-[#FAFAF9]" id="catalogo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <span className="text-sm font-bold text-[#4F6ACA] tracking-widest font-body uppercase bg-indigo-50 px-2.5 py-1 rounded inline-block">CONCESIONARIO BOUTIQUE</span>
              <h2 className="text-4xl sm:text-6xl font-display font-medium text-[#2A3039] uppercase tracking-wide leading-none">
                Encuentra tu próximo vehículo usado en Rancagua
              </h2>
              <p className="font-body text-slate-500 text-sm max-w-2xl leading-relaxed">
                Cada uno de nuestros vehículos ha sido seleccionado rigurosamente y cuenta con certificación mecánica, legal y estética.
              </p>
            </div>
            {/* Live Counter */}
            <div className="shrink-0 bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm h-fit">
              <span className="text-xs text-slate-400 font-semibold block uppercase font-body">STOCK DISPONIBLE</span>
              <span className="text-2xl font-bold text-[#111827]">{filteredVehicles.length} {filteredVehicles.length === 1 ? 'Auto filtrado' : 'Autos filtrados'}</span>
            </div>
          </div>

          {/* ACTIVE FILTER PREVIEW BOX */}
          {(searchText !== '' || selectedType !== 'Todos' || selectedFuel !== 'Todos') && (
            <div className="mb-8 flex flex-wrap items-center gap-3 bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <span className="text-xs font-semibold text-slate-500 font-body uppercase">Filtros Activos:</span>
              {searchText !== '' && (
                <span className="inline-flex items-center gap-1 bg-white border border-slate-200 px-3 py-1 rounded-full text-xs text-slate-700 font-medium">
                  Búsqueda: &quot;{searchText}&quot;
                  <button onClick={() => setSearchText('')} className="hover:bg-slate-100 p-0.5 rounded-full"><X className="w-3 h-3 text-slate-400 hover:text-red-500" /></button>
                </span>
              )}
              {selectedType !== 'Todos' && (
                <span className="inline-flex items-center gap-1 bg-white border border-slate-200 px-3 py-1 rounded-full text-xs text-slate-700 font-medium">
                  Tipo: {selectedType}
                  <button onClick={() => setSelectedType('Todos')} className="hover:bg-slate-100 p-0.5 rounded-full"><X className="w-3 h-3 text-slate-400 hover:text-red-500" /></button>
                </span>
              )}
              {selectedFuel !== 'Todos' && (
                <span className="inline-flex items-center gap-1 bg-white border border-slate-200 px-3 py-1 rounded-full text-xs text-slate-700 font-medium">
                  Combustible: {selectedFuel}
                  <button onClick={() => setSelectedFuel('Todos')} className="hover:bg-slate-100 p-0.5 rounded-full"><X className="w-3 h-3 text-slate-400 hover:text-red-500" /></button>
                </span>
              )}
              <button 
                onClick={handleResetFilters}
                className="text-xs text-red-500 font-bold hover:underline ml-auto font-body"
              >
                Limpiar Todo
              </button>
            </div>
          )}

          {/* CATALOGUE GRID */}
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredVehicles.map((car) => {
                const hasDiscount = car.price < car.originalPrice;
                const activePercentage = simulatedPiePercs[car.id] !== undefined ? simulatedPiePercs[car.id] : 20;
                const simulatedPieValue = car.price * (activePercentage / 100);

                return (
                  <div 
                    key={car.id} 
                    className="vehicle-card flex flex-col bg-white border border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#1B73E8]/20 hover:-translate-y-1 transition-all duration-300"
                  >
                    
                    {/* Image Area with Badge & fallback */}
                    <div className="relative aspect-video w-full bg-slate-100 overflow-hidden group">
                      
                      {/* High-quality Badges */}
                      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                        <span className="px-2 py-0.5 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold tracking-wider uppercase rounded">
                          {car.type}
                        </span>
                        {hasDiscount && (
                          <span className="px-2 py-0.5 bg-[#DC2626] text-white text-[10px] font-semibold tracking-wider uppercase rounded flex items-center gap-1 shadow-sm">
                            <Sparkles className="w-2.5 h-2.5" /> Gran Oferta
                          </span>
                        )}
                      </div>

                      <span className="absolute top-3 right-3 z-10 px-2 py-0.5 bg-white/95 backdrop-blur-xs text-slate-800 text-[10px] font-bold tracking-wider uppercase rounded shadow-sm border border-slate-100">
                        {car.transmission}
                      </span>

                      {/* Main Image Renderer */}
                      {!imageErrors[car.id] ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img 
                          src={car.images[0]} 
                          alt={`${car.brand} ${car.model}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          onError={() => {
                            setImageErrors(prev => ({ ...prev, [car.id]: true }));
                          }}
                        />
                      ) : (
                        // Stunning graphic fallback visual when scrape URL is denied/offline
                        <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center p-4 relative text-center">
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#2A3039] to-[#4F6ACA]/40 opacity-50" />
                          <div className="relative z-10 text-white space-y-1">
                            <h4 className="font-display text-2xl tracking-wider font-bold text-blue-400">{car.brand}</h4>
                            <p className="font-body text-xs text-slate-300 font-medium uppercase tracking-widest">{car.model} ({car.year})</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-[#1B73E8] text-[9px] font-semibold tracking-widest uppercase rounded">IMAGEN DISPONIBLE EN SALA</span>
                          </div>
                        </div>
                      )}

                    </div>

                    {/* Content Details Area */}
                    <div className="p-5 flex flex-col flex-grow">
                      
                      {/* Title & badge */}
                      <div className="mb-2">
                        <span className="text-[10px] font-bold text-[#4F6ACA] tracking-widest font-body uppercase">{car.brand}</span>
                        <h3 className="font-display text-3xl font-semibold text-[#2A3039] tracking-wide uppercase leading-tight">
                          {car.brand} {car.model}
                        </h3>
                      </div>

                      {/* Quick Tech Specs list */}
                      <div className="grid grid-cols-2 gap-y-2 gap-x-4 border-b border-slate-100 pb-3 mb-4 text-xs font-body text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>Año: <strong>{car.year}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Gauge className="w-3.5 h-3.5 text-slate-400" />
                          <span>Kms: <strong>{car.kms.toLocaleString('es-CL')}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2">
                          <Fuel className="w-3.5 h-3.5 text-slate-400" />
                          <span>Combustible: <strong>{car.fuel}</strong></span>
                        </div>
                      </div>

                      {/* Pricing block */}
                      <div className="mb-5 bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                        <div className="flex items-baseline">
                          {hasDiscount && (
                            <span className="text-sm font-semibold text-[#DC2626] line-through mr-2.5 font-body">
                              {formatPrice(car.originalPrice)}
                            </span>
                          )}
                          <span className="text-2xl font-bold text-[#111827] font-body">
                            {formatPrice(car.price)}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-semibold font-body tracking-wider uppercase mt-1">Precio de lista transferencia/crédito</p>
                      </div>

                      {/* MINI CALCUPAD - DYNAMIC PIE SIMULATOR (Con un sutil control interactivo) */}
                      <div className="space-y-3 pt-1 pb-4 mb-4 border-t border-dashed border-slate-200">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-[#2A3039] font-body uppercase tracking-wider">Simulador de Pie</span>
                          <span className="text-xs font-bold text-[#1B73E8] bg-blue-50 px-2 py-0.5 rounded font-body">{activePercentage}% Pie ({formatPrice(simulatedPieValue)})</span>
                        </div>

                        {/* Slide Selector Controls */}
                        <div className="flex gap-2.5">
                          {[20, 30, 40].map((perc) => (
                            <button
                              key={perc}
                              type="button"
                              onClick={() => {
                                setSimulatedPiePercs(prev => ({ ...prev, [car.id]: perc }));
                              }}
                              className={`flex-1 text-[11px] font-bold py-1.5 rounded transition-all font-body ${
                                activePercentage === perc
                                  ? 'bg-[#1B73E8] text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/85'
                              }`}
                            >
                              {perc}%
                            </button>
                          ))}
                        </div>

                        {/* Calculated fields representation */}
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-body text-slate-500">
                          <div className="bg-[#FAFAF9] p-2 rounded border border-slate-100">
                            <span className="text-[9px] text-slate-400 uppercase font-semibold block">Pie Mínimo 20%</span>
                            <span className="font-bold text-slate-700 block">{formatPrice(car.price * 0.2)}</span>
                          </div>
                          <div className="bg-[#FAFAF9] p-2 rounded border border-slate-100">
                            <span className="text-[9px] text-[#4F6ACA] uppercase font-semibold block">Pie Preferente 40%</span>
                            <span className="font-bold text-[#4F6ACA] block">{formatPrice(car.price * 0.4)}</span>
                          </div>
                        </div>
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="space-y-2 mt-auto">
                        <a 
                          href={`https://wa.me/56961927870?text=${encodeURIComponent(
                            `Hola, me interesa cotizar el ${car.brand} ${car.model} ${car.year} por ${formatPrice(car.price)} que vi en su sitio web.`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex justify-center items-center gap-2 w-full py-3 bg-[#1B73E8] hover:bg-[#155fc2] text-white font-semibold rounded-lg text-sm transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                          id={`cotizar-wa-${car.id}`}
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>Cotizar por WhatsApp</span>
                        </a>

                        <button 
                          onClick={() => handleSetVehicleInterest(`${car.brand} ${car.model} (${car.year})`)}
                          style={{ cursor: 'pointer' }}
                          className="flex justify-center items-center gap-1.5 w-full py-2 bg-transparent hover:bg-slate-50 text-slate-700 hover:text-[#1B73E8] border border-slate-200 font-semibold rounded-lg text-xs transition-all"
                        >
                          <span>Simular Financiamiento Directo</span>
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Elegant search status alert
            <div className="max-w-md mx-auto py-16 text-center space-y-4">
              <div className="inline-flex p-4 bg-slate-100 rounded-full text-slate-400 mb-2">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="font-display text-3xl font-semibold text-[#2A3039] uppercase">No hay unidades encontradas</h3>
              <p className="font-body text-slate-500 text-sm">
                No pudimos encontrar vehículos que coincidan exactamente con tu búsqueda en este momento. Intenta modificando los filtros de tipo o combustible.
              </p>
              <button 
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-[#1C1F2E] hover:bg-slate-800 text-white rounded-lg font-semibold text-xs transition-all font-body"
              >
                Ver Todo el Stock
              </button>
            </div>
          )}

        </div>
      </section>

      {/* --- FINANCING AREA SECTION (ID `#financiamiento`) --- */}
      <section className="py-20 bg-gradient-to-tr from-[#FAFAF9] via-[#edf3fcf6] to-[#FAFAF9] border-t border-b border-slate-100 relative" id="financiamiento">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1B73E8]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Requisitos & Info */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#1B73E8] tracking-widest font-body uppercase bg-blue-50 px-2.5 py-1 rounded inline-block">APROBACIÓN EXPRÉS</span>
                <h2 className="text-4xl sm:text-6xl font-display font-medium text-[#2A3039] uppercase tracking-wide leading-none">
                  Financiamiento Automotriz a tu Medida
                </h2>
                <h3 className="text-xl sm:text-2xl font-body font-bold text-[#4F6ACA] mt-2">
                  Cotiza con Pie Mínimo desde el 20%
                </h3>
                <p className="font-body text-slate-600 text-sm leading-relaxed max-w-xl">
                  En Automotora Mardones trabajamos codo a codo con las principales entidades financieras automotrices del país para conseguirte opciones competitivas de crédito inmediato.
                </p>
              </div>

              {/* Requirements box */}
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-md space-y-4">
                <h3 className="text-lg font-bold text-[#2A3039] flex items-center gap-2 font-body">
                  <Award className="w-5 h-5 text-[#1B73E8]" /> Requisitos para tu Crédito Automotriz
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-800 font-body uppercase">Edad Requerida</h5>
                      <p className="text-[11px] text-slate-500">Mayor de 21 años, hasta 75 años.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-800 font-body uppercase">Historial Financiero</h5>
                      <p className="text-[11px] text-slate-500">Sin registros vigentes en DICOM.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-800 font-body uppercase">Antigüedad Laboral</h5>
                      <p className="text-[11px] text-slate-500">Mínimo 1 año (12 liquidaciones de sueldo) o 2 últimos años para independientes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-800 font-body uppercase">Nivel de Pie</h5>
                      <p className="text-[11px] text-slate-500">Pie mínimo 20%. Recomendamos 40% para una pre-aprobación rápida sin validaciones pesadas.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Allies List */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-slate-400 font-body tracking-wider uppercase">Con el respaldo de las mejores financieras prestigiadas</span>
                <div className="grid grid-cols-4 gap-4 items-center">
                  {['Santander Consumer', 'Forum', 'Autofin', 'Amicar'].map((alliance) => {
                    return (
                      <div key={alliance} className="bg-white/50 border border-slate-200/50 rounded-lg p-3 text-center flex items-center justify-center font-body text-xs text-slate-500 font-bold tracking-tight shadow-2xs">
                        {alliance}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Preapproval Form */}
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2.5 h-full bg-[#1B73E8]" />
              
              <h4 className="font-display text-3xl text-[#2A3039] uppercase tracking-wide mb-2">Simular Pre-Aprobación</h4>
              <p className="text-xs text-slate-400 mb-6 font-body">Ingresa tus datos verídicos para ser evaluado de forma automatizada por nuestro motor en Rancagua.</p>

              {formSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="font-display text-3xl font-semibold text-slate-800 uppercase">¡Solicitud Procesada!</h4>
                  <p className="font-body text-slate-600 text-sm max-w-md mx-auto">
                    Tu solicitud ha sido transmitida exitosamente. Un ejecutivo experto de Automotora Mardones te enviará las simulaciones personalizadas a tu WhatsApp en menos de 15 minutos en horario hábil.
                  </p>
                  <p className="font-mono text-[10px] text-slate-400">Redirigiendo a WhatsApp directo...</p>
                  <button 
                    onClick={() => setFormSuccess(false)}
                    className="mt-6 text-xs text-[#1B73E8] font-bold underline focus:outline-none"
                  >
                    Hacer otra simulación
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleCreditSubmit} className="space-y-4 font-body">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Nombre Completo</label>
                      <input 
                        type="text" 
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Ej: Juan Pérez"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B73E8]"
                      />
                      {formErrors.name && <span className="text-[10px] text-red-500 font-medium block">{formErrors.name}</span>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">RUT Chileno</label>
                      <input 
                        type="text" 
                        required
                        value={formRut}
                        onChange={handleRutChange}
                        placeholder="Ej: 12.345.678-K"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B73E8]"
                      />
                      {formErrors.rut && <span className="text-[10px] text-red-500 font-medium block">{formErrors.rut}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Correo Electrónico</label>
                      <input 
                        type="email" 
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="ejemplo@correo.cl"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B73E8]"
                      />
                      {formErrors.email && <span className="text-[10px] text-red-500 font-medium block">{formErrors.email}</span>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">WhatsApp / Teléfono</label>
                      <input 
                        type="tel" 
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+56 9 1234 5678"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B73E8]"
                      />
                      {formErrors.phone && <span className="text-[10px] text-red-500 font-medium block">{formErrors.phone}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Vehículo de Interés</label>
                      <div className="relative">
                        <select 
                          value={formInterestVehicle}
                          onChange={(e) => setFormInterestVehicle(e.target.value)}
                          className="w-full appearance-none px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B73E8]"
                        >
                          <option value="General">General / Todavía no me decido</option>
                          {VEHICLES_DATABASE.map(car => (
                            <option key={car.id} value={`${car.brand} ${car.model} (${car.year})`}>
                              {car.brand} {car.model} ({car.year}) — {formatPrice(car.price)}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Monto de Pie Disponible ($)</label>
                      <input 
                        type="text" 
                        required
                        value={formPie}
                        onChange={(e) => {
                          const clean = e.target.value.replace(/[^0-9]/g, '');
                          setFormPie(clean ? Number(clean).toLocaleString('es-CL') : '');
                        }}
                        placeholder="Ej: 3.500.000"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B73E8]"
                      />
                      {formErrors.pie && <span className="text-[10px] text-red-500 font-medium block">{formErrors.pie}</span>}
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      style={{ cursor: 'pointer' }}
                      className="w-full py-4 bg-[#1B73E8] hover:bg-[#155fc2] text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all text-sm uppercase tracking-wide flex justify-center items-center gap-2"
                    >
                      <span>Enviar Solicitud de Crédito</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[10px] text-center text-slate-400 font-semibold uppercase tracking-wider mt-3">Al presionar autorizas la evaluación inicial automática de tu perfil comercial de forma segura.</p>
                  </div>

                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* --- TRADE-IN / CONSIGNMENT SECTION (ID `#consignacion`) --- */}
      <section className="py-20 bg-white" id="consignacion">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-sm font-bold text-[#4F6ACA] tracking-widest font-body uppercase bg-indigo-50 px-2.5 py-1 rounded inline-block">VENTA AGIL Y SEGURA</span>
              <h2 className="text-4xl sm:text-6xl font-display font-medium text-[#2A3039] uppercase tracking-wide leading-none">
                Recibimos tu Vehículo en Parte de Pago
              </h2>
              <p className="font-body text-slate-600 text-sm leading-relaxed">
                ¿Buscas renovar o vender tu auto actual sin dolor de cabeza? En Automotora Mardones te garantizamos una tasación completamente transparente, segura e inmediata en Rancagua.
              </p>
              
              <div className="space-y-3">
                <div className="bg-[#FAFAF9] p-4 rounded-xl border border-slate-100 flex gap-3">
                  <span className="w-7 h-7 bg-blue-100 text-[#1B73E8] font-bold text-xs flex items-center justify-center rounded-lg font-body shrink-0 mt-0.5">01</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 font-body uppercase">Consignación Profesional</h4>
                    <p className="text-[11px] text-slate-500 leading-normal">Exhibimos tu vehículo en nuestra sucursal de alto tráfico física y en toda nuestra red publicitaria premium gratis.</p>
                  </div>
                </div>

                <div className="bg-[#FAFAF9] p-4 rounded-xl border border-slate-100 flex gap-3">
                  <span className="w-7 h-7 bg-blue-100 text-[#1B73E8] font-bold text-xs flex items-center justify-center rounded-lg font-body shrink-0 mt-0.5">02</span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 font-body uppercase">Retoma Inmediata</h4>
                    <p className="text-[11px] text-slate-500 leading-normal">Valorizamos tu unidad actual y la abonamos de forma inmediata al pie de tu nuevo auto en minutos.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href={`https://wa.me/56961927870?text=${encodeURIComponent(
                    'Hola, me gustaría recibir una cotización previa y cotizar de forma exprés la tasación de mi vehículo para dejarlo en parte de pago.'
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#2A3039] hover:bg-slate-800 text-white rounded-lg font-semibold text-sm transition-all shadow-md group"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Tasación Exprés por WhatsApp</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right Graphic representations of process */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="bg-gradient-to-tr from-[#FAFAF9] to-slate-50 border border-slate-100 p-6 rounded-xl flex flex-col space-y-4">
                <span className="text-xl font-bold text-[#1B73E8] font-body">X1</span>
                <h3 className="font-display text-2xl font-semibold text-slate-800 uppercase tracking-wide">Evaluación Express</h3>
                <p className="text-xs text-slate-500 font-body leading-relaxed">Envíanos las especificaciones de tu vehículo, kilometraje y fotos por chat. Realizamos una precalificación preliminar.</p>
              </div>

              <div className="bg-gradient-to-tr from-[#FAFAF9] to-slate-50 border border-slate-100 p-6 rounded-xl flex flex-col space-y-4">
                <span className="text-xl font-bold text-[#1B73E8] font-body">X2</span>
                <h3 className="font-display text-2xl font-semibold text-slate-800 uppercase tracking-wide">Chequeo Técnico</h3>
                <p className="text-xs text-slate-500 font-body leading-relaxed">Agenda una rápida cita en la sucursal de San Martín #718 para validar el estado estético y del motor.</p>
              </div>

              <div className="bg-gradient-to-tr from-[#FAFAF9] to-slate-50 border border-slate-100 p-6 rounded-xl flex flex-col space-y-4">
                <span className="text-xl font-bold text-[#1B73E8] font-body">X3</span>
                <h3 className="font-display text-2xl font-semibold text-slate-800 uppercase tracking-wide">Pago / Abono</h3>
                <p className="text-xs text-slate-500 font-body leading-relaxed">Cerramos el trato de compraventa directo en notaría legal, depositándote por transferencia o sumándolo a tu pie.</p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* --- TRUST & E-E-A-T AREA SECTION (ID `eeat`) --- */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-[#FAFAF9]" id="eeat">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center space-y-3 mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-[#1B73E8] tracking-widest font-body uppercase bg-blue-50 px-2.5 py-1 rounded inline-block">EXPERIENCIA COMPROBADA</span>
            <h2 className="text-4xl sm:text-6xl font-display font-medium text-[#2A3039] uppercase tracking-wide leading-none">
              ¿Por qué elegir Automotora Mardones?
            </h2>
            <p className="font-body text-slate-500 text-sm leading-relaxed">
              Fundado en Rancagua, nuestro concesionario boutique combina tradición, legalidad incorruptible y una atención personalizada que trasciende los portales masificados.
            </p>
          </div>

          {/* Grid of values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs flex flex-col space-y-3.5">
              <div className="w-12 h-12 bg-blue-50 text-[#1B73E8] rounded-xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-medium text-slate-800 uppercase tracking-wide">Legalidad 100% Garantizada</h3>
              <p className="text-xs text-slate-500 font-body leading-relaxed">Venta transparente de origen. Todos nuestros vehículos cuentan con Autofact limpio actualizado, libres de multas, prendas o restricciones.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs flex flex-col space-y-3.5">
              <div className="w-12 h-12 bg-blue-50 text-[#1B73E8] rounded-xl flex items-center justify-center shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-medium text-slate-800 uppercase tracking-wide">Certificación de Mecánica</h3>
              <p className="text-xs text-slate-500 font-body leading-relaxed">Cada vehículo es auditado minuciosamente previniendo desgaste prematuro, garantizando un coche seguro para tu familia.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-xs flex flex-col space-y-3.5">
              <div className="w-12 h-12 bg-blue-50 text-[#1B73E8] rounded-xl flex items-center justify-center shrink-0">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-medium text-slate-800 uppercase tracking-wide">Tradición Familiar Local</h3>
              <p className="text-xs text-slate-500 font-body leading-relaxed">50 años de permanencia en el corazón de Rancagua nos posicionan como el concesionario de mayor lealtad regional.</p>
            </div>

          </div>

          {/* ASESORES DE VENTA (VIRTUAL EQUIPO) */}
          <div className="border-t border-slate-200/50 pt-16">
            <h3 className="font-display text-3.5xl text-[#2A3039] font-medium tracking-wide uppercase text-center mb-10">
              Chatea Directo con nuestro Equipo
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { name: 'Francisco Leiva', role: 'Asesor Especialista', phone: '56961927870' },
                { name: 'Alejandro Perez', role: 'Ejecutivo Financiero', phone: '56961927870' },
                { name: 'Carlos Condell', role: 'Atención e Ingresos', phone: '56961927870' }
              ].map((member, i) => {
                return (
                  <div key={member.name} className="bg-white border border-slate-100 rounded-xl p-5 shadow-xs text-center flex flex-col space-y-4">
                    {/* Placeholder Premium Rounded Avatar using localized initials */}
                    <div className="w-14 h-14 bg-[#2A3039] text-white font-display text-3xl font-extrabold flex items-center justify-center rounded-full mx-auto shadow-inner">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 font-body">{member.name}</h4>
                      <p className="text-[10px] text-[#4F6ACA] font-semibold uppercase tracking-widest font-body">{member.role}</p>
                    </div>
                    
                    <a 
                      href={`https://wa.me/${member.phone}?text=${encodeURIComponent(
                        `Hola ${member.name.split(' ')[0]}, me gustaría que me asesores con la compra de un vehículo que vi en su sitio web.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex justify-center items-center gap-1.5 py-2 px-4 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#1B73E8] border border-slate-100 hover:border-[#1B73E8]/20 text-xs font-bold rounded-lg transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chatear con {member.name.split(' ')[0]}</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SOCIAL REVIEWS SLIDER */}
          <div className="mt-20 border-t border-slate-200/50 pt-16">
            <h3 className="font-display text-3.5xl text-[#2A3039] font-medium tracking-wide uppercase text-center mb-12">
              Opiniones de nuestros Compradores
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  client: 'Verónica Miranda',
                  city: 'Rancagua',
                  quote: 'Excelente servicio. Compré un SUV familiar y la gestión del financiamiento tomó menos de un par de horas. 100% recomendado.',
                  stars: 5
                },
                {
                  client: 'Ignacio Lobos',
                  city: 'Rancagua',
                  quote: 'Vendí mi camioneta en consignación en menos de 10 días al precio que acordamos de antemano. Gente seria y de mucha trayectoria en la región.',
                  stars: 5
                },
                {
                  client: 'Luciano',
                  city: 'Machalí',
                  quote: 'Muy buena atención de Carlos Condell. El auto impecable y transferido legalmente en el mismo día. Da gusto comprar en locales con esta historia.',
                  stars: 5
                }
              ].map((review, i) => {
                return (
                  <div key={review.client} className="bg-white border border-slate-100/80 rounded-xl p-6 shadow-xs relative flex flex-col space-y-4">
                    <div className="flex text-amber-500">
                      {Array.from({ length: review.stars }).map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-current text-yellow-400" />
                      ))}
                    </div>
                    
                    <p className="text-xs text-slate-600 font-body leading-relaxed italic">
                      &quot;{review.quote}&quot;
                    </p>

                    <div className="pt-2 border-t border-slate-50 mt-auto">
                      <h4 className="text-xs font-bold text-slate-800 font-body">{review.client}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold font-body uppercase">{review.city}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* --- FAQs & CONTACT SECTION (FAQ + MAP) --- */}
      <section className="py-20 bg-white border-t border-slate-100" id="contacto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: FAQs Accordion */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#1B73E8] tracking-widest font-body uppercase bg-blue-50 px-2.5 py-1 rounded inline-block">SOPORTE AL CLIENTE</span>
                <h2 className="text-4xl sm:text-5xl font-display font-medium text-[#2A3039] uppercase tracking-wide">
                  Preguntas Frecuentes
                </h2>
              </div>

              {/* Accordion container */}
              <div className="space-y-3 font-body">
                {faqs.map((faq, idx) => {
                  const isOpen = activeFaq === idx;
                  return (
                    <div 
                      key={idx} 
                      className="border border-slate-100 rounded-xl bg-[#FAFAF9] overflow-hidden transition-all duration-200"
                    >
                      <button 
                        onClick={() => toggleFaq(idx)}
                        className="w-full text-left px-5 py-4 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors focus:outline-none"
                      >
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transform transition-transform duration-250 ${isOpen ? 'rotate-180 text-[#1B73E8]' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="bg-[#FAFAF9] border-t border-slate-100/50 overflow-hidden"
                          >
                            <div className="px-5 py-4 text-xs text-slate-500 leading-relaxed font-body">
                              {faq.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Contact Details & Google Maps */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                <h3 className="font-display text-3xl text-slate-800 uppercase tracking-wide">Dirección e Información de Contacto</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-body text-slate-600">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-5 h-5 text-[#1B73E8] shrink-0" />
                    <div>
                      <h5 className="font-semibold text-slate-800 uppercase">Visítanos en Rancagua</h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">San Martín #718, Rancagua, Chile.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-5 h-5 text-[#1B73E8] shrink-0" />
                    <div>
                      <h5 className="font-semibold text-slate-800 uppercase">Horarios de Atención</h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">Lunes a Viernes: 09:30 - 19:00 hrs.<br />Sábado: 10:00 - 14:30 hrs.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Phone className="w-5 h-5 text-[#1B73E8] shrink-0" />
                    <div>
                      <h5 className="font-semibold text-slate-800 uppercase">Teléfonos Directos</h5>
                      <p className="text-[11px] text-[#1B73E8] font-bold mt-0.5"><a href="tel:722231841">Tel. Fijo: 722 231841</a><br /><a href="tel:+56961927870">WhatsApp: +56 9 6192 7870</a></p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Mail className="w-5 h-5 text-[#1B73E8] shrink-0" />
                    <div>
                      <h5 className="font-semibold text-slate-800 uppercase">Mails de Venta</h5>
                      <p className="text-[11px] text-slate-500 mt-0.5">ventas@automotoramardones.cl<br />rafaelmardonesc@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Google Maps iframe responsive integration */}
              <div className="rounded-xl border border-slate-200 overflow-hidden shadow-xs aspect-video w-full relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.7820087790847!2d-70.74239849999999!3d-34.1647468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96634316ae317fcb%3A0x6b72a96a32cb390f!2sSan%20Mart%C3%ADn%20718%2C%20Rancagua%2C%20O&#39;Higgins!5e0!3m2!1ses-419!2scl!4v1700000000000!5m2!1ses-419!2scl" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true}
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Física San Martín 718 Rancagua"
                />
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* --- FOOTER SITEMAP AREA & SOCIAL LINK CONEXION --- */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto font-body">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 text-xs">
            
            <div className="col-span-1 md:col-span-2 space-y-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://automotoramardones.cl/wp/wp-content/uploads/2023/10/LOGO-HORIZONTAL.png" 
                alt="Automotora Mardones Logo Footer" 
                className="h-10 w-auto object-contain brightness-0 invert"
              />
              <p className="max-w-md leading-relaxed text-slate-500 text-[11px]">
                Automotora Mardones cuenta con más de 50 años de prestigio impecable en la venta y consignación de vehículos seminuevos de alta calidad en la Región de O’Higgins. Confianza, velocidad y transacciones 100% transparentes.
              </p>
            </div>

            <div className="space-y-3">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Secciones</h5>
              <ul className="space-y-2">
                <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
                <li><a href="#catalogo" className="hover:text-white transition-colors">Catálogo de Stock</a></li>
                <li><a href="#financiamiento" className="hover:text-white transition-colors">Simulador de Financiamiento</a></li>
                <li><a href="#consignacion" className="hover:text-white transition-colors">Dejar en Parte de Pago</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px]">Redes Sociales</h5>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/automotora_mardones" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-slate-800 hover:bg-[#1B73E8] p-2.5 rounded-lg text-white hover:-translate-y-0.5 transition-all text-xs flex justify-center items-center font-bold"
                  aria-label="Instagram Automotora Mardones"
                >
                  IG
                </a>
                <a 
                  href="https://www.tiktok.com/@automotoramardones.cl" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="bg-slate-800 hover:bg-[#1B73E8] p-2.5 rounded-lg text-white hover:-translate-y-0.5 transition-all text-xs flex justify-center items-center font-bold"
                  aria-label="TikTok Automotora Mardones"
                >
                  TK
                </a>
              </div>
              <p className="text-[11px] text-slate-500">¿Tienes dudas rápidas? Escríbenos directamente y te daremos respuesta oportuna.</p>
            </div>

          </div>

          <div className="border-t border-slate-800 pt-8 text-center flex flex-col sm:flex-row justify-between text-[11px] text-slate-500 font-body">
            <p>© {new Date().getFullYear()} Automotora Mardones. Todos los derechos reservados. San Martín #718, Rancagua, Chile.</p>
            <p className="mt-2 sm:mt-0 font-semibold text-slate-600">Premium Single Page Client Portal</p>
          </div>

        </div>
      </footer>

    </div>
  );
}
