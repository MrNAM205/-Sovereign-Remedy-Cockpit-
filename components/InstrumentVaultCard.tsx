
import React from 'react';
import { Card } from './Card';
import { FormData } from '../types';

interface InstrumentVaultCardProps {
    formData: Pick<FormData, 'claimRef' | 'creditor'>;
}

export const InstrumentVaultCard: React.FC<InstrumentVaultCardProps> = ({ formData }) => {
    const { claimRef, creditor } = formData;
    const hasCurrent = claimRef || creditor;

    return (
        <Card title="Instrument Vault & Audit Log">
            <ul className="space-y-3 text-sm">
                {hasCurrent && (
                     <li className="p-3 bg-green-900/50 border border-green-700 rounded-md">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-green-300">Active Cycle:</span>
                            <span className="text-xs bg-green-500 text-black font-bold px-2 py-0.5 rounded-full">IN PROGRESS</span>
                        </div>
                        <p className="text-gray-300 mt-1 truncate">
                            <span className="font-semibold">Ref:</span> {claimRef || '...'} vs <span className="font-semibold">Claimant:</span> {creditor || '...'}
                        </p>
                    </li>
                )}
                <li className="p-3 bg-gray-800/50 border border-gray-600 rounded-md opacity-60">
                    <div className="flex justify-between items-center">
                         <span className="font-bold text-gray-400">Archived Cycle:</span>
                         <span className="text-xs bg-gray-500 text-black font-bold px-2 py-0.5 rounded-full">CLOSED</span>
                    </div>
                    <p className="text-gray-400 mt-1">
                        <span className="font-semibold">Ref:</span> TRAF-2023-01 vs <span className="font-semibold">Claimant:</span> CITY OF ATLANTA
                    </p>
                </li>
                 <li className="p-3 bg-gray-800/50 border border-gray-600 rounded-md opacity-60">
                    <div className="flex justify-between items-center">
                         <span className="font-bold text-gray-400">Archived Cycle:</span>
                         <span className="text-xs bg-gray-500 text-black font-bold px-2 py-0.5 rounded-full">CLOSED</span>
                    </div>
                    <p className="text-gray-400 mt-1">
                        <span className="font-semibold">Ref:</span> PROP-2024-11 vs <span className="font-semibold">Claimant:</span> FULTON COUNTY TAX
                    </p>
                </li>
            </ul>
        </Card>
    );
};
