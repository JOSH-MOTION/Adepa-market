import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { PRODUCTS, Product } from "@/lib/data";

const apiKey = process.env.ANTHROPIC_API_KEY;
let anthropic: Anthropic | null = null;

if (apiKey) {
  anthropic = new Anthropic({
    apiKey: apiKey,
  });
}

// -------------------------------------------------------------
// AI Chatbot Grounding Prompt & Local Fallback
// -------------------------------------------------------------
const SYSTEM_PROMPT = `You are the friendly, helpful AI shopping assistant for Adepa Market, an online marketplace showcasing premium Ghanaian artisan goods. 
Ground all answers in our product catalog.

PRODUCT CATALOG:
${PRODUCTS.map(
  (p) =>
    `- ID: ${p.id}, Name: ${p.name}, Category: ${p.category}, Vendor: ${p.vendor}, Price: ${p.promoPrice ? p.promoPrice + " GHS (Sale, regular " + p.price + " GHS)" : p.price + " GHS"}, Description: ${p.description}`
).join("\n")}

BUSINESS INFO:
- Shipping Rates: Standard Delivery (within Accra/Tema) is 15 GHS (2-3 business days). Express Delivery is 35 GHS (24 hours). Free shipping on orders over 500 GHS. Nationwide shipping (outside Accra) is 50 GHS (4-7 days).
- Returns: Return within 14 days of delivery for a full refund or exchange. Items must be unused, in original condition, and with tags/packaging.
- Vendor Info: All products are handcrafted in Ghana by local artisan vendors (Kofi's Kente Krafts, Ama's Beads & Brass, Bolga Weavers Co., Organic Shea Glow).

GUIDELINES:
- Keep your answers concise, engaging, and culturally warm. Use occasional Ghanaian expressions like 'Akwaaba' (Welcome) or 'Medaase' (Thank you) naturally.
- Recommend specific products matching their requests. Always cite the vendor name.
- If asked about something outside our catalog, politely redirect to our artisan products.
- Do not mention that you are a language model or AI built by Anthropic; you are simply the Adepa Market Assistant.`;

async function handleChat(message: string, history: any[]) {
  if (anthropic) {
    try {
      const chatMessages = [
        ...history.map((m: any) => ({
          role: m.role === "user" ? "user" as const : "assistant" as const,
          content: m.content,
        })),
        { role: "user" as const, content: message }
      ];

      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: chatMessages,
      });

      const textBlock = response.content[0];
      if (textBlock && 'text' in textBlock) {
        return { text: textBlock.text };
      }
    } catch (e) {
      console.error("Anthropic Chat API failure, falling back to mock:", e);
    }
  }

  // Smart Mock Fallback
  const q = message.toLowerCase();
  let text = "Akwaaba! I'm here to help. ";

  if (q.includes("kente") || q.includes("cloth") || q.includes("stole") || q.includes("smock") || q.includes("fugu")) {
    text += "We feature incredible textiles from *Kofi's Kente Krafts*, including the handwoven **Golden Heritage Kente Stole (299 GHS)** and the **Unisex Batakari Fugu Smock (420 GHS)**. Would you like to add one to your cart?";
  } else if (q.includes("bead") || q.includes("bracelet") || q.includes("earring") || q.includes("brass") || q.includes("jewelry")) {
    text += "For jewelry, *Ama's Beads & Brass* crafts beautiful traditional pieces. Check out the **Krobo Powder Glass Bead Bracelet (120 GHS)** or the **Adinkra Symbol Brass Necklace (150 GHS)**. They make excellent statement pieces!";
  } else if (q.includes("shea") || q.includes("butter") || q.includes("soap") || q.includes("beauty")) {
    text += "Our natural skincare comes from *Organic Shea Glow*. Their **Premium Raw Shea Butter (80 GHS)** and lemongrass-infused **Black Soap Lemongrass Wash (75 GHS)** are great for healthy skin!";
  } else if (q.includes("basket") || q.includes("decor") || q.includes("home") || q.includes("bag")) {
    text += "Our home décor pieces are woven by *Bolga Weavers Co.*. You will love the handwoven **Authentic Bolga Market Basket (250 GHS)** or the stylish **Bolga Leather Shoulder Bag (380 GHS)**.";
  } else if (q.includes("shipping") || q.includes("deliver") || q.includes("cost") || q.includes("price")) {
    text += "Delivery is 15 GHS for standard shipping in Accra (2-3 days), 35 GHS for express (24 hrs), and free if your order exceeds 500 GHS! For outside Accra, nationwide shipping is 50 GHS.";
  } else if (q.includes("return") || q.includes("refund") || q.includes("exchange")) {
    text += "We offer returns within 14 days of delivery. Items must be unused, in their original condition and packaging. Medaase!";
  } else {
    text += "I can tell you about our handcrafted Ghanaian goods! We have four main categories: **Fashion & Textiles**, **Jewelry & Beads**, **Home Décor**, and **Beauty Products**. What are you looking for today?";
  }

  return { text };
}

