// Adepa Market - Core Application Script

// 1. Mock Catalog Data
const PRODUCTS = [
  {
    id: "prod-1",
    name: "Golden Heritage Kente Stole",
    category: "Fashion & Textiles",
    vendor: "Kofi's Kente Krafts",
    price: 350,
    promoPrice: 299,
    badge: "Sale",
    description: "A masterfully handwoven traditional Ghanaian Kente stole. Features the classic gold and red geometric patterns representing royalty, wealth, and spiritual purity. Perfect for graduation ceremonies, weddings, and high-prestige cultural events.",
    image: "https://images.unsplash.com/photo-1620783770629-122b7f187703?q=80&w=600&auto=format&fit=crop",
    reviews: [
      { id: "rev-1-1", userName: "Kojo Mensah", rating: 5, comment: "Absolutely stunning quality. The weave is tight and the colors are vibrant.", date: "2026-06-15" },
      { id: "rev-1-2", userName: "Akua Osei", rating: 4, comment: "Beautiful stole, wore it for graduation and got so many compliments.", date: "2026-06-20" }
    ]
  },
  {
    id: "prod-2",
    name: "Unisex Batakari Fugu Smock",
    category: "Fashion & Textiles",
    vendor: "Kofi's Kente Krafts",
    price: 420,
    badge: "New",
    description: "An authentic, hand-loomed Batakari (Fugu) smock from Northern Ghana. Made with heavy-duty striped cotton fabric and finished with a flared bottom. Elegant, comfortable, and rich in historical significance.",
    image: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=600&auto=format&fit=crop",
    reviews: [
      { id: "rev-2-1", userName: "Yao Boateng", rating: 5, comment: "Heavy, authentic fabric. Fitting is excellent.", date: "2026-06-10" }
    ]
  },
  {
    id: "prod-3",
    name: "Krobo Powder Glass Bead Bracelet",
    category: "Jewelry & Beads",
    vendor: "Ama's Beads & Brass",
    price: 120,
    badge: "Best Seller",
    description: "Handcrafted using traditional Krobo techniques. Recycled glass is ground into a fine powder, layered in clay molds, and kiln-fired. Each bead is hand-painted with unique symbols of heritage and life wisdom.",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=600&auto=format&fit=crop",
    reviews: [
      { id: "rev-3-1", userName: "Efua Ansah", rating: 5, comment: "I wear this every day. The beadwork detail is mesmerizing.", date: "2026-05-28" },
      { id: "rev-3-2", userName: "David K.", rating: 5, comment: "Beautiful gift. The recipient loved the backstory of the beads.", date: "2026-06-02" }
    ]
  },
  {
    id: "prod-4",
    name: "Adinkra Symbol Brass Necklace",
    category: "Jewelry & Beads",
    vendor: "Ama's Beads & Brass",
    price: 180,
    promoPrice: 150,
    badge: "Sale",
    description: "A hand-cast solid brass pendant featuring the 'Gye Nyame' (Except for God) Adinkra symbol. Handcrafted in Kumasi using the ancient lost-wax casting process. Suspended on a premium adjustable leather cord.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop",
    reviews: [
      { id: "rev-4-1", userName: "Abena Addo", rating: 4, comment: "Very unique piece of jewelry. The brass has a nice weight to it.", date: "2026-06-12" }
    ]
  },
  {
    id: "prod-5",
    name: "Authentic Bolga Market Basket",
    category: "Home Décor",
    vendor: "Bolga Weavers Co.",
    price: 250,
    description: "Handwoven from durable elephant grass in Bolgatanga, Ghana. Features a robust leather-wrapped handle for maximum comfort. Highly versatile, perfect as a shopping bag, picnic basket, or decorative storage piece.",
    image: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=600&auto=format&fit=crop",
    reviews: [
      { id: "rev-5-1", userName: "Sarah Jenkins", rating: 5, comment: "Extremely strong and holds so many groceries. Beautiful pattern!", date: "2026-06-05" }
    ]
  },
  {
    id: "prod-6",
    name: "Handcarved Gye Nyame Stool",
    category: "Home Décor",
    vendor: "Kofi's Kente Krafts",
    price: 850,
    description: "A traditional Ghanaian stool handcarved from a single block of indigenous Sese wood. Features the iconic 'Gye Nyame' symbol in the center. Historically, these stools represent royalty and a sacred connection to ancestors.",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=600&auto=format&fit=crop",
    reviews: [
      { id: "rev-6-1", userName: "Ekow Appiah", rating: 5, comment: "A masterwork of carpentry. It takes pride of place in my living room.", date: "2026-06-01" }
    ]
  },
  {
    id: "prod-7",
    name: "Adinkra Print Table Runner",
    category: "Fashion & Textiles",
    vendor: "Kofi's Kente Krafts",
    price: 190,
    badge: "New",
    description: "Dress your dining room table with heritage. Features hand-stamped Adinkra symbols representing love, unity, and resilience, printed on premium Ghanaian woven cotton canvas.",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop",
    reviews: []
  },
  {
    id: "prod-8",
    name: "Premium Raw Shea Butter",
    category: "Beauty Products",
    vendor: "Organic Shea Glow",
    price: 80,
    description: "100% pure, unrefined, organic shea butter sourced from a women's cooperative in Northern Ghana. Rich in vitamins A and E, this deep-moisturizing butter restores skin elasticity, heals cracks, and moisturizes hair.",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=600&auto=format&fit=crop",
    reviews: [
      { id: "rev-8-1", userName: "Araba Mensah", rating: 5, comment: "The best shea butter I've bought. Smells natural and absorbs wonderfully.", date: "2026-06-18" },
      { id: "rev-8-2", userName: "John Doe", rating: 4, comment: "Great moisturizer, works wonders for dry winter skin.", date: "2026-06-25" }
    ]
  },
  {
    id: "prod-9",
    name: "Black Soap Lemongrass Wash",
    category: "Beauty Products",
    vendor: "Organic Shea Glow",
    price: 95,
    promoPrice: 75,
    badge: "Sale",
    description: "Liquid African Black Soap infused with pure lemongrass essential oil. Gently cleanses while treating acne, eczema, and dark spots. Hand-crafted using traditional ash and palm oil recipes.",
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop",
    reviews: [
      { id: "rev-9-1", userName: "Sena A.", rating: 5, comment: "Clears my skin beautifully without drying it out. The scent is amazing.", date: "2026-06-08" }
    ]
  },
  {
    id: "prod-10",
    name: "Recycled Glass Bead Earrings",
    category: "Jewelry & Beads",
    vendor: "Ama's Beads & Brass",
    price: 150,
    description: "Charming drop earrings crafted using vibrant Krobo glass beads and lightweight brass accents. Perfectly balances traditional craftsmanship with contemporary, lightweight wearable style.",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
    reviews: []
  },
  {
    id: "prod-11",
    name: "Bolga Leather Shoulder Bag",
    category: "Home Décor",
    vendor: "Bolga Weavers Co.",
    price: 380,
    description: "A stunning hybrid handbag blending handwoven elephant grass and premium local Ghanaian leather trim. Handcrafted, durable, and highly fashion-forward.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
    reviews: [
      { id: "rev-11-1", userName: "Maya S.", rating: 5, comment: "I get comments on this bag everywhere I go. Superior artisan craft.", date: "2026-06-22" }
    ]
  },
  {
    id: "prod-12",
    name: "Aromatic Lavender Shea Balm",
    category: "Beauty Products",
    vendor: "Organic Shea Glow",
    price: 110,
    badge: "New",
    description: "Whipped organic shea butter blended with organic coconut oil, sweet almond oil, and lavender essential oil. Provides a calming sensory experience while intensely nourishing dry skin.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    reviews: []
  },
  {
    id: "prod-13",
    name: "Handpainted Osu Castle Canvas",
    category: "Art & Paintings",
    vendor: "Kofi's Kente Krafts",
    price: 550,
    description: "A breathtaking acrylic painting of the historic Osu Castle situated on the shores of Accra. Painted on local stretched canvas by an independent Ghanaian artist.",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop",
    reviews: [
      { id: "rev-13-1", userName: "Aba K.", rating: 5, comment: "Stunning depiction of heritage. Adds great flavor to my hallway.", date: "2026-06-28" }
    ]
  },
  {
    id: "prod-14",
    name: "Adinkra Symbols Wall Art Set",
    category: "Art & Paintings",
    vendor: "Kofi's Kente Krafts",
    price: 320,
    badge: "New",
    description: "A set of three handcarved mahogany wood panels featuring popular Adinkra symbols representing courage, cooperation, and love. Ready to hang.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop",
    reviews: []
  },
  {
    id: "prod-15",
    name: "Spicy Shito Pepper Sauce",
    category: "Spices & Foods",
    vendor: "Organic Shea Glow",
    price: 65,
    description: "Authentic Ghanaian black pepper sauce (Shito) prepared with dried fish, shrimp, chili, ginger, and local spices. Hot, rich, and highly savory condiment.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=600&auto=format&fit=crop",
    reviews: [
      { id: "rev-15-1", userName: "Kwesi O.", rating: 5, comment: "Incredibly rich and spicy. Just like home!", date: "2026-06-29" }
    ]
  },
  {
    id: "prod-16",
    name: "Organic Selim Pepper (Hwentia)",
    category: "Spices & Foods",
    vendor: "Organic Shea Glow",
    price: 45,
    promoPrice: 35,
    badge: "Sale",
    description: "High-quality sun-dried Selim Pepper (Grains of Selim / Hwentia). Essential spice for local soups, stews, and traditional porridge mixes.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop",
    reviews: []
  }
];

