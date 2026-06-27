import { Category, MenuItem, CakeBaseOption, CakeFillingOption, CakeToppingOption, CakeDecorationOption, CandyOption, CandyBoxSize } from "./types";

// Business Coordinates
export const BUSINESS_INFO = {
  name: "Muniz Confeitaria",
  whatsapp: "5573999234342", // Real phone number (73) 99923-4342 with Brazil country code 55
  instagram: "@munizconfeitariaoficial",
  address: "Av. Dr. Bezerra de Menezes, 206, Santa Cruz Cabrália - BA, 45807-000",
  googleBusinessLink: "https://share.google/TefPdWAgt4RsdkLWS"
};

export const MENU_ITEMS: MenuItem[] = [
  // Bolos Decorados
  {
    id: "bolo-1",
    name: "Bolo Morango Silvestre",
    description: "Delicado bolo com cobertura aveludada, decorado com morangos frescos e selecionados no topo e na base. O clássico queridinho das nossas encomendas.",
    price: 150.00,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
    category: Category.BOLOS_DECORADOS,
    tag: "Campeão de Vendas",
    popular: true
  },
  {
    id: "bolo-2",
    name: "Bolo Borboletas do Campo",
    description: "Bolo com acabamento ondulado rosa pastel decorado com borboletas lilás comestíveis de papel arroz e pérolas de açúcar. Visual romântico e encantador.",
    price: 165.00,
    image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=800&q=80",
    category: Category.BOLOS_DECORADOS,
    tag: "Destaque",
    popular: true
  },
  {
    id: "bolo-3",
    name: "Bolo Temático Boteco (Heineken)",
    description: "Bolo branco decorado de forma impecável no tema Boteco da Heineken. Perfeito para festas de aniversário descontraídas.",
    price: 170.00,
    image: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?w=800&q=80",
    category: Category.BOLOS_DECORADOS,
    popular: false
  },
  {
    id: "bolo-4",
    name: "Bolo Escolar ABC (Volta às Aulas)",
    description: "Bolo temático perfeito para formaturas infantis e festas escolares. Decorado com lápis coloridos comestíveis, letrinhas e livros modelados.",
    price: 160.00,
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&q=80",
    category: Category.BOLOS_DECORADOS,
    tag: "Infantil",
    popular: false
  },
  {
    id: "bolo-5",
    name: "Bolo Tropical Moana",
    description: "Bolo com degradê vibrante em tons de amarelo e laranja, decorado com palmeiras, ondas do mar e flores de hibisco tropicais.",
    price: 180.00,
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c13636?w=800&q=80",
    category: Category.BOLOS_DECORADOS,
    popular: false
  },
  {
    id: "bolo-6",
    name: "Bolo Meninas Superpoderosas",
    description: "Bolo verde e rosa decorado com estrelas e as Meninas Superpoderosas. Perfeito para aquela pessoa querida e cheia de atitude!",
    price: 175.00,
    image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800&q=80",
    category: Category.BOLOS_DECORADOS,
    popular: false
  },
  {
    id: "bolo-7",
    name: "Bolo Naruto Ninja (Dois Andares)",
    description: "Bolo de dois andares com cores de degradê rosa e amarelo e silhueta do Naruto. O favorito dos jovens e dos amantes de anime.",
    price: 260.00,
    image: "https://images.unsplash.com/photo-1519340333755-56e2f1d142ce?w=800&q=80",
    category: Category.BOLOS_DECORADOS,
    tag: "Premium",
    popular: true
  },
  {
    id: "bolo-8",
    name: "Bolo Sete Pecados Capitais",
    description: "Bolo artístico com textura de ondas coloridas no estilo arco-íris e personagens do anime Seven Deadly Sins.",
    price: 185.00,
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80",
    category: Category.BOLOS_DECORADOS,
    popular: false
  },

  // Docinhos Gourmet - Tradicionais (Cento R$ 150,00)
  {
    id: "doce-trad-1",
    name: "Cento de Brigadeiro de Cacau 50%",
    description: "O clássico brigadeiro de panela cremoso feito com cacau nobre 50%, enrolado em granulado de chocolate belga (100 unidades).",
    price: 150.00,
    image: "https://images.unsplash.com/photo-1559620192-032c4bc4a447?w=800&q=80",
    category: Category.DOCINHOS_GOURMET,
    tag: "Tradicional",
    popular: true
  },
  {
    id: "doce-trad-2",
    name: "Cento de Brigadeiro de Ninho",
    description: "Brigadeiro gourmet suave de puro Leite Ninho, de consistência aveludada e derrete na boca (100 unidades).",
    price: 150.00,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    category: Category.DOCINHOS_GOURMET,
    tag: "Tradicional",
    popular: false
  },
  {
    id: "doce-trad-3",
    name: "Cento de Brigadeiro Casadinho",
    description: "A clássica e perfeita combinação entre o brigadeiro preto tradicional e o brigadeiro de leite condensado branco (100 unidades).",
    price: 150.00,
    image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=800&q=80",
    category: Category.DOCINHOS_GOURMET,
    tag: "Tradicional",
    popular: false
  },
  {
    id: "doce-trad-4",
    name: "Cento de Brigadeiro Prestígio",
    description: "Uma deliciosa e equilibrada mistura de brigadeiro de cacau enrolado em coco ralado fino úmido (100 unidades).",
    price: 150.00,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    category: Category.DOCINHOS_GOURMET,
    tag: "Tradicional",
    popular: false
  },

  // Docinhos Gourmet - Especiais (Cento R$ 180,00)
  {
    id: "doce-esp-1",
    name: "Cento de Brigadeiro de Paçoca",
    description: "Brigadeiro gourmet de amendoim selecionado com cobertura de paçoca esfarelada crocante (100 unidades).",
    price: 180.00,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    category: Category.DOCINHOS_GOURMET,
    tag: "Especial",
    popular: true
  },
  {
    id: "doce-esp-2",
    name: "Cento de Brigadeiro Cappuccino",
    description: "Para os amantes de café: brigadeiro com cacau, café expresso solúvel e um toque sutil de canela (100 unidades).",
    price: 180.00,
    image: "https://images.unsplash.com/photo-1559620192-032c4bc4a447?w=800&q=80",
    category: Category.DOCINHOS_GOURMET,
    tag: "Especial",
    popular: false
  },
  {
    id: "doce-esp-3",
    name: "Cento de Ninho com Nutella",
    description: "O queridinho: brigadeiro gourmet de leite Ninho recheado por dentro e finalizado com bico de Nutella pura (100 unidades).",
    price: 180.00,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    category: Category.DOCINHOS_GOURMET,
    tag: "Campeão",
    popular: true
  },
  {
    id: "doce-esp-4",
    name: "Cento de Brigadeiro Napolitano",
    description: "Três cores e três sabores divinos unidos em um só docinho: brigadeiro tradicional, branco e morango (100 unidades).",
    price: 180.00,
    image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=800&q=80",
    category: Category.DOCINHOS_GOURMET,
    tag: "Especial",
    popular: false
  },
  {
    id: "doce-esp-5",
    name: "Cento de Brigadeiro de Morango",
    description: "Delicioso doce estilo bicho de pé gourmet feito com geleia concentrada de morango e finalizado em açúcar cristal (100 unidades).",
    price: 180.00,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
    category: Category.DOCINHOS_GOURMET,
    tag: "Especial",
    popular: false
  },
  {
    id: "doce-esp-6",
    name: "Cento de Brigadeiro de Maracujá",
    description: "Brigadeiro com acidez perfeita feito a partir da polpa de maracujá fresco, doce e cítrico na medida certa (100 unidades).",
    price: 180.00,
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80",
    category: Category.DOCINHOS_GOURMET,
    tag: "Especial",
    popular: false
  },
  {
    id: "doce-esp-7",
    name: "Cento de Brigadeiro de Churros",
    description: "Brigadeiro gourmet temperado com canela nobre, recheado e finalizado com doce de leite cremoso cozido na pressão (100 unidades).",
    price: 180.00,
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?w=800&q=80",
    category: Category.DOCINHOS_GOURMET,
    tag: "Especial",
    popular: true
  },
  {
    id: "doce-esp-8",
    name: "Cento de Brigadeiro Surpresa de Uva",
    description: "Uva Thompson verde fresca, sem semente, envolta em uma camada fina e aveludada de brigadeiro branco de leite condensado (100 unidades).",
    price: 180.00,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    category: Category.DOCINHOS_GOURMET,
    tag: "Especial",
    popular: true
  }
];

