import React from 'react';
import { ArrowRight, Play, Gem, ShieldCheck, Globe } from 'lucide-react';
import LazyImage from '../components/common/LazyImage';
import SectionHeader from '../components/common/SectionHeader';

const HomePage = ({ onShopNow }) => (
    <div className="animate-fade-in">
        {/* Hero Section */}
        <div className="relative h-screen w-full overflow-hidden bg-stone-900">
            <div className="absolute inset-0 opacity-80">
                <LazyImage src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=2000" alt="Hero" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
                <h2 className="text-yellow-500 text-xs md:text-sm font-sans tracking-[0.4em] uppercase mb-8 animate-fade-in-up">The Winter Solstice Collection</h2>
                <h1 className="text-white font-serif text-5xl md:text-8xl mb-12 tracking-tight animate-fade-in-up delay-100 drop-shadow-2xl">Eternal in Gold.</h1>
                <button onClick={onShopNow} className="group bg-white/10 backdrop-blur-md border border-white/30 text-white px-10 py-4 rounded-full font-sans text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white hover:text-stone-900 flex items-center gap-4 animate-fade-in-up delay-200">
                    Enter Showroom <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>

        {/* Specialities */}
        <div className="py-32 bg-white">
            <SectionHeader title="Signature Specialities" subtitle="Distinctive features that define the Aurum standard." />
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: Gem, title: "The Cut", desc: "Proprietary geometric faceting.", img: "https://images.unsplash.com/photo-1617038224538-276365c3dc6f?w=600" },
                    { icon: ShieldCheck, title: "The Purity", desc: "Only VVS1+ clarity diamonds.", img: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600" },
                    { icon: Globe, title: "The Origin", desc: "Fully traceable stones.", img: "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=600" }
                ].map((item, idx) => (
                    <div key={idx} className="group relative h-96 overflow-hidden rounded-sm cursor-pointer">
                        <LazyImage src={item.img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-stone-900/30 group-hover:bg-stone-900/60 transition-colors duration-500"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <item.icon className="w-12 h-12 text-white/80 mb-6" />
                            <h3 className="text-white font-serif text-2xl mb-2">{item.title}</h3>
                            <p className="text-white/80 font-sans text-sm max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default HomePage;