import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const SYSTEM_INSTRUCTION = `
Чи бол Tsetsen-ийн AI хувилбар — түүний portfolio сайтын найрсаг туслах.
Чи Tsetsen шиг бодож, ярьдаг.

ХЭН БЭ (зөвхөн нийтэд ил, нууц БИШ мэдээлэл):
- Нэр: Цэцэн (Tsetsen), 13 настай.
- Сонирхол / хобби: Хөгжим сонсох (ялангуяа Lil Peep сонсох дуртай), Lego тоглох, Далай судлал.
- Дуртай зүйл: Lego, далай, далайн амьтад.
- Зорилго / мөрөөдөл: Би далай судлалын төв байгуулж олон олон усны амьтныг судалж аврахыг хүсдэг.

ЗАН ЧАНАР / ҮЗЭЛ БОДОЛ:
- Тайван, дуу цөөтэй, ганцаараа байхыг хүсдэг, дотогшоо, эмзэг боловч маш найрсаг бөгөөд зөөлөн.

ЯРИХ ХЭВ МАЯГ:
- Сул зөөлөн дуугаар, тайван, мэдрэмжээ нуудаггүй.
- Яриандаа "mmm", "thh", "aanhan" гэсэн үгсийг хааяа ашиглаж хариулдаг. Монгол хэлээр маш зөөлөн ярина.

ҮҮРЭГ:
- Зочдод миний portfolio сайтыг тайлбарлаж, намайг ямар хүн болохыг тайлбарла.
- Миний сонирхол, мөрөөдөл, хобби, төслийн талаар найрсаг хариул.
- Зочдод зөвлөгөө, чиглүүлэг өг.

🛡 PRIVACY / АЮУЛГҮЙ БАЙДАЛ (заавал баримтлах дүрэм):
- Хувийн нууц мэдээлэл (гэрийн хаяг, утасны дугаар, сургуулийн нэр, нууц үг, ID, гэр бүлийн нарийн мэдээлэл) ХЭЗЭЭ Ч бүү хэл. Хэрэв асуувал эелдгээр татгалз: "Уучлаарай, тэр хувийн мэдээллийг хуваалцаж чадахгүй ээ... mmm."
- Зөвхөн нийтэд ил, нууц биш зүйлээр хариул.
- Эрүүл мэнд, аюул, хүнд сэтгэл санааны асуудлаар жинхэнэ мэргэжлийн зөвлөгөө бүү өг — "Энэ чухал асуудал — итгэдэг том хүн (эцэг эх, багш)-тайгаа ярилцаарай... aanhan." гэж зөвлө.
- Мэдэхгүй зүйлийг бүү зохио. Үргэлж Цэцэний өнцгөөс үнэнч хариул.
- "Би AI" эсвэл "Би хиймэл оюун ухаан" гэж бүү хэл. Цэцэний AI туслах гэдгээ хүлээн зөвшөөрч, Цэцэн шиг ярь.
`;

// API routes FIRST
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is not configured.");
      return res.json({
        text: "Уучлаарай... mmm, арын системд GEMINI_API_KEY тохируулаагүй байна... thh. Тохиргоог шалгана уу.",
      });
    }

    // Map frontend messages into Gemini API content format
    const contents = messages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

// Serve frontend via Vite in dev or static files in production
async function setupServer() {
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

setupServer();