// Cake Builder Constants (Customized via Ateliê)
export const CAKE_BASES: CakeBaseOption[] = [
  { id: "base-baunilha", name: "Massa Branca (Chiffon)", color: "#F9F6EE", price: 30, description: "Massa branca clássica super leve, úmida e fofinha de baunilha." },
  { id: "base-chocolate", name: "Massa de Chocolate", color: "#2B1B17", price: 35, description: "Massa chocolatuda fofinha com cacau selecionado 50%." }
];

export const CAKE_FILLINGS: CakeFillingOption[] = [
  // Recheios Tradicionais
  { id: "fill-brigadeiro", name: "Brigadeiro Tradicional", color: "#3D2314", price: 40, description: "Creme cremoso gourmet de chocolate ao leite nobre." },
  { id: "fill-ninho", name: "Brigadeiro de Ninho", color: "#FFFDD0", price: 40, description: "Creme clássico de leite Ninho aveludado e cremoso." },
  { id: "fill-pacoca", name: "Brigadeiro de Paçoca", color: "#D2B48C", price: 40, description: "Recheio cremoso com amendoim moído e toque de paçoca." },
  { id: "fill-prestigio", name: "Prestígio", color: "#FFFFFF", price: 40, description: "A tradicional combinação de coco ralado úmido e creme de chocolate." },
  
  // Recheios Especiais
  { id: "fill-ninho-nutella", name: "Ninho com Nutella", color: "#EEDC82", price: 50, description: "Creme aveludado de Leite Ninho combinado com bicos de Nutella pura." },
  { id: "fill-ninho-morango", name: "Ninho com Geleia de Morango", color: "#FFE4E1", price: 50, description: "Creme de Ninho aerado com geleia de morango artesanal caseira." },
  { id: "fill-ninho-maracuja", name: "Ninho com Geleia de Maracujá", color: "#FFF8DC", price: 50, description: "Brigadeiro de Ninho com nossa compota fresca de maracujá." },
  { id: "fill-doce-ameixa", name: "Doce de Leite com Ameixa", color: "#CD853F", price: 50, description: "Doce de leite cozido artesanal suave recheado com ameixas pretas." },
  { id: "fill-doce-abacaxi", name: "Doce de Leite com Abacaxi", color: "#F0E68C", price: 50, description: "Doce de leite cremoso com pedaços de abacaxi cozidos na calda." },
  { id: "fill-ninho-abacaxi", name: "Ninho com Abacaxi", color: "#FFFFF0", price: 50, description: "O toque refrescante do abacaxi em pedaços cozidos envoltos em brigadeiro de Ninho." }
];

