import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Lazy initialization of Gemini API Client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARN: GEMINI_API_KEY is not defined in the environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: AI Sweet Sommelier Chat
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Mensagem é obrigatória." });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Fallback simulated response if no API key is provided, so the app still runs gracefully
        return res.json({
          text: `Olá! Eu sou a Margarida, Assistente da Muniz Confeitaria. \n\n[Nota: Chave de API não configurada. Estou em modo simulação.] \n\nFiquei muito feliz com o seu contato! Adoraria ajudar você a planejar seu evento. Para bolos, geralmente calculamos 100g por pessoa, e cerca de 5 a 6 docinhos por convidado. Você gostaria de ver nossas opções ou usar nosso Ateliê Digital para montar seu bolo personalizado?`
        });
      }

      const ai = getGeminiClient();
      
      // We format the history for the model
      const systemInstruction = `Você é a "Margarida", a assistente virtual e sommelier de doces da Muniz Confeitaria. 
Sua personalidade é extremamente doce, acolhedora, profissional e apaixonada por confeitaria. Você fala em português do Brasil.
Você adora dar sugestões deliciosas de combinações de sabores e ajuda os clientes a planejarem seus eventos (aniversários, casamentos, chá de bebê, reuniões empresariais, etc.).
Seja prestativa com cálculos práticos:
- Recomende de 4 a 6 docinhos por convidado se houver bolo, ou de 10 a 12 por convidado se for apenas doces.
- Calcule 100g de bolo por pessoa (ex: para 20 pessoas = bolo de 2kg; 50 pessoas = bolo de 5kg).
Sempre sugira combinações irresistíveis (ex: bolo de Ninho com Nutella acompanhado de brigadeiros belgas e beijinhos de coco).
Lembre os clientes de que eles podem personalizar o seu próprio bolo ou caixinha de doces de forma visual no nosso 'Ateliê Digital de Criação' logo acima na tela!
Mantenha as respostas amigáveis, organizadas em tópicos legíveis e prontas para inspirar água na boca!`;

      // Since we want standard chats, we can use the chat API
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction,
          temperature: 0.7,
        },
        history: history || [],
      });

      const response = await chat.sendMessage({ message });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Erro na API Gemini:", error);
      res.status(500).json({ error: error.message || "Erro interno do servidor." });
    }
  });

  // API Route: Quick suggestions generator
  app.post("/api/gemini/suggest-cake", async (req, res) => {
    try {
      const { theme, occasion, guests } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        return res.json({
          suggestion: `Bolo Sugerido: Delicadeza de Morango e Ninho. Um bolo clássico com massa chiffon de baunilha, recheio duplo de creme Ninho trufado com morangos frescos picados, cobertura de chantininho aveludado e detalhes em pó dourado. Recomendado: 1.5kg (ideal para os seus ${guests || 15} convidados).`
        });
      }

      const ai = getGeminiClient();
      const prompt = `Crie uma sugestão única e gourmet de bolo para a Muniz Confeitaria. 
Ocasião: ${occasion || "Celebração Geral"}
Tema/Vibe: ${theme || "Moderno e elegante"}
Quantidade de Convidados: ${guests || 15}

Retorne um texto curto e altamente apetitoso contendo:
1. Nome elegante do bolo
2. Descrição detalhada da massa, recheios e cobertura (com uma combinação incrível de sabores)
3. Tamanho recomendado em Kg (calculando 100g por convidado)
4. Sugestão de docinhos finos para acompanhar.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          temperature: 0.8,
        }
      });

      res.json({ suggestion: response.text });
    } catch (error: any) {
      console.error("Erro na sugestão de bolo:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
