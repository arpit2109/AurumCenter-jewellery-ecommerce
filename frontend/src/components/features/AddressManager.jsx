import React, { useState, useEffect } from 'react';
import { MapPin, Plus, Check } from 'lucide-react';
import { UserService } from '../../api';

const AddressManager = ({ onSelect, onBack }) => {
    const [addresses, setAddresses] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newAddress, setNewAddress] = useState({ street: '', city: '', zip_code: '', country: '' });

    useEffect(() => {
        UserService.getAddresses()
            .then(res => setAddresses(res.data.results || res.data))
            .catch(err => console.error("Address fetch error", err));
    }, []);

    const handleAdd = (e) => {
        e.preventDefault();
        UserService.addAddress(newAddress).then(res => {
            setAddresses([...addresses, res.data]);
            setIsAdding(false);
        });
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onBack}></div>
            <div className="relative bg-white p-8 rounded-lg max-w-md w-full animate-scale-up shadow-2xl">
                <h3 className="font-serif text-2xl mb-6 text-stone-900">Shipping Address</h3>
                {!isAdding ? (
                    <div className="space-y-4">
                        {addresses.map(addr => (
                            <div key={addr.id} onClick={() => onSelect(addr)} className="border border-stone-200 p-4 rounded-sm cursor-pointer hover:border-yellow-600 hover:bg-yellow-50/50 transition-all group">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2 mb-2"><MapPin className="w-4 h-4 text-stone-400 group-hover:text-yellow-600" /><span className="text-xs font-bold uppercase tracking-widest">{addr.country}</span></div>
                                </div>
                                <p className="font-serif text-stone-600">{addr.street}</p>
                                <p className="font-sans text-sm text-stone-500">{addr.city}, {addr.zip_code}</p>
                            </div>
                        ))}
                        <button onClick={() => setIsAdding(true)} className="w-full py-3 border border-dashed border-stone-300 text-stone-400 rounded-sm hover:border-stone-900 hover:text-stone-900 transition-colors flex items-center justify-center gap-2 text-sm"><Plus className="w-4 h-4" /> Add New Address</button>
                    </div>
                ) : (
                    <form onSubmit={handleAdd} className="space-y-4">
                        <input placeholder="Street" className="w-full border-b p-2 font-serif outline-none" required onChange={e => setNewAddress({ ...newAddress, street: e.target.value })} />
                        <div className="grid grid-cols-2 gap-4"><input placeholder="City" className="w-full border-b p-2 font-serif outline-none" required onChange={e => setNewAddress({ ...newAddress, city: e.target.value })} /><input placeholder="Zip" className="w-full border-b p-2 font-serif outline-none" required onChange={e => setNewAddress({ ...newAddress, zip_code: e.target.value })} /></div>
                        <input placeholder="Country" className="w-full border-b p-2 font-serif outline-none" required onChange={e => setNewAddress({ ...newAddress, country: e.target.value })} />
                        <div className="flex gap-4 mt-6"><button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-3 text-stone-500 text-xs font-bold uppercase">Cancel</button><button type="submit" className="flex-1 bg-stone-900 text-white py-3 rounded-full text-xs font-bold uppercase">Save</button></div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AddressManager;