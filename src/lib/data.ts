export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  category: "Fashion & Textiles" | "Jewelry & Beads" | "Home Décor" | "Beauty Products" | "Art & Paintings" | "Spices & Foods";
  vendor: string;
  price: number;
  promoPrice?: number;
  badge?: "Sale" | "New" | "Best Seller";
  description: string;
  image: string; // High-quality online image URLs
  reviews: Review[];
}

export const PRODUCTS: Product[] = [
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

export const VENDORS = [
  "Kofi's Kente Krafts",
  "Ama's Beads & Brass",
  "Bolga Weavers Co.",
  "Organic Shea Glow"
];

export const CATEGORIES = [
  "Fashion & Textiles",
  "Jewelry & Beads",
  "Home Décor",
  "Beauty Products",
  "Art & Paintings",
  "Spices & Foods"
];
