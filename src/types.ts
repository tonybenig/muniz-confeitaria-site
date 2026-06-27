export enum Category {
  BOLOS_DECORADOS = "Bolos Decorados",
  DOCINHOS_GOURMET = "Docinhos Gourmet",
  TORTAS_SOBREMESAS = "Tortas & Sobremesas",
  KITS_FESTA = "Kits Festa"
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  tag?: string;
  popular?: boolean;
  outOfStock?: boolean;
}

// Cake Customization Types
export interface CakeTierOption {
  id: string;
  name: string;
  color: string;
}

export interface CakeBaseOption {
  id: string;
  name: string;
  color: string;
  price: number;
  description: string;
  outOfStock?: boolean;
}

export interface CakeFillingOption {
  id: string;
  name: string;
  color: string;
  price: number;
  description: string;
  outOfStock?: boolean;
}

export interface CakeToppingOption {
  id: string;
  name: string;
  color: string;
  price: number;
  description: string;
  outOfStock?: boolean;
}

export interface CakeDecorationOption {
  id: string;
  name: string;
  icon: string;
  price: number;
  description: string;
  outOfStock?: boolean;
}

export interface CakeBuilderState {
  tiers: number; // 1, 2, or 3
  base: string; // CakeBaseOption id
  filling: string; // CakeFillingOption id
  topping: string; // CakeToppingOption id
  decorations: string[]; // List of CakeDecorationOption ids
  servings: number; // Estimated servings based on tiers
}

// Custom Candy Box Types
export interface CandyOption {
  id: string;
  name: string;
  color: string;
  emoji: string;
  price: number;
  description: string;
  outOfStock?: boolean;
}

export interface CandyBoxSize {
  id: string;
  quantity: number;
  price: number;
  name: string;
}

export interface CandyBoxState {
  sizeId: string; // CandyBoxSize id
  items: { [candyId: string]: number }; // candyId -> quantity in the box
}

// Chatbot Types
export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

export interface GeminiChatHistoryItem {
  role: "user" | "model";
  parts: [{ text: string }];
}
