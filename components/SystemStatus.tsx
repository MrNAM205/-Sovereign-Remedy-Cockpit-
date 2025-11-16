import React from 'react';

const StatusIndicator: React.FC<{ label: string }> = ({ label }) => (
    <div className="flex items-center space-x-2">
        <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-xs font-mono text-gray-400">{label}:</span>
        <span className="text-xs font-bold font-mono text-green-400">NOMINAL</span>
    </div>
);

export const SystemStatus: React.FC = () => {
    return (
        <div className="bg-[#161b22] border border-[#30363d] shadow-md p-3 rounded-lg max-w-2xl mx-auto">
            <div className="flex justify-around items-center flex-wrap gap-x-6 gap-y-2">
                <StatusIndicator label="Cognitive Core" />
                <StatusIndicator label="NLP Layer" />
                <StatusIndicator label="Hygiene Engine" />
                <StatusIndicator label="Ethics Layer" />
            </div>
        </div>
    );
};
