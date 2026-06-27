import { MapPin, Phone, Instagram, Clock, ExternalLink, Cake } from "lucide-react";
import { BUSINESS_INFO } from "../data";
import Logo from "./Logo";

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const formatWhatsappLink = (text: string) => {
    return `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <footer className="bg-[#3D2B1F] text-white pt-16 pb-8 border-t border-[#E5DACE]/10" id="sobre-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[#E5DACE]/10 pb-12 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center" id="footer-logo">
              <Logo size="md" variant="light" className="opacity-90 hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-xs text-[#D6C4B0] leading-relaxed font-sans">
              Onde o requinte encontra o sabor. Bolos personalizados, docinhos gourmet e sobremesas memoráveis criadas de forma 100% artesanal para tornar seu momento inesquecível.
            </p>
          </div>

          {/* Column 2: Hallmarks */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#F3E6D5]">
              Nosso Padrão
            </h4>
            <div className="space-y-3.5 text-xs text-[#D6C4B0] font-sans">
              <div className="flex items-start space-x-2">
                <span className="text-base shrink-0">🍓</span>
                <div>
                  <p className="font-semibold text-white">Ingredientes Frescos</p>
                  <p className="text-[11px] leading-snug">Frutas selecionadas no ponto ideal e chocolate nobre.</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-base shrink-0">🎨</span>
                <div>
                  <p className="font-semibold text-white">Criações Exclusivas</p>
                  <p className="text-[11px] leading-snug">Bolo modelado ou caixinha gourmet sob medida para você.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Contact & Address */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#F3E6D5]">
              Onde nos Encontrar
            </h4>
            <div className="space-y-3 text-xs text-[#D6C4B0] font-sans">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#C4956A] shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {BUSINESS_INFO.address}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#C4956A] shrink-0" />
                <a 
                  href={formatWhatsappLink("Olá, Muniz! Vi o endereço de vocês no site.")} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors underline"
                >
                  WhatsApp: (73) 99923-4342
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Instagram className="w-4 h-4 text-[#C4956A] shrink-0" />
                <a 
                  href="https://www.instagram.com/munizconfeitariaoficial/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors underline"
                >
                  {BUSINESS_INFO.instagram}
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Shortcuts */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#F3E6D5]">
              Links Úteis
            </h4>
            <div className="flex flex-col space-y-2 text-xs text-[#D6C4B0] font-sans">
              <button onClick={() => onNavigate("menu")} className="text-left hover:text-white transition-colors">
                • Ver Cardápio
              </button>
              <button onClick={() => onNavigate("atelie")} className="text-left hover:text-white transition-colors">
                • Ateliê de Criação 🎨
              </button>
              <a 
                href={BUSINESS_INFO.googleBusinessLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-1 hover:text-white transition-colors text-amber-500"
                id="footer-google-biz"
              >
                <span>• Ver no Google Negócios</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#D6C4B0]/80 font-mono tracking-wider text-center sm:text-left">
          <p>© 2026 Muniz Confeitaria. Todos os direitos reservados.</p>
          <p>
            Feito para encantar corações |{" "}
            <a 
              href={BUSINESS_INFO.googleBusinessLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline text-white"
            >
              Google Perfil 🌟
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