export const CAKE_TOPPINGS: CakeToppingOption[] = [
  { id: "top-chantininho", name: "Chantininho Aveludado", color: "#FAFAF9", price: 20, description: "Nossa cobertura especial leve, cremosa e de textura sedosa." },
  { id: "top-ganache", name: "Drip Ganache de Chocolate", color: "#1C0F0A", price: 25, description: "Chocolate meio amargo nobre escorrido nas laterais para um visual moderno." }
];

export const CAKE_DECORATIONS: CakeDecorationOption[] = [
  { id: "dec-morangos", name: "Morangos Frescos Inteiros", icon: "🍓", price: 15, description: "Lindos morangos frescos coroados no topo do bolo." },
  { id: "dec-granulado", name: "Granulado Belga e Choco-Power", icon: "🍫", price: 10, description: "Chocoballs crocantes e granulados gourmet ao redor." },
  { id: "dec-borboletas", name: "Borboletas Comestíveis de Arroz", icon: "🦋", price: 20, description: "Borboletas delicadas aplicadas artisticamente." },
  { id: "dec-ouro", name: "Pó Brilhante e Pérolas de Açúcar", icon: "✨", price: 15, description: "Brilho metalizado comestível e pérolas brancas brilhantes." }
];

// Candy Options for Custom Sweet Box (using the 12 flavors)
export const CANDY_OPTIONS: CandyOption[] = [
  { id: "candy-cacau", name: "Brigadeiro de Cacau 50%", color: "#3D2314", emoji: "🟤", price: 1.5, description: "O tradicional brigadeiro com cacau nobre." },
  { id: "candy-ninho", name: "Brigadeiro de Ninho", color: "#FFFDD0", emoji: "⚪", price: 1.5, description: "Brigadeiro suave de puro leite Ninho." },
  { id: "candy-casadinho", name: "Brigadeiro Casadinho", color: "#FAF0E6", emoji: "🌓", price: 1.5, description: "Meio a meio: brigadeiro preto e branco." },
  { id: "candy-prestigio", name: "Brigadeiro Prestígio", color: "#D2B48C", emoji: "🥥", price: 1.5, description: "Brigadeiro de chocolate envolvido em coco ralado." },
  { id: "candy-pacoca", name: "Brigadeiro de Paçoca", color: "#DEB887", emoji: "🥜", price: 1.8, description: "Sabor marcante de paçoca de amendoim." },
  { id: "candy-cappuccino", name: "Brigadeiro Cappuccino", color: "#8B4513", emoji: "☕", price: 1.8, description: "Brigadeiro gourmet com sabor de café e canela." },
  { id: "candy-ninho-nutella", name: "Ninho com Nutella", color: "#CD853F", emoji: "🎯", price: 1.8, description: "Brigadeiro de Ninho coroado com Nutella pura." },
  { id: "candy-napolitano", name: "Napolitano Tricolor", color: "#FFB6C1", emoji: "🚦", price: 1.8, description: "Mistura tricolor de brigadeiro, branco e morango." },
  { id: "candy-morango", name: "Brigadeiro de Morango", color: "#FF69B4", emoji: "🍓", price: 1.8, description: "Delicioso bicho de pé gourmet de morango." },
  { id: "candy-maracuja", name: "Brigadeiro de Maracujá", color: "#FFD700", emoji: "🟡", price: 1.8, description: "Cítrico e adocicado feito de maracujá puro." },
  { id: "candy-churros", name: "Brigadeiro de Churros", color: "#D2691E", emoji: "🌀", price: 1.8, description: "Toque de canela finalizado com doce de leite." },
  { id: "candy-uva", name: "Surpresa de Uva Verde", color: "#98FB98", emoji: "🍇", price: 1.8, description: "Uva sem semente inteira coberta de brigadeiro branco." }
];

export const CANDY_BOX_SIZES: CandyBoxSize[] = [
  { id: "box-12", quantity: 12, price: 20.00, name: "Caixa Degustação (12 doces)" },
  { id: "box-24", quantity: 24, price: 38.00, name: "Caixa Presente (24 doces)" },
  { id: "box-50", quantity: 50, price: 78.00, name: "Caixa Festa Média (50 doces)" },
  { id: "box-100", quantity: 100, price: 150.00, name: "Banquete de Doces (100 doces)" }
];
