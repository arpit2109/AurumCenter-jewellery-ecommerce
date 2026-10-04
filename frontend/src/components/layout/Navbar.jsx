import React from 'react';
import { ShoppingBag, Search, Menu, LogOut } from 'lucide-react';

const Navbar = ({ cartCount, onViewChange, onCartClick, user, onLoginClick, onLogout }) => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-6">
                <Menu className="w-5 h-5 text-stone-600 md:hidden" />
                <Search className="w-5 h-5 text-stone-600" />
            </div>

            <div
                className="font-serif text-2xl tracking-widest text-stone-900 cursor-pointer"
                onClick={() => onViewChange('home')}
            >
                AURUM & ETHER
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex gap-6 text-xs font-sans tracking-widest text-stone-500 uppercase">
                    <button onClick={() => onViewChange('shop')} className="hover:text-stone-900">Shop</button>
                </div>
                <div className="w-px h-4 bg-stone-300 mx-2 hidden md:block"></div>

                {user ? (
                    <div className="hidden md:flex items-center gap-4">
                        <span className="text-xs font-bold text-stone-900">{user.name}</span>
                        <LogOut className="w-4 h-4 text-stone-400 cursor-pointer hover:text-stone-900" onClick={onLogout} />
                    </div>
                ) : (
                    <button onClick={onLoginClick} className="text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900">
                        Login
                    </button>
                )}

                <div className="relative cursor-pointer" onClick={onCartClick}>
                    <ShoppingBag className="w-5 h-5 text-stone-600" />
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-600 rounded-full flex items-center justify-center text-[8px] text-white">
                            {cartCount}
                        </span>
                    )}
                </div>
            </div>
        </div>
    </nav>
);

export default Navbar;