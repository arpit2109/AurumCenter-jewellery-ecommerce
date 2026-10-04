import React, { useState } from 'react';
import { X } from 'lucide-react';
import { AuthService } from '../../api';

const AuthModal = ({ onLogin, onCancel }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await AuthService.login({ email, password });
            onLogin(response.data.user);
        } catch (err) {
            setError("Invalid credentials.");
        }
    };

    return (
        <div className="fixed inset-0 z-[80] bg-stone-900/90 flex items-center justify-center p-4">
            <div className="bg-white p-12 rounded-lg max-w-md w-full animate-scale-up relative">
                <button onClick={onCancel} className="absolute top-4 right-4"><X className="w-5 h-5 text-stone-400" /></button>
                <h2 className="font-serif text-3xl text-center mb-2">Welcome</h2>
                <form onSubmit={handleLogin} className="space-y-6 mt-8">
                    <input type="email" placeholder="Email" required onChange={e => setEmail(e.target.value)} className="w-full border-b p-3 font-serif outline-none" />
                    <input type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} className="w-full border-b p-3 font-serif outline-none" />
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button className="w-full bg-stone-900 text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-stone-800">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default AuthModal;