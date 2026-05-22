import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import StoryBanner from "./components/StoryBanner";
import {
  Phone,
  Heart,
  Shield,
  Instagram,
  MapPin,
  Sparkles,
  Clock,
  CheckCircle2,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Award,
  ShieldCheck,
  FileDown,
  Check,
  Briefcase,
  Info,
  Sliders,
  DollarSign,
  Car
} from "lucide-react";

// Image paths generated previously
const HERO_IMAGE_PATH = "/src/assets/images/hero_pet_travel_1779480808070.png";
const ABOUT_IMAGE_PATH = "/src/assets/images/new_about_pet_taxi_1779485759079.png";

export function TaxiCaoLogo({ className = "h-12 w-auto", iconOnly = false, lightText = false }) {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      {/* Handcrafted Vector Logo Icon with fully transparent background */}
      <svg
        viewBox="0 0 280 200"
        className="h-10 sm:h-12 w-auto select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cat & Dog Silhouette Drawing */}
        <g stroke="#2A1B18" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
          {/* Whiskers (Left side) */}
          <path d="M 12 125 L 28 125" />
          <path d="M 11 137 L 27 135" />
          <path d="M 13 149 L 28 145" />

          {/* Cat contour path (Ears and cheeks) */}
          <path d="M 36 158 C 32 145, 32 110, 42 100 C 50 90, 62 82, 75 82 C 85 82, 95 102, 104 105 C 113 102, 123 72, 136 72 C 148 72, 156 98, 162 108" />
          
          {/* Cat Eyes */}
          <ellipse cx="70" cy="118" rx="4" ry="5.5" fill="#2A1B18" stroke="none" />
          <ellipse cx="108" cy="118" rx="4" ry="5.5" fill="#2A1B18" stroke="none" />
          
          {/* Cat Mouth "w" */}
          <path d="M 82 128 Q 86 133, 89 128 Q 92 133, 96 128" strokeWidth="7" />

          {/* Floppy Ear of the Dog */}
          <path d="M 156 118 C 152 82, 168 74, 178 94 C 183 109, 179 122, 175 140 C 172 152, 169 162, 167 172" />
          
          {/* Dog Head outline & snout */}
          <path d="M 173 115 C 190 95, 212 95, 223 106 Q 238 118, 242 124 C 245 128, 245 134, 236 135 C 228 136, 215 137, 205 137" />

          {/* Dog Eye */}
          <ellipse cx="196" cy="115" rx="4" ry="5.5" fill="#2A1B18" stroke="none" />

          {/* Dog Smile Mouth and Tongue */}
          <path d="M 190 138 Q 214 162, 229 148" strokeWidth="8" />
          {/* Dog Tongue */}
          <path d="M 213 148 C 218 163, 225 163, 227 149" fill="#FF7A30" stroke="#2A1B18" strokeWidth="6" />

          {/* Solid Black Nose */}
          <path d="M 228 123 C 238 121, 244 121, 244 130 C 244 138, 236 138, 226 134 Z" fill="#2A1B18" stroke="#2A1B18" strokeWidth="2" />
        </g>

        {/* Floating Turquoise Heart */}
        <path
          d="M 134 48 C 127 38, 116 38, 116 48 C 116 55, 134 68, 134 68 C 134 68, 152 55, 152 48 C 152 38, 141 38, 134 48 Z"
          fill="#06B6D4"
          stroke="#06B6D4"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>

      {!iconOnly && (
        <div className="flex flex-col select-none">
          <span className={`text-xl font-display font-black tracking-tight flex items-center leading-none ${lightText ? "text-white" : "text-brand-dark"}`}>
            Táxi<span className="text-brand-orange">Cão</span>
          </span>
          <span className="text-[10px] font-bold text-brand-turquoise tracking-wider uppercase mt-1 leading-none font-sans">
            Peludo Viajante
          </span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Sticky glassmorphism header on scroll
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Budget Estimator State
  const [petSize, setPetSize] = useState("médio"); // "pequeno / gato", "médio", "grande"
  const [serviceType, setServiceType] = useState("leva_traz"); // "leva_traz", "viagem", "aeroporto"
  const [distance, setDistance] = useState(15); // in km
  const [estimatedValue, setEstimatedValue] = useState(0);

  // Recalculate fare
  useEffect(() => {
    let basePrice = 0;
    let kmRate = 0;

    switch (serviceType) {
      case "leva_traz":
        basePrice = 35;
        break;
      case "viagem":
        basePrice = 80;
        break;
      case "aeroporto":
        basePrice = 110;
        break;
    }

    switch (petSize) {
      case "pequeno / gato":
        kmRate = 2.4;
        break;
      case "médio":
        kmRate = 3.0;
        break;
      case "grande":
        kmRate = 3.8;
        break;
    }

    const total = basePrice + distance * kmRate;
    setEstimatedValue(Number(total.toFixed(2)));
  }, [petSize, serviceType, distance]);

  // Generating custom WhatsApp deep link for the estimator
  const formattedPhone = "3288292264";
  const whatsappBaseUrl = `https://wa.me/55${formattedPhone}`;
  
  const getWhatsAppMessageLink = (type: "general" | "estimator" | "contact", customData?: any) => {
    if (type === "estimator") {
      const sizeText = petSize.toUpperCase();
      const serviceText = 
        serviceType === "leva_traz" ? "Leva e Traz (Veterinário/Creche/Tosa)" :
        serviceType === "viagem" ? "Viagem Longa/Férias" : "Aeroporto / Eventos Especiais";
      
      const message = `Olá! Vi o simulador do Táxi Cão e gostaria de solicitar um agendamento:\n\n` +
                      `🐾 *Tipo de Pet:* ${sizeText}\n` +
                      `🗺️ *Serviço:* ${serviceText}\n` +
                      `📍 *Distância aproximada:* ${distance} km\n` +
                      `💵 *Estimativa prévia:* R$ ${estimatedValue}\n\n` +
                      `Poderia confirmar a disponibilidade de data e horário? Obrigado!`;
      return `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
    }
    
    if (type === "contact") {
      const message = `Olá Táxi Cão! Enviei uma mensagem pelo formulário do site e gostaria de agendar uma conversa sobre o transporte do meu amiguinho.`;
      return `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
    }

    // Default general link
    const defaultMessage = "Olá, Táxi Cão! Gostaria de tirar dúvidas ou fazer um orçamento para transportar meu pet de forma segura.";
    return `${whatsappBaseUrl}?text=${encodeURIComponent(defaultMessage)}`;
  };

  // Testimonial Carousel State
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      id: 1,
      name: "Mariana Santos",
      pet: "Pipoca (Spitz Alemão 🐶)",
      quote: "O Táxi Cão salvou minha rotina! O Pipoca vai super tranquilo para as consultas veterinárias e volta cheiroso do banho e tosa. O motorista envia fotos no caminho, o que me deixa totalmente em paz!",
      rating: 5,
      avatarBg: "bg-orange-100 text-brand-orange"
    },
    {
      id: 2,
      name: "Rodrigo Mello",
      pet: "Luna (Golden Retriever 🦮)",
      quote: "Fizemos uma viagem intermunicipal de São Paulo para Juiz de Fora. A Luna foi tratada como uma verdadeira rainha! Carro climatizado perfeito, paradas programadas para esticar as pernas, água fresca e muito carinho.",
      rating: 5,
      avatarBg: "bg-cyan-100 text-brand-turquoise"
    },
    {
      id: 3,
      name: "Juliana Lima",
      pet: "Garfield (Gato Persa 🐱)",
      quote: "Quem tem gato sabe como o transporte é estressante. O Táxi Cão tem uma paciência cirúrgica e cabines super aconchegantes. O Garfield não deu sequer um miado de pânico. Recomendo de olhos fechados!",
      rating: 5,
      avatarBg: "bg-amber-100 text-amber-700"
    }
  ];

  // FAQ State (accordions)
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({
    0: true, // first open by default
  });
  const toggleFaq = (index: number) => {
    setFaqOpen((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const faqs = [
    {
      question: "Quais são as medidas de segurança adotadas nos veículos?",
      answer: "Nossos veículos transportam os pets com todo o carinho e segurança na cabine, diretamente no banco de trás, acomodados em assentos com capas protetoras higienizáveis especiais, cintos de segurança pet testados ou cabines/caixas confortáveis afixadas no próprio banco traseiro — 100% livre de isolá-los em porta-malas ou bagageiros escuros. Além disso, monitoramos a temperatura com ar condicionado digital em tempo integral."
    },
    {
      question: "Posso acompanhar a viagem do meu pet em tempo real?",
      answer: "Com certeza! Essa é a nossa prioridade. Durante todo o percurso, o motorista ou acompanhante envia atualizações contínuas de localização por GPS, além de fotos e vídeos espontâneos via WhatsApp diretamente para o tutor."
    },
    {
      question: "É realizada a higienização dos carros entre as viagens?",
      answer: "Sim! Após cada corrida, o veículo e as caixas de transporte passam por uma desinfecção profunda e higienização rigorosa. Utilizamos produtos de padrão veterinário, 100% livres de toxinas e seguros para o olfato sensível de cães e gatos."
    },
    {
      question: "O tutor pode ir como acompanhante na viagem?",
      answer: "Sim! Oferecemos com prazer uma vaga gratuita no banco de passageiros para o tutor que queira acompanhar o seu peludo em qualquer percurso (Veterinário, Mudanças, Viagens ou Aeroportos)."
    }
  ];

  // Contact Form State
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    petName: "",
    mensagem: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API storage/send
    setSubmitted(true);
    setTimeout(() => {
      // open whatsapp or just show feedback
    }, 1000);
  };

  // Helper function to download single file HTML version
  const downloadSingleFileHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Táxi Cão - Peludo Viajante | Transporte Pet Profissional</title>
    <!-- Google Fonts Poppins & Outfit -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS CDN (v3.4.1) for reliable static rendering -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Poppins', 'sans-serif'],
                        display: ['Outfit', 'sans-serif'],
                    },
                    colors: {
                        brand: {
                            orange: '#FF7A30',
                            orangeDark: '#E25E12',
                            orangeLight: '#FFECE2',
                            turquoise: '#06B6D4',
                            turquoiseDark: '#0891B2',
                            cream: '#FFFBF7',
                            sand: '#F7EFE5',
                            dark: '#2A1B18',
                        }
                    }
                }
            }
        }
    </script>
    <style>
        html { scroll-behavior: smooth; }
        body { background-color: #FFFBF7; color: #2A1B18; font-family: 'Poppins', sans-serif; }
    </style>
</head>
<body class="bg-brand-cream">

    <!-- NAVBAR -->
    <header class="fixed top-0 left-0 w-full z-50 bg-white/45 backdrop-blur-md border-b border-orange-100/30 shadow-sm transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <a href="#inicio" class="flex items-center gap-2">
                <!-- Gorgeous Vector Logo Icon with fully transparent background -->
                <svg viewBox="0 0 280 200" class="h-12 w-auto select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g stroke="#2A1B18" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M 12 125 L 28 125" />
                        <path d="M 11 137 L 27 135" />
                        <path d="M 13 149 L 28 145" />
                        <path d="M 36 158 C 32 145, 32 110, 42 100 C 50 90, 62 82, 75 82 C 85 82, 95 102, 104 105 C 113 102, 123 72, 136 72 C 148 72, 156 98, 162 108" />
                        <ellipse cx="70" cy="118" rx="4" ry="5.5" fill="#2A1B18" stroke="none" />
                        <ellipse cx="108" cy="118" rx="4" ry="5.5" fill="#2A1B18" stroke="none" />
                        <path d="M 82 128 Q 86 133, 89 128 Q 92 133, 96 128" stroke-width="7" />
                        <path d="M 156 118 C 152 82, 168 74, 178 94 C 183 109, 179 122, 175 140 C 172 152, 169 162, 167 172" />
                        <path d="M 173 115 C 190 95, 212 95, 223 106 Q 238 118, 242 124 C 245 128, 245 134, 236 135 C 228 136, 215 137, 205 137" />
                        <ellipse cx="196" cy="115" rx="4" ry="5.5" fill="#2A1B18" stroke="none" />
                        <path d="M 190 138 Q 214 162, 229 148" stroke-width="8" />
                        <path d="M 213 148 C 218 163, 225 163, 227 149" fill="#FF7A30" stroke="#2A1B18" stroke-width="6" />
                        <path d="M 228 123 C 238 121, 244 121, 244 130 C 244 138, 236 138, 226 134 Z" fill="#2A1B18" stroke="#2A1B18" stroke-width="2" />
                    </g>
                    <path d="M 134 48 C 127 38, 116 38, 116 48 C 116 55, 134 68, 134 68 C 134 68, 152 55, 152 48 C 152 38, 141 38, 134 48 Z" fill="#06B6D4" stroke="#06B6D4" stroke-width="3" stroke-linejoin="round" />
                </svg>
                <div class="flex flex-col">
                    <span class="text-xl font-display font-black text-brand-dark tracking-tight flex items-center leading-none">
                        Táxi<span class="text-brand-orange">Cão</span>
                    </span>
                    <span class="text-[10px] font-bold text-brand-turquoise tracking-wider uppercase mt-1 leading-none font-sans">
                        Peludo Viajante
                    </span>
                </div>
            </a>
            
            <nav class="hidden md:flex items-center gap-3 lg:gap-6 xl:gap-8 text-xs lg:text-sm mr-4 lg:mr-8">
                <a href="#inicio" class="text-brand-orange hover:text-brand-dark font-semibold transition-colors">Início</a>
                <a href="#sobre" class="text-brand-orange hover:text-brand-dark font-semibold transition-colors">Sobre Nós</a>
                <a href="#servicos" class="text-brand-orange hover:text-brand-dark font-semibold transition-colors">Serviços</a>
                <a href="#diferenciais" class="text-brand-orange hover:text-brand-dark font-semibold transition-colors">Diferenciais</a>
                <a href="#depoimentos" class="text-brand-orange hover:text-brand-dark font-semibold transition-colors">Depoimentos</a>
                <a href="#contato" class="text-brand-orange hover:text-brand-dark font-semibold transition-colors">Contato</a>
            </nav>

            <a href="${getWhatsAppMessageLink("general")}" target="_blank" class="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-turquoise hover:bg-brand-turquoiseDark text-white font-semibold rounded-full shadow-md transition-all transform hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> Agende Já
            </a>
        </div>
    </header>

    <!-- HERO SECTION -->
    <section id="inicio" class="pt-32 pb-20 md:py-32 px-4 bg-gradient-to-b from-brand-orangeLight to-brand-cream relative">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-7 flex flex-col gap-6">
                <span class="inline-flex self-start items-center gap-1 bg-white border border-brand-orange/30 text-brand-orange px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
                    ✨ TRANSPORTE PET PREMIUM & HUMANIZADO
                </span>
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-brand-dark tracking-tight leading-tight">
                    O transporte mais seguro que o seu <span class="text-brand-orange relative inline-block">melhor amigo<span class="absolute bottom-1 left-0 w-full h-3 bg-brand-orange/20 rounded-full -z-10"></span></span> merece!
                </h1>
                <p class="text-lg text-gray-600 max-w-xl">
                    Seja para passeios curtos, checkups no veterinário ou longas viagens interestaduais. Transportamos cães e gatos com climatização perfeita, higienização rigorosa e acompanhamento 100% em tempo real.
                </p>
                <div class="flex flex-col sm:flex-row gap-4">
                    <a href="${getWhatsAppMessageLink("general")}" target="_blank" class="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-turquoise hover:bg-brand-turquoiseDark text-white font-bold rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.03] text-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-bounce"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> Chame no WhatsApp
                    </a>
                    <a href="#servicos" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-brand-orangeLight/30 text-brand-dark font-bold rounded-2xl border-2 border-orange-200 transition-all duration-300 text-lg">
                        Conhecer Serviços
                    </a>
                </div>
                <div class="grid grid-cols-3 gap-4 pt-4 border-t border-orange-100 mt-2">
                    <div>
                        <p class="text-2xl font-bold text-brand-orange">100%</p>
                        <p class="text-xs text-gray-500">Dos Carros Climatizados</p>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-brand-turquoise">Suporte</p>
                        <p class="text-xs text-gray-500">Tempo Real via GPS / Fotos</p>
                    </div>
                    <div>
                        <p class="text-2xl font-bold text-brand-dark">Premium</p>
                        <p class="text-xs text-gray-500">Caixas Higienizadas</p>
                    </div>
                </div>
            </div>
            <div class="lg:col-span-5 relative mt-6 lg:mt-0">
                <div class="absolute inset-0 bg-brand-orange/10 rounded-3xl blur-2xl transform rotate-3"></div>
                <div class="relative bg-white p-4 rounded-3xl shadow-xl border border-orange-100 overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
                    <img src="${HERO_IMAGE_PATH}" alt="Cão e Gato viajando felizes" class="rounded-2xl w-full object-cover aspect-[4/3] sm:aspect-video lg:aspect-square" referrerPolicy="no-referrer">
                    <div class="absolute bottom-8 left-8 right-8 bg-brand-dark/95 backdrop-blur-sm p-4 rounded-2xl text-white flex items-center justify-between border border-white/10">
                        <div class="flex items-center gap-3">
                            <div class="p-2 bg-brand-orange rounded-xl text-white">
                                🐾
                            </div>
                            <div>
                                <p class="font-bold text-sm">Viagem Confortável</p>
                                <p class="text-xs text-gray-300">Pipoca & Luna a bordo!</p>
                            </div>
                        </div>
                        <span class="text-xs font-semibold px-2.5 py-1 bg-emerald-500/35 text-emerald-400 rounded-full border border-emerald-400/30">✓ Viagem Auditada</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- SOBRE NÓS -->
    <section id="sobre" class="py-20 bg-white px-4">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="relative order-2 lg:order-1">
                <div class="absolute -top-12 -left-12 w-24 h-24 bg-brand-orange/10 rounded-full -z-10 blur-xl"></div>
                <img src="${ABOUT_IMAGE_PATH}" alt="Interior do Táxi Cão com conforto e carinho no banco de trás" class="rounded-3xl shadow-lg border border-orange-100 w-full object-cover aspect-[4/3]" referrerPolicy="no-referrer">
                <div class="absolute -bottom-6 -right-6 bg-brand-orange p-6 rounded-2xl text-white shadow-xl max-w-xs flex items-start gap-4">
                    <span class="text-3xl">💺</span>
                    <div>
                        <h4 class="font-bold font-display text-lg">Sempre no Banco de Trás!</h4>
                        <p class="text-xs text-orange-100 mt-1">Conforto absoluto na cabine de passageiros, com capas protetoras especiais e cintos de segurança certificados.</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-6 order-1 lg:order-2">
                <span class="text-brand-orange font-bold uppercase tracking-wider text-sm">🏡 SOBRE O TÁXI CÃO</span>
                <h2 class="text-3xl sm:text-4xl font-display font-extrabold text-brand-dark">
                    Uma equipe apaixonada por aproximar você do seu melhor amigo!
                </h2>
                <p class="text-gray-600">
                    O <b>Táxi Cão - Peludo Viajante</b> nasceu do desejo profundo de preencher a lacuna de locomoção de animais de estimação com segurança intransigente e cuidado humanizado. Sabemos que seus cães e gatos são membros da família e merecem ser tratados como tais durante as viagens.
                </p>
                <p class="text-gray-600">
                    Diferente de transportes de carga frios ou no bagageiro, <b>eles viajam com todo o carinho e conforto no banco de trás da cabine de passageiros</b>. Nossos veículos contam com motoristas profissionais treinados em primeiros socorros veterinários e manejo comportamental pet. Possuímos adaptações sob medida de climatização, capas protetoras especiais, cabines seguras e cintos pet adequados.
                </p>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div class="flex items-center gap-3 p-3 bg-brand-cream rounded-xl border border-orange-50">
                        <span class="text-xl">💺</span>
                        <div>
                            <p class="font-bold text-sm text-brand-dark">Proteção Traseira</p>
                            <p class="text-xs text-gray-500">Cintos pet e capas confortáveis</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 p-3 bg-brand-cream rounded-xl border border-orange-50">
                        <span class="text-xl">🩺</span>
                        <div>
                            <p class="font-bold text-sm text-brand-dark">Manejo Especializado</p>
                            <p class="text-xs text-gray-500">Acalmamos animais ansiosos</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- SERVIÇOS -->
    <section id="servicos" class="py-20 bg-brand-cream px-4">
        <div class="max-w-7xl mx-auto flex flex-col gap-12">
            <div class="text-center max-w-2xl mx-auto flex flex-col gap-4">
                <span class="text-brand-turquoise font-bold uppercase tracking-wider text-sm">🛠️ NOSSOS SERVIÇOS</span>
                <h2 class="text-3xl sm:text-4xl font-display font-extrabold text-brand-dark">
                    Soluções perfeitas para as necessidades do seu companheiro
                </h2>
                <p class="text-gray-600">
                    Do agendamento pontual até o retorno de clínicas e estética, atendemos com capricho extremo.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Servico 1 -->
                <div class="bg-white p-8 rounded-3xl border border-orange-100/50 shadow-md flex flex-col gap-6 transform hover:-translate-y-2 transition-all duration-300">
                    <div class="w-14 h-14 bg-orange-100 text-brand-orange rounded-2xl flex items-center justify-center text-3xl font-bold">
                        🌟
                    </div>
                    <h3 class="text-xl font-bold text-brand-dark font-display">Viagens Intermunicipais</h3>
                    <p class="text-gray-600 text-sm">
                        Mudando de cidade ou tirando férias? Transportamos seu amiguinho com segurança absoluta de ponta a ponta, com paradas para hidratação e carinho.
                    </p>
                    <a href="${getWhatsAppMessageLink("general")}" target="_blank" class="text-brand-orange font-bold text-sm inline-flex items-center gap-1 hover:underline mt-auto">
                        Orçar Viagem &rarr;
                    </a>
                </div>

                <!-- Servico 2 -->
                <div class="bg-white p-8 rounded-3xl border border-orange-100/50 shadow-md flex flex-col gap-6 transform hover:-translate-y-2 transition-all duration-300">
                    <div class="w-14 h-14 bg-cyan-100 text-brand-turquoise rounded-2xl flex items-center justify-center text-3xl font-bold">
                        🚕
                    </div>
                    <h3 class="text-xl font-bold text-brand-dark font-display">Leva e Traz Pet</h3>
                    <p class="text-gray-600 text-sm">
                        Busca e leva pontual ao Veterinário, exames, internações, creche (Day Care), hotelzinho ou banho e tosa. O tutor pode acompanhar inteiramente grátis.
                    </p>
                    <a href="${getWhatsAppMessageLink("general")}" target="_blank" class="text-brand-turquoise font-bold text-sm inline-flex items-center gap-1 hover:underline mt-auto">
                        Orçar Leva e Traz &rarr;
                    </a>
                </div>

                <!-- Servico 3 -->
                <div class="bg-white p-8 rounded-3xl border border-orange-100/50 shadow-md flex flex-col gap-6 transform hover:-translate-y-2 transition-all duration-300">
                    <div class="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-3xl font-bold">
                        ✈️
                    </div>
                    <h3 class="text-xl font-bold text-brand-dark font-display">Aeroportos & Eventos</h3>
                    <p class="text-gray-600 text-sm">
                        Transporte até aeroportos (com auxílio no embarque, check-in e documentação necessária de viagem pet), hotéis e ensaios fotográficos de eventos especiais.
                    </p>
                    <a href="${getWhatsAppMessageLink("general")}" target="_blank" class="text-amber-600 font-bold text-sm inline-flex items-center gap-1 hover:underline mt-auto">
                        Orçar Aeroporto &rarr;
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- DIFERENCIAIS -->
    <section id="diferenciais" class="py-20 bg-white px-4">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-4 flex flex-col gap-6">
                    <span class="text-brand-orange font-bold uppercase tracking-wider text-sm">🛡️ SEGURANÇA E CONFORTO</span>
                    <h2 class="text-3xl sm:text-4xl font-display font-extrabold text-brand-dark">
                        O padrão premium que faz o tutor sorrir
                    </h2>
                    <p class="text-gray-600 text-sm leading-relaxed">
                        Muito além de um simples táxi, somos especialistas em bem-estar pet. Conheça nossos diferenciais absolutos para a tranquilidade de sua família.
                    </p>
                    <div class="p-5 bg-gradient-to-r from-orange-50 to-cyan-50 rounded-2xl border border-orange-100">
                        <p class="font-bold text-xs uppercase text-brand-orange">Compromisso Peludo Viajante</p>
                        <p class="text-xs text-gray-500 mt-1">Carinho, amor, higienização rigorosa e tranquilidade ao tutor em todas as milhas rodadas!</p>
                    </div>
                </div>

                <div class="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div class="p-6 bg-brand-cream border border-orange-50 rounded-2xl flex gap-4">
                        <span class="text-3xl">❄️</span>
                        <div>
                            <h4 class="font-bold text-brand-dark font-display">Climatização Controlada</h4>
                            <p class="text-xs text-gray-500 mt-1">Temperatura ideal em tempo real adaptada ao porte, espessura da pelagem e raça.</p>
                        </div>
                    </div>
                    <div class="p-6 bg-brand-cream border border-orange-50 rounded-2xl flex gap-4">
                        <span class="text-3xl">🧼</span>
                        <div>
                            <h4 class="font-bold text-brand-dark font-display">Higienização Padrão Veto</h4>
                            <p class="text-xs text-gray-500 mt-1">Desinfecção e assepsia profunda após cada corrida com produtos 100% pet-friendly.</p>
                        </div>
                    </div>
                    <div class="p-6 bg-brand-cream border border-orange-50 rounded-2xl flex gap-4">
                        <span class="text-3xl">📍</span>
                        <div>
                            <h4 class="font-bold text-brand-dark font-display">Rastreamento Real-Time</h4>
                            <p class="text-xs text-gray-500 mt-1">Você acompanha o percurso e recebe fotos e vídeos espontâneos durante o trajeto.</p>
                        </div>
                    </div>
                    <div class="p-6 bg-brand-cream border border-orange-50 rounded-2xl flex gap-4">
                        <span class="text-3xl">🐶</span>
                        <div>
                            <h4 class="font-bold text-brand-dark font-display">Adaptação Total</h4>
                            <p class="text-xs text-gray-500 mt-1">Garantimos caixas adequadas de todos os tamanhos, com trocas de tapete higiênico descartável.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- DEPOIMENTOS -->
    <section id="depoimentos" class="py-20 bg-brand-cream px-4">
        <div class="max-w-7xl mx-auto text-center flex flex-col gap-12">
            <div class="max-w-2xl mx-auto flex flex-col gap-4">
                <span class="text-brand-orange font-bold uppercase tracking-wider text-sm">⭐ DEPOIMENTOS DE TUTORES</span>
                <h2 class="text-3xl sm:text-4xl font-display font-extrabold text-brand-dark">
                    Tutores satisfeitos e pets sempre felizes!
                </h2>
                <p class="text-gray-600">
                    Temos orgulho de acumular notas máximas de satisfação e de sermos a primeira escolha de quem realmente ama seus bichinhos.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Depoimento 1 -->
                <div class="p-8 bg-white rounded-3xl shadow-sm border border-orange-50 flex flex-col text-left gap-4">
                    <div class="text-yellow-400 text-lg">★★★★★</div>
                    <p class="text-gray-600 italic text-sm">
                        "O Táxi Cão salvou minha rotina! O Pipoca vai super tranquilo para as consultas veterinárias e volta cheiroso do banho e tosa. O motorista envia fotos no caminho, o que me deixa totalmente em paz!"
                    </p>
                    <div class="flex items-center gap-3 border-t border-orange-50 pt-4 mt-auto">
                        <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center font-bold text-brand-orange">MS</div>
                        <div>
                            <p class="font-bold text-sm text-brand-dark">Mariana Santos</p>
                            <p class="text-xs text-gray-500">Mãe do Pipoca (Spitz Alemão 🐶)</p>
                        </div>
                    </div>
                </div>

                <!-- Depoimento 2 -->
                <div class="p-8 bg-white rounded-3xl shadow-sm border border-orange-50 flex flex-col text-left gap-4">
                    <div class="text-yellow-400 text-lg">★★★★★</div>
                    <p class="text-gray-600 italic text-sm">
                        "Fizemos uma viagem intermunicipal de São Paulo para Juiz de Fora. A Luna foi tratada como uma verdadeira rainha! Carro climatizado perfeito, paradas programadas para esticar as pernas, água fresca e muito carinho."
                    </p>
                    <div class="flex items-center gap-3 border-t border-orange-50 pt-4 mt-auto">
                        <div class="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center font-bold text-brand-turquoise">RM</div>
                        <div>
                            <p class="font-bold text-sm text-brand-dark">Rodrigo Mello</p>
                            <p class="text-xs text-gray-500">Pai da Luna (Golden Retriever 🦮)</p>
                        </div>
                    </div>
                </div>

                <!-- Depoimento 3 -->
                <div class="p-8 bg-white rounded-3xl shadow-sm border border-orange-50 flex flex-col text-left gap-4">
                    <div class="text-yellow-400 text-lg">★★★★★</div>
                    <p class="text-gray-600 italic text-sm">
                        "Quem tem gato sabe como o transporte é estressante. O Táxi Cão tem uma paciência cirúrgica e cabines super aconchegantes. O Garfield não deu sequer um miado de pânico. Recomendo de olhos fechados!"
                    </p>
                    <div class="flex items-center gap-3 border-t border-orange-50 pt-4 mt-auto">
                        <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center font-bold text-amber-700">JL</div>
                        <div>
                            <p class="font-bold text-sm text-brand-dark">Juliana Lima</p>
                            <p class="text-xs text-gray-500">Mãe do Garfield (Gato Persa 🐱)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CONTATO -->
    <section id="contato" class="py-20 bg-white px-4">
        <div class="max-w-4xl mx-auto bg-brand-cream border border-orange-100 p-8 sm:p-12 rounded-3xl shadow-xl">
            <div class="text-center max-w-lg mx-auto flex flex-col gap-3 mb-10">
                <span class="text-brand-orange font-bold uppercase tracking-wider text-sm">📬 CONTATO / RESERVAS</span>
                <h2 class="text-3xl font-display font-extrabold text-brand-dark">Agende o Táxi Cão agora</h2>
                <p class="text-gray-600 text-sm">Preencha os dados e entraremos em contato rapidamente pelo telefone ou envie direto pelo WhatsApp.</p>
            </div>

            <form action="javascript:void(0);" onsubmit="alert('Mensagem enviada com sucesso! Entraremos em contato via WhatsApp/E-mail.');" class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="flex flex-col gap-1.5">
                    <label class="text-xs font-bold text-brand-dark">Seu Nome *</label>
                    <input type="text" required placeholder="Ex: Ana Clara" class="px-4 py-3 bg-white border border-orange-100 rounded-xl outline-none focus:border-brand-orange text-sm">
                </div>
                <div class="flex flex-col gap-1.5">
                    <label class="text-xs font-bold text-brand-dark">Seu E-mail *</label>
                    <input type="email" required placeholder="Ex: ana@exemplo.com" class="px-4 py-3 bg-white border border-orange-100 rounded-xl outline-none focus:border-brand-orange text-sm">
                </div>
                <div class="flex flex-col gap-1.5">
                    <label class="text-xs font-bold text-brand-dark">WhatsApp / Telefone *</label>
                    <input type="tel" required placeholder="Ex: (32) 99999-9999" class="px-4 py-3 bg-white border border-orange-100 rounded-xl outline-none focus:border-brand-orange text-sm">
                </div>
                <div class="flex flex-col gap-1.5">
                    <label class="text-xs font-bold text-brand-dark">Nome do Pet & Raça</label>
                    <input type="text" placeholder="Ex: Pipoca (Spitz Alemão)" class="px-4 py-3 bg-white border border-orange-100 rounded-xl outline-none focus:border-brand-orange text-sm">
                </div>
                <div class="sm:col-span-2 flex flex-col gap-1.5">
                    <label class="text-xs font-bold text-brand-dark">Fale sobre o transporte e endereço estimado *</label>
                    <textarea required rows="4" placeholder="De onde para onde? Descreva as datas preferidas e qualquer necessidade específica..." class="px-4 py-3 bg-white border border-orange-100 rounded-xl outline-none focus:border-brand-orange text-sm resize-none"></textarea>
                </div>
                <div class="sm:col-span-2 mt-4 flex flex-col sm:flex-row gap-4 justify-center">
                    <button type="submit" class="px-8 py-3.5 bg-brand-orange hover:bg-brand-orangeDark text-white font-bold rounded-xl shadow-lg transition-colors text-sm cursor-pointer text-center">
                        Enviar Mensagem 
                    </button>
                    <a href="${getWhatsAppMessageLink("general")}" target="_blank" class="px-8 py-3.5 bg-brand-turquoise hover:bg-brand-turquoiseDark text-white font-bold rounded-xl shadow-lg transition-colors text-sm text-center">
                        Chamar Diretamente no WhatsApp 📞
                    </a>
                </div>
            </form>
        </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-brand-dark text-white pt-16 pb-8 px-4">
        <div class="max-w-7xl mx-auto flex flex-col gap-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div class="flex flex-col gap-4">
                    <span class="text-2xl font-display font-extrabold text-brand-orange">
                        Táxi<span class="text-brand-turquoise">Cão</span>
                    </span>
                    <p class="text-xs text-gray-400">
                        O serviço de transporte pet seguro, afetuoso e moderno que traz tranquilidade absoluta para você e bem-estar garantido para seu mascote.
                    </p>
                </div>
                <div>
                    <h5 class="font-bold text-sm uppercase text-brand-orange mb-4">Links Úteis</h5>
                    <ul class="flex flex-col gap-2 text-xs text-gray-300">
                        <li><a href="#inicio" class="hover:text-brand-turquoise transition-colors">Início</a></li>
                        <li><a href="#sobre" class="hover:text-brand-turquoise transition-colors">Sobre Nós</a></li>
                        <li><a href="#servicos" class="hover:text-brand-turquoise transition-colors">Serviços</a></li>
                        <li><a href="#diferenciais" class="hover:text-brand-turquoise transition-colors">Diferenciais</a></li>
                    </ul>
                </div>
                <div>
                    <h5 class="font-bold text-sm uppercase text-brand-turquoise mb-4">Contato</h5>
                    <ul class="flex flex-col gap-2 text-xs text-gray-300">
                        <li>📍 Juiz de Fora e Cidades Vizinhas</li>
                        <li>📞 (32) 8829-2264</li>
                        <li>📧 contato@taxicaopeludo.com</li>
                    </ul>
                </div>
                <div>
                    <h5 class="font-bold text-sm uppercase text-brand-orange mb-4 font-display">Redes Sociais</h5>
                    <a href="https://instagram.com/taxicaopeludoviajante" target="_blank" class="inline-flex items-center gap-2 text-xs text-gray-300 hover:text-brand-orange transition-colors">
                        📸 @taxicaopeludoviajante
                    </a>
                </div>
            </div>
            
            <div class="border-t border-brand-dark_light/40 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400">
                <p>&copy; 2026 Táxi Cão - Peludo Viajante. Todos os direitos reservados.</p>
                <p>Criado com dedicação e carinho 🐾</p>
            </div>
        </div>
    </footer>

</body>
</html>`;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark flex flex-col font-sans relative overflow-x-hidden">
      
      {/* EXPORTER FLOATING HEADS / DEV BOX CLIENT */}
      <div className="bg-brand-dark text-white p-2 text-xs flex flex-wrap gap-4 items-center justify-between px-6 border-b border-white/10 z-50">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="font-mono text-[10px] text-gray-300 uppercase">
            Ambiente de Produção Ativo • Visualizando Single-Page Pronta
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-[11px]">Quer o código HTML?</span>
          <button
            id="download-html-btn"
            onClick={downloadSingleFileHTML}
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-[10px] rounded-md cursor-pointer transition-colors transition-transform active:scale-95"
            title="Download literal single-file HTML as requested"
          >
            <FileDown size={11} />
            Baixar HTML Único
          </button>
        </div>
      </div>

      {/* NAVBAR */}
      <header
        id="app-header"
        className={`sticky top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-orange-100/20 shadow-md py-3"
            : "bg-white/80 backdrop-blur-md border-b border-orange-100/10 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-2 group">
            <TaxiCaoLogo />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-3 lg:gap-6 xl:gap-8 text-xs lg:text-sm font-medium mr-4 xl:mr-8">
            <a
              href="#inicio"
              className={`transition-colors duration-300 text-brand-orange ${
                isScrolled
                  ? "hover:text-brand-dark font-bold"
                  : "hover:text-brand-dark font-semibold"
              }`}
            >
              Início
            </a>
            <a
              href="#sobre"
              className={`transition-colors duration-300 text-brand-orange ${
                isScrolled
                  ? "hover:text-brand-dark font-bold"
                  : "hover:text-brand-dark font-semibold"
              }`}
            >
              Sobre Nós
            </a>
            <a
              href="#servicos"
              className={`transition-colors duration-300 text-brand-orange ${
                isScrolled
                  ? "hover:text-brand-dark font-bold"
                  : "hover:text-brand-dark font-semibold"
              }`}
            >
              Serviços
            </a>
            <a
              href="#diferenciais"
              className={`transition-colors duration-300 text-brand-orange ${
                isScrolled
                  ? "hover:text-brand-dark font-bold"
                  : "hover:text-brand-dark font-semibold"
              }`}
            >
              Diferenciais
            </a>
            <a
              href="#estatistica"
              className={`transition-colors duration-300 text-brand-orange ${
                isScrolled
                  ? "hover:text-brand-dark font-bold"
                  : "hover:text-brand-dark font-semibold"
              }`}
            >
              Simular Viagem
            </a>
            <a
              href="#depoimentos"
              className={`transition-colors duration-300 text-brand-orange ${
                isScrolled
                  ? "hover:text-brand-dark font-bold"
                  : "hover:text-brand-dark font-semibold"
              }`}
            >
              Depoimentos
            </a>
            <a
              href="#contato"
              className={`transition-colors duration-300 text-brand-orange ${
                isScrolled
                  ? "hover:text-brand-dark font-bold"
                  : "hover:text-brand-dark font-semibold"
              }`}
            >
              Contato
            </a>
          </nav>

          {/* Nav Right CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={getWhatsAppMessageLink("general")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-brand-turquoise hover:bg-brand-turquoise-dark text-white text-xs font-bold rounded-full shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5"
            >
              <Phone size={13} />
              <span>Agende Já</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-brand-dark hover:bg-brand-orange-light/40 transition-colors focus:outline-none"
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile nav screen */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-x-0 ${
              isScrolled ? "top-[72px]" : "top-[80px]"
            } bg-white/95 backdrop-blur-md shadow-lg border-b border-orange-100 z-30 md:hidden flex flex-col p-6 gap-4 font-medium`}
          >
            <a
              href="#inicio"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg py-2 border-b border-orange-50 text-brand-dark hover:text-brand-orange"
            >
              Início
            </a>
            <a
              href="#sobre"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg py-2 border-b border-orange-50 text-brand-dark hover:text-brand-orange"
            >
              Sobre Nós
            </a>
            <a
              href="#servicos"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg py-2 border-b border-orange-50 text-brand-dark hover:text-brand-orange"
            >
              Serviços
            </a>
            <a
              href="#diferenciais"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg py-2 border-b border-orange-50 text-brand-dark hover:text-brand-orange"
            >
              Diferenciais
            </a>
            <a
              href="#estatistica"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg py-2 border-b border-orange-50 text-brand-dark hover:text-brand-orange"
            >
              Simular Viagem
            </a>
            <a
              href="#depoimentos"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg py-2 border-b border-orange-50 text-brand-dark hover:text-brand-orange"
            >
              Depoimentos
            </a>
            <a
              href="#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg py-2 text-brand-dark hover:text-brand-orange"
            >
              Contato
            </a>
            <a
              href={getWhatsAppMessageLink("general")}
              target="_blank"
              rel="noreferrer"
              className="mt-2 w-full py-2.5 bg-brand-turquoise hover:bg-brand-turquoise-dark text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 text-center"
            >
              <Phone size={15} />
              <span>Agende Já</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REELS / VLOG BANNER ABAIXO DO MENU */}
      <StoryBanner />

      {/* HERO SECTION */}
      <section
        id="inicio"
        className="pt-12 pb-20 md:pt-16 md:pb-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-brand-orange-light to-brand-cream relative"
      >
        <div className="absolute top-1/3 -left-4 w-40 h-40 bg-brand-orange/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-4 w-40 h-40 bg-brand-turquoise/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero texts */}
          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8 justify-center text-left">
            <span className="inline-flex self-start items-center gap-1.5 bg-white border border-brand-orange/30 text-brand-orange px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm">
              ✨ <span className="font-bold">TRANSPORTE PET PREMIUM & HUMANIZADO</span>
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-brand-dark tracking-tight leading-tight">
              O transporte mais seguro que o seu{" "}
              <span className="text-brand-orange relative inline-block">
                melhor amigo
                <span className="absolute bottom-1 left-0 w-full h-[10px] bg-brand-orange/20 rounded-full -z-10"></span>
              </span>{" "}
              merece!
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-xl leading-relaxed">
              Seja para passeios curtos, checkups no veterinário ou longas viagens interestaduais. Transportamos cães e gatos com climatização perfeita, higienização impecável e acompanhamento 100% em tempo real para sua paz espiritual.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={getWhatsAppMessageLink("general")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-turquoise hover:bg-brand-turquoise-dark text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] text-lg cursor-pointer"
              >
                <Phone size={20} className="animate-bounce" />
                <span>Chame no WhatsApp</span>
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-brand-orange-light/30 text-brand-dark font-bold rounded-2xl border-2 border-orange-200 transition-all duration-300 text-lg"
              >
                <span>Conhecer Serviços</span>
              </a>
            </div>

            {/* Micro stats banner */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-orange-100 mt-2">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold font-display text-brand-orange">100%</p>
                <p className="text-[11px] text-gray-500 uppercase font-semibold">Veículos Climatizados</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold font-display text-brand-turquoise">Suporte</p>
                <p className="text-[11px] text-gray-500 uppercase font-semibold">Tempo real por fotos</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold font-display text-brand-dark">Premium</p>
                <p className="text-[11px] text-gray-500 uppercase font-semibold">Segurança garantida</p>
              </div>
            </div>
          </div>

          {/* Hero Beautiful Generated Image */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="absolute inset-0 bg-brand-orange/15 rounded-3xl blur-2xl transform rotate-3"></div>
            <div className="relative bg-white p-4 rounded-3xl shadow-2xl border border-orange-100/50 overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
              <img
                src={HERO_IMAGE_PATH}
                alt="Cão e Gato viajando felizes de forma segura"
                className="rounded-2xl w-full object-cover aspect-[4/3] sm:aspect-video lg:aspect-square"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-brand-dark/95 backdrop-blur-sm p-4 rounded-2xl text-white flex items-center justify-between border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-orange rounded-xl text-white text-base">
                    🐶🐱
                  </div>
                  <div>
                    <p className="font-bold text-xs sm:text-sm">Passageiros Felizes</p>
                    <p className="text-[10px] sm:text-xs text-gray-300">Luna & Pipoca a bordo!</p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-400/30">
                  ✓ Viagem Monitorada
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SOBRE NÓS SECTION */}
      <section id="sobre" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* About us generated image & badge */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="absolute -top-12 -left-12 w-24 h-24 bg-brand-orange/10 rounded-full -z-10 blur-xl"></div>
            <img
              src={ABOUT_IMAGE_PATH}
              alt="Interior do Táxi Cão focado em conforto e segurança no banco de trás com ar condicionado"
              className="rounded-3xl shadow-xl border border-orange-100/50 w-full object-cover aspect-[4/3]"
              referrerPolicy="no-referrer"
            />
            
            {/* Pop badge */}
            <div className="absolute -bottom-6 -right-4 bg-brand-orange p-6 rounded-3xl text-white shadow-2xl max-w-xs flex items-start gap-4 border border-orange-400/20">
              <span className="text-3xl">💺</span>
              <div>
                <h4 className="font-bold font-display text-base">Sempre no Banco de Trás!</h4>
                <p className="text-xs text-orange-100 mt-1">
                  Seu pet viaja com segurança de passageiro na cabine, no banco traseiro com cintos testados e capas protetoras especiais. Zero estresse!
                </p>
              </div>
            </div>
          </div>

          {/* About texts */}
          <div className="lg:col-span-6 flex flex-col gap-6 order-1 lg:order-2">
            <span className="text-brand-orange font-bold uppercase tracking-wider text-xs">🏡 SOBRE NÓS e NOSSO PROPÓSITO</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-dark tracking-tight leading-tight">
              Uma equipe apaixonada por aproximar você do seu melhor amigo!
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              O <strong>Táxi Cão - Peludo Viajante</strong> nasceu do desejo de solucionar os dilemas cotidianos dos tutores com elegância, prontidão e, fundamentalmente, respeito aos animais de estimação. Entendemos que cães e gatos são membros insubstituíveis da sua família e merecem tratamento humanizado.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Diferente de transportes de carga frios ou no sacrifício do bagageiro, <strong>todos os pets viajam com todo o carinho e conforto no banco de trás da cabine de passageiros</strong>. Nossos veículos contam com motoristas profissionais treinados em primeiros socorros veterinários e comportamento pet. Fornecemos assentos acolhedores, capas protetoras especiais e cintos de segurança adequados.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-3 bg-brand-cream rounded-2xl border border-orange-50">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-brand-orange">
                  <Award size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-dark">Profissionalismo Certificado</h4>
                  <p className="text-[11px] text-gray-500">Manejo calmo certificado</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-brand-cream rounded-2xl border border-orange-50">
                <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center text-brand-turquoise">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-dark">Proteção no Banco Traseiro</h4>
                  <p className="text-[11px] text-gray-500">Cintos de segurança premium sintonizados</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SERVIÇOS SECTION */}
      <section id="servicos" className="py-20 bg-brand-cream px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="text-center max-w-2xl mx-auto flex flex-col gap-4">
            <span className="text-brand-turquoise font-bold uppercase tracking-wider text-xs">🛠️ SOLUÇÕES MOBILIDADE PET</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-dark">
              Serviços especializados para cada etapa da vida pet
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Seja para compromissos cotidianos ou planos complexos de mudança interestadual. Atendemos com extrema dedicação e zelo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-3xl border border-orange-100/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-6 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-orange-100 text-brand-orange rounded-2xl flex items-center justify-center text-3xl font-extrabold font-display">
                🚙
              </div>
              <h3 className="text-xl font-bold font-display text-brand-dark">Viagens Curtas & Longas</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Mudança residencial ou feriado em família? Conduzimos seu cão ou gato com paradas programadas e seguras para xixi, hidratação e diversão ao ar livre.
              </p>
              <ul className="text-xs text-gray-500 flex flex-col gap-2 pt-2 border-t border-orange-50">
                <li className="flex items-center gap-2">✓ Suporte interestadual de ponta a ponta</li>
                <li className="flex items-center gap-2">✓ Paradas para refrescar e brincar</li>
                <li className="flex items-center gap-2">✓ Tapete descartável trocado na hora</li>
              </ul>
              <a
                href={getWhatsAppMessageLink("general")}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-brand-orange hover:text-brand-orange-dark font-bold text-sm"
              >
                Solicitar orçamento &rarr;
              </a>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl border border-orange-100/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-6 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-cyan-100 text-brand-turquoise rounded-2xl flex items-center justify-center text-3xl font-extrabold font-display">
                🩺
              </div>
              <h3 className="text-xl font-bold font-display text-brand-dark">Leva e Traz Completo</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Compromissos do dia a dia: veterinário de rotina, exames, internações críticas, creche diária (day care), cirurgias e retorno de pet shops estética.
              </p>
              <ul className="text-xs text-gray-500 flex flex-col gap-2 pt-2 border-t border-orange-50">
                <li className="flex items-center gap-2">✓ Espera por exames/consultas</li>
                <li className="flex items-center gap-2">✓ Auxílio na recepção do estabelecimento</li>
                <li className="flex items-center gap-2">✓ Acompanhante tutor grátis</li>
              </ul>
              <a
                href={getWhatsAppMessageLink("general")}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-brand-turquoise hover:text-brand-turquoise-dark font-bold text-sm"
              >
                Solicitar orçamento &rarr;
              </a>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl border border-orange-100/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-6 transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center text-3xl font-extrabold font-display">
                ✈️
              </div>
              <h3 className="text-xl font-bold font-display text-brand-dark">Aeroportos & Eventos</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Suporte de check-in e translado até aeroportos nacionais e internacionais. Transporte também para ensaios fotográficos e festas de aniversário pet.
              </p>
              <ul className="text-xs text-gray-500 flex flex-col gap-2 pt-2 border-t border-orange-50">
                <li className="flex items-center gap-2">✓ Suporte com as caixas padrão IATA</li>
                <li className="flex items-center gap-2">✓ Conexão com caixas de embarque</li>
                <li className="flex items-center gap-2">✓ Transporte higienizado anti-stress</li>
              </ul>
              <a
                href={getWhatsAppMessageLink("general")}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-amber-700 hover:text-amber-800 font-bold text-sm"
              >
                Solicitar orçamento &rarr;
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* DIFERENCIAIS / SEGURANÇA GRID */}
      <section id="diferenciais" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Differentials introduction text */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-brand-orange font-bold uppercase tracking-wider text-xs">🛡️ PILARS DA SEGURANÇA</span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-dark tracking-tight leading-tight">
                Padrão Premium de Segurança que faz seu coração descansar
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Não somos apenas motoristas particulares para animais; somos verdadeiros guardiões do bem-estar pet. Pensamos em cada detalhe para fornecer conforto irrepreensível:
              </p>
              
              <div className="p-5 bg-cyan-100/30 rounded-2xl border border-cyan-100 flex items-start gap-4">
                <div className="p-2.5 bg-brand-turquoise text-white rounded-xl">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-brand-dark">Higienização Padrão Clínica</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Esterilizador químico e desinfetantes biodegradáveis eliminam vírus e fungos sem prejudicar o faro do pet.
                  </p>
                </div>
              </div>
            </div>

            {/* Differentials grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="p-6 bg-brand-cream border border-orange-100/40 rounded-3xl flex gap-4 transform hover:scale-[1.01] transition-transform">
                <span className="text-3xl">❄️</span>
                <div className="flex flex-col">
                  <h4 className="font-bold text-brand-dark font-display text-sm sm:text-base">Ar Digital Sintonizado</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Ar-condicionado regulado de acordo com a raça e tipo de pet, evitando choques térmicos ou exaustão de calor.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-brand-cream border border-orange-100/40 rounded-3xl flex gap-4 transform hover:scale-[1.01] transition-transform">
                <span className="text-3xl">📍</span>
                <div className="flex flex-col">
                  <h4 className="font-bold text-brand-dark font-display text-sm sm:text-base">GPS de Localização</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Envio contínuo de rastreador ou localização instantânea, acompanhado de vídeos/fotos divertidas no trajeto.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-brand-cream border border-orange-100/40 rounded-3xl flex gap-4 transform hover:scale-[1.01] transition-transform">
                <span className="text-3xl">🧺</span>
                <div className="flex flex-col">
                  <h4 className="font-bold text-brand-dark font-display text-sm sm:text-base">Bem-estar e Carinho</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Petiscos premium liberados pelo tutor, água fresca mineral filtrada e paradas estratégicas no gramado.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-brand-cream border border-orange-100/40 rounded-3xl flex gap-4 transform hover:scale-[1.01] transition-transform">
                <span className="text-3xl">🩺</span>
                <div className="flex flex-col">
                  <h4 className="font-bold text-brand-dark font-display text-sm sm:text-base">Motorista Especialista</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Capacitação profissional com conhecimento em psicologia animal e atendimento de primeiros-socorros pet.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* DYNAMIC ESTIMATOR SECTION */}
      <section id="estatistica" className="py-20 bg-brand-sand/50 px-4 sm:px-6 lg:px-8 border-y border-orange-100">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white overflow-hidden rounded-3xl shadow-xl border border-orange-100 grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left intro panel of estimator */}
            <div className="lg:col-span-5 bg-brand-dark p-8 sm:p-12 text-white flex flex-col justify-between gap-8">
              <div className="flex flex-col gap-4">
                <span className="inline-block self-start px-3 py-1 bg-brand-orange text-white rounded-full text-xs font-bold font-display uppercase tracking-wider">
                  Real-Time Calculadora
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold leading-tight">
                  Simule o custo do transporte na hora!
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Sem surpresas desagradáveis ou taxas surpresas. Ajuste as opções ao lado, confira nossa estimativa e finalize diretamente com o nosso atendimento no WhatsApp em um clique!
                </p>
              </div>

              <div className="flex flex-col gap-3 text-xs bg-brand-dark-light/50 p-4 rounded-xl border border-white/5">
                <p className="font-bold text-brand-orange uppercase">Nota de Transparência</p>
                <p className="text-gray-400">
                  Os valores calculados são estimativas iniciais com base em quilometragem padrão. O valor exato de pedágios ou serviços adicionais de espera continuada será acordado antes de cada viagem.
                </p>
              </div>
            </div>

            {/* Estimator form interactiveness */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col gap-8">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Pet Size Selection */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">
                    Porte do Pet
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {["pequeno / gato", "médio", "grande"].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setPetSize(size)}
                        className={`text-xs py-2 px-1 capitalize font-semibold rounded-xl border-2 transition-all ${
                          petSize === size
                            ? "bg-brand-orange-light text-brand-orange border-brand-orange"
                            : "bg-white text-gray-500 border-gray-200 hover:border-orange-200"
                        }`}
                      >
                        {size.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-gray-500 italic mt-0.5">
                    {petSize === "pequeno / gato" && "Ideal para Gatos, Sptiz, Shitzu, etc."}
                    {petSize === "médio" && "Ideal para Buldogue, Beagle, Poodle, etc."}
                    {petSize === "grande" && "Ideal para Golden Retriever, Pastor, Boxer, etc."}
                  </p>
                </div>

                {/* Service type Selection */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">
                    Tipo de Serviço
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="p-2.5 outline-none rounded-xl border border-gray-200 focus:border-brand-orange text-xs bg-white font-medium"
                  >
                    <option value="leva_traz">Leva e Traz PetShop / Veterinário</option>
                    <option value="viagem">Viagem (Férias / Mudanças)</option>
                    <option value="aeroporto">Translado Aeroporto / Eventos</option>
                  </select>
                </div>

              </div>

              {/* Distance Slider */}
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">
                    Distância Estimada
                  </label>
                  <span className="text-sm font-bold text-brand-orange font-mono">
                    {distance} km
                  </span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="150"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-orange focus:outline-none"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                  <span>3 km</span>
                  <span>50 km</span>
                  <span>100 km</span>
                  <span>150 km</span>
                </div>
              </div>

              {/* Estimate Output display */}
              <div className="bg-brand-orange-light/40 border border-brand-orange/20 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                <div>
                  <p className="text-xs text-gray-500 font-semibold">Valor Estimado do Percurso</p>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-sm font-bold text-brand-dark">R$</span>
                    <span className="text-3xl font-black text-brand-orange font-display">
                      {estimatedValue}
                    </span>
                  </div>
                </div>

                <a
                  href={getWhatsAppMessageLink("estimator")}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-turquoise hover:bg-brand-turquoise-dark text-white font-bold rounded-xl shadow-md transition-colors text-sm"
                >
                  <span>Pedir Viagem no WhatsApp</span>
                  <ChevronRight size={16} />
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="depoimentos" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-12 text-center">
          
          <div className="max-w-2xl mx-auto flex flex-col gap-4">
            <span className="text-brand-orange font-bold uppercase tracking-wider text-xs">⭐ DEPOIMENTO DE PAPAIS E MAMÃES</span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-brand-dark">
              Quem ama confia e recomenda de olhos fechados
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Nossa verdadeira recompensa é ver as caudas abanando e os ronronares de pura cumplicidade. Olhe o que dizem nossos clientes:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-brand-cream border border-orange-100/50 p-8 rounded-3xl flex flex-col items-start text-left gap-4 hover:shadow-xl transition-all duration-300 relative group"
              >
                <div className="text-yellow-400 flex gap-0.5 text-sm">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <span key={idx}>★</span>
                  ))}
                </div>
                
                <p className="text-gray-600 text-xs sm:text-sm italic leading-relaxed pt-2">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3 border-t border-orange-100/50 pt-4 mt-auto w-full">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${t.avatarBg}`}>
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-brand-dark">{t.name}</h5>
                    <p className="text-[11px] text-gray-500 font-medium">{t.pet}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQS ACCORDION SECTION */}
      <section className="py-20 bg-brand-cream px-4 sm:px-6 lg:px-8 border-t border-orange-100">
        <div className="max-w-4xl mx-auto flex flex-col gap-10">
          
          <div className="text-center flex flex-col gap-3">
            <span className="text-brand-turquoise font-bold uppercase tracking-wider text-xs">❔ DÚVIDAS FREQUENTES</span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-brand-dark">
              Tudo o que os tutores nos perguntam
            </h2>
            <p className="text-gray-600 text-sm">
              Tem alguma dúvida sobre taxas, caixas ou percurso? Nós respondemos com sinceridade e transparência.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = !!faqOpen[idx];
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-orange-100/50 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-sm sm:text-base text-brand-dark hover:bg-orange-50/20 transition-colors focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <span className="text-brand-orange text-lg">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>
                  
                  <div
                    className={`faq-answer text-xs sm:text-sm text-gray-600 border-t border-orange-50/20 px-5 transition-all duration-300 ${
                      isOpen ? "open pb-5" : "max-h-0"
                    }`}
                  >
                    <p className="leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section id="contato" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-brand-cream border border-orange-100/70 p-8 sm:p-12 rounded-3xl shadow-xl">
          
          <div className="text-center max-w-lg mx-auto flex flex-col gap-3 mb-10">
            <span className="text-brand-orange font-bold uppercase tracking-wider text-xs">📬 CONTATO / RESERVAs</span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-brand-dark">
              Agende a viagem do seu pet!
            </h2>
            <p className="text-gray-600 text-sm">
              Preencha o cupom informativo abaixo e lhe responderemos rapidamente no WhatsApp ou telefone.
            </p>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border-2 border-brand-turquoise p-8 rounded-2xl text-center flex flex-col items-center gap-4 shadow-md"
            >
              <div className="w-14 h-14 bg-cyan-100 text-brand-turquoise rounded-full flex items-center justify-center text-2xl">
                ✓
              </div>
              <h4 className="font-display font-extrabold text-xl text-brand-dark">
                Obrigado, {formData.nome || "Tutor"}!
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md">
                Recebemos sua mensagem com as informações do {formData.petName || "seu pet"}. Estamos analisando e entraremos em contato via WhatsApp nas próximas 2 horas.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg font-bold"
                >
                  Refazer Formulário
                </button>
                <a
                  href={getWhatsAppMessageLink("contact")}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 text-xs bg-brand-turquoise hover:bg-brand-turquoise-dark text-white rounded-lg font-bold inline-flex items-center gap-1.5"
                >
                  <Phone size={13} />
                  Ir para o WhatsApp
                </a>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">
                  Seu Nome *
                </label>
                <input
                  type="text"
                  name="nome"
                  required
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Ex: Ana Clara"
                  className="px-4 py-3 bg-white border border-gray-200 text-brand-dark rounded-xl outline-none focus:border-brand-orange text-xs sm:text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">
                  Seu E-mail *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Ex: ana@exemplo.com"
                  className="px-4 py-3 bg-white border border-gray-200 text-brand-dark rounded-xl outline-none focus:border-brand-orange text-xs sm:text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">
                  Telefone / WhatsApp *
                </label>
                <input
                  type="tel"
                  name="telefone"
                  required
                  value={formData.telefone}
                  onChange={handleInputChange}
                  placeholder="Ex: (32) 99999-9999"
                  className="px-4 py-3 bg-white border border-gray-200 text-brand-dark rounded-xl outline-none focus:border-brand-orange text-xs sm:text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">
                  Nome do Pet & Amigo
                </label>
                <input
                  type="text"
                  name="petName"
                  value={formData.petName}
                  onChange={handleInputChange}
                  placeholder="Ex: Pipoca (Spitz Alemão)"
                  className="px-4 py-3 bg-white border border-gray-200 text-brand-dark rounded-xl outline-none focus:border-brand-orange text-xs sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1.5">
                <label className="text-xs font-bold text-brand-dark uppercase tracking-wide">
                  Fale sobre o transporte e trajeto estimado *
                </label>
                <textarea
                  name="mensagem"
                  required
                  rows={4}
                  value={formData.mensagem}
                  onChange={handleInputChange}
                  placeholder="Diga-nos de onde para onde deseja levar o bichinho, datas estimadas e quaisquer cuidados extraordinários..."
                  className="px-4 py-3 bg-white border border-gray-200 text-brand-dark rounded-xl outline-none focus:border-brand-orange text-xs sm:text-sm resize-none"
                />
              </div>

              <div className="sm:col-span-2 mt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-brand-orange hover:bg-brand-orange-dark text-white font-bold rounded-xl shadow-lg transition-colors text-sm cursor-pointer"
                >
                  Enviar Informações 📬
                </button>
                <a
                  href={getWhatsAppMessageLink("general")}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-3.5 bg-brand-turquoise hover:bg-brand-turquoise-dark text-white font-bold rounded-xl shadow-lg transition-colors text-sm text-center inline-flex items-center justify-center gap-2"
                >
                  <Phone size={16} />
                  <span>Chamar Direto no WhatsApp</span>
                </a>
              </div>

            </form>
          )}

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-dark text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-auto border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Column 1 - Brand description */}
            <div className="flex flex-col gap-4">
              <a href="#inicio" className="flex items-center gap-2">
                <TaxiCaoLogo lightText={true} />
              </a>
              <p className="text-xs text-gray-400 leading-relaxed">
                Logística de transporte pet segura, afetiva e altamente qualificada. Levamos seu amiguinho com todo o conforto de climatização e carinho contínuo pelo caminho.
              </p>
            </div>

            {/* Column 2 - Links */}
            <div className="flex flex-col gap-3">
              <h5 className="font-bold text-sm uppercase text-brand-orange font-display">
                Mapa do Site
              </h5>
              <ul className="flex flex-col gap-2 text-xs text-gray-300">
                <li>
                  <a href="#inicio" className="hover:text-brand-orange transition-colors">
                    Início
                  </a>
                </li>
                <li>
                  <a href="#sobre" className="hover:text-brand-orange transition-colors">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="#servicos" className="hover:text-brand-orange transition-colors">
                    Serviços
                  </a>
                </li>
                <li>
                  <a href="#diferenciais" className="hover:text-brand-orange transition-colors">
                    Diferenciais
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Details */}
            <div className="flex flex-col gap-3">
              <h5 className="font-bold text-sm uppercase text-brand-turquoise font-display">
                Contatos Comerciais
              </h5>
              <p className="text-xs text-gray-300">
                📌 Juiz de Fora e região / Brasil
              </p>
              <p className="text-xs text-gray-300">
                📞 (32) 8829-2264
              </p>
              <p className="text-xs text-gray-300">
                ✉️ contato@taxicaopeludo.com
              </p>
            </div>

            {/* Column 4 - Instagram */}
            <div className="flex flex-col gap-3">
              <h5 className="font-bold text-sm uppercase text-brand-orange font-display">
                Instagram Oficial
              </h5>
              <a
                href="https://instagram.com/taxicaopeludoviajante"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-gray-300 hover:text-brand-orange flex items-center gap-1.5 transition-colors"
              >
                <Instagram size={14} />
                <span>@taxicaopeludoviajante</span>
              </a>
              <div className="flex gap-2 mt-2">
                <span className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs cursor-pointer">
                  🐕
                </span>
                <span className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs cursor-pointer">
                  🐈
                </span>
                <span className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-xs cursor-pointer">
                  🚘
                </span>
              </div>
            </div>

          </div>

          {/* Core Footer Note */}
          <div className="border-t border-brand-dark-light/50 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-4">
            <p>
              &copy; 2026 Táxi Cão - Peludo Viajante. Todos os direitos reservados.
            </p>
            <p className="flex items-center gap-1">
              Desenvolvido com amor e todo carinho pet-friendly 🐾
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
}
