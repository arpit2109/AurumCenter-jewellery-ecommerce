import React, { useState } from 'react';

const LazyImage = ({ src, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Loading Skeleton */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-stone-200 animate-pulse z-10" />
            )}
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsLoaded(true)}
                loading="lazy"
            />
        </div>
    );
};

export default LazyImage;