const VENDORS = [
  "Kofi's Kente Krafts",
  "Ama's Beads & Brass",
  "Bolga Weavers Co.",
  "Organic Shea Glow"
];

const CATEGORIES = [
  "Fashion & Textiles",
  "Jewelry & Beads",
  "Home Décor",
  "Beauty Products",
  "Art & Paintings",
  "Spices & Foods"
];

// Initialize dynamic reviews and products from localStorage
function getLiveProducts() {
  const customProducts = JSON.parse(localStorage.getItem("adepa_custom_products") || "[]");
  const baseProducts = JSON.parse(localStorage.getItem("adepa_products_db") || "null");
  
  if (!baseProducts) {
    localStorage.setItem("adepa_products_db", JSON.stringify(PRODUCTS));
    return [...PRODUCTS, ...customProducts];
  }
  
  return [...baseProducts, ...customProducts];
}

function updateLiveProductReviews(productId, review) {
  const baseProducts = getLiveProducts();
  const index = baseProducts.findIndex(p => p.id === productId);
  if (index !== -1) {
    if (!baseProducts[index].reviews) baseProducts[index].reviews = [];
    baseProducts[index].reviews.unshift(review);
    
    // Split custom vs base products
    const standardIds = PRODUCTS.map(p => p.id);
    const standardToSave = baseProducts.filter(p => standardIds.includes(p.id));
    const customToSave = baseProducts.filter(p => !standardIds.includes(p.id));
    
    localStorage.setItem("adepa_products_db", JSON.stringify(standardToSave));
    localStorage.setItem("adepa_custom_products", JSON.stringify(customToSave));
  }
}

