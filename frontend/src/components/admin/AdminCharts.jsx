import React from 'react';

export const FinanceLineChart = ({ data, filter }) => {
    const maxVal = Math.max(...data.map(d => d.value));
    const points = data.map((d, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - (d.value / maxVal) * 80;
        return `${x},${y}`;
    }).join(' ');
    return (
        <div className="w-full h-64 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-xs font-bold text-stone-500 uppercase">{filter} View</div>
            <div className="flex h-full items-end gap-2">
                <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                    <polyline points={points} fill="none" stroke="#eab308" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <path d={`M0,100 ${points} 100,100`} fill="#eab308" opacity="0.1" />
                </svg>
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-stone-500 font-mono uppercase">
                {data.map((d, i) => (i % Math.ceil(data.length / 5) === 0) && <span key={i}>{d.label}</span>)}
            </div>
        </div>
    );
};

export const CustomBarChart = ({ data }) => {
    const maxVal = Math.max(...data.map(d => d.value));
    return (
        <div className="w-full h-64 flex items-end justify-between gap-2 px-4 pb-6">
            {data.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
                    <div className="w-full max-w-[30px] bg-stone-700 rounded-t-sm hover:bg-yellow-600 transition-all" style={{ height: `${(d.value / maxVal) * 80}%` }}></div>
                    <span className="text-[10px] text-stone-500 mt-2 font-mono uppercase truncate w-full text-center">{d.label}</span>
                </div>
            ))}
        </div>
    );
};

export const CustomDonutChart = ({ data }) => {
    const total = data.reduce((acc, d) => acc + d.value, 0);
    let cumulative = 0;
    return (
        <div className="w-full h-64 flex items-center justify-center relative">
            <svg viewBox="0 0 100 100" className="w-48 h-48 -rotate-90 transform">
                {data.map((d, i) => {
                    const percent = d.value / total;
                    const dash = percent * 314;
                    const offset = cumulative * 314;
                    cumulative += percent;
                    return <circle key={i} cx="50" cy="50" r="40" fill="transparent" stroke={["#eab308", "#a8a29e", "#44403c", "#fcd34d"][i]} strokeWidth="10" strokeDasharray={`${dash} 314`} strokeDashoffset={-offset} />;
                })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-serif text-white">{total}</span>
                <span className="text-[10px] text-stone-500 uppercase">Sales</span>
            </div>
        </div>
    );
};