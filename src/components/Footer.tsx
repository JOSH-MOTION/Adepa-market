import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t-8 border-terracotta mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-wide text-kente-gold">
                Adepa Market
              </span>
              <span className="text-[9px] tracking-widest text-stone-400 uppercase -mt-1 font-mono">
                Ghanaian Artisan Goods
              </span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed">
              Empowering local Ghanaian artisans by connecting their exquisite craftsmanship—textiles, beads, home décor, and beauty products—to the global market.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Categories</h3>
            <ul className="space-y-2 text-xs">
              <li><Link href="/?category=Fashion%20%26%20Textiles" className="hover:text-kente-gold transition-colors">Fashion & Textiles</Link></li>
              <li><Link href="/?category=Jewelry%20%26%20Beads" className="hover:text-kente-gold transition-colors">Jewelry & Beads</Link></li>
              <li><Link href="/?category=Home%20D%C3%A9cor" className="hover:text-kente-gold transition-colors">Home Décor</Link></li>
              <li><Link href="/?category=Beauty%20Products" className="hover:text-kente-gold transition-colors">Beauty Products</Link></li>
            </ul>
          </div>

          {/* Support Info */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Customer Care</h3>
            <ul className="space-y-2 text-xs">
              <li>Shipping Rates: Standard (15 GHS) / Express (35 GHS)</li>
              <li>Free shipping on orders above 500 GHS</li>
              <li>Return policy: 14 days, unused items only</li>
              <li>Support Email: support@adepamarket.com.gh</li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Artisan Hub</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Adepa Artisan Center<br />
              Oxford Street, Osu, Accra<br />
              Greater Accra Region, Ghana<br />
              Tel: +233 (0) 50 123 4567
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-800 text-center text-xs text-stone-500 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Adepa Market Project. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-[10px] bg-indigo-950/50 text-kente-gold border border-indigo-900/50 px-2.5 py-0.5 rounded">
              Next.js + Firebase + Anthropic Claude API
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
