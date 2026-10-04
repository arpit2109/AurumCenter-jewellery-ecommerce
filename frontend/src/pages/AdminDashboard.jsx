import React, { useState, useEffect } from 'react';
import { TrendingUp, PieChart, BarChart as BarChartIcon, Lock } from 'lucide-react';
import { AdminService } from '../api';
import { FinanceLineChart, CustomBarChart, CustomDonutChart } from '../components/admin/AdminCharts';

const AdminDashboard = ({ onClose }) => {
    const [data, setData] = useState({ sales_metrics: { month: 0 }, users: [] });
    const [filter, setFilter] = useState('Month');

    // Hardcoded chart data (In real app, fetch from AdminService response)
    const financeData = {
        Month: [{ label: 'W1', value: 45000 }, { label: 'W2', value: 52000 }, { label: 'W3', value: 48000 }, { label: 'W4', value: 61000 }],
    };
    const categoryData = [{ label: 'Rings', value: 45 }, { label: 'Necklace', value: 30 }, { label: 'Earrings', value: 15 }];
    const metalData = [{ label: 'Gold', value: 120 }, { label: 'Silver', value: 80 }, { label: 'Plat.', value: 40 }];

    useEffect(() => {
        AdminService.getVaultData().then(res => setData(res.data));
    }, []);

    return (
        <div className="min-h-screen bg-stone-900 text-stone-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <div><h1 className="font-serif text-3xl text-white mb-1">The Vault</h1><p className="text-stone-400 text-sm">Secure Admin Environment</p></div>
                    <button onClick={onClose} className="px-4 py-2 border border-stone-700 rounded-full text-xs hover:bg-stone-800 transition-colors">Exit</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-stone-800 p-6 rounded-lg border-l-4 border-yellow-600"><h3 className="text-stone-400 text-xs uppercase mb-2">Monthly Revenue</h3><p className="text-3xl font-serif">${data.sales_metrics.month}</p></div>
                    <div className="bg-stone-800 p-6 rounded-lg"><h3 className="text-stone-400 text-xs uppercase mb-2">Total Users</h3><p className="text-3xl font-serif">{data.users.length}</p></div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-stone-800 rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6"><h3 className="text-white font-serif text-xl flex items-center gap-2"><TrendingUp className="w-5 h-5 text-yellow-600" /> Trend</h3></div>
                        <FinanceLineChart data={financeData[filter]} filter={filter} />
                    </div>
                    <div className="bg-stone-800 rounded-lg p-6">
                        <h3 className="text-white font-serif text-xl mb-6 flex items-center gap-2"><PieChart className="w-5 h-5 text-yellow-600" /> Categories</h3>
                        <CustomDonutChart data={categoryData} />
                    </div>
                    <div className="bg-stone-800 rounded-lg p-6 lg:col-span-2">
                        <h3 className="text-white font-serif text-xl mb-6 flex items-center gap-2"><BarChartIcon className="w-5 h-5 text-yellow-600" /> Metals</h3>
                        <CustomBarChart data={metalData} />
                    </div>
                </div>

                {/* User Table */}
                <div className="bg-stone-800 rounded-lg overflow-hidden animate-fade-in">
                    <div className="p-6 border-b border-stone-700"><h3 className="font-serif text-xl">Registered Clientele</h3></div>
                    <table className="w-full text-left text-sm text-stone-300">
                        <thead className="bg-stone-900 text-xs uppercase font-bold text-stone-500"><tr><th className="p-4">Email</th><th className="p-4">Name</th><th className="p-4">Joined</th><th className="p-4">Role</th></tr></thead>
                        <tbody className="divide-y divide-stone-700">{data.users.map(u => (<tr key={u.id} className="hover:bg-stone-700/50"><td className="p-4">{u.email}</td><td className="p-4 font-bold text-white">{u.first_name || 'Guest'}</td><td className="p-4">{new Date(u.date_joined).toLocaleDateString()}</td><td className="p-4">{u.is_staff ? 'Admin' : 'Client'}</td></tr>))}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;