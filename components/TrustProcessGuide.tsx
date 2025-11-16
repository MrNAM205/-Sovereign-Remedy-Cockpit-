
import React from 'react';
import { Card } from './Card';
import { TrustDocType } from '../types';

interface TrustProcessGuideProps {
    docType: TrustDocType;
}

const getPhase = (docType: TrustDocType): number => {
    switch (docType) {
        case TrustDocType.DeclarationOfTrust:
        case TrustDocType.AppointmentOfTrustee:
            return 1; // Foundation
        case TrustDocType.ProofOfFunds:
        case TrustDocType.AssetTransfer:
            return 2; // Operation
        case TrustDocType.TrustAmendment:
            return 3; // Administration
        default:
            return 1;
    }
};

export const TrustProcessGuide: React.FC<TrustProcessGuideProps> = ({ docType }) => {
    const activePhase = getPhase(docType);

    const phaseStyle = (phaseNumber: number) => {
        return activePhase === phaseNumber
            ? "border-green-500 bg-green-500/10"
            : "border-gray-600 bg-transparent";
    };
    
    const phaseTextStyle = (phaseNumber: number) => {
        return activePhase === phaseNumber
            ? "text-green-400"
            : "text-gray-400";
    };

    return (
        <Card title="Trust Operations Workflow">
            <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
                <div className={`p-4 rounded-lg border-2 text-center transition-all ${phaseStyle(1)}`}>
                    <h3 className={`font-bold ${phaseTextStyle(1)}`}>Phase 1: Foundation</h3>
                    <p className="text-xs text-gray-500 mt-1">Create the trust and appoint the trustee.</p>
                </div>
                
                <div className="flex-grow-0 md:flex-grow-1 self-center text-gray-500 font-bold text-2xl hidden md:block">&rarr;</div>

                <div className={`p-4 rounded-lg border-2 text-center transition-all ${phaseStyle(2)}`}>
                    <h3 className={`font-bold ${phaseTextStyle(2)}`}>Phase 2: Operation</h3>
                    <p className="text-xs text-gray-500 mt-1">Acquire or transfer assets in commerce.</p>
                </div>

                <div className="flex-grow-0 md:flex-grow-1 self-center text-gray-500 font-bold text-2xl hidden md:block">&rarr;</div>
                
                <div className={`p-4 rounded-lg border-2 text-center transition-all ${phaseStyle(3)}`}>
                    <h3 className={`font-bold ${phaseTextStyle(3)}`}>Phase 3: Administration</h3>
                    <p className="text-xs text-gray-500 mt-1">Modify the trust's terms and structure.</p>
                </div>
            </div>
        </Card>
    );
};
