import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import AtelieCriaacao from "./components/AtelieCriaacao";
import Footer from "./components/Footer";
import AdminPanel from "./components/AdminPanel";
import { BUSINESS_INFO, MENU_ITEMS, CAKE_BASES, CAKE_FILLINGS, CANDY_OPTIONS } from "./data";
import { MenuItem, CakeBaseOption, CakeFillingOption, CandyOption } from "./types";
import { Sparkles, Phone, Heart, Award, MapPin } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [cart, setCart] = useState<{ [itemId: string]: number }>({});

  // Route state
  const [isAdminView, setIsAdminView] = useState(() => {
    return window.location.pathname === "/admin";
  });

  // CRM live database states (persisted via localStorage)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem("muniz_menu_items");
    return saved ? JSON.parse(saved) : MENU_ITEMS;
  });

  const [cakeBases, setCakeBases] = useState<CakeBaseOption[]>(() => {
    const saved = localStorage.getItem("muniz_cake_bases");
    return saved ? JSON.parse(saved) : CAKE_BASES;
  });

  const [cakeFillings, setCakeFillings] = useState<CakeFillingOption[]>(() => {
    const saved = localStorage.getItem("muniz_cake_fillings");
    return saved ? JSON.parse(saved) : CAKE_FILLINGS;
  });

  const [candyOptions, setCandyOptions] = useState<CandyOption[]>(() => {
    const saved = localStorage.getItem("muniz_candy_options");
    return saved ? JSON.parse(saved) : CANDY_OPTIONS;
  });

  // Listen to browser navigation changes
  useEffect(() => {
    const handlePopState = () => {
      setIsAdminView(window.location.pathname === "/admin");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigateToHome = () => {
    window.history.pushState({}, "", "/");
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateCart = (itemId: string, quantity: number) => {
    setCart((prev) => {
      const updated = { ...prev };
      if (quantity <= 0) {
        delete updated[itemId];
      } else {
        updated[itemId] = quantity;
      }
      return updated;
    });
  };

  const handleNavigation = (section: string) => {
    setActiveSection(section);
    
    // Smooth scroll to elements
    const elementId = section === "home" ? "root" : `${section}-section`;
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formatWhatsappLink = (text: string) => {
    return `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  // Render dedicated Admin/CRM view
  if (isAdminView) {
    return (
      <div className="min-h-screen bg-[#FAF7F2]">
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1A120B] via-[#C29B38] to-[#1A120B]" />
        <AdminPanel
          menuItems={menuItems}
          setMenuItems={setMenuItems}
          cakeBases={cakeBases}
          setCakeBases={setCakeBases}
          cakeFillings={cakeFillings}
          setCakeFillings={setCakeFillings}
          candyOptions={candyOptions}
          setCandyOptions={setCandyOptions}
          onExit={handleNavigateToHome}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF] text-[#1A120B] selection:bg-[#E6C594] selection:text-[#1A120B] font-sans antialiased">
      {/* Decorative Top Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#1A120B] via-[#C29B38] to-[#1A120B]" />

      {/* Main Header */}
      <Header onNavigate={handleNavigation} activeSection={activeSection} />

      {/* Hero Presentation */}
      <div id="home-section">
        <Hero onNavigate={handleNavigation} />
      </div>

      {/* Main Attention-Grabbing Tool: Ateliê Digital de Criação */}
      <div id="atelie-section">
        <AtelieCriaacao bases={cakeBases} fillings={cakeFillings} candyOptions={candyOptions} />
      </div>

      {/* Interactive Products Menu */}
      <div id="menu-section">
        <Menu 
          menuItems={menuItems}
          cart={cart} 
          onUpdateCart={handleUpdateCart} 
          onNavigateToAtelie={() => handleNavigation("atelie")} 
        />
      </div>

      {/* Social Verification Block / Google Perfil Details */}
      <section className="py-16 bg-[#FAF7F2] border-y border-[#EBE4D8]/60" id="sobre-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C29B38]">
                Nossa Confeitaria Fina
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A120B]">
                Tradição Muniz no Google Negócios
              </h2>
              <p className="text-sm text-[#5C4D3C] leading-relaxed font-sans">
                A Muniz Confeitaria é reconhecida pela dedicação ao paladar e carinho em cada detalhe. Cada receita é elaborada com insumos altamente selecionados, desde frutas colhidas no ponto ótimo de doçura até chocolates nobres de padrão internacional.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                    ⭐
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1A120B] uppercase">Avaliação de Excelência</h4>
                    <p className="text-[11px] text-[#5C4D3C]">Aprovado pela comunidade no Google com avaliações calorosas e nota máxima de aprovação.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-[#C29B38] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1A120B] uppercase">Localização Atendida</h4>
                    <p className="text-[11px] text-[#5C4D3C]">
                      Localizados no endereço: {BUSINESS_INFO.address}. Próximo a você para retirada segura ou entrega agendada.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <a
                  href={BUSINESS_INFO.googleBusinessLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-[#1A120B] hover:bg-[#C29B38] text-white text-xs font-bold rounded-full transition-all duration-300 shadow-md"
                  id="google-negocios-cta"
                >
                  <span>Conhecer Perfil no Google Negócios 🌟</span>
                </a>
              </div>
            </div>

            {/* Right Content Graphic Layout */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#C29B38]/5 rounded-3xl -rotate-2 scale-105 pointer-events-none" />
              <div className="bg-white border border-[#EBE4D8] rounded-3xl p-6 sm:p-8 relative z-10 space-y-6">
                
                <div className="flex items-center justify-between border-b border-[#FAF7F2] pb-4">
                  <span className="text-[11px] font-mono uppercase text-[#9E8A78]">Atendimento Digital</span>
                  <span className="text-[11px] font-mono text-emerald-600 font-bold">● Recebendo Encomendas</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-[#FAF7F2] rounded-2xl">
                    <p className="text-xl">🎂</p>
                    <h4 className="text-xs font-bold text-[#1A120B] mt-1 uppercase">Bolos Decorados</h4>
                    <p className="text-[10px] text-[#9E8A78]">Sob encomenda prévia</p>
                  </div>
                  <div className="p-4 bg-[#FAF7F2] rounded-2xl">
                    <p className="text-xl">🍫</p>
                    <h4 className="text-xs font-bold text-[#1A120B] mt-1 uppercase">Docinhos Gourmet</h4>
                    <p className="text-[10px] text-[#9E8A78]">Centos de sabor fino</p>
                  </div>
                </div>

                <div className="p-4 bg-[#1A120B] text-white rounded-2xl text-center flex flex-col items-center justify-center space-y-2">
                  <p className="text-[10px] font-mono text-[#E6C594] uppercase tracking-wider">Encomendas via WhatsApp</p>
                  <p className="text-xs text-white/80 max-w-xs font-sans">
                    Agende sua entrega ou retirada com segurança e facilidade pelo nosso atendimento direto.
                  </p>
                  <a
                    href={formatWhatsappLink("Olá! Visitei o site de vocês e gostaria de agendar uma encomenda de bolos e doces.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 px-4 py-2 bg-[#25D366] hover:bg-[#20ba56] text-white text-[11px] font-bold rounded-full transition-transform hover:scale-105 flex items-center space-x-1.5"
                  >
                    <span>Falar com Atendimento (73) 99923-4342 💬</span>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Footer Block */}
      <Footer onNavigate={handleNavigation} />

      {/* Floating pulsing WhatsApp Action Button */}
      <a
        href={formatWhatsappLink("Olá, Muniz Confeitaria! Vi o site de vocês e gostaria de fazer uma encomenda.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20ba56] rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 group duration-300"
        id="whatsapp-floating-pulse-btn"
        title="Falar no WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" />
        
        <svg 
          className="w-7 h-7 text-white fill-current transition-transform duration-300 group-hover:rotate-12" 
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>

        <span className="absolute bottom-16 left-0 bg-[#1A120B] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-md">
          WhatsApp Muniz 💬
        </span>
      </a>

    </div>
  );
}