// -------------------------------------------------------------
// AI Natural Language Search & Local Fallback
// -------------------------------------------------------------
async function handleSearch(query: string) {
  if (anthropic) {
    try {
      const searchPrompt = `Given the user query "${query}", analyze the following product list and identify which products match or are related to their request. Return ONLY a valid JSON array of matching product IDs sorted by relevance, like: ["prod-1", "prod-3"]. Do not include any text before or after the JSON.
      
PRODUCTS:
${PRODUCTS.map((p) => `- ID: ${p.id}, Name: ${p.name}, Description: ${p.description}, Category: ${p.category}`).join("\n")}`;

      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 150,
        messages: [{ role: "user", content: searchPrompt }],
      });

      const textBlock = response.content[0];
      if (textBlock && 'text' in textBlock) {
        const jsonMatch = textBlock.text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const ids = JSON.parse(jsonMatch[0]);
          return { ids };
        }
      }
    } catch (e) {
      console.error("Anthropic Search API failure, falling back to mock:", e);
    }
  }

  // Keyword/Semantic Mock Fallback
  const q = query.toLowerCase();
  const matchedIds: string[] = [];

  // Keywords mappings
  const keywords: { [key: string]: string[] } = {
    wedding: ["prod-1", "prod-4", "prod-6", "prod-10"],
    gift: ["prod-3", "prod-4", "prod-5", "prod-8", "prod-10"],
    skincare: ["prod-8", "prod-9", "prod-12"],
    decor: ["prod-5", "prod-6", "prod-11"],
    bag: ["prod-5", "prod-11"],
    colorful: ["prod-1", "prod-3", "prod-10"],
    luxury: ["prod-1", "prod-6", "prod-11"],
    heritage: ["prod-1", "prod-2", "prod-4", "prod-6"],
  };

  // Find exact keyword matches
  Object.keys(keywords).forEach((kw) => {
    if (q.includes(kw)) {
      keywords[kw].forEach((id) => {
        if (!matchedIds.includes(id)) matchedIds.push(id);
      });
    }
  });

  // Default string match fallback if no advanced tags match
  PRODUCTS.forEach((p) => {
    if (
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.vendor.toLowerCase().includes(q)
    ) {
      if (!matchedIds.includes(p.id)) {
        matchedIds.push(p.id);
      }
    }
  });

  // If still empty, return some top picks
  if (matchedIds.length === 0) {
    return { ids: ["prod-1", "prod-3", "prod-8"] }; // Default featured
  }

  return { ids: matchedIds };
}