// 2. Simulated Local Authentication Manager
const AuthManager = {
  getCurrentUser() {
    const savedUser = localStorage.getItem("adepa_user");
    return savedUser ? JSON.parse(savedUser) : null;
  },

  signUp(email, pass, name) {
    const users = JSON.parse(localStorage.getItem("adepa_users_db") || "[]");
    if (users.find((u) => u.email === email)) {
      throw new Error("Email already in use.");
    }
    const newUser = { uid: "usr_" + Math.random().toString(36).substr(2, 9), email, displayName: name };
    users.push({ ...newUser, password: pass });
    localStorage.setItem("adepa_users_db", JSON.stringify(users));
    localStorage.setItem("adepa_user", JSON.stringify(newUser));
    this.triggerAuthStateChange();
    return newUser;
  },

  login(email, pass) {
    const users = JSON.parse(localStorage.getItem("adepa_users_db") || "[]");
    const user = users.find((u) => u.email === email && u.password === pass);
    if (!user) {
      throw new Error("Invalid email or password.");
    }
    const currentUser = { uid: user.uid, email: user.email, displayName: user.displayName };
    localStorage.setItem("adepa_user", JSON.stringify(currentUser));
    this.triggerAuthStateChange();
    return currentUser;
  },

  logout() {
    localStorage.removeItem("adepa_user");
    this.triggerAuthStateChange();
  },

  triggerAuthStateChange() {
    const event = new CustomEvent("authStateChanged", { detail: this.getCurrentUser() });
    window.dispatchEvent(event);
  }
};

// 3. Simulated Local Database Manager for Orders
const DatabaseManager = {
  async addOrder(orderData) {
    const orders = JSON.parse(localStorage.getItem("adepa_orders_db") || "[]");
    const newOrder = {
      ...orderData,
      id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
    };
    orders.push(newOrder);
    localStorage.setItem("adepa_orders_db", JSON.stringify(orders));
    return newOrder;
  },

  async getOrder(orderId) {
    const orders = JSON.parse(localStorage.getItem("adepa_orders_db") || "[]");
    return orders.find((o) => o.id === orderId) || null;
  },

  async updateOrderStatus(orderId, status) {
    const orders = JSON.parse(localStorage.getItem("adepa_orders_db") || "[]");
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    localStorage.setItem("adepa_orders_db", JSON.stringify(updated));
  }
};

