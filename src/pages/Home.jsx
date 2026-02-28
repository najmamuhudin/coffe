import { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import Hero from "../Components/Hero";
import { recentProducts, accessories, coffeeBeans } from "../data/products";

const specialTabs = [
  { id: "accessories", label: "Accessories", products: accessories },
  { id: "coffee", label: "Coffee Beans", products: coffeeBeans },
  { id: "apparel", label: "Apparel", products: [] },
  { id: "bundle", label: "Bundle", products: [] },
];

const qualityFeatures = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Active community",
    desc: "Join thousands of coffee enthusiasts in our vibrant global community of passionate brewers.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Best product design",
    desc: "Award-winning packaging and accessories designed by world-class industrial designers.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "Premium quality",
    desc: "Every batch is carefully tested and certified by our team of Q-grader certified experts.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    title: "The best material",
    desc: "We source only the finest materials, from single-origin beans to premium brewing equipment.",
  },
];

function Home() {
  const [activeTab, setActiveTab] = useState("accessories");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);

  // Requirement: useEffect for simulating loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const activeProducts = specialTabs.find((t) => t.id === activeTab)?.products || [];

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfaf7] dark:bg-[#1a0f0a] transition-colors duration-300">
        <div className="w-12 h-12 border-4 border-[#8B5E3C] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#8B5E3C] font-semibold animate-pulse">Brewing your experience...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfaf7] dark:bg-[#1a0f0a] transition-colors duration-300">
      {/* Hero */}
      <Hero />

      {/* ── Explore Recent Products ── */}
      <section id="products" className="py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-4">
            <div className="inline-block bg-[#f0e9e2] dark:bg-[#2c1810] text-[#8B5E3C] text-xs font-semibold px-4 py-1.5 rounded-full mb-3 uppercase tracking-widest">
              Products
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2c1810] dark:text-[#f0e9e2]">
              Explore the recent products
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
              Our online store are specially curating some important blends, from coffees, teas, hot coffees and fusion brews.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {recentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Best Coffee Beans Banner ── */}
      <section className="mx-6 lg:mx-10 mb-20 rounded-3xl overflow-hidden relative bg-[#f0e9e2] dark:bg-[#2c1810]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-10 py-14 gap-8">
          <div className="flex-1">
            <p className="text-[#8B5E3C] text-sm font-semibold uppercase tracking-widest mb-2">✓ Exclusive</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2c1810] dark:text-[#f0e9e2] leading-tight max-w-sm">
              Check out our best coffee beans
            </h2>
            <button className="mt-8 bg-[#2c1810] dark:bg-[#8B5E3C] text-white text-sm font-semibold px-7 py-3 rounded-full hover:bg-[#8B5E3C] dark:hover:bg-[#7a5234] transition shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200">
              Explore our beans
            </button>
          </div>
          <div className="flex-1 relative flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=700&auto=format&fit=crop"
              alt="Premium Coffee Beans"
              className="w-72 h-56 object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* ── Weekend Special Products ── */}
      <section id="special" className="py-20 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2c1810] dark:text-[#f0e9e2]">
              Weekend special products
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm max-w-lg mx-auto">
              Check out the special products that you can order with 10% OFF!
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
            {specialTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeTab === tab.id
                  ? "bg-[#2c1810] dark:bg-[#8B5E3C] text-white shadow-md font-bold"
                  : "bg-[#f0e9e2] dark:bg-[#2c1810] text-[#8B5E3C] hover:bg-[#e5d8ce] dark:hover:bg-[#3d2116]"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Products grid */}
          {activeProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-4 text-[#8B5E3C]">🛍️</p>
              <p className="font-medium text-[#2c1810] dark:text-[#f0e9e2]">Coming soon for this category!</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Quality Section ── */}
      <section className="py-20 px-6 lg:px-10 bg-white dark:bg-[#2c1810]/30 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          {/* Left image */}
          <div className="flex-1 relative">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop"
              alt="coffee quality"
              className="w-full max-w-sm mx-auto rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
            />
            {/* Floating label */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-right-4 bg-white dark:bg-[#2c1810] rounded-2xl shadow-xl px-5 py-4 flex items-center gap-3 w-60 border border-gray-100 dark:border-gray-800">
              <div className="w-10 h-10 bg-[#f0e9e2] dark:bg-[#8B5E3C] rounded-xl flex items-center justify-center text-[#8B5E3C] dark:text-white text-lg shrink-0">☕</div>
              <div>
                <p className="text-xs font-bold text-[#2c1810] dark:text-[#f0e9e2]">Mountain Simaras</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500">Best seller blend</p>
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="flex-1">
            <div className="inline-block bg-[#f0e9e2] dark:bg-[#2c1810] text-[#8B5E3C] text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
              Quality
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2c1810] dark:text-[#f0e9e2] leading-tight">
              We care about the quality of{" "}
              <span className="text-[#8B5E3C]">our products</span>
            </h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-md">
              Drinking coffee is one of the most global things we do and shops take care so you can enjoy a comfortable shop with high-confidence facilities.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
              {qualityFeatures.map((feat) => (
                <div key={feat.title} className="bg-[#faf7f4] dark:bg-[#2c1810] rounded-2xl p-5 hover:shadow-md transition-all duration-200 group border border-transparent dark:border-gray-800">
                  <div className="text-[#8B5E3C] mb-3 group-hover:scale-110 transition-transform duration-200 inline-block">
                    {feat.icon}
                  </div>
                  <h4 className="font-semibold text-[#2c1810] dark:text-[#f0e9e2] text-sm">{feat.title}</h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-1.5 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>

            <button className="mt-8 bg-[#8B5E3C] text-white text-sm font-semibold px-7 py-3 rounded-full hover:bg-[#7a5234] transition shadow-md hover:shadow-lg hover:-translate-y-0.5 duration-200">
              Browse our products →
            </button>
          </div>
        </div>
      </section>

      {/* ── Newsletter / 25% OFF ── */}
      <section className="py-20 px-6 lg:px-10 bg-[#faf7f4] dark:bg-[#1a0f0a] relative overflow-hidden transition-colors duration-300">
        <div className="max-w-7xl mx-auto relative">

          {/* Success Popup (Matching Image) */}
          {subscribed && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 animate-in fade-in duration-300">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={() => setSubscribed(false)}></div>
              <div className="relative bg-white dark:bg-[#2c1810] rounded-2xl shadow-2xl p-8 max-w-sm w-full border border-gray-100 dark:border-gray-800 animate-in zoom-in-95 duration-300">
                <button
                  onClick={() => setSubscribed(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <h3 className="text-2xl font-black text-[#2c1810] dark:text-[#f0e9e2] mb-3">Subscribed!</h3>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Thank you for subscribing to our newsletter.</p>
              </div>
            </div>
          )}

          <div className="bg-[#f0e9e2] dark:bg-[#2c1810] rounded-3xl px-10 py-16 flex flex-col lg:flex-row items-center gap-10 relative overflow-hidden border border-transparent dark:border-gray-800">
            {/* Content */}
            <div className="flex-1 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#2c1810] dark:text-[#f0e9e2]">
                Join in and get{" "}
                <span className="text-[#8B5E3C]">25% OFF!</span>
              </h2>
              <p className="mt-3 text-gray-500 dark:text-gray-400 text-sm">
                Subscribe to our newsletter and get 10% OFF of your first order!
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.includes('@')) {
                    setSubscribed(true);
                    setEmail("");
                  }
                }}
                className="mt-7 flex items-center max-w-md mx-auto gap-2"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address..."
                  className="flex-1 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a0f0a] dark:text-white rounded-full px-5 py-3 text-sm outline-none focus:border-[#8B5E3C] transition shadow-sm placeholder:text-gray-400 dark:placeholder:text-gray-600"
                />
                <button
                  type="submit"
                  className="bg-[#8B5E3C] text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#7a5234] transition shrink-0 shadow-md active:scale-95 duration-200"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;