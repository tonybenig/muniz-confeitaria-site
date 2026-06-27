import { useState } from "react";
import { Sparkles, Heart, Award, ArrowRight, ChevronRight } from "lucide-react";

interface HeroProps {
  onNavigate: (section: string) => void;
}

const HERO_CREATIONS = [
  {
    id: "morango",
    name: "Bolo Supremo de Morango",
    tag: "O Queridinho do Ateliê ✨",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=800&q=80",
    badgeLeftEmoji: "🍓",
    badgeLeftTitle: "Morangos Selecionados",
    badgeLeftDesc: "Geleia artesanal reduzida",
    badgeRightEmoji: "✨",
    badgeRightTitle: "Toque de Ouro",
    badgeRightDesc: "Decoração comestível 24k",
    color: "#E05370"
  },
  {
    id: "chocolate",
    name: "Sublime de Chocolate Belga",
    tag: "Chocolate 100% Callebaut 🍫",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",
    badgeLeftEmoji: "🍫",
    badgeLeftTitle: "Cacau Belga",
    badgeLeftDesc: "Creme aveludado trufado",
    badgeRightEmoji: "⚜️",
    badgeRightTitle: "Pó de Ouro",
    badgeRightDesc: "Acabamento cintilante",
    color: "#4E3621"
  },
  {
    id: "floral",
    name: "Imperial de Flores & Macarons",
    tag: "Edição Especial Festas 🌸",
    image: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?w=800&q=80",
    badgeLeftEmoji: "🌸",
    badgeLeftTitle: "Rosas Naturais",
    badgeLeftDesc: "Flores orgânicas selecionadas",
    badgeRightEmoji: "🍬",
    badgeRightTitle: "Macarons Reais",
    badgeRightDesc: "Feitos com farinha de amêndoas",
    color: "#5EBCB6"
  }
];

