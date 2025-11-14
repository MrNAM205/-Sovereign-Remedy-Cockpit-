
import React from 'react';

interface ConsoleProps {
    title: string;
    children: React.ReactNode;
}

export const Console: React.FC<ConsoleProps> = ({ title, children }) => {
    return (
        <div className="bg-[#0d1117] border border-[#30363d]/50 p-4 rounded-xl space-y-6">
            <h2 className="text-2xl font-bold text-center text-gray-300 border-b-2 border-green-500/50 pb-2">
                {title}
            </h2>
            <div className="space-y-6">
                {children}
            </div>
        </div>
    );
};
