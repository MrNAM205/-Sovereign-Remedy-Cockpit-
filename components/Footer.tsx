import React from 'react';
import { SystemStatus } from './SystemStatus';

export const Footer: React.FC = () => {
    return (
        <footer className="text-center text-xs text-gray-600 mt-8 space-y-4">
            <SystemStatus />
            <div>
                <p className="font-semibold">Disclaimer: This application is for informational and educational purposes only and does not constitute legal or financial advice.</p>
                <p>The concepts and tools provided are based on specific interpretations of law and commerce that may not be recognized by conventional legal or financial institutions. Always conduct your own research and consult with a qualified professional before taking any action. The creators of this tool are not liable for any outcomes or consequences resulting from its use.</p>
            </div>
        </footer>
    );
};