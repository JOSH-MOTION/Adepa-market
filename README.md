# Adepa Market - Ghanaian Artisan Goods Marketplace

An authentic, fully responsive e-commerce web application representing a Ghanaian artisan-goods marketplace. Built as a student project showcasing modern e-commerce architecture, Local/Firebase simulation fallbacks, and advanced integrations with the Anthropic Claude API.

---

## 🛠️ Tech Stack & Key Files

- **Frontend**: Next.js 15 (App Router, React 19) + Tailwind CSS 4.
- **Typography**: Google Fonts (Playfair Display for display headers, Geist Sans for body text).
- **Backend / API Router**: Next.js Route Handlers.
- **Database & Authentication**: Firebase SDK (configured in [firebase.ts](file:///c:/Users/codetrain%20Africa/Desktop/Mania's%20Frined/src/lib/firebase.ts)). Includes full client-side simulator fallbacks using `localStorage` so the app is immediately and fully testable without setting up credentials.
- **AI Engine**: Anthropic Claude API SDK (`@anthropic-ai/sdk`), managed centrally in the backend API router.

---

## 🚀 AI Integration Locations

1. **AI Floating Chatbot Widget**:
   - **Frontend UI**: [AIChatbot.tsx](file:///c:/Users/codetrain%20Africa/Desktop/Mania's%20Frined/src/components/AIChatbot.tsx) - Interactive widget floating at the bottom right.
   - **API Logic**: [route.ts](file:///c:/Users/codetrain%20Africa/Desktop/Mania's%20Frined/src/app/api/ai/route.ts#L42-L82) - Handles system prompt grounding (product listings, shipping rates, returns, local culture terms like *Akwaaba* and *Medaase*).
   - **Fallback**: Toggles local keyword rule-matching if API keys are missing.

2. **AI-Powered Natural-Language Search**:
   - **Frontend UI**: [Navbar.tsx](file:///c:/Users/codetrain%20Africa/Desktop/Mania's%20Frined/src/components/Navbar.tsx) - Includes an "AI Search" button to toggling semantic interpretation.
   - **API Logic**: [route.ts](file:///c:/Users/codetrain%20Africa/Desktop/Mania's%20Frined/src/app/api/ai/route.ts#L87-L149) - Instructs Claude to review the entire product catalog and extract relevant IDs based on terms like *"affordable gift for a wedding"*.
   - **Fallback**: Standard substring search through product names and descriptions.

3. **AI Cart Recommendations**:
   - **Frontend UI**: [page.tsx](file:///c:/Users/codetrain%20Africa/Desktop/Mania's%20Frined/src/app/cart/page.tsx) - Sends current items in the cart to the model.
   - **API Logic**: [route.ts](file:///c:/Users/codetrain%20Africa/Desktop/Mania's%20Frined/src/app/api/ai/route.ts#L154-L211) - Tells Claude to suggest 3 complementary catalog products alongside a custom sentence reasoning why they fit together.
   - **Fallback**: Categorical similarity algorithm (e.g. matching skincare with bags or jewelry).

4. **AI Product Description Generator**:
   - **Frontend UI**: [page.tsx](file:///c:/Users/codetrain%20Africa/Desktop/Mania's%20Frined/src/app/admin/page.tsx) - Input parameters form where artisans can input facts.
   - **API Logic**: [route.ts](file:///c:/Users/codetrain%20Africa/Desktop/Mania's%20Frined/src/app/api/ai/route.ts#L216-L239) - Claude writes warm, evocative marketing copy highlighting Ghanaian heritage.
   - **Fallback**: Structural template copywriting builder.

---

## 🎨 Visual Identity

- **Indigo Backgrounds (`#1a153b`)**: Symbolizes richness and royalty.
- **Kente Gold (`#e29c1d`)**: Symbolizes wealth, high status, and warmth.
- **Terracotta Accent (`#c84e27`)**: Evocative of local clay pottery and soil.
- **Playfair Display Serif Font**: Promotes a premium, handcrafted feel.

---

## ⚠️ Limitations & Presentation Points

For the course presentation, note these architectural decisions:
1. **Mock Gateway**: The Stripe elements and Mobile Money (MoMo) forms validate card formats and phone lengths, simulating gateway responses for easier classroom evaluation.
2. **Local Simulation Database**: Auth and orders utilize Firestore. If Firestore/Auth keys are absent, they seamlessly read/write to `localStorage`, preventing application crashes.
3. **Claude Rate Limiting**: The backend contains high-fidelity template logic to substitute mock responses instantly if the Anthropic API is rate-limited or the API key isn't provided.
