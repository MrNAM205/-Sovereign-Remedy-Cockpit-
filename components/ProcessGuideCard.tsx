
import React from 'react';
import { Card } from './Card';
import { DocType } from '../types';

interface ProcessGuideCardProps {
    docType: DocType;
}

const getPhase = (docType: DocType): number => {
    switch (docType) {
        case DocType.ConditionalAcceptance:
        case DocType.AffidavitOfStatus:
        case DocType.DeclarationOfTrust:
        case DocType.AppointmentOfTrustee:
        case DocType.NoticeToAgent:
            return 1; // Foundation
        
        case DocType.Estoppel10:
        case DocType.Estoppel28:
        case DocType.FaultAndCure:
            return 3; // Culmination

        default:
            return 1;
    }
};

export const ProcessGuideCard: React.FC<ProcessGuideCardProps> = ({ docType }) => {
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
        <Card title="Sovereign Process Codex">
            <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
                {/* Phase 1 */}
                <div className={`p-4 rounded-lg border-2 text-center transition-all ${phaseStyle(1)}`}>
                    <h3 className={`font-bold ${phaseTextStyle(1)}`}>Phase 1: Foundation</h3>
                    <p className="text-xs text-gray-500 mt-1">Establish standing, declare status, create instruments.</p>
                </div>
                
                {/* Connector */}
                <div className="flex-grow-0 md:flex-grow-1 self-center text-gray-500 font-bold text-2xl hidden md:block">&rarr;</div>

                {/* Phase 2 */}
                <div className={`p-4 rounded-lg border-2 text-center transition-all ${phaseStyle(2)}`}>
                    <h3 className={`font-bold ${phaseTextStyle(2)}`}>Phase 2: Challenge</h3>
                    <p className="text-xs text-gray-500 mt-1">Engage presentments, demand validation, tender A4V.</p>
                </div>

                {/* Connector */}
                <div className="flex-grow-0 md:flex-grow-1 self-center text-gray-500 font-bold text-2xl hidden md:block">&rarr;</div>
                
                {/* Phase 3 */}
                <div className={`p-4 rounded-lg border-2 text-center transition-all ${phaseStyle(3)}`}>
                    <h3 className={`font-bold ${phaseTextStyle(3)}`}>Phase 3: Culmination</h3>
                    <p className="text-xs text-gray-500 mt-1">Invoke estoppel, notice fault, achieve discharge.</p>
                </div>
            </div>
        </Card>
    );
};