// -------------------------------------------------------------
// AI Cart Recommendations & Local Fallback
// -------------------------------------------------------------
async function handleRecommendations(cartItems: { id: string; name: string }[]) {
  if (anthropic) {
    try {
      const recsPrompt = `The customer currently has these items in their shopping cart:
${cartItems.map((item) => `- ${item.name} (ID: ${item.id})`).join("\n")}

Select exactly 3 complementary products from the remaining catalog that would go well with their cart.
For each recommended product, write a brief, friendly, 1-sentence explanation of why it complements their cart.

Return a valid JSON array of objects with the structure:
[
  { "id": "prod-X", "reason": "This is why it matches..." },
  ...
]
Do not include any text before or after the JSON.

CATALOG:
${PRODUCTS.filter(p => !cartItems.some(item => item.id === p.id)).map(
  (p) => `- ID: ${p.id}, Name: ${p.name}, Category: ${p.category}, Vendor: ${p.vendor}, Description: ${p.description}`
).join("\n")}`;

      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 300,
        messages: [{ role: "user", content: recsPrompt }],
      });

      const textBlock = response.content[0];
      if (textBlock && 'text' in textBlock) {
        const jsonMatch = textBlock.text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const recommendations = JSON.parse(jsonMatch[0]);
          return { recommendations };
        }
      }
    } catch (e) {
      console.error("Anthropic Recommendation API failure, falling back to mock:", e);
    }
  }

  // Mock recommendations based on cart categories
  const recs: { id: string; reason: string }[] = [];
  const inCartIds = cartItems.map(c => c.id);

  // Simple rule-based mock
  if (inCartIds.some(id => ["prod-1", "prod-2"].includes(id))) {
    // Has fashion
    recs.push({ id: "prod-3", reason: "Complete your traditional ensemble with the hand-painted Krobo Bead Bracelet." });
    recs.push({ id: "prod-4", reason: "The brass Adinkra Necklace matches beautifully with handcrafted hand-woven cloths." });
    recs.push({ id: "prod-11", reason: "Carry your essentials in style with the Bolga Leather Shoulder Bag." });
  } else if (inCartIds.some(id => ["prod-8", "prod-9", "prod-12"].includes(id))) {
    // Has beauty
    recs.push({ id: "prod-5", reason: "Store your beauty essentials or bath products in this handcrafted Bolga basket." });
    recs.push({ id: "prod-3", reason: "Add some handmade Krobo bead accessories to match your radiant skin glow." });
    recs.push({ id: "prod-12", reason: "Complement your skin wash with the ultra-nourishing Aromatic Lavender Shea Balm." });
  } else {
    // Default recommendations
    recs.push({ id: "prod-1", reason: "Add a splash of Royal Ghanaian Kente textile styling to your collection." });
    recs.push({ id: "prod-3", reason: "This best-selling Krobo Glass Bead Bracelet looks great with any casual outfit." });
    recs.push({ id: "prod-8", reason: "Keep your skin hydrated and glowing with our pure Northern Ghanaian Shea Butter." });
  }

  // Ensure they aren't already in the cart and that we have up to 3
  const finalRecs = recs
    .filter(r => !inCartIds.includes(r.id))
    .slice(0, 3);

  // If less than 3, pad with others
  PRODUCTS.forEach(p => {
    if (finalRecs.length < 3 && !inCartIds.includes(p.id) && !finalRecs.some(r => r.id === p.id)) {
      finalRecs.push({ id: p.id, reason: "A popular, premium artisan craft representing authentic Ghanaian culture." });
    }
  });

  return { recommendations: finalRecs };
}

// -------------------------------------------------------------
// AI Product Description Generator & Local Fallback
// -------------------------------------------------------------
async function handleDescription(facts: { name: string; category: string; vendor: string; keywords: string }) {
  if (anthropic) {
    try {
      const copyPrompt = `Generate a polished, compelling, high-converting e-commerce product description (approx. 3-4 sentences) based on these attributes:
      - Product Name: ${facts.name}
      - Category: ${facts.category}
      - Vendor: ${facts.vendor}
      - Essential details/features: ${facts.keywords}
      
      Make the tone warm, authentic, and evocative of rich Ghanaian heritage. Focus on handcrafted craftsmanship and local artisan support. Do not include introductory text, just output the description itself.`;

      const response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 250,
        messages: [{ role: "user", content: copyPrompt }],
      });

      const textBlock = response.content[0];
      if (textBlock && 'text' in textBlock) {
        return { description: textBlock.text.trim() };
      }
    } catch (e) {
      console.error("Anthropic Description API failure, falling back to mock:", e);
    }
  }

  // Mock description builder
  const desc = `Handcrafted with love by ${facts.vendor}, this premium ${facts.name} represents the best of Ghanaian craftsmanship. Incorporating traditional techniques passed down through generations, this item features authentic ${facts.keywords || "natural details"}. By purchasing this, you directly support independent local artisans and help keep traditional Ghanaian heritage alive. Perfect for adding a unique, meaningful touch to your collection.`;

  return { description: desc };
}

// -------------------------------------------------------------
// POST Request Router
// -------------------------------------------------------------
export async function POST(req: Request) {
  try {
    const { action, ...payload } = await req.json();

    switch (action) {
      case "chat":
        const chatRes = await handleChat(payload.message, payload.history || []);
        return NextResponse.json(chatRes);
      case "search":
        const searchRes = await handleSearch(payload.query);
        return NextResponse.json(searchRes);
      case "recommendations":
        const recsRes = await handleRecommendations(payload.cartItems || []);
        return NextResponse.json(recsRes);
      case "describe":
        const descRes = await handleDescription(payload.facts);
        return NextResponse.json(descRes);
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error: any) {
    console.error("Error in POST route:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
