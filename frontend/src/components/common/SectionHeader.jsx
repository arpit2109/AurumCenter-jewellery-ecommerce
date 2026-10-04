import React from 'react';

const SectionHeader = ({ title, subtitle }) => (
    <div className="text-center mb-16 animate-fade-in-up">
        <h2 className="font-serif text-4xl mb-4 text-stone-900">{title}</h2>
        {subtitle && <p className="text-stone-500 font-serif italic max-w-xl mx-auto">{subtitle}</p>}
        <div className="w-12 h-px bg-yellow-600 mx-auto mt-6"></div>
    </div>
);

export default SectionHeader;