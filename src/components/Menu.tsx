import { useState } from "react";
import { BUSINESS_INFO } from "../data";
import { Category, MenuItem } from "../types";
import { ShoppingCart, Plus, Minus, Send } from "lucide-react";

interface MenuProps {
  menuItems: MenuItem[];
  cart: { [itemId: string]: number };
  onUpdateCart: (itemId: string, quantity: number) => void;
  onNavigateToAtelie: () => void;
}

export default function Menu({ menuItems, cart, onUpdateCart, onNavigateToAtelie }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.BOLOS_DECORADOS);
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyPopular, setShowOnlyPopular] = useState(false);

  // Filter items
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPopular = showOnlyPopular ? item.popular : true;
    return matchesCategory && matchesSearch && matchesPopular;
  });

  const getCartCount = () => {
    return Object.entries(cart)
      .filter(([id, qty]) => {
        const item = menuItems.find((m) => m.id === id);
        return qty > 0 && item && !item.outOfStock;
      })
      .reduce((sum, [_, q]) => sum + q, 0);
  };

  const getCartTotal = () => {
    return Object.entries(cart).reduce((total, [id, qty]) => {
      const item = menuItems.find((m) => m.id === id);
      return total + (item && !item.outOfStock ? item.price * qty : 0);
    }, 0);
  };

  const handleWhatsappCheckout = () => {
    const cartEntries = Object.entries(cart).filter(([id, qty]) => {
      const item = menuItems.find((m) => m.id === id);
      return qty > 0 && item && !item.outOfStock;
    });

    if (cartEntries.length === 0) return;

    let message = `Olá, Muniz Confeitaria! Gostaria de fazer o seguinte pedido do Cardápio:\n\n`;
    
    cartEntries.forEach(([id, qty]) => {
      const item = menuItems.find((m) => m.id === id);
      if (item) {
        message += `*${qty}x* ${item.name} - R$ ${(item.price * qty).toFixed(2)}\n`;
      }
    });

    message += `\n*Total estimado:* R$ ${getCartTotal().toFixed(2)}\n\n`;
    message += `Por favor, confirmem a disponibilidade para retirada/entrega! Obrigado(a).`;

    const whatsappLink = `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <section className="py-16 bg-[#FDFBF7]" id="cardapio-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-[#C4956A]">Nosso Cardápio</p>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#3D2B1F]">
            Sabores Prontos para Brilhar
          </h2>
          <p className="text-sm text-[#3D2B1F]/80 max-w-2xl mx-auto font-sans">
            Selecione entre as deliciosas opções do nosso menu diário. Você pode montar o seu carrinho e enviar o pedido diretamente para o nosso WhatsApp com apenas um clique!
          </p>
        </div>

        {/* Category Controls & Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-[#E5DACE] pb-6 mb-8">
          {/* Categories Tab */}
          <div className="flex flex-wrap gap-2">
            {Object.values(Category).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all ${
                  selectedCategory === cat
                    ? "bg-[#3D2B1F] text-white shadow-md"
                    : "bg-[#FDFBF7] text-[#3D2B1F]/85 hover:bg-[#E5DACE]"
                }`}
                id={`btn-cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search and Popular switch */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <input
              type="text"
              placeholder="Buscar sabor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 bg-[#FDFBF7] border border-[#E5DACE] rounded-full text-sm text-[#3D2B1F] focus:outline-none focus:ring-1 focus:ring-[#C4956A] placeholder-[#D6C4B0]"
              id="search-input"
            />
            
            <label className="flex items-center space-x-2 text-xs font-medium text-[#3D2B1F]/70 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showOnlyPopular}
                onChange={(e) => setShowOnlyPopular(e.target.checked)}
                className="rounded border-[#E5DACE] text-[#C4956A] focus:ring-0 w-4 h-4 cursor-pointer"
                id="popular-checkbox"
              />
              <span>Mais Procurados 🔥</span>
            </label>
          </div>
        </div>

        {/* Dynamic Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-[#FDFBF7] rounded-3xl border border-[#E5DACE]/60">
            <p className="text-[#3D2B1F]/80 text-sm mb-4">Nenhum sabor encontrado nesta busca.</p>
            <button 
              onClick={() => { setSearchQuery(""); setShowOnlyPopular(false); }}
              className="text-xs font-semibold text-[#C4956A] hover:underline"
            >
              Limpar Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const qty = cart[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className={`bg-[#FDFBF7] border border-[#E5DACE]/60 rounded-3xl overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 relative ${
                    item.outOfStock ? "opacity-75" : ""
                  }`}
                  id={`item-card-${item.id}`}
                >
                  {/* Image container */}
                  <div className="relative aspect-video sm:aspect-square overflow-hidden bg-amber-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Out of Stock visual mask & label */}
                    {item.outOfStock ? (
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="bg-red-600 border border-red-500 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-md shadow-lg">
                          Em Falta 🔴
                        </span>
                      </div>
                    ) : (
                      item.tag && (
                        <span className="absolute top-3 left-3 bg-[#3D2B1F] text-[#F3E6D5] text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-full shadow-sm">
                          {item.tag}
                        </span>
                      )
                    )}
                  </div>

                  {/* Body Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-serif font-bold text-base text-[#3D2B1F]">
                          {item.name}
                        </h3>
                        <p className="font-mono text-sm font-bold text-[#C4956A] shrink-0">
                          R$ {item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-xs text-[#3D2B1F]/70 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    </div>

                    {/* Quantity selectors & Action */}
                    <div className="pt-2">
                      {item.outOfStock ? (
                        <button
                          disabled
                          className="w-full py-2 px-4 bg-stone-100 text-stone-400 border border-stone-200 text-xs font-bold rounded-full cursor-not-allowed flex items-center justify-center space-x-1.5"
                        >
                          <span>Temporariamente Indisponível</span>
                        </button>
                      ) : qty > 0 ? (
                        <div className="flex items-center justify-between bg-white border border-[#E5DACE] rounded-full p-1.5 shadow-sm">
                          <button
                            onClick={() => onUpdateCart(item.id, qty - 1)}
                            className="w-7 h-7 bg-[#FDFBF7] hover:bg-[#E5DACE] text-[#3D2B1F] rounded-full flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-[#3D2B1F]">{qty}</span>
                          <button
                            onClick={() => onUpdateCart(item.id, qty + 1)}
                            className="w-7 h-7 bg-[#FDFBF7] hover:bg-[#E5DACE] text-[#3D2B1F] rounded-full flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => onUpdateCart(item.id, 1)}
                          className="w-full py-2 px-4 bg-white hover:bg-[#3D2B1F] text-[#3D2B1F] hover:text-white border border-[#3D2B1F] text-xs font-bold rounded-full transition-all duration-200 flex items-center justify-center space-x-1.5"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Adicionar à Encomenda</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Customized Banner Offer */}
        <div className="mt-16 bg-gradient-to-r from-[#3D2B1F] to-[#2B1B17] rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-4 max-w-xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#F3E6D5]">Totalmente Exclusivo</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Quer algo sob medida para o seu evento?
            </h3>
            <p className="text-xs sm:text-sm text-[#E5DACE]/80 font-sans leading-relaxed">
              Use o nosso inovador **Ateliê Digital de Criação** para projetar um bolo em camadas personalizado ou preencher uma caixinha com seus doces gourmet prediletos!
            </p>
          </div>
          <button
            onClick={onNavigateToAtelie}
            className="px-6 py-3.5 bg-[#C4956A] hover:bg-[#C4956A]/90 text-white text-xs sm:text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 shrink-0 duration-200"
          >
            Acessar Ateliê de Criação 🎨
          </button>
        </div>

        {/* Floating Cart Panel (Only shows when cart has items) */}
        {getCartCount() > 0 && (
          <div className="fixed bottom-6 right-20 z-40 bg-[#3D2B1F] text-white rounded-3xl shadow-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4 max-w-sm border border-[#F3E6D5]/30 animate-bounce duration-1000">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#C4956A] flex items-center justify-center shrink-0">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-[#F3E6D5]">Sua Encomenda</h4>
                <p className="text-[11px] text-white/80">
                  {getCartCount()} cento(s) / bolo(s) - <strong className="text-[#25D366]">R$ {getCartTotal().toFixed(2)}</strong>
                </p>
              </div>
            </div>
            <button
              onClick={handleWhatsappCheckout}
              className="bg-[#25D366] hover:bg-[#20ba56] text-white text-xs font-bold px-4 py-2.5 rounded-full flex items-center justify-center space-x-1.5 transition-all hover:scale-105 duration-200"
              id="floating-cart-submit"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Pedir via WhatsApp</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
