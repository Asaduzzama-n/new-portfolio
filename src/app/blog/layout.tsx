'use client';

import React from 'react';

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen">
            <div className="relative z-10 bg-[#1C1C1C] mb-[500px] md:mb-[700px] rounded-b-[60px] md:rounded-b-[100px]">
                {children}
            </div>
        </div>
    );
}
