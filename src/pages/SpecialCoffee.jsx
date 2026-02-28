import React, { useState } from 'react';
import { recentProducts, coffeeBeans } from '../data/products';
import ProductCard from '../Components/ProductCard';

// Helper to determine category
const getCategory = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('latte') || lower.includes('espresso') || lower.includes('cappuccino')) return 'Hot Coffee';
    if (lower.includes('cold brew')) return 'Cold Brew';
    if (lower.includes('iceland') || lower.includes('honduras')) return 'Single Origin';
    return 'Blends';
};

// Helper for aesthetic tags matching the design
const getTags = (product) => {
    const tags = [];
    const lower = product.name.toLowerCase();

    if (lower.includes('latte') || lower.includes('blender')) tags.push('creamy', 'smooth', 'classic');
    else if (lower.includes('cold brew')) tags.push('refreshing', 'bold', 'smooth');
    else if (lower.includes('espresso') || lower.includes('dark roast')) tags.push('intense', 'rich', 'classic');
    else if (lower.includes('honduras') || lower.includes('iceland')) tags.push('single-origin', 'floral', 'unique');
    else tags.push('aromatic', 'balanced', 'flavorful');

    return tags.slice(0, 3);
};

// Prepare coffee menu
const coffeeMenu = [...recentProducts, ...coffeeBeans].map(p => ({
    ...p,
    category: getCategory(p.name)
}));

const TABS = ['All', 'Hot Coffee', 'Cold Brew', 'Blends', 'Single Origin'];

const SpecialCoffee = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter logic
    const displayedProducts = coffeeMenu.filter(product => {
        const matchesTab = activeTab === 'All' || product.category === activeTab;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="w-full min-h-screen bg-[#FAF9F6] font-[sans-serif]">
            {/* Header / Search Section */}
            <div className="bg-white pt-20 pb-12 w-full flex flex-col items-center justify-center text-center px-6">
                <h1 className="text-4xl md:text-5xl font-black text-[#2e1d14] tracking-tight mb-3 leading-tight font-sans">
                    Discover Our Curated Coffee Menu <br />
                    Crafting the Perfect Brew, Every Time
                </h1>
                <p className="text-[#a47a54] md:text-lg mb-10 max-w-2xl font-medium">
                    Explore a world of exceptional flavors, hand-selected blends, and artisanal coffee crafted just for you.
                </p>

                {/* Search Input */}
                <div className="relative w-full max-w-xl mx-auto mb-10">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search coffee..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full py-3.5 pl-14 pr-6 rounded-full border border-gray-200 outline-none focus:border-[#4A3224] focus:ring-1 focus:ring-[#4A3224] transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)] text-gray-700 bg-white"
                    />
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2.5 rounded-full border text-sm font-semibold transition-all flex items-center gap-2 ${activeTab === tab
                                ? 'bg-[#4e3a2f] text-white border-[#4e3a2f] shadow-md'
                                : 'bg-white text-gray-600 border-gray-300 hover:border-[#8B5E3C] hover:text-[#8B5E3C]'
                                }`}
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 8h1a4 4 0 010 8h-1"></path>
                                <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z"></path>
                                <line x1="6" y1="2" x2="6" y2="4"></line>
                                <line x1="10" y1="2" x2="10" y2="4"></line>
                                <line x1="14" y1="2" x2="14" y2="4"></line>
                            </svg>
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="w-full py-16 px-6 md:px-10 lg:px-16 bg-[#f7f5f2]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayedProducts.length > 0 ? (
                        displayedProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-1 sm:col-span-2 lg:col-span-4 text-center py-20 flex flex-col items-center">
                            <span className="text-5xl mb-4">☕</span>
                            <h3 className="text-xl font-bold text-[#2e1d14] mb-2">No coffees found</h3>
                            <p className="text-gray-500">Try adjusting your search or category filter.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpecialCoffee;