export default function Hero({ onNavigate }: HeroProps) {
  const [activeCreationIndex, setActiveCreationIndex] = useState(0);
  const active = HERO_CREATIONS[activeCreationIndex];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDFBF7] to-[#FFF] pt-12 pb-20">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-[#C4956A] opacity-[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D6C4B0] opacity-[0.06] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content Block */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-[#3D2B1F]/5 border border-[#3D2B1F]/10 rounded-full px-3 py-1.5" id="hero-badge">
              <Sparkles className="w-4 h-4 text-[#C4956A]" />
              <span className="text-xs font-mono font-semibold tracking-wider text-[#3D2B1F] uppercase">
                Alta Confeitaria Artesanal
              </span>
            </div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-[#3D2B1F] leading-[0.95] tracking-tight">
              Arte em <br />
              <span className="italic text-[#C4956A] relative inline-block">
                Açúcar.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#3D2B1F]/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Na <strong className="text-[#3D2B1F]">Muniz Confeitaria</strong>, transformamos açúcar, afeto e os melhores ingredientes em obras de arte comestíveis. Criamos bolos de festas espetaculares, doces finos incomparáveis e tortas de dar água na boca.
            </p>

            {/* Quick Badges */}
            <div className="grid grid-cols-3 gap-4 py-3 border-y border-[#E5DACE]/60 max-w-xl mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <Heart className="w-5 h-5 text-[#C4956A] mb-1" />
                <span className="text-[11px] font-mono uppercase text-[#D6C4B0] font-bold">100% Artesanal</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <Sparkles className="w-5 h-5 text-[#C4956A] mb-1" />
                <span className="text-[11px] font-mono uppercase text-[#D6C4B0] font-bold">Premium Callebaut</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <Award className="w-5 h-5 text-[#C4956A] mb-1" />
                <span className="text-[11px] font-mono uppercase text-[#D6C4B0] font-bold">Design Exclusivo</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate("atelie")}
                className="w-full sm:w-auto px-8 py-4 bg-[#3D2B1F] hover:bg-[#C4956A] text-white text-sm font-semibold rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-[1.03] duration-200 flex items-center justify-center space-x-2"
                id="hero-btn-atelie"
              >
                <span>Monte Seu Bolo dos Sonhos 🎨</span>
                <ArrowRight className="w-4 h-4 text-[#F3E6D5]" />
              </button>

              <button
                onClick={() => onNavigate("menu")}
                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-[#3D2B1F]/5 border-2 border-[#3D2B1F] text-[#3D2B1F] text-sm font-semibold rounded-full transition-all duration-200"
                id="hero-btn-menu"
              >
                Explorar Cardápio 📖
              </button>
            </div>
          </div>

          {/* Graphical/Image Showcase Block (Replaced with interactive premium composition) */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-square" id="interactive-hero-showcase">
              
              {/* Back Soft Glow & Gold Rotating Circle */}
              <div className="absolute -inset-4 bg-amber-100/30 rounded-full filter blur-xl opacity-70 -z-10" />
              <div className="absolute inset-0 rounded-full border border-dashed border-[#C4956A]/30 animate-[spin_80s_linear_infinite]" />
              
              {/* Floating Badge Left (Dynamic) */}
              <div 
                className="absolute -left-6 top-1/4 bg-[#FFF] border border-[#E5DACE] rounded-2xl p-3 shadow-xl z-20 flex items-center space-x-2 transition-all duration-500 transform hover:scale-105"
                key={`left-badge-${active.id}`}
              >
                <span className="text-2xl animate-pulse">{active.badgeLeftEmoji}</span>
                <div>
                  <h4 className="text-[10px] font-bold text-[#3D2B1F] uppercase tracking-wide">{active.badgeLeftTitle}</h4>
                  <p className="text-[8px] text-[#C4956A] font-bold">{active.badgeLeftDesc}</p>
                </div>
              </div>

              {/* Floating Badge Right (Dynamic) */}
              <div 
                className="absolute -right-6 bottom-1/4 bg-[#FFF] border border-[#E5DACE] rounded-2xl p-3 shadow-xl z-20 flex items-center space-x-2 transition-all duration-500 transform hover:scale-105"
                key={`right-badge-${active.id}`}
              >
                <span className="text-2xl animate-pulse">{active.badgeRightEmoji}</span>
                <div>
                  <h4 className="text-[10px] font-bold text-[#3D2B1F] uppercase tracking-wide">{active.badgeRightTitle}</h4>
                  <p className="text-[8px] text-[#C4956A] font-bold">{active.badgeRightDesc}</p>
                </div>
              </div>

              {/* Central Main Image Container with Elegant Overlay */}
              <div className="absolute inset-4 rounded-[60px] rounded-br-none overflow-hidden border-8 border-white shadow-2xl z-10 group bg-[#FAF7F2] transition-all duration-500">
                <img
                  src={active.image}
                  alt={active.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  id="hero-showcase-img"
                  key={active.image}
                />
                
                {/* Visual Label overlay at the bottom */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white flex flex-col justify-end">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#E6C594] font-bold">
                    {active.tag}
                  </span>
                  <h3 className="text-lg font-serif font-bold tracking-tight">
                    {active.name}
                  </h3>
                </div>
              </div>

              {/* Decorative Ribbon Accent */}
              <div className="absolute top-2 right-8 bg-[#3D2B1F] text-[#F3E6D5] px-4 py-1.5 rounded-full text-[9px] font-mono tracking-widest uppercase shadow-md z-20 border border-[#C4956A]/20">
                ★ RECEITA EXCLUSIVA
              </div>
            </div>

            {/* Interactive Showcase Selector dots / thumbnail controls */}
            <div className="mt-8 flex items-center justify-center space-x-4 bg-white/80 border border-[#E5DACE]/60 px-5 py-2.5 rounded-full shadow-md z-20 backdrop-blur-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D2B1F]/60">SABORES:</span>
              <div className="flex items-center space-x-3">
                {HERO_CREATIONS.map((creation, idx) => (
                  <button
                    key={creation.id}
                    onClick={() => setActiveCreationIndex(idx)}
                    className={`relative w-8 h-8 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                      activeCreationIndex === idx 
                        ? "border-[#3D2B1F] scale-110 shadow-md" 
                        : "border-[#E5DACE]/60 opacity-60 hover:opacity-95"
                    }`}
                    title={creation.name}
                  >
                    <img 
                      src={creation.image} 
                      alt={creation.name} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
