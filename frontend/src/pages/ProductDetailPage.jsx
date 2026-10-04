import React from 'react';
import { ArrowRight } from 'lucide-react';
import LazyImage from '../components/common/LazyImage';

const ProductDetailPage = ({ product, onBack, onAddToCart }) => (
    <div className="pt-24 pb-12 min-h-screen bg-white animate-fade-in">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
                {/* Main Image */}
                <div className="aspect-[4/5] overflow-hidden relative rounded-sm">
                    <LazyImage src={product.images[0] || "https://via.placeholder.com/600"} alt={product.title} className="w-full h-full" />
                </div>
                {/* Gallery */}
                {product.images.length > 1 && (
                    <div className="grid grid-cols-2 gap-4">
                        {product.images.slice(1).map((img, i) => (
                            <LazyImage key={i} src={img} alt="Detail" className="aspect-square rounded-sm" />
                        ))}
                    </div>
                )}
            </div>
            <div className="flex flex-col justify-center">
                <button onClick={onBack} className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-8 self-start flex items-center gap-2 hover:text-stone-900">
                    <ArrowRight className="rotate-180 w-3 h-3" /> Back to Showroom
                </button>
                <h1 className="font-serif text-4xl mb-4">{product.title}</h1>
                <p className="font-sans text-xl text-stone-500 mb-8">${product.price}</p>
                <p className="text-stone-600 mb-8 font-serif leading-relaxed">{product.description}</p>
                <button
                    onClick={() => onAddToCart(product)}
                    disabled={product.stock === 0}
                    className={`py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest transition-colors ${product.stock === 0 ? 'bg-stone-200 text-stone-400 cursor-not-allowed' : 'bg-stone-900 text-white hover:bg-stone-800'}`}
                >
                    {product.stock === 0 ? "Out of Stock" : "Add to Bag"}
                </button>
            </div>
        </div>
    </div>
);

export default ProductDetailPage;