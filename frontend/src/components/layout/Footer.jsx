import React from 'react';
import { Lock } from 'lucide-react';

const Footer = ({ onViewChange, user, onAdminAccess }) => (
    <footer className="bg-stone-900 text-stone-400 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-sm">
            <div className="col-span-1 md:col-span-2">
                <h4 className="font-serif text-2xl text-white mb-6">AURUM & ETHER</h4>
                <p className="max-w-xs leading-relaxed mb-6">Redefining luxury through transparency.</p>
            </div>
            <div>
                <h5 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Legal</h5>
                <ul className="space-y-4">
                    <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                    <li className="hover:text-white cursor-pointer">Terms of Service</li>
                    {user?.role === 'admin' && (
                        <li onClick={onAdminAccess} className="text-yellow-600 hover:text-yellow-500 cursor-pointer pt-4 flex items-center gap-2">
                            <Lock className="w-3 h-3" /> Admin Vault
                        </li>
                    )}
                </ul>
            </div>
        </div>
    </footer>
);

export default Footer;