
import React from 'react';

interface CardProps {
    title: string;
    children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div className="bg-[#161b22] border border-[#30363d] shadow-lg p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-green-400">{title}</h2>
            {children}
        </div>
    );
};
