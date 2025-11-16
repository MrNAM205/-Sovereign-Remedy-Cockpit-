
import React from 'react';
import { Card } from './Card';
import { FormData } from '../types';

interface AuditTrailCardProps {
    formData: Pick<FormData, 'claimRef' | 'creditor'>;
}

export const AuditTrailCard: React.FC<AuditTrailCardProps> = ({ formData }) => {
    const { claimRef, creditor } = formData;
    const hasCurrent = claimRef || creditor;

    const generateHash = (input: string) => {
        // Simple non-crypto hash for display purposes
        if (!input) return 'sha256:..................';
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            const char = input.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // Convert to 32bit integer
        }
        return `sha256:${hash.toString(16).padStart(8, '0')}...`;
    }

    return (
        <Card title="Audit Trail & Invocation Ledger">
            <ul className="space-y-3 text-sm">
                {hasCurrent && (
                     <li className="p-3 bg-green-900/50 border border-green-700 rounded-md">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-green-300">Active Invocation:</span>
                            <span className="text-xs bg-green-500 text-black font-bold px-2 py-0.5 rounded-full">IN PROGRESS</span>
                        </div>
                        <p className="text-gray-300 mt-1 truncate">
                            <span className="font-semibold">Ref:</span> {claimRef || '...'} vs <span className="font-semibold">Claimant:</span> {creditor || '...'}
                        </p>
                        <p className="text-gray-400 text-xs mt-1 font-mono">
                            Doc Hash: {generateHash(claimRef + creditor)}
                        </p>
                    </li>
                )}
                <li className="p-3 bg-gray-800/50 border border-gray-600 rounded-md opacity-60">
                    <div className="flex justify-between items-center">
                         <span className="font-bold text-gray-400">Archived Invocation:</span>
                         <span className="text-xs bg-gray-500 text-black font-bold px-2 py-0.5 rounded-full">CLOSED</span>
                    </div>
                    <p className="text-gray-400 mt-1">
                        <span className="font-semibold">Ref:</span> TRAF-2023-01 vs <span className="font-semibold">Claimant:</span> CITY OF ATLANTA
                    </p>
                     <p className="text-gray-500 text-xs mt-1 font-mono">
                        Doc Hash: sha256:1a4b9c8d...
                    </p>
                </li>
                 <li className="p-3 bg-gray-800/50 border border-gray-600 rounded-md opacity-60">
                    <div className="flex justify-between items-center">
                         <span className="font-bold text-gray-400">Archived Invocation:</span>
                         <span className="text-xs bg-gray-500 text-black font-bold px-2 py-0.5 rounded-full">CLOSED</span>
                    </div>
                    <p className="text-gray-400 mt-1">
                        <span className="font-semibold">Ref:</span> PROP-2024-11 vs <span className="font-semibold">Claimant:</span> FULTON COUNTY TAX
                    </p>
                    <p className="text-gray-500 text-xs mt-1 font-mono">
                        Doc Hash: sha256:f3e2d1c0...
                    </p>
                </li>
            </ul>
        </Card>
    );
};