// 4. Client-side Shopping Cart Manager
const CartManager = {
  getCart() {
    return JSON.parse(localStorage.getItem("adepa_cart") || "[]");
  },

  saveCart(cart) {
    localStorage.setItem("adepa_cart", JSON.stringify(cart));
    const event = new CustomEvent("cartUpdated", { detail: cart });
    window.dispatchEvent(event);
  },

  addToCart(product, quantity = 1) {
    const cart = this.getCart();
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ product, quantity });
    }
    this.saveCart(cart);
    this.showToast(`Added "${product.name}" to cart!`);
  },

  updateQuantity(productId, quantity) {
    let cart = this.getCart();
    const existing = cart.find(item => item.product.id === productId);
    if (existing) {
      existing.quantity = Math.max(1, quantity);
    }
    this.saveCart(cart);
  },

  removeFromCart(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.product.id !== productId);
    this.saveCart(cart);
    this.showToast("Item removed from cart");
  },

  clearCart() {
    this.saveCart([]);
  },

  getCartItemsCount() {
    return this.getCart().reduce((total, item) => total + item.quantity, 0);
  },

  getCartTotal() {
    return this.getCart().reduce((total, item) => {
      const price = item.product.promoPrice ?? item.product.price;
      return total + (price * item.quantity);
    }, 0);
  },

  showToast(message) {
    let toast = document.getElementById("adepa-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "adepa-toast";
      toast.className = "fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-stone-charcoal text-white px-6 py-2.5 rounded-full shadow-xl flex items-center gap-2 border border-warm-border text-xs font-semibold transition-all duration-300 opacity-0 pointer-events-none";
      document.body.appendChild(toast);
    }
    
    toast.innerHTML = `
      <svg class="h-4 w-4 text-kente-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      <span>${message}</span>
    `;
    
    toast.classList.remove("opacity-0", "pointer-events-none");
    toast.classList.add("translate-y-0");

    setTimeout(() => {
      toast.classList.add("opacity-0", "pointer-events-none");
    }, 3000);
  }
};

// 5. Dynamic Shared Components Renderer
function renderSharedComponents() {
  renderNavbar();
  renderFooter();
  renderAIChatbot();
}

