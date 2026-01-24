'use client';

import React from 'react';

const ProgressiveBlur = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 h-[15vh] pointer-events-none z-[100] overflow-hidden">
            {/* Progressive Blur Layers */}
            <div
                className="absolute inset-0 backdrop-blur-[2px]"
                style={{ maskImage: 'linear-gradient(to top, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 100%)' }}
            />
            <div
                className="absolute inset-0 backdrop-blur-[4px]"
                style={{ maskImage: 'linear-gradient(to top, black 0%, transparent 80%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 80%)' }}
            />
            <div
                className="absolute inset-0 backdrop-blur-[8px]"
                style={{ maskImage: 'linear-gradient(to top, black 0%, transparent 60%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 60%)' }}
            />
            <div
                className="absolute inset-0 backdrop-blur-[16px]"
                style={{ maskImage: 'linear-gradient(to top, black 0%, transparent 40%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 40%)' }}
            />
            <div
                className="absolute inset-0 backdrop-blur-[32px]"
                style={{ maskImage: 'linear-gradient(to top, black 0%, transparent 20%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 20%)' }}
            />
            <div
                className="absolute inset-0 backdrop-blur-[64px]"
                style={{ maskImage: 'linear-gradient(to top, black 0%, transparent 10%)', WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 10%)' }}
            />
        </div>
    );
};

export default ProgressiveBlur;
