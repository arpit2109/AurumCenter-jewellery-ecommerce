import React from 'react';
import { Filter } from 'lucide-react';
import LazyImage from '../components/common/LazyImage';
import SectionHeader from '../components/common/SectionHeader';

const ShopPage = ({ products, onProductClick, filters, setFilters }) => {
    const filteredProducts = products.filter(p => {
        if (filters.metal.length > 0 && !filters.metal.includes(p.metal_type)) return false;
        if (p.price > filters.maxPrice) return false;
        return true;
    });

    const toggleFilter = (category, value) => setFilters(prev => {
        const current = prev[category];
        const updated = current.includes(value) ? current.filter(item => item !== value) : [...current, value];
        return { ...prev, [category]: updated };
    });

    return (
        <div className="pt-24 min-h-screen bg-stone-50/50 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <SectionHeader title="The Collection" />
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0 space-y-8 sticky top-24 h-fit">
                        <div className="flex items-center gap-2 mb-6"><Filter className="w-4 h-4 text-stone-400" /><h3 className="font-serif text-lg text-stone-900">Refine</h3></div>
                        <div>
                            <h4 className="text-xs font-bold tracking-widest uppercase text-stone-500 mb-4">Metal</h4>
                            <div className="space-y-2">
                                {["Gold", "Silver", "Rose Gold", "Platinum"].map(metal => (
                                    <label key={metal} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-4 h-4 rounded-full border transition-colors ${filters.metal.includes(metal.toUpperCase()) ? 'bg-stone-900 border-stone-900' : 'border-stone-300 group-hover:border-stone-500'}`}></div>
                                        <span className="text-sm text-stone-900 font-medium">{metal}</span>
                                        <input type="checkbox" className="hidden" onChange={() => toggleFilter('metal', metal.toUpperCase())} />
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
                        {filteredProducts.map(p => (
                            <div key={p.id} className="group cursor-pointer" onClick={() => onProductClick(p)}>
                                <div className="aspect-[3/4] overflow-hidden mb-4 relative rounded-sm">
                                    <LazyImage src={p.images[0] || "https://via.placeholder.com/400"} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                                        <button className="bg-white text-stone-900 px-6 py-2 rounded-full text-xs font-bold uppercase">View Details</button>
                                    </div>
                                </div>
                                <h3 className="font-serif text-lg">{p.title}</h3>
                                <p className="text-stone-500 font-sans text-sm">${p.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;