function renderNavbar() {
  const navbarContainer = document.getElementById("adepa-navbar-container");
  if (!navbarContainer) return;

  const user = AuthManager.getCurrentUser();
  const cartCount = CartManager.getCartItemsCount();
  
  // Extract parameters from current page URL
  const urlParams = new URLSearchParams(window.location.search);
  const currentQuery = urlParams.get("q") || "";
  const isAiSearch = urlParams.get("ai") === "true";

  const userSectionHtml = user ? `
    <div class="flex items-center gap-3">
      <div class="flex items-center gap-1 text-xs font-semibold text-stone-800">
        <svg class="h-4 w-4 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span class="max-w-[100px] truncate">${user.displayName || user.email}</span>
      </div>
      <button id="nav-logout-btn" class="text-stone-400 hover:text-stone-850 transition-colors" title="Logout">
        <svg class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
    </div>
  ` : `
    <a href="login.html" class="flex items-center gap-1 text-xs font-semibold hover:text-stone-800 transition-colors">
      <svg class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span>Sign In</span>
    </a>
  `;

  navbarContainer.innerHTML = `
    <div class="w-full bg-white text-stone-charcoal border-b border-warm-border">
      <!-- 1. Top Utility Bar -->
      <div class="hidden sm:flex border-b border-stone-100 bg-[#FAF9F6] py-2 text-[11px] text-stone-500 font-medium">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
          <div class="flex gap-4">
            <span class="text-[10px] text-terracotta bg-terracotta/10 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Ghana's #1 Artisan Market</span>
            <span>Oxford Street, Osu, Accra</span>
            <span>Call: +233 (0) 50 123 4567</span>
          </div>
          <div class="flex gap-4 items-center">
            <a href="index.html" class="hover:underline">Shop All</a>
            <a href="admin.html" class="hover:underline text-kente-gold-dark font-bold">Artisan Dashboard</a>
            <span class="text-stone-300">|</span>
            <span class="flex items-center gap-1">
              <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Help & Returns</span>
            </span>
          </div>
        </div>
      </div>

      <!-- 2. Main Header Bar -->
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between gap-4">
          <!-- Logo -->
          <div class="flex items-center">
            <a href="index.html" class="flex flex-col">
              <span class="font-display text-2xl font-black tracking-tight text-stone-charcoal">
                adepa<span class="text-terracotta font-sans font-light">market</span>
              </span>
              <span class="text-[8px] tracking-widest text-stone-400 uppercase -mt-1 font-mono">
                Ghanaian Artisan Goods
              </span>
            </a>
          </div>

          <!-- Search Form -->
          <form id="nav-search-form" class="hidden md:flex flex-1 max-w-xl relative">
            <div class="relative w-full flex items-center bg-[#FAF9F5] border border-warm-border rounded-lg overflow-hidden focus-within:border-stone-400 focus-within:bg-white transition-all">
              <input
                id="nav-search-input"
                type="text"
                value="${currentQuery}"
                placeholder="${isAiSearch ? "Try 'wedding gift' or 'skincare'..." : "Search products, categories..."}"
                class="w-full pl-4 pr-32 py-1.5 text-xs text-stone-850 placeholder-stone-400 focus:outline-none bg-transparent"
              />
              
              <!-- AI Search Toggle -->
              <button
                id="nav-ai-search-toggle"
                type="button"
                class="absolute right-10 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 transition-all ${
                  isAiSearch
                    ? "bg-gradient-to-r from-terracotta to-kente-gold text-white"
                    : "bg-stone-200 text-stone-600 hover:bg-stone-300"
                }"
              >
                <svg class="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>AI</span>
              </button>

              <button
                type="submit"
                class="absolute right-0 top-0 bottom-0 px-3.5 bg-stone-100 hover:bg-stone-200 border-l border-warm-border text-stone-600 transition-colors flex items-center justify-center"
              >
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          <!-- Right Action Icons -->
          <div class="hidden md:flex items-center gap-5 text-stone-600">
            <div id="nav-user-container">
              ${userSectionHtml}
            </div>

            <span class="text-stone-200">|</span>

            <!-- Cart Icon -->
            <a href="cart.html" class="relative flex items-center gap-1 hover:text-stone-850 transition-colors">
              <div class="relative p-1">
                <svg class="h-5 w-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                ${cartCount > 0 ? `
                  <span class="absolute -top-1.5 -right-1.5 bg-terracotta text-white text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    ${cartCount}
                  </span>
                ` : ""}
              </div>
              <span class="text-xs font-semibold">Cart</span>
            </a>
          </div>

          <!-- Mobile Actions -->
          <div class="flex md:hidden items-center gap-3">
            <a href="cart.html" class="relative flex items-center text-stone-600">
              <svg class="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              ${cartCount > 0 ? `
                <span class="absolute -top-1.5 -right-1.5 bg-terracotta text-white text-[8px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center">
                  ${cartCount}
                </span>
              ` : ""}
            </a>

            <button id="mobile-menu-toggle" class="text-stone-600 hover:text-stone-850 transition-colors">
              <svg id="menu-icon" class="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Drawer Menu -->
      <div id="mobile-drawer" class="hidden md:hidden border-t border-stone-100 bg-[#FAF9F6] px-4 pt-4 pb-6 space-y-4 shadow-inner animate-fadeIn">
        <!-- Mobile Search -->
        <form id="mobile-search-form" class="flex relative">
          <div class="relative w-full flex items-center bg-white border border-warm-border rounded-lg overflow-hidden">
            <input
              id="mobile-search-input"
              type="text"
              value="${currentQuery}"
              placeholder="${isAiSearch ? "Try 'wedding gift'..." : "Search..."}"
              class="w-full pl-3 pr-20 py-1.5 text-xs text-stone-850 focus:outline-none"
            />
            <button
              id="mobile-ai-search-toggle"
              type="button"
              class="absolute right-8 px-1.5 py-0.5 rounded text-[8px] font-bold ${
                isAiSearch
                  ? "bg-terracotta text-white"
                  : "bg-stone-200 text-stone-600"
              }"
            >
              AI
            </button>
            <button
              type="submit"
              class="absolute right-0 top-0 bottom-0 px-2.5 bg-stone-100 text-stone-600 border-l border-warm-border"
            >
              <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>

        <!-- Mobile Links -->
        <div class="flex flex-col gap-2 font-semibold text-xs text-stone-600">
          <a href="index.html" class="hover:text-stone-900 py-1.5 border-b border-stone-100">Shop All Goods</a>
          <a href="admin.html" class="hover:text-stone-900 py-1.5 border-b border-stone-100 text-kente-gold-dark">Artisan Dashboard</a>
          <div id="mobile-auth-links">
            ${user ? `
              <div class="text-[10px] text-stone-400 py-1">Logged in: ${user.displayName || user.email}</div>
              <button id="mobile-logout-btn" class="flex items-center gap-1.5 text-left text-red-500 py-1.5">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            ` : `
              <a href="login.html" class="hover:text-stone-900 py-1.5 flex items-center gap-2">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Account Login</span>
              </a>
            `}
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach navbar triggers
  const handleLogout = () => {
    AuthManager.logout();
    window.location.reload();
  };

  const logoutBtn = document.getElementById("nav-logout-btn");
  if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);
  
  const mobileLogoutBtn = document.getElementById("mobile-logout-btn");
  if (mobileLogoutBtn) mobileLogoutBtn.addEventListener("click", handleLogout);

  // Search logic
  let aiSearchState = isAiSearch;

  document.getElementById("nav-ai-search-toggle")?.addEventListener("click", () => {
    aiSearchState = !aiSearchState;
    const inputVal = document.getElementById("nav-search-input")?.value || "";
    window.location.href = `index.html?q=${encodeURIComponent(inputVal)}&ai=${aiSearchState}`;
  });

  document.getElementById("mobile-ai-search-toggle")?.addEventListener("click", () => {
    aiSearchState = !aiSearchState;
    const inputVal = document.getElementById("mobile-search-input")?.value || "";
    window.location.href = `index.html?q=${encodeURIComponent(inputVal)}&ai=${aiSearchState}`;
  });

  const onSearchSubmit = (inputField) => {
    const q = inputField.value.trim();
    if (q) {
      window.location.href = `index.html?q=${encodeURIComponent(q)}&ai=${aiSearchState}`;
    } else {
      window.location.href = "index.html";
    }
  };

  document.getElementById("nav-search-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    onSearchSubmit(document.getElementById("nav-search-input"));
  });

  document.getElementById("mobile-search-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    onSearchSubmit(document.getElementById("mobile-search-input"));
  });

  // Mobile drawer toggle
  const drawer = document.getElementById("mobile-drawer");
  const menuIcon = document.getElementById("menu-icon");
  document.getElementById("mobile-menu-toggle")?.addEventListener("click", () => {
    drawer.classList.toggle("hidden");
    if (drawer.classList.contains("hidden")) {
      menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />`;
    } else {
      menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />`;
    }
  });
}

function renderFooter() {
  const footerContainer = document.getElementById("adepa-footer-container");
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer class="w-full bg-stone-charcoal text-white border-t border-stone-800 pt-12 pb-8">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="space-y-4">
          <span class="font-display text-2xl font-black text-white">adepa<span class="text-terracotta font-sans font-light">market</span></span>
          <p class="text-[11px] text-stone-400 leading-relaxed">
            The premium online marketplace connecting passionate Ghanaian artisans directly to global and local collectors. Akwaaba!
          </p>
        </div>
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-kente-gold mb-3">Shop Categories</h4>
          <ul class="space-y-2 text-[11px] text-stone-300">
            <li><a href="index.html?category=Fashion%20%26%20Textiles" class="hover:text-white">Fashion & Textiles</a></li>
            <li><a href="index.html?category=Jewelry%20%26%20Beads" class="hover:text-white">Jewelry & Beads</a></li>
            <li><a href="index.html?category=Home%20D%C3%A9cor" class="hover:text-white">Home Décor</a></li>
            <li><a href="index.html?category=Beauty%20Products" class="hover:text-white">Beauty Products</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-kente-gold mb-3">Information</h4>
          <ul class="space-y-2 text-[11px] text-stone-300">
            <li><a href="admin.html" class="hover:text-white">Artisan Portal</a></li>
            <li><a href="#" class="hover:text-white">Shipping & Customs</a></li>
            <li><a href="#" class="hover:text-white">Return Policies</a></li>
            <li><a href="#" class="hover:text-white">Support Center</a></li>
          </ul>
        </div>
        <div class="space-y-3">
          <h4 class="text-xs font-bold uppercase tracking-wider text-kente-gold mb-3">Secure Marketplace</h4>
          <p class="text-[11px] text-stone-400">
            Transactions processed securely via credit card, mobile money payments, and Paystack integration.
          </p>
          <div class="flex gap-2">
            <span class="bg-stone-800 text-[9px] font-bold px-2 py-1 rounded text-stone-300">MOMO PAY</span>
            <span class="bg-stone-800 text-[9px] font-bold px-2 py-1 rounded text-stone-300">STRIPE</span>
            <span class="bg-stone-800 text-[9px] font-bold px-2 py-1 rounded text-stone-300">PAYSTACK</span>
          </div>
          <p class="text-[10px] text-stone-400 flex items-center gap-1">
            <svg class="h-3.5 w-3.5 text-green-500 fill-current" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.9C1.803 5.347 1.5 6.012 1.5 7v3.084c0 3.864 2.82 7.218 6.5 7.916 3.68-.698 6.5-4.052 6.5-7.916V7c0-.988-.302-1.653-.666-2.1A5.002 5.002 0 0010 3a5.002 5.002 0 00-7.834 1.9zM10 5a3 3 0 100 6 3 3 0 000-6z" clip-rule="evenodd" /></svg>
            <span>🔒 Secured by 256-bit SSL connection</span>
          </p>
        </div>
      </div>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 border-t border-stone-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between text-[10px] text-stone-500 gap-4">
        <span>© 2026 Adepa Market. Handcrafted with pride in Ghana.</span>
        <div class="flex gap-4">
          <a href="#" class="hover:underline">Terms of Service</a>
          <a href="#" class="hover:underline">Privacy Policy</a>
        </div>
      </div>
    </footer>
  `;
}

