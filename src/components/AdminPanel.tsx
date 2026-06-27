import React, { useState } from "react";
import { MenuItem, CakeBaseOption, CakeFillingOption, CandyOption } from "../types";
import { Settings, Lock, Unlock, Eye, EyeOff, Save, CheckCircle, AlertTriangle, ToggleLeft, ToggleRight, DollarSign, Edit3, Trash2, PlusCircle, ArrowLeft, Image } from "lucide-react";
import Logo from "./Logo";

interface AdminPanelProps {
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;
  cakeBases: CakeBaseOption[];
  setCakeBases: (bases: CakeBaseOption[]) => void;
  cakeFillings: CakeFillingOption[];
  setCakeFillings: (fillings: CakeFillingOption[]) => void;
  candyOptions: CandyOption[];
  setCandyOptions: (options: CandyOption[]) => void;
  onExit: () => void;
}

export default function AdminPanel({
  menuItems,
  setMenuItems,
  cakeBases,
  setCakeBases,
  cakeFillings,
  setCakeFillings,
  candyOptions,
  setCandyOptions,
  onExit
}: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState<"menu" | "bases" | "fillings" | "candies">("menu");
  const [successToast, setSuccessToast] = useState("");

  // Edit states
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{
    name: string;
    description: string;
    price: number;
    tag?: string;
    image?: string;
  }>({ name: "", description: "", price: 0, image: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "1234" || password.toLowerCase() === "muniz") {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Senha incorreta! Use o PIN de exemplo '1234' para acessar.");
    }
  };

  const showToast = (message: string) => {
    setSuccessToast(message);
    setTimeout(() => setSuccessToast(""), 3000);
  };

  // Handle image upload and convert to Base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("A imagem é muito grande! Escolha uma imagem de até 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setEditForm((prev) => ({
          ...prev,
          image: event.target!.result as string,
        }));
        showToast("Imagem carregada com sucesso! Clique em Salvar para persistir.");
      }
    };
    reader.readAsDataURL(file);
  };

  // Toggle Stock - Menu Item
  const toggleMenuItemStock = (id: string) => {
    const updated = menuItems.map(item => {
      if (item.id === id) {
        const newStock = !item.outOfStock;
        showToast(`Sabor "${item.name}" agora está ${newStock ? "EM FALTA 🔴" : "DISPONÍVEL 🟢"}`);
        return { ...item, outOfStock: newStock };
      }
      return item;
    });
    setMenuItems(updated);
    localStorage.setItem("muniz_menu_items", JSON.stringify(updated));
  };

  // Toggle Stock - Cake Base
  const toggleCakeBaseStock = (id: string) => {
    const updated = cakeBases.map(base => {
      if (base.id === id) {
        const newStock = !base.outOfStock;
        showToast(`Massa "${base.name}" agora está ${newStock ? "EM FALTA 🔴" : "DISPONÍVEL 🟢"}`);
        return { ...base, outOfStock: newStock };
      }
      return base;
    });
    setCakeBases(updated);
    localStorage.setItem("muniz_cake_bases", JSON.stringify(updated));
  };

  // Toggle Stock - Cake Filling
  const toggleCakeFillingStock = (id: string) => {
    const updated = cakeFillings.map(filling => {
      if (filling.id === id) {
        const newStock = !filling.outOfStock;
        showToast(`Recheio "${filling.name}" agora está ${newStock ? "EM FALTA 🔴" : "DISPONÍVEL 🟢"}`);
        return { ...filling, outOfStock: newStock };
      }
      return filling;
    });
    setCakeFillings(updated);
    localStorage.setItem("muniz_cake_fillings", JSON.stringify(updated));
  };

  // Toggle Stock - Candy Options
  const toggleCandyStock = (id: string) => {
    const updated = candyOptions.map(candy => {
      if (candy.id === id) {
        const newStock = !candy.outOfStock;
        showToast(`Docinho "${candy.name}" agora está ${newStock ? "EM FALTA 🔴" : "DISPONÍVEL 🟢"}`);
        return { ...candy, outOfStock: newStock };
      }
      return candy;
    });
    setCandyOptions(updated);
    localStorage.setItem("muniz_candy_options", JSON.stringify(updated));
  };

  // Start Editing Item
  const startEditing = (item: MenuItem) => {
    setEditingItemId(item.id);
    setEditForm({
      name: item.name,
      description: item.description,
      price: item.price,
      tag: item.tag || "",
      image: item.image || ""
    });
  };

  // Save Edited Item
  const saveEditedItem = (id: string) => {
    const updated = menuItems.map(item => {
      if (item.id === id) {
        return {
          ...item,
          name: editForm.name,
          description: editForm.description,
          price: Number(editForm.price),
          tag: editForm.tag || undefined,
          image: editForm.image || item.image
        };
      }
      return item;
    });
    setMenuItems(updated);
    localStorage.setItem("muniz_menu_items", JSON.stringify(updated));
    setEditingItemId(null);
    showToast("Alterações do produto salvas com sucesso!");
  };

  // Start Editing Base/Filling/Candy Inline Prices
  const handlePriceChangeInline = (type: "base" | "filling" | "candy", id: string, newPrice: number) => {
    if (type === "base") {
      const updated = cakeBases.map(b => b.id === id ? { ...b, price: newPrice } : b);
      setCakeBases(updated);
      localStorage.setItem("muniz_cake_bases", JSON.stringify(updated));
    } else if (type === "filling") {
      const updated = cakeFillings.map(f => f.id === id ? { ...f, price: newPrice } : f);
      setCakeFillings(updated);
      localStorage.setItem("muniz_cake_fillings", JSON.stringify(updated));
    } else {
      const updated = candyOptions.map(c => c.id === id ? { ...c, price: newPrice } : c);
      setCandyOptions(updated);
      localStorage.setItem("muniz_candy_options", JSON.stringify(updated));
    }
    showToast("Preço atualizado com sucesso!");
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#3D2B1F] flex flex-col font-sans antialiased" id="admin-crm-page">
      {/* Top Navbar Header */}
      <header className="bg-[#3D2B1F] text-white py-4 px-6 sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Back Button */}
            <button
              onClick={onExit}
              className="flex items-center space-x-2 bg-white/10 hover:bg-[#C4956A] hover:text-[#3D2B1F] text-white px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300"
              title="Voltar para a Loja"
              id="admin-back-to-shop"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para a Loja</span>
            </button>
            <div className="h-6 w-[1px] bg-white/20" />
            <div className="flex items-center space-x-2">
              <Logo size="sm" variant="light" />
              <span className="text-[10px] font-mono tracking-widest text-[#D6C4B0] uppercase border-l border-white/20 pl-3 hidden sm:inline">
                Painel CRM do Proprietário
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-xs font-mono text-[#D6C4B0]">
            <span className="bg-[#C4956A]/20 text-[#F3E6D5] px-2.5 py-1 rounded-full border border-[#C4956A]/30">
              {isAuthenticated ? "● Sessão Ativa" : "🔒 Restrito"}
            </span>
          </div>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center">
        {!isAuthenticated ? (
          /* Authentication Screen (Unauthenticated) */
          <div className="bg-white border border-[#E5DACE] rounded-3xl p-8 sm:p-12 w-full max-w-md shadow-xl text-center space-y-6 animate-fade-in my-8">
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 mx-auto">
              <Lock className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-serif font-bold text-[#3D2B1F]">Área Exclusiva de Administração</h2>
              <p className="text-xs text-[#3D2B1F]/70">
                Insira a credencial do estabelecimento para gerenciar o estoque, atualizar os preços e carregar fotos do cardápio.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Senha de Acesso (padrão: 1234)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#FAF7F2] border border-[#E5DACE] rounded-2xl text-center text-sm font-mono text-[#3D2B1F] focus:outline-none focus:ring-1 focus:ring-[#C4956A]"
                  autoFocus
                />
              </div>
              {errorMsg && (
                <p className="text-[11px] text-red-500 font-medium bg-red-50 p-2.5 rounded-xl border border-red-100">
                  ⚠️ {errorMsg}
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#3D2B1F] hover:bg-[#C4956A] hover:text-[#3D2B1F] text-white font-bold text-xs uppercase tracking-widest rounded-2xl transition-all shadow-md hover:shadow-lg"
              >
                Desbloquear Painel 🔓
              </button>
            </form>

            <div className="border-t border-[#FAF7F2] pt-4 text-[10px] text-[#D6C4B0] font-mono">
              Senha padrão: <span className="text-[#C4956A] font-bold">1234</span> ou <span className="text-[#C4956A] font-bold">muniz</span>
            </div>
          </div>
        ) : (
          /* Authenticated CRM Workspace Dashboard */
          <div className="bg-white border border-[#E5DACE] rounded-3xl shadow-lg w-full flex flex-col overflow-hidden min-h-[600px] animate-fade-in my-4">
            
            {/* Control Tabs Header */}
            <div className="bg-[#FAF7F2] border-b border-[#E5DACE] px-4 py-3 flex flex-wrap gap-2 items-center justify-between">
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => { setActiveTab("menu"); setEditingItemId(null); }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "menu" ? "bg-[#3D2B1F] text-white shadow-sm" : "text-[#3D2B1F]/70 hover:bg-[#E5DACE]/40"
                  }`}
                >
                  🍰 Bolos & Doces (Menu)
                </button>
                <button
                  onClick={() => { setActiveTab("bases"); setEditingItemId(null); }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "bases" ? "bg-[#3D2B1F] text-white shadow-sm" : "text-[#3D2B1F]/70 hover:bg-[#E5DACE]/40"
                  }`}
                >
                  🌾 Massas (Ateliê)
                </button>
                <button
                  onClick={() => { setActiveTab("fillings"); setEditingItemId(null); }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "fillings" ? "bg-[#3D2B1F] text-white shadow-sm" : "text-[#3D2B1F]/70 hover:bg-[#E5DACE]/40"
                  }`}
                >
                  🍯 Recheios (Ateliê)
                </button>
                <button
                  onClick={() => { setActiveTab("candies"); setEditingItemId(null); }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === "candies" ? "bg-[#3D2B1F] text-white shadow-sm" : "text-[#3D2B1F]/70 hover:bg-[#E5DACE]/40"
                  }`}
                >
                  🍬 Docinhos da Caixa
                </button>
              </div>

              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  setPassword("");
                }}
                className="flex items-center space-x-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Bloquear Sessão</span>
              </button>
            </div>

            {/* Workspace Scrollable Container */}
            <div className="p-6 flex-1 overflow-y-auto">
              
              {/* === TAB 1: MENU ITEMS MANAGER === */}
              {activeTab === "menu" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#FAF7F2] pb-4">
                    <div>
                      <h3 className="text-sm font-bold text-[#3D2B1F] uppercase tracking-wide">Cardápio Principal de Produtos</h3>
                      <p className="text-xs text-[#3D2B1F]/60">Modifique preços, controle o estoque diário e faça upload de imagens exclusivas para cada item.</p>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider font-mono">
                      Ativo no Site
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {menuItems.map((item) => (
                      <div
                        key={item.id}
                        className={`p-5 rounded-2xl border transition-all ${
                          item.outOfStock
                            ? "border-red-200 bg-red-50/10 opacity-90"
                            : "border-[#E5DACE] bg-[#FAF7F2]/30 hover:shadow-md"
                        }`}
                      >
                        {editingItemId === item.id ? (
                          /* ITEM EDITING WORKSPACE */
                          <div className="space-y-4">
                            <h4 className="text-xs font-bold text-[#C4956A] uppercase tracking-wider pb-1 border-b border-[#FAF7F2]">
                              Editando Produto: {item.name}
                            </h4>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div>
                                  <label className="text-[10px] font-bold text-[#3D2B1F]/70 uppercase tracking-wide block mb-1">
                                    Nome do Sabor
                                  </label>
                                  <input
                                    type="text"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    className="w-full px-3 py-2 bg-white border border-[#E5DACE] rounded-xl text-xs text-[#3D2B1F] focus:outline-none focus:ring-1 focus:ring-[#C4956A]"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] font-bold text-[#3D2B1F]/70 uppercase tracking-wide block mb-1">
                                    Valor de Venda (R$)
                                  </label>
                                  <input
                                    type="number"
                                    value={editForm.price}
                                    onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                                    className="w-full px-3 py-2 bg-white border border-[#E5DACE] rounded-xl text-xs font-mono text-[#3D2B1F] focus:outline-none focus:ring-1 focus:ring-[#C4956A]"
                                  />
                                </div>
                              </div>

                              {/* IMAGE UPLOAD PANEL (AS REQUESTED) */}
                              <div className="space-y-2 border-t sm:border-t-0 sm:border-l border-dashed border-[#E5DACE] pt-3 sm:pt-0 sm:pl-4">
                                <label className="text-[10px] font-bold text-[#3D2B1F]/70 uppercase tracking-wide block">
                                  Carregar Nova Imagem
                                </label>
                                
                                <div className="flex items-center space-x-3 pt-1">
                                  {/* Thumbnail preview */}
                                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-amber-50 border border-[#E5DACE] shrink-0 relative shadow-inner">
                                    <img
                                      src={editForm.image || item.image}
                                      alt="Preview"
                                      className="w-full h-full object-cover"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  
                                  <div className="flex-1 space-y-1">
                                    <label
                                      htmlFor={`img-upload-${item.id}`}
                                      className="inline-flex items-center space-x-1.5 px-3 py-2 bg-[#3D2B1F] hover:bg-[#C4956A] text-white hover:text-[#3D2B1F] text-[10px] font-bold rounded-lg cursor-pointer transition-all shadow-sm"
                                    >
                                      <Image className="w-3.5 h-3.5" />
                                      <span>Enviar Imagem</span>
                                    </label>
                                    <input
                                      type="file"
                                      id={`img-upload-${item.id}`}
                                      accept="image/*"
                                      onChange={handleImageUpload}
                                      className="hidden"
                                    />
                                    <p className="text-[9px] text-[#C4956A] font-bold font-mono leading-tight">
                                      Tamanho recomendado:<br />
                                      <span className="text-[#3D2B1F]">400 x 400 pixels</span> (1:1 Quadrado, máx 2MB)
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <label className="text-[10px] font-bold text-[#3D2B1F]/70 uppercase tracking-wide block mb-1">
                                Descrição / Ingredientes
                              </label>
                              <textarea
                                value={editForm.description}
                                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                className="w-full px-3 py-2 bg-white border border-[#E5DACE] rounded-xl text-xs text-[#3D2B1F] focus:outline-none focus:ring-1 focus:ring-[#C4956A]"
                                rows={2}
                              />
                            </div>

                            <div className="flex space-x-2 justify-end pt-2 border-t border-[#FAF7F2]">
                              <button
                                onClick={() => setEditingItemId(null)}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#3D2B1F] text-[10px] font-bold rounded-xl transition-colors"
                              >
                                Cancelar
                              </button>
                              <button
                                onClick={() => saveEditedItem(item.id)}
                                className="px-4 py-2 bg-[#3D2B1F] hover:bg-[#C4956A] text-white hover:text-[#3D2B1F] text-[10px] font-bold rounded-xl flex items-center space-x-1.5 transition-all shadow-sm"
                              >
                                <Save className="w-3.5 h-3.5" />
                                <span>Salvar Produto</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          /* STANDARD CRM CARD VIEW */
                          <div className="flex space-x-4 items-start justify-between">
                            <div className="flex space-x-3 flex-1">
                              {/* Product Image Thumbnail */}
                              <div className="w-16 h-16 rounded-xl overflow-hidden bg-amber-50 border border-[#E5DACE] shrink-0 shadow-sm">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <div className="space-y-1 flex-1">
                                <div className="flex items-center space-x-1.5 flex-wrap">
                                  <span className="text-xs font-bold text-[#3D2B1F]">{item.name}</span>
                                  {item.outOfStock && (
                                    <span className="text-[8px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                                      Fora de Estoque
                                    </span>
                                  )}
                                  {item.popular && (
                                    <span className="text-[8px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                                      Popular 🔥
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-[#3D2B1F]/70 leading-relaxed line-clamp-2">
                                  {item.description}
                                </p>
                                <p className="text-xs font-bold text-emerald-600 font-mono">
                                  R$ {item.price.toFixed(2)}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col space-y-2 items-end shrink-0">
                              <button
                                onClick={() => toggleMenuItemStock(item.id)}
                                className={`px-2.5 py-1.5 rounded-xl text-[8px] font-bold font-mono uppercase text-center transition-all ${
                                  item.outOfStock
                                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                                    : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                }`}
                              >
                                {item.outOfStock ? "Ativar Item 🟢" : "Pausar Item 🔴"}
                              </button>
                              <button
                                onClick={() => startEditing(item)}
                                className="p-2 bg-white hover:bg-[#E5DACE] border border-[#E5DACE] rounded-xl text-[#3D2B1F] hover:text-[#3D2B1F] transition-all shadow-sm flex items-center justify-center"
                                title="Editar Produto"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* === TAB 2: CAKE BASES MANAGER === */}
              {activeTab === "bases" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#FAF7F2] pb-4">
                    <div>
                      <h3 className="text-sm font-bold text-[#3D2B1F] uppercase tracking-wide">Massas de Bolos (Ateliê)</h3>
                      <p className="text-xs text-[#3D2B1F]/60">Gerencie a disponibilidade e os acréscimos das massas de bolo no Ateliê Digital.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {cakeBases.map((base) => (
                      <div
                        key={base.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-[#E5DACE] bg-[#FAF7F2]/20 gap-4"
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <span
                            className="w-8 h-8 rounded-full border border-black/10 shrink-0 shadow-inner"
                            style={{ backgroundColor: base.color }}
                          />
                          <div>
                            <h4 className="text-xs font-bold text-[#3D2B1F]">{base.name}</h4>
                            <p className="text-[10px] text-[#3D2B1F]/60 max-w-xl">{base.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end space-x-4 shrink-0">
                          {/* Price edit */}
                          <div className="flex items-center space-x-1.5">
                            <span className="text-[10px] font-mono text-[#D6C4B0]">Valor (R$)</span>
                            <input
                              type="number"
                              value={base.price}
                              onChange={(e) => handlePriceChangeInline("base", base.id, Number(e.target.value))}
                              className="w-20 px-2 py-1.5 bg-white border border-[#E5DACE] rounded-lg text-xs font-mono text-center text-[#3D2B1F]"
                            />
                          </div>

                          {/* Stock toggle */}
                          <button
                            onClick={() => toggleCakeBaseStock(base.id)}
                            className={`px-3 py-1.5 rounded-xl text-[9px] font-bold font-mono uppercase text-center transition-all ${
                              base.outOfStock
                                ? "bg-red-100 text-red-700 hover:bg-red-200"
                                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            }`}
                          >
                            {base.outOfStock ? "Em falta 🔴" : "Disponível 🟢"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* === TAB 3: CAKE FILLINGS MANAGER === */}
              {activeTab === "fillings" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#FAF7F2] pb-4">
                    <div>
                      <h3 className="text-sm font-bold text-[#3D2B1F] uppercase tracking-wide">Recheios de Bolos (Ateliê)</h3>
                      <p className="text-xs text-[#3D2B1F]/60">Gerencie a disponibilidade e os acréscimos dos recheios gourmet no Ateliê Digital.</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {cakeFillings.map((filling) => (
                      <div
                        key={filling.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-[#E5DACE] bg-[#FAF7F2]/20 gap-4"
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <span
                            className="w-8 h-8 rounded-full border border-black/10 shrink-0 shadow-inner"
                            style={{ backgroundColor: filling.color }}
                          />
                          <div>
                            <h4 className="text-xs font-bold text-[#3D2B1F]">{filling.name}</h4>
                            <p className="text-[10px] text-[#3D2B1F]/60 max-w-xl">{filling.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end space-x-4 shrink-0">
                          {/* Price edit */}
                          <div className="flex items-center space-x-1.5">
                            <span className="text-[10px] font-mono text-[#D6C4B0]">Valor (R$)</span>
                            <input
                              type="number"
                              value={filling.price}
                              onChange={(e) => handlePriceChangeInline("filling", filling.id, Number(e.target.value))}
                              className="w-20 px-2 py-1.5 bg-white border border-[#E5DACE] rounded-lg text-xs font-mono text-center text-[#3D2B1F]"
                            />
                          </div>

                          {/* Stock toggle */}
                          <button
                            onClick={() => toggleCakeFillingStock(filling.id)}
                            className={`px-3 py-1.5 rounded-xl text-[9px] font-bold font-mono uppercase text-center transition-all ${
                              filling.outOfStock
                                ? "bg-red-100 text-red-700 hover:bg-red-200"
                                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            }`}
                          >
                            {filling.outOfStock ? "Em falta 🔴" : "Disponível 🟢"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* === TAB 4: CANDIES BOX MANAGER === */}
              {activeTab === "candies" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[#FAF7F2] pb-4">
                    <div>
                      <h3 className="text-sm font-bold text-[#3D2B1F] uppercase tracking-wide">Sabores de Docinhos Gourmet</h3>
                      <p className="text-xs text-[#3D2B1F]/60">Controle a disponibilidade das variedades de docinhos no montador de caixas personalizadas.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {candyOptions.map((candy) => (
                      <div
                        key={candy.id}
                        className="flex items-center justify-between p-4 rounded-2xl border border-[#E5DACE] bg-[#FAF7F2]/20 gap-3"
                      >
                        <div className="flex items-center space-x-3 flex-1">
                          <span
                            className="w-10 h-10 rounded-full border border-black/10 shrink-0 shadow-inner flex items-center justify-center text-lg"
                            style={{ backgroundColor: candy.color }}
                          >
                            {candy.emoji}
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-[#3D2B1F]">{candy.name}</h4>
                            <p className="text-[10px] text-[#3D2B1F]/60 line-clamp-1">{candy.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 shrink-0">
                          {/* Price edit */}
                          <div className="flex items-center space-x-1">
                            <span className="text-[10px] font-mono text-[#D6C4B0]">R$</span>
                            <input
                              type="number"
                              step="0.1"
                              value={candy.price}
                              onChange={(e) => handlePriceChangeInline("candy", candy.id, Number(e.target.value))}
                              className="w-14 px-1.5 py-1 bg-white border border-[#E5DACE] rounded-lg text-xs font-mono text-center text-[#3D2B1F]"
                            />
                          </div>

                          {/* Stock toggle */}
                          <button
                            onClick={() => toggleCandyStock(candy.id)}
                            className={`px-2.5 py-1 rounded-xl text-[8px] font-bold font-mono uppercase text-center transition-all ${
                              candy.outOfStock
                                ? "bg-red-100 text-red-700 hover:bg-red-200"
                                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            }`}
                          >
                            {candy.outOfStock ? "Em falta" : "Ativo"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Footer Bar */}
            <div className="bg-[#FAF7F2] border-t border-[#E5DACE]/80 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-[#3D2B1F]/70 text-center sm:text-left">
              <span>As alterações no CRM modificam instantaneamente a experiência do site em tempo real.</span>
              <span className="text-[10px] bg-amber-50 text-[#C4956A] font-bold px-2.5 py-1 rounded-lg border border-[#E5DACE]/40">
                Sessão segura de administração
              </span>
            </div>

          </div>
        )}
      </main>

      {/* Success Toast Notification */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 px-4 py-3 bg-[#3D2B1F] text-[#F3E6D5] border border-[#C4956A]/30 rounded-2xl shadow-xl animate-bounce">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold font-sans">{successToast}</span>
        </div>
      )}
    </div>
  );
}
