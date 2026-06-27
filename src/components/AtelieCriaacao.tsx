import { useState, useEffect } from "react";
import { CAKE_TOPPINGS, CAKE_DECORATIONS, CANDY_BOX_SIZES, BUSINESS_INFO } from "../data";
import { CakeBuilderState, CandyBoxState, CakeBaseOption, CakeFillingOption, CandyOption } from "../types";
import { Trash, Check, ArrowRight, Plus, Minus } from "lucide-react";

interface AtelieCriaacaoProps {
  bases: CakeBaseOption[];
  fillings: CakeFillingOption[];
  candyOptions: CandyOption[];
}

export default function AtelieCriaacao({ bases, fillings, candyOptions }: AtelieCriaacaoProps) {
  const [activeTab, setActiveTab] = useState<"cake" | "candy">("cake");

  // Filter available items for default selections
  const availableBases = bases.filter(b => !b.outOfStock);
  const availableFillings = fillings.filter(f => !f.outOfStock);

  // ==========================================
  // STATE & LOGIC: CAKE CUSTOMIZER
  // ==========================================
  const [cakeState, setCakeState] = useState<CakeBuilderState>({
    tiers: 2,
    base: "",
    filling: "",
    topping: "top-chantininho",
    decorations: ["dec-morangos"],
    servings: 20
  });

  // Ensure default selection is always set and is an in-stock option
  useEffect(() => {
    if (availableBases.length > 0 && !cakeState.base) {
      setCakeState(prev => ({ ...prev, base: availableBases[0].id }));
    }
  }, [bases]);

  useEffect(() => {
    if (availableFillings.length > 0 && !cakeState.filling) {
      setCakeState(prev => ({ ...prev, filling: availableFillings[0].id }));
    }
  }, [fillings]);

  const activeBase = bases.find((b) => b.id === cakeState.base) || bases[0] || { id: "", name: "Massa", color: "#FDFBF7", price: 0, description: "" };
  const activeFilling = fillings.find((f) => f.id === cakeState.filling) || fillings[0] || { id: "", name: "Recheio", color: "#FDFBF7", price: 0, description: "" };
  const activeTopping = CAKE_TOPPINGS.find((t) => t.id === cakeState.topping) || CAKE_TOPPINGS[0];
  const activeDecs = CAKE_DECORATIONS.filter((d) => cakeState.decorations.includes(d.id));

  // Compute Cake Price
  const getCakePrice = () => {
    let basePrice = 50; // standard starting overhead
    const baseCost = activeBase?.price || 0;
    const fillingCost = activeFilling?.price || 0;
    const toppingCost = activeTopping?.price || 0;
    const decsCost = activeDecs.reduce((sum, d) => sum + d.price, 0);

    const costPerTier = baseCost + fillingCost + toppingCost + decsCost;
    return basePrice + (costPerTier * cakeState.tiers * 0.85); // discount factor for multi-tiers
  };

  const getCakeWeight = () => {
    return cakeState.tiers * 1.2; // roughly 1.2kg per tier
  };

  const getCakeServings = () => {
    return Math.round(getCakeWeight() * 10);
  };

  const toggleCakeDecoration = (decId: string) => {
    setCakeState((prev) => {
      const exists = prev.decorations.includes(decId);
      const updated = exists
        ? prev.decorations.filter((id) => id !== decId)
        : [...prev.decorations, decId];
      return { ...prev, decorations: updated };
    });
  };

  const handleCakeSubmit = () => {
    if (activeBase.outOfStock || activeFilling.outOfStock) {
      alert("Desculpe, uma das opções selecionadas está em falta no momento. Por favor, escolha outro sabor!");
      return;
    }

    const decList = activeDecs.map((d) => d.name).join(", ");
    const weightStr = getCakeWeight().toFixed(1);
    const priceStr = getCakePrice().toFixed(2);

    const message = `Olá, Muniz Confeitaria! Montei o meu *Bolo Personalizado* no Ateliê Digital do seu site e gostaria de fazer o orçamento:\n\n` +
      `🎂 *Bolo Personalizado de ${cakeState.tiers} Andar(es)*\n` +
      `- *Massa:* ${activeBase.name}\n` +
      `- *Recheio:* ${activeFilling.name}\n` +
      `- *Cobertura:* ${activeTopping.name}\n` +
      `- *Adicionais/Decoração:* ${decList || "Apenas cobertura simples"}\n` +
      `- *Peso Estimado:* ~${weightStr}kg (${getCakeServings()} fatias)\n` +
      `- *Valor Estimado:* R$ ${priceStr}\n\n` +
      `Gostaria de saber se vocês têm disponibilidade para encomenda!`;

    const whatsappLink = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };


  // ==========================================
  // STATE & LOGIC: CANDY BOX CUSTOMIZER
  // ==========================================
  const [candyBoxState, setCandyBoxState] = useState<CandyBoxState>({
    sizeId: "box-12",
    items: {}
  });

  const activeSize = CANDY_BOX_SIZES.find((s) => s.id === candyBoxState.sizeId) || CANDY_BOX_SIZES[0];

  const getFilledCount = (): number => {
    return Object.entries(candyBoxState.items).reduce((sum, [candyId, q]) => {
      const candy = candyOptions.find(c => c.id === candyId);
      return sum + (candy && !candy.outOfStock ? Number(q) : 0);
    }, 0);
  };

  const getCandyQuantity = (candyId: string) => {
    const candy = candyOptions.find(c => c.id === candyId);
    if (candy?.outOfStock) return 0;
    return candyBoxState.items[candyId] || 0;
  };

  const updateCandyQuantity = (candyId: string, delta: number) => {
    const candy = candyOptions.find(c => c.id === candyId);
    if (candy?.outOfStock) return;

    const currentFilled = getFilledCount();
    const currentQty = getCandyQuantity(candyId);
    
    // Boundary checks
    if (delta > 0 && currentFilled >= activeSize.quantity) return; // box is full
    if (delta < 0 && currentQty <= 0) return; // can't subtract below 0

    setCandyBoxState((prev) => {
      const updatedItems = { ...prev.items };
      const newQty = currentQty + delta;
      
      if (newQty <= 0) {
        delete updatedItems[candyId];
      } else {
        updatedItems[candyId] = newQty;
      }

      return { ...prev, items: updatedItems };
    });
  };

  const clearCandyBox = () => {
    setCandyBoxState((prev) => ({ ...prev, items: {} }));
  };

  const handleCandyBoxSubmit = () => {
    const filledCount = getFilledCount();
    if (filledCount === 0) return;

    let itemsDescription = "";
    Object.entries(candyBoxState.items).forEach(([candyId, qty]) => {
      const candy = candyOptions.find((c) => c.id === candyId);
      if (candy && !candy.outOfStock) {
        itemsDescription += `- *${qty}x* ${candy.name}\n`;
      }
    });

    const priceStr = activeSize.price.toFixed(2);

    const message = `Olá, Muniz Confeitaria! Montei a minha *Caixinha de Doces Gourmet* no Ateliê Digital do site e gostaria de encomendar:\n\n` +
      `📦 *${activeSize.name}*\n` +
      `Preenchimento: ${filledCount}/${activeSize.quantity} docinhos:\n` +
      `${itemsDescription}\n` +
      `*Valor Total:* R$ ${priceStr}\n\n` +
      `Podem verificar a disponibilidade?`;

    const whatsappLink = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <section className="py-16 bg-[#FDFBF7]" id="atelie-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro */}
        <div className="text-center space-y-4 mb-10">
          <p className="text-xs font-mono uppercase tracking-widest text-[#C4956A]">Monte do Seu Jeito</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D2B1F]">
            Ateliê Digital de Criação 🎨
          </h2>
          <p className="text-sm text-[#3D2B1F]/80 max-w-2xl mx-auto font-sans leading-relaxed">
            Experimente nossa ferramenta interativa exclusiva! Projete o seu bolo ideal em camadas ou componha a sua caixinha perfeita de docinhos gourmets finos, vendo as cores, recheios e preços mudarem em tempo real de acordo com nossa disponibilidade.
          </p>
        </div>

        {/* Builder Type Tabs */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#E5DACE]/60 p-1 rounded-full flex space-x-1 border border-[#E5DACE]">
            <button
              onClick={() => setActiveTab("cake")}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "cake"
                  ? "bg-[#3D2B1F] text-white shadow"
                  : "text-[#3D2B1F]/70 hover:text-[#3D2B1F]"
              }`}
            >
              🎂 Bolo Personalizado
            </button>
            <button
              onClick={() => setActiveTab("candy")}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "candy"
                  ? "bg-[#3D2B1F] text-white shadow"
                  : "text-[#3D2B1F]/70 hover:text-[#3D2B1F]"
              }`}
            >
              📦 Caixinha de Doces
            </button>
          </div>
        </div>

        {/* Active Builder Workspace */}
        {activeTab === "cake" ? (
          /* ==========================================
              CAKE BUILDER INTERFACE
             ========================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="cake-builder-workspace">
            
            {/* Left Column: Visual Stacking Render */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E5DACE]/80 p-6 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
              <div className="absolute top-4 left-4 z-10 flex items-center space-x-1.5 bg-[#FDFBF7] border border-[#E5DACE] px-2.5 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold font-mono uppercase text-[#D6C4B0]">Maquete Digital</span>
              </div>

              {/* Stacked Cake Container */}
              <div className="flex-1 flex flex-col items-center justify-center pt-10 pb-6 relative">
                
                {/* Dynamic Decs Float Layer */}
                <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                  {activeDecs.map((d, idx) => (
                    <div
                      key={d.id}
                      className="absolute text-3xl transition-all duration-1000 select-none animate-[bounce_4s_infinite_ease-in-out]"
                      style={{
                        top: idx === 0 ? "20%" : idx === 1 ? "40%" : idx === 2 ? "10%" : "60%",
                        left: idx === 0 ? "15%" : idx === 1 ? "80%" : idx === 2 ? "70%" : "10%",
                        animationDelay: `${idx * 0.5}s`
                      }}
                    >
                      {d.icon}
                    </div>
                  ))}
                  {/* Decorative sprinkles floating */}
                  {cakeState.decorations.includes("dec-ouro") && (
                    <div className="absolute inset-0 bg-[radial-gradient(circle,_#d4af37_1px,_transparent_1px)] bg-[size:16px_16px] opacity-25" />
                  )}
                </div>

                {/* Stacking rendering logic */}
                <div className="w-full max-w-[280px] flex flex-col items-center justify-end space-y-0.5 mt-8">
                  
                  {/* TIER 3 (Top - Small) - Only if 3 tiers */}
                  {cakeState.tiers >= 3 && (
                    <div className="w-2/3 flex flex-col items-center group relative transition-all duration-500">
                      {/* Top Topping Crown */}
                      <div 
                        className="w-[96%] h-3 rounded-t-full relative -mb-1 z-10 filter brightness-105"
                        style={{ backgroundColor: activeTopping.color }}
                      />
                      {/* Cake Cylinder */}
                      <div 
                        className="w-full h-14 rounded-md relative flex flex-col justify-between py-1 px-3 border border-black/5 shadow-inner"
                        style={{ backgroundColor: activeBase?.color || "#F9F6EE" }}
                      >
                        {/* Filling Middle Stripe */}
                        <div 
                          className="w-full h-3 rounded-sm my-auto opacity-90 border-y border-black/10"
                          style={{ backgroundColor: activeFilling?.color || "#FFFDD0" }}
                          title={`Recheio: ${activeFilling?.name || ""}`}
                        />
                      </div>
                    </div>
                  )}

                  {/* TIER 2 (Middle - Medium) - If 2 or 3 tiers */}
                  {cakeState.tiers >= 2 && (
                    <div className="w-5/6 flex flex-col items-center group relative transition-all duration-500">
                      {/* Topping Crown */}
                      <div 
                        className="w-[96%] h-3 rounded-t-full relative -mb-1 z-10 filter brightness-105"
                        style={{ backgroundColor: activeTopping.color }}
                      />
                      {/* Cake Cylinder */}
                      <div 
                        className="w-full h-16 rounded-md relative flex flex-col justify-between py-1 px-3 border border-black/5 shadow-inner"
                        style={{ backgroundColor: activeBase?.color || "#F9F6EE" }}
                      >
                        {/* Filling Middle Stripe */}
                        <div 
                          className="w-full h-4 rounded-sm my-auto opacity-90 border-y border-black/10"
                          style={{ backgroundColor: activeFilling?.color || "#FFFDD0" }}
                          title={`Recheio: ${activeFilling?.name || ""}`}
                        />
                      </div>
                    </div>
                  )}

                  {/* TIER 1 (Bottom - Large) - Always present */}
                  <div className="w-full flex flex-col items-center group relative transition-all duration-500">
                    {/* Topping Crown */}
                    <div 
                      className="w-[96%] h-3 rounded-t-full relative -mb-1 z-10 filter brightness-105"
                      style={{ backgroundColor: activeTopping.color }}
                    />
                    {/* Cake Cylinder */}
                    <div 
                      className="w-full h-20 rounded-md relative flex flex-col justify-between py-1.5 px-4 border border-black/5 shadow-md shadow-black/10"
                      style={{ backgroundColor: activeBase?.color || "#F9F6EE" }}
                    >
                      {/* Filling Stripes */}
                      <div 
                        className="w-full h-3 rounded-sm opacity-90 border-y border-black/10"
                        style={{ backgroundColor: activeFilling?.color || "#FFFDD0" }}
                      />
                      <div 
                        className="w-full h-3 rounded-sm opacity-90 border-y border-black/10"
                        style={{ backgroundColor: activeFilling?.color || "#FFFDD0" }}
                      />
                    </div>
                  </div>

                  {/* Cake Plate Base */}
                  <div className="w-[110%] h-4 bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 rounded-full border border-stone-300 shadow-md flex items-center justify-center">
                    <span className="text-[7px] font-mono tracking-widest text-[#D6C4B0] uppercase">MUNIZ CONFEITARIA</span>
                  </div>
                </div>

              </div>

              {/* Cake Summary Bar */}
              <div className="border-t border-[#E5DACE] pt-4 mt-4 grid grid-cols-3 gap-2 text-center bg-[#FDFBF7] p-3 rounded-2xl">
                <div>
                  <span className="block text-[9px] font-mono uppercase text-[#D6C4B0]">Peso Mínimo</span>
                  <strong className="text-xs text-[#3D2B1F]">{getCakeWeight().toFixed(1)} Kg</strong>
                </div>
                <div>
                  <span className="block text-[9px] font-mono uppercase text-[#D6C4B0]">Rendimento</span>
                  <strong className="text-xs text-[#3D2B1F]">~{getCakeServings()} fatias</strong>
                </div>
                <div>
                  <span className="block text-[9px] font-mono uppercase text-[#D6C4B0]">Preço Estimado</span>
                  <strong className="text-xs text-emerald-600">R$ {getCakePrice().toFixed(2)}</strong>
                </div>
              </div>
            </div>

            {/* Right Column: Customizer Selector Panels */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-6 bg-white rounded-3xl border border-[#E5DACE]/80 p-6 sm:p-8 max-h-[500px] overflow-y-auto custom-scrollbar">
                
                {/* 1. Select Tiers */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-[#D6C4B0]">
                    1. Quantidade de Andares
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((num) => (
                      <button
                        key={num}
                        onClick={() => setCakeState((prev) => ({ ...prev, tiers: num }))}
                        className={`py-3 px-4 rounded-2xl text-xs font-bold transition-all ${
                          cakeState.tiers === num
                            ? "bg-[#3D2B1F] text-white border-transparent shadow-md"
                            : "bg-[#FDFBF7] text-[#3D2B1F]/85 border border-[#E5DACE] hover:bg-[#E5DACE]"
                        }`}
                      >
                        {num} Andar{num > 1 ? "es" : ""}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Select Cake Base (Massa) */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-[#D6C4B0]">
                    2. Escolha a Massa
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {bases.map((b) => (
                      <button
                        key={b.id}
                        disabled={b.outOfStock}
                        onClick={() => setCakeState((prev) => ({ ...prev, base: b.id }))}
                        className={`flex items-start p-3 rounded-2xl text-left border transition-all ${
                          b.outOfStock
                            ? "bg-stone-50 border-stone-200 opacity-60 cursor-not-allowed"
                            : cakeState.base === b.id
                            ? "border-[#C4956A] bg-[#FDFBF7]"
                            : "border-[#E5DACE] hover:bg-[#FDFBF7]"
                        }`}
                      >
                        <span 
                          className="w-5 h-5 rounded-full border border-black/10 shrink-0 mt-0.5 mr-2.5 shadow-inner"
                          style={{ backgroundColor: b.color }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-[#3D2B1F]">{b.name}</p>
                            {b.outOfStock && (
                              <span className="text-[8px] bg-red-100 text-red-600 font-bold px-1 rounded">Em falta</span>
                            )}
                          </div>
                          <p className="text-[10px] text-[#3D2B1F]/70 leading-snug">{b.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Select Filling (Recheio) */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-[#D6C4B0]">
                    3. Escolha o Recheio Interno
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {fillings.map((f) => (
                      <button
                        key={f.id}
                        disabled={f.outOfStock}
                        onClick={() => setCakeState((prev) => ({ ...prev, filling: f.id }))}
                        className={`flex items-start p-3 rounded-2xl text-left border transition-all ${
                          f.outOfStock
                            ? "bg-stone-50 border-stone-200 opacity-60 cursor-not-allowed"
                            : cakeState.filling === f.id
                            ? "border-[#C4956A] bg-[#FDFBF7]"
                            : "border-[#E5DACE] hover:bg-[#FDFBF7]"
                        }`}
                      >
                        <span 
                          className="w-5 h-5 rounded-full border border-black/10 shrink-0 mt-0.5 mr-2.5 shadow-inner"
                          style={{ backgroundColor: f.color }}
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-[#3D2B1F]">{f.name}</p>
                            {f.outOfStock && (
                              <span className="text-[8px] bg-red-100 text-red-600 font-bold px-1 rounded">Em falta</span>
                            )}
                          </div>
                          <p className="text-[10px] text-[#3D2B1F]/70 leading-snug">{f.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Select Topping (Cobertura) */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-[#D6C4B0]">
                    4. Escolha a Cobertura Externa
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CAKE_TOPPINGS.map((t) => (
                      <button
                        key={t.id}
                        disabled={t.outOfStock}
                        onClick={() => setCakeState((prev) => ({ ...prev, topping: t.id }))}
                        className={`p-3 rounded-2xl text-left border transition-all ${
                          t.outOfStock
                            ? "bg-stone-50 border-stone-200 opacity-60 cursor-not-allowed"
                            : cakeState.topping === t.id
                            ? "border-[#C4956A] bg-[#FDFBF7]"
                            : "border-[#E5DACE] hover:bg-[#FDFBF7]"
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          <span 
                            className="w-4.5 h-4.5 rounded-full border border-black/10 shadow-inner"
                            style={{ backgroundColor: t.color }}
                          />
                          <p className="text-xs font-bold text-[#3D2B1F] truncate">{t.name}</p>
                        </div>
                        <p className="text-[10px] text-[#3D2B1F]/70 leading-tight line-clamp-2">{t.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Select Decorations (Decorações Adicionais) */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-[#D6C4B0]">
                    5. Escolha os Adereços & Decorações (Múltiplas Opções)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CAKE_DECORATIONS.map((d) => {
                      const selected = cakeState.decorations.includes(d.id);
                      return (
                        <button
                          key={d.id}
                          disabled={d.outOfStock}
                          onClick={() => toggleCakeDecoration(d.id)}
                          className={`flex items-start p-3 rounded-2xl text-left border transition-all ${
                            d.outOfStock
                              ? "bg-stone-50 border-stone-200 opacity-60 cursor-not-allowed"
                              : selected
                              ? "border-[#C4956A] bg-[#FDFBF7]"
                              : "border-[#E5DACE] hover:bg-[#FDFBF7]"
                          }`}
                        >
                          <span className="text-xl shrink-0 mt-0.5 mr-3">{d.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-bold text-[#3D2B1F]">{d.name}</p>
                              {selected && <Check className="w-3.5 h-3.5 text-[#C4956A]" />}
                            </div>
                            <p className="text-[10px] text-[#3D2B1F]/70 leading-snug">{d.description}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Direct Purchase Button */}
              <button
                onClick={handleCakeSubmit}
                disabled={activeBase?.outOfStock || activeFilling?.outOfStock}
                className={`w-full py-4 font-bold text-sm rounded-full shadow-lg transition-all flex items-center justify-center space-x-2 ${
                  activeBase?.outOfStock || activeFilling?.outOfStock
                    ? "bg-stone-300 text-stone-500 cursor-not-allowed shadow-none"
                    : "bg-[#25D366] hover:bg-[#20ba56] text-white hover:scale-[1.01]"
                }`}
                id="submit-cake-btn"
              >
                <span>Encomendar este Bolo Personalizado via WhatsApp 💬</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ) : (
          /* ==========================================
              CANDY BOX BUILDER INTERFACE
             ========================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="candy-builder-workspace">
            
            {/* Left Column: Candy Box Grid Visualizer */}
            <div className="lg:col-span-6 bg-white rounded-3xl border border-[#E5DACE]/80 p-6 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
              
              <div className="flex items-center justify-between border-b border-[#E5DACE] pb-4 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-[#3D2B1F]">Caixinha Montada</h3>
                  <p className="text-[10px] text-[#D6C4B0] uppercase font-mono tracking-wider">
                    {getFilledCount()} de {activeSize.quantity} Doces Adicionados
                  </p>
                </div>
                {getFilledCount() > 0 && (
                  <button
                    onClick={clearCandyBox}
                    className="flex items-center space-x-1 text-xs text-red-500 hover:text-red-700 font-medium"
                  >
                    <Trash className="w-3.5 h-3.5" />
                    <span>Esvaziar</span>
                  </button>
                )}
              </div>

              {/* Candy Slots Grid */}
              <div className="flex-1 flex items-center justify-center bg-[#FDFBF7] rounded-2xl p-6 relative">
                <div 
                  className="grid gap-3 w-full max-w-[320px] justify-center"
                  style={{
                    gridTemplateColumns: `repeat(${activeSize.quantity <= 12 ? 4 : activeSize.quantity <= 24 ? 6 : 8}, minmax(0, 1fr))`
                  }}
                >
                  {Array.from({ length: activeSize.quantity }).map((_, idx) => {
                    const flatItems: string[] = [];
                    Object.entries(candyBoxState.items).forEach(([candyId, qty]) => {
                      const numQty = qty as number;
                      const candy = candyOptions.find(c => c.id === candyId);
                      if (candy && !candy.outOfStock) {
                        for (let i = 0; i < numQty; i++) flatItems.push(candyId);
                      }
                    });

                    const candyIdAtSlot = flatItems[idx];
                    const candyOption = candyIdAtSlot ? candyOptions.find((c) => c.id === candyIdAtSlot) : null;

                    return (
                      <div
                        key={idx}
                        className={`aspect-square rounded-full flex items-center justify-center transition-all duration-300 relative ${
                          candyOption 
                            ? "shadow-md hover:scale-110 cursor-help" 
                            : "bg-[#E5DACE]/50 border-2 border-dashed border-[#E5DACE]"
                        }`}
                        style={candyOption ? { backgroundColor: candyOption.color } : {}}
                        title={candyOption ? candyOption.name : "Vago"}
                      >
                        {candyOption ? (
                          <span className="text-base sm:text-lg select-none">{candyOption.emoji}</span>
                        ) : (
                          <span className="text-[9px] font-mono text-[#D6C4B0]">{idx + 1}</span>
                        )}

                        {candyOption && (
                          <div className="absolute top-1 left-1 w-2 h-2 bg-white/20 rounded-full blur-[0.5px]" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Candy Progress Meter */}
              <div className="mt-4 pt-4 border-t border-[#E5DACE] space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[#3D2B1F]/70">Preenchimento</span>
                  <span className={`${getFilledCount() === activeSize.quantity ? "text-emerald-600" : "text-[#C4956A]"}`}>
                    {getFilledCount()} / {activeSize.quantity} unidades
                  </span>
                </div>
                <div className="w-full h-2 bg-[#E5DACE] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#C4956A] to-[#3D2B1F] transition-all duration-500 rounded-full"
                    style={{ width: `${(getFilledCount() / activeSize.quantity) * 100}%` }}
                  />
                </div>
              </div>

            </div>

            {/* Right Column: Sweet Selector list */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              
              <div className="bg-white rounded-3xl border border-[#E5DACE]/80 p-6 sm:p-8 space-y-6">
                
                {/* Size Selector */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-[#D6C4B0]">
                    1. Escolha o Tamanho da Caixa
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {CANDY_BOX_SIZES.map((size) => (
                      <button
                        key={size.id}
                        onClick={() => {
                          setCandyBoxState({
                            sizeId: size.id,
                            items: {} // clear elements on resize
                          });
                        }}
                        className={`p-3 rounded-2xl text-left border transition-all ${
                          candyBoxState.sizeId === size.id
                            ? "border-[#C4956A] bg-[#FDFBF7] shadow-sm"
                            : "border-[#E5DACE] hover:bg-[#FDFBF7]"
                        }`}
                      >
                        <p className="text-xs font-bold text-[#3D2B1F]">{size.name}</p>
                        <p className="text-[10px] text-emerald-600 font-bold font-mono font-sans">R$ {size.price.toFixed(2)}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sweets Selection list */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-[#D6C4B0]">
                    2. Adicione os Sabores de Docinhos Finos
                  </h3>
                  <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                    {candyOptions.map((c) => {
                      const qty = getCandyQuantity(c.id);
                      return (
                        <div
                          key={c.id}
                          className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                            c.outOfStock
                              ? "bg-stone-50 border-stone-200 opacity-60"
                              : "bg-[#FDFBF7] border-[#E5DACE]/60"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <span 
                              className="w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-inner shrink-0"
                              style={{ backgroundColor: c.color }}
                            >
                              {c.outOfStock ? "🛑" : c.emoji}
                            </span>
                            <div>
                              <div className="flex items-center space-x-1.5">
                                <p className="text-xs font-bold text-[#3D2B1F]">{c.name}</p>
                                {c.outOfStock && (
                                  <span className="text-[8px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded uppercase font-mono">Em falta</span>
                                )}
                              </div>
                              <p className="text-[10px] text-[#3D2B1F]/70 leading-snug">{c.description}</p>
                            </div>
                          </div>

                          {/* Plus / Minus Buttons */}
                          {!c.outOfStock && (
                            <div className="flex items-center space-x-3 bg-white border border-[#E5DACE] rounded-full p-1 shadow-sm shrink-0">
                              <button
                                onClick={() => updateCandyQuantity(c.id, -1)}
                                disabled={qty === 0}
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-[#3D2B1F] transition-colors ${
                                  qty === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-[#E5DACE]"
                                }`}
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold w-4 text-center">{qty}</span>
                              <button
                                onClick={() => updateCandyQuantity(c.id, 1)}
                                disabled={getFilledCount() >= activeSize.quantity}
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-[#3D2B1F] transition-colors ${
                                  getFilledCount() >= activeSize.quantity ? "opacity-30 cursor-not-allowed" : "hover:bg-[#E5DACE]"
                                }`}
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Submit Button */}
              <button
                onClick={handleCandyBoxSubmit}
                disabled={getFilledCount() === 0}
                className={`w-full py-4 font-bold text-sm rounded-full shadow-lg transition-all flex items-center justify-center space-x-2 ${
                  getFilledCount() === 0
                    ? "bg-[#E5DACE] text-stone-400 cursor-not-allowed shadow-none"
                    : "bg-[#25D366] hover:bg-[#20ba56] text-white hover:scale-[1.01]"
                }`}
              >
                <span>Encomendar Caixinha via WhatsApp 💬</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
