import React, { useState, useCallback, useMemo } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Card } from './Card';
import { Console } from './Console';
import { ProcessGuideCard } from './ProcessGuideCard';
import { AuditTrailCard } from './InstrumentVaultCard';
import { type FormData, DocType } from '../types';
import * as DocGen from '../services/documentGenerator';
import { LoadingSpinner } from './LoadingSpinner';

const buttonStyles = "bg-[#238636] border border-[#30363d] text-white p-2 rounded-lg font-bold hover:bg-[#2ea043] transition-colors disabled:bg-gray-600";
const inputStyles = "bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500";
const outputStyles = "bg-[#0d1117] border border-dashed border-[#30363d] text-sm whitespace-pre-wrap break-words w-full p-3 rounded-lg text-gray-300 font-mono";

export const RemedyProcess: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        creditor: '',
        claimRef: '',
        manName: '',
        fictionName: '',
        proofPoints: [],
    });
    const [situation, setSituation] = useState('');
    const [selectedDocType, setSelectedDocType] = useState<DocType>(DocType.ConditionalAcceptance);
    const [generatedDoc, setGeneratedDoc] = useState('');
    const [isLoadingAiProofs, setIsLoadingAiProofs] = useState(false);
    const [error, setError] = useState('');

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const generateProofs = useCallback(async () => {
        if (!situation) {
            setError("Please describe the situation first.");
            return;
        }
        setIsLoadingAiProofs(true);
        setError('');
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Based on this situation: "${situation}", generate a numbered list of 3-5 concise, powerful points challenging jurisdiction or validity for a Conditional Acceptance letter. The points should be based on principles of commercial law, sovereignty, and contract law. Focus on demands for proof (e.g., proof of contract, proof of standing, proof of lawful assessment).`;
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            const points = response.text.split('\n').filter(p => p.trim().length > 0 && /^\d+\./.test(p.trim()));
            setFormData(prev => ({ ...prev, proofPoints: points }));
        } catch (err) {
            console.error(err);
            setError("Failed to generate proof points. Please check the console.");
        } finally {
            setIsLoadingAiProofs(false);
        }
    }, [situation]);

    const generateDocument = useCallback(() => {
        const docGenerators: { [key in DocType]?: (data: FormData) => string } = {
            [DocType.ConditionalAcceptance]: DocGen.generateConditionalAcceptance,
            [DocType.AffidavitOfStatus]: DocGen.generateAffidavitOfStatus,
            [DocType.NoticeToAgent]: DocGen.generateNoticeToAgent,
            [DocType.Estoppel10]: (data) => DocGen.generateEstoppelNotice(data, 10, new Date().toISOString().split('T')[0]),
            [DocType.Estoppel28]: (data) => DocGen.generateEstoppelNotice(data, 28, new Date().toISOString().split('T')[0]),
            [DocType.FaultAndCure]: DocGen.generateFaultAndCureNotice,
        };
        const generator = docGenerators[selectedDocType];
        if (generator) {
            setGeneratedDoc(generator(formData));
        } else {
            setGeneratedDoc(`No generator found for document type: ${selectedDocType}`);
        }
    }, [selectedDocType, formData]);

    const copyToClipboard = (text: string) => navigator.clipboard.writeText(text).then(() => alert('Copied!'));
    
    const docOptions = useMemo(() => Object.values(DocType).map(doc => ({ value: doc, label: doc.replace(/([A-Z])/g, ' $1').trim() })), []);

    return (
        <Console title="Remedy Process Engine">
            <ProcessGuideCard docType={selectedDocType} />
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card title="1. Define Parties & Claim">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <input type="text" name="manName" placeholder="Your Lawful Name (e.g., John-Henry: of the family Doe)" value={formData.manName} onChange={handleFormChange} className={inputStyles} />
                            <input type="text" name="fictionName" placeholder="Legal Fiction Name (e.g., JOHN H DOE)" value={formData.fictionName} onChange={handleFormChange} className={inputStyles} />
                            <input type="text" name="creditor" placeholder="Claimant/Creditor Name" value={formData.creditor} onChange={handleFormChange} className={inputStyles} />
                            <input type="text" name="claimRef" placeholder="Claim Reference/Account #" value={formData.claimRef} onChange={handleFormChange} className={inputStyles} />
                        </div>
                    </Card>
                    <Card title="2. Generate Proof of Claim Points (for Conditional Acceptance)">
                         <textarea placeholder="Briefly describe the situation (e.g., 'Received a traffic ticket...', 'Got a notice from the IRS...')" rows={3} value={situation} onChange={e => setSituation(e.target.value)} className={inputStyles} />
                         <button onClick={generateProofs} disabled={isLoadingAiProofs} className={`${buttonStyles} w-full mt-2`}>
                            {isLoadingAiProofs ? <LoadingSpinner text="Generating..."/> : 'Generate Proofs with AI'}
                        </button>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        <div className="mt-3 space-y-2 text-sm text-gray-300">
                           {formData.proofPoints.map((point, i) => <p key={i}>{point}</p>)}
                        </div>
                    </Card>
                     <Card title="3. Synthesize & Export Instrument">
                        <select value={selectedDocType} onChange={(e) => setSelectedDocType(e.target.value as DocType)} className={`${inputStyles} mb-3`}>
                            {docOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                        </select>
                        <button onClick={generateDocument} className={`${buttonStyles} w-full`}>Generate Document</button>
                        {generatedDoc && (
                            <div className="mt-4">
                                <textarea readOnly value={generatedDoc} rows={15} className={outputStyles} />
                                <button onClick={() => copyToClipboard(generatedDoc)} className={`${buttonStyles} w-full mt-3`}>Copy to Clipboard</button>
                            </div>
                        )}
                    </Card>
                </div>
                <div className="space-y-6">
                    <AuditTrailCard formData={formData} />
                </div>
            </div>
        </Console>
    );
};