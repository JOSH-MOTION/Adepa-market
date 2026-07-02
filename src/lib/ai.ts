export async function chatAI(message: string, history: any[] = []): Promise<string> {
  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "chat", message, history }),
    });
    if (!res.ok) throw new Error("Fetch error");
    const data = await res.json();
    return data.text || "I'm sorry, I couldn't get a response. Please try again.";
  } catch (error) {
    console.error("AI Chat failed:", error);
    return "Akwaaba! I'm experiencing some network issues, but I'd love to tell you that Kofi's Kente Krafts and Ama's Beads are fully stocked with authentic handwoven stoles and glass bead bracelets. Let me know if you need help checkout out!";
  }
}

export async function searchAI(query: string): Promise<string[]> {
  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "search", query }),
    });
    if (!res.ok) throw new Error("Fetch error");
    const data = await res.json();
    return data.ids || [];
  } catch (error) {
    console.error("AI Search failed:", error);
    return [];
  }
}

export interface AIRecommendation {
  id: string;
  reason: string;
}

export async function getAIRecommendations(cartItems: { id: string; name: string }[]): Promise<AIRecommendation[]> {
  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "recommendations", cartItems }),
    });
    if (!res.ok) throw new Error("Fetch error");
    const data = await res.json();
    return data.recommendations || [];
  } catch (error) {
    console.error("AI Recommendations failed:", error);
    return [];
  }
}

export interface GeneratorFacts {
  name: string;
  category: string;
  vendor: string;
  keywords: string;
}

export async function generateDescriptionAI(facts: GeneratorFacts): Promise<string> {
  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "describe", facts }),
    });
    if (!res.ok) throw new Error("Fetch error");
    const data = await res.json();
    return data.description || "";
  } catch (error) {
    console.error("AI Description generation failed:", error);
    return `Handcrafted with pride by ${facts.vendor}, this premium ${facts.name} showcases authentic Ghanaian artistry. Made from traditional materials and featuring ${facts.keywords || "meticulous attention to detail"}, it represents our heritage in every stitch and curve.`;
  }
}
