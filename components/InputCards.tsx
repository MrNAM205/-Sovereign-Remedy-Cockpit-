
import React from 'react';
import { Card } from './Card';
import { DocType, type FormData } from '../types';

const inputStyles = "bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] w-full p-2 mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500";
const textareaStyles = "bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] w-full p-2 mb-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500";
const selectStyles = "bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] w-full p-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500";
const buttonStyles = "bg-[#238636] border border-[#30363d] text-white w-full p-3 rounded-lg font-bold hover:bg-[#2ea043] transition-colors";
const aiButtonStyles = "bg-purple-600 border border-[#30363d] text-white w-full p-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2";

interface InputCardProps {
    formData: Pick<FormData, 'manName' | 'fictionName' | 'creditor' | 'claimRef'>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputCard: React.FC<InputCardProps> = ({ formData, onChange }) => (
    <Card title="Define the Parties">
        <input type="text" id="manName" placeholder="Lawful Name (e.g., Patrick-James of the Kelly family)" value={formData.manName} onChange={onChange} className={inputStyles} />
        <input type="text" id="fictionName" placeholder="Legal Fiction/Strawman (e.g., MR PATRICK KELLY)" value={formData.fictionName} onChange={onChange} className={inputStyles} />
        <input type="text" id="creditor" placeholder="Claimant / Agency / Plaintiff" value={formData.creditor} onChange={onChange} className={inputStyles} />
        <input type="text" id="claimRef" placeholder="Case / Ticket / Reference No." value={formData.claimRef} onChange={onChange} className={`${inputStyles} mb-0`} />
    </Card>
);

interface TrustCardProps {
    formData: Pick<FormData, 'trustName' | 'trusteeName'>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TrustCard: React.FC<TrustCardProps> = ({ formData, onChange }) => (
    <Card title="Trust Details">
        <input type="text" id="trustName" placeholder="Trust Name (e.g., The Kelly Family Trust)" value={formData.trustName || ''} onChange={onChange} className={inputStyles} />
        <input type="text" id="trusteeName" placeholder="Trustee Name (e.g., Mary-Elizabeth)" value={formData.trusteeName || ''} onChange={onChange} className={`${inputStyles} mb-0`} />
    </Card>
);

interface SituationCardProps {
    situationContext: string;
    onContextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onGenerateProofs: () => void;
    proofPoints: string[];
    onPointChange: (index: number, value: string) => void;
    onPointDelete: (index: number) => void;
    isLoading: boolean;
}

export const SituationCard: React.FC<SituationCardProps> = ({ situationContext, onContextChange, onGenerateProofs, proofPoints, onPointChange, onPointDelete, isLoading }) => (
    <Card title="Describe Situation (AI-Assisted)">
        <textarea
            id="situationContext"
            placeholder="Describe the situation, e.g., 'Received a speeding ticket', 'Summons for jury duty', 'Code violation notice for tall grass'."
            rows={4}
            value={situationContext}
            onChange={onContextChange}
            className={textareaStyles}
        />
        <button onClick={onGenerateProofs} className={aiButtonStyles} disabled={isLoading}>
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Generating...</span>
                </>
            ) : (
                <>
                    <span role="img" aria-label="sparkles">✨</span>
                    <span>Generate Proofs with AI</span>
                </>
            )}
        </button>
        {proofPoints.length > 0 && (
            <div className="mt-4 space-y-2">
                <h3 className="text-sm font-semibold text-gray-400">Editable Points of Proof:</h3>
                {proofPoints.map((point, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={point}
                            onChange={(e) => onPointChange(index, e.target.value)}
                            className={`${inputStyles} mb-0 flex-grow`}
                        />
                        <button onClick={() => onPointDelete(index)} className="text-red-500 hover:text-red-400 p-1">&times;</button>
                    </div>
                ))}
            </div>
        )}
    </Card>
);


interface DocumentSelectionCardProps {
    docType: DocType;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onGenerate: () => void;
}

export const DocumentSelectionCard: React.FC<DocumentSelectionCardProps> = ({ docType, onChange, onGenerate }) => (
    <Card title="Select Instrument & Generate">
        <select id="docType" value={docType} onChange={onChange} className={selectStyles}>
            <optgroup label="Commercial Remedy">
                <option value={DocType.ConditionalAcceptance}>Notice of Conditional Acceptance (Step 1)</option>
                <option value={DocType.Estoppel10}>Notice of Estoppel (10-Day Default)</option>
                <option value={DocType.Estoppel28}>Notice of Estoppel (28-Day Default)</option>
                <option value={DocType.FaultAndCure}>Notice of Fault & Opportunity to Cure</option>
                <option value={DocType.AffidavitOfStatus}>Affidavit of Status (Proactive)</option>
            </optgroup>
            <optgroup label="Trust & Legacy Instruments">
                <option value={DocType.DeclarationOfTrust}>Declaration of Trust</option>
                <option value={DocType.AppointmentOfTrustee}>Appointment of Trustee</option>
                <option value={DocType.NoticeToAgent}>Notice to Agent/Principal</option>
            </optgroup>
        </select>
        <p className="text-sm text-gray-500 mb-4">Select the appropriate document for your current step in the process.</p>
        <button onClick={onGenerate} className={buttonStyles}>Generate Document</button>
    </Card>
);

interface DateCardProps {
    startDate: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    deadlines: { d10: string; d28: string } | null;
}

export const DateCard: React.FC<DateCardProps> = ({ startDate, onChange, deadlines }) => (
    <Card title="Estoppel Clock">
        <div className="flex items-center space-x-3 mb-3">
            <label htmlFor="startDate" className="text-sm flex-shrink-0">Notice Sent Date:</label>
            <input type="date" id="startDate" value={startDate} onChange={onChange} className={`${inputStyles} mb-0`} />
        </div>
        <div className="text-lg font-bold text-yellow-500 min-h-[56px]">
            {deadlines ? (
                <>
                    <p className="text-sm">10-Day Deadline (Tacit): <span className="font-bold text-yellow-400">{deadlines.d10}</span></p>
                    <p className="text-sm">28-Day Deadline (Final): <span className="font-bold text-red-400">{deadlines.d28}</span></p>
                </>
            ) : (
                <p>Set Date to Calculate Deadline</p>
            )}
        </div>
    </Card>
);