function renderAIChatbot() {
  const chatContainer = document.getElementById("adepa-chatbot-container");
  if (!chatContainer) return;

  // Render chatbot widget skeleton
  chatContainer.innerHTML = `
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <!-- Chat Window -->
      <div id="chatbot-window" class="hidden mb-4 w-[330px] sm:w-[380px] h-[480px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-stone-200 animate-slideUp">
        <!-- Header -->
        <div class="bg-gradient-to-r from-[#1a153b] via-[#2f2563] to-terracotta p-4 text-white flex justify-between items-center border-b-2 border-kente-gold">
          <div class="flex items-center gap-2">
            <div class="bg-kente-gold/25 p-1.5 rounded-full border border-kente-gold/50">
              <svg class="h-4 w-4 text-kente-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <h4 class="text-sm font-semibold">Adepa Assistant</h4>
              <p class="text-[10px] text-stone-300">Online • Grounded on Catalog</p>
            </div>
          </div>
          <button id="chatbot-close-btn" class="text-stone-300 hover:text-white transition-colors">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Messages -->
        <div id="chatbot-messages" class="flex-1 p-4 overflow-y-auto space-y-3 bg-[#faf9f6]">
          <div class="flex justify-start">
            <div class="max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed bg-white text-stone-800 border border-stone-200 rounded-tl-none shadow-sm">
              Akwaaba! 🌸 Welcome to Adepa Market. I am your AI Artisan Assistant. Ask me anything about our handwoven cloths, custom jewelry, Bolga baskets, organic shea butter, or our shipping and return policies!
            </div>
          </div>
        </div>

        <!-- Input Form -->
        <form id="chatbot-input-form" class="p-3 bg-white border-t border-stone-200 flex gap-2">
          <input
            id="chatbot-input"
            type="text"
            placeholder="Ask about products, shipping, returns..."
            class="flex-1 border border-stone-200 rounded-full px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-terracotta focus:border-terracotta text-stone-800"
          />
          <button
            type="submit"
            class="bg-[#1a153b] hover:bg-[#2f2563] text-white rounded-full p-2 disabled:opacity-40 transition-colors flex items-center justify-center"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>

      <!-- Floating Button -->
      <button
        id="chatbot-toggle-btn"
        class="bg-stone-charcoal text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center border border-warm-border group relative"
      >
        <svg id="chatbot-toggle-icon" class="h-6 w-6 text-kente-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span class="absolute -top-1 -right-1 bg-terracotta h-3 w-3 rounded-full animate-ping"></span>
        <span class="absolute -top-1 -right-1 bg-terracotta h-3 w-3 rounded-full"></span>
        
        <span class="absolute right-14 bg-stone-800 text-white text-[10px] font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow pointer-events-none">
          Artisan Assistant
        </span>
      </button>
    </div>
  `;

  // Attach trigger actions
  const chatWindow = document.getElementById("chatbot-window");
  const toggleBtn = document.getElementById("chatbot-toggle-btn");
  const toggleIcon = document.getElementById("chatbot-toggle-icon");
  const closeBtn = document.getElementById("chatbot-close-btn");
  const inputForm = document.getElementById("chatbot-input-form");
  const chatInput = document.getElementById("chatbot-input");
  const messagesContainer = document.getElementById("chatbot-messages");

  let isChatOpen = false;
  const chatHistory = [
    { role: "assistant", content: "Akwaaba! 🌸 Welcome to Adepa Market. I am your AI Artisan Assistant. Ask me anything about our handwoven cloths, custom jewelry, Bolga baskets, organic shea butter, or our shipping and return policies!" }
  ];

  const toggleChat = () => {
    isChatOpen = !isChatOpen;
    chatWindow.classList.toggle("hidden");
    if (isChatOpen) {
      toggleIcon.innerHTML = `<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`;
      scrollToBottom();
    } else {
      toggleIcon.innerHTML = `<svg class="h-6 w-6 text-kente-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>`;
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 50);
  };

  toggleBtn.addEventListener("click", toggleChat);
  closeBtn.addEventListener("click", toggleChat);

  // Send message
  inputForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    chatInput.value = "";
    
    // Append user message
    chatHistory.push({ role: "user", content: text });
    appendMessage(text, "user");
    scrollToBottom();

    // Loading indicator
    const loadingElem = document.createElement("div");
    loadingElem.className = "flex justify-start chatbot-loading";
    loadingElem.innerHTML = `
      <div class="bg-stone-200 text-stone-600 rounded-2xl rounded-tl-none p-3 text-xs flex gap-1 items-center shadow-sm">
        <div class="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce"></div>
        <div class="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        <div class="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
      </div>
    `;
    messagesContainer.appendChild(loadingElem);
    scrollToBottom();

    try {
      // Call window.chatAI if defined, else use fallback
      let responseText = "";
      if (window.chatAI) {
        responseText = await window.chatAI(text, chatHistory);
      } else {
        // Local simulation fallback
        await new Promise(resolve => setTimeout(resolve, 1000));
        responseText = simulateLocalChatResponse(text);
      }

      // Remove loading
      messagesContainer.querySelector(".chatbot-loading")?.remove();

      chatHistory.push({ role: "assistant", content: responseText });
      appendMessage(responseText, "assistant");
      scrollToBottom();
    } catch (err) {
      console.error(err);
      messagesContainer.querySelector(".chatbot-loading")?.remove();
      appendMessage("Oops! Connection issue. We have beautiful Golden Heritage Kente Stoles (299 GHS) in stock! How can I help?", "assistant");
      scrollToBottom();
    }
  });

  const appendMessage = (content, role) => {
    const bubble = document.createElement("div");
    bubble.className = `flex ${role === "user" ? "justify-end" : "justify-start"}`;
    
    // Parse basic markdown formatting like **bold**
    let formattedText = content.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-black">$1</strong>');
    formattedText = formattedText.replace(/\n/g, '<br />');

    bubble.innerHTML = `
      <div class="max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
        role === "user"
          ? "bg-terracotta text-white rounded-tr-none shadow-sm"
          : "bg-white text-stone-800 border border-stone-200 rounded-tl-none shadow-sm"
      }">
        <span class="whitespace-pre-line">${formattedText}</span>
      </div>
    `;
    messagesContainer.appendChild(bubble);
  };
}

function simulateLocalChatResponse(message) {
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
  return text;
}

// Automatically render shared layout upon window load
document.addEventListener("DOMContentLoaded", () => {
  renderSharedComponents();
  
  // Simulated Google Analytics PageView event
  const path = window.location.pathname.split('/').pop() || 'index.html';
  console.log(`[Google Analytics] 📈 PageView Tracked: ${path}${window.location.search}`);
  
  // Listen for storage updates to keep UI synchronized
  window.addEventListener("cartUpdated", (e) => {
    // Re-render Navbar to update badge count
    renderNavbar();
    console.log(`[Google Analytics] 🛒 Cart Updated Event. Item count: ${CartManager.getCartItemsCount()}, total: GHS ${CartManager.getCartTotal().toFixed(2)}`);
  });
  window.addEventListener("authStateChanged", () => {
    // Re-render Navbar to reflect auth states
    renderNavbar();
  });
});
