
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { DocType, type FormData } from './types';
import { 
    generateConditionalAcceptance, 
    generateEstoppelNotice, 
    generateFaultAndCureNotice, 
    generateAffidavitOfStatus,
    generateDeclarationOfTrust,
    generateAppointmentOfTrustee,
    generateNoticeToAgent
} from './services/documentGenerator';
import { Header } from './components/Header';
import { Console } from './components/Console';
import { InputCard, DateCard, DocumentSelectionCard, SituationCard, TrustCard } from './components/InputCards';
import { OutputCard } from './components/OutputCard';
import { MaximsCard } from './components/MaximsCard';
import { Footer } from './components/Footer';
import { AutomationCard } from './components/AutomationCard';
import { ProcessGuideCard } from './components/ProcessGuideCard';
import { InstrumentVaultCard } from './components/InstrumentVaultCard';
import { CaseLawCard } from './components/CaseLawCard';

const App: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        manName: '',
        fictionName: '',
        creditor: '',
        claimRef: '',
        situationContext: '',
        proofPoints: [],
        trustName: '',
        trusteeName: '',
    });
    const [docType, setDocType] = useState<DocType>(DocType.ConditionalAcceptance);
    const [startDate, setStartDate] = useState<string>('');
    const [deadlines, setDeadlines] = useState<{ d10: string; d28: string } | null>(null);
    const [generatedDocument, setGeneratedDocument] = useState<string>('');
    const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

    const isTrustDocument = useMemo(() => [DocType.DeclarationOfTrust, DocType.AppointmentOfTrustee, DocType.NoticeToAgent].includes(docType), [docType]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    }, []);

    const handleProofPointChange = useCallback((index: number, value: string) => {
        setFormData(prev => {
            const newProofPoints = [...prev.proofPoints];
            newProofPoints[index] = value;
            return { ...prev, proofPoints: newProofPoints };
        });
    }, []);

    const handleProofPointDelete = useCallback((index: number) => {
        setFormData(prev => ({
            ...prev,
            proofPoints: prev.proofPoints.filter((_, i) => i !== index),
        }));
    }, []);

    const handleGenerateProofs = useCallback(async () => {
        if (!formData.situationContext) {
            alert("Please describe your situation first.");
            return;
        }
        setIsAiLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `Based on the following situation: "${formData.situationContext}", generate a JSON array of 4-6 strings. Each string should be a specific, actionable demand for sworn evidence that an opposing party must provide to prove their claim. Focus on jurisdiction, contract validity, injury, and lawful authority.`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            proofs: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            }
                        }
                    },
                },
            });
            const jsonResponse = JSON.parse(response.text);
            if (jsonResponse.proofs && Array.isArray(jsonResponse.proofs)) {
                 setFormData(prev => ({ ...prev, proofPoints: jsonResponse.proofs }));
            } else {
                 throw new Error("Invalid response format from AI.");
            }
        } catch (error) {
            console.error("AI Generation Error:", error);
            alert("Failed to generate proofs. Please check the console for details.");
        } finally {
            setIsAiLoading(false);
        }
    }, [formData.situationContext]);

    const handleDocTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setDocType(e.target.value as DocType);
    }, []);
    
    useEffect(() => {
        setGeneratedDocument("Fill in the fields, describe your situation for the AI, and press 'Generate Document' to create your Notice.");
    }, []);

    const generateDocument = useCallback(() => {
        const { manName, fictionName, creditor, claimRef } = formData;
        if (!manName || !fictionName ) {
            setGeneratedDocument("Please fill in at least the 'Lawful Name' and 'Legal Fiction' fields to generate a document.");
            return;
        }

        let content = '';
        switch (docType) {
            case DocType.ConditionalAcceptance:
                content = generateConditionalAcceptance(formData);
                break;
            case DocType.Estoppel10:
                content = generateEstoppelNotice(formData, 10, startDate);
                break;
            case DocType.Estoppel28:
                content = generateEstoppelNotice(formData, 28, startDate);
                break;
            case DocType.FaultAndCure:
                content = generateFaultAndCureNotice(formData);
                break;
            case DocType.AffidavitOfStatus:
                content = generateAffidavitOfStatus(formData);
                break;
            case DocType.DeclarationOfTrust:
                content = generateDeclarationOfTrust(formData);
                break;
            case DocType.AppointmentOfTrustee:
                content = generateAppointmentOfTrustee(formData);
                break;
            case DocType.NoticeToAgent:
                content = generateNoticeToAgent(formData);
                break;
        }
        setGeneratedDocument(content);
    }, [formData, docType, startDate]);

    const handleStartDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const dateValue = e.target.value;
        setStartDate(dateValue);

        if (dateValue) {
            const start = new Date(dateValue + 'T00:00:00'); // Ensure local timezone
            const deadline10 = new Date(start);
            deadline10.setDate(start.getDate() + 10);
            const d10 = deadline10.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

            const deadline28 = new Date(start);
            deadline28.setDate(start.getDate() + 28);
            const d28 = deadline28.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });

            setDeadlines({ d10, d28 });
        } else {
            setDeadlines(null);
        }
    }, []);

    const copyToClipboard = useCallback(async (text: string) => {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            alert("Copied to clipboard!");
        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert("Failed to copy.");
        }
    }, []);

    return (
        <div className="p-4 sm:p-8">
            <div className="max-w-screen-2xl mx-auto">
                <Header />
                <div className="mb-8">
                    <ProcessGuideCard docType={docType} />
                </div>
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Console 1: Identity & Status */}
                    <Console title="Console 1: Identity & Status">
                        <InputCard formData={formData} onChange={handleInputChange} />
                        {isTrustDocument && <TrustCard formData={formData} onChange={handleInputChange} />}
                    </Console>

                    {/* Console 2: Remedy Synthesizer */}
                    <Console title="Console 2: Remedy Synthesizer">
                        <SituationCard
                            situationContext={formData.situationContext}
                            onContextChange={handleInputChange}
                            onGenerateProofs={handleGenerateProofs}
                            proofPoints={formData.proofPoints}
                            onPointChange={handleProofPointChange}
                            onPointDelete={handleProofPointDelete}
                            isLoading={isAiLoading}
                        />
                        <DocumentSelectionCard docType={docType} onChange={handleDocTypeChange} onGenerate={generateDocument} />
                        <OutputCard generatedDocument={generatedDocument} onCopy={() => copyToClipboard(generatedDocument)} />
                    </Console>

                    {/* Console 3: Instrument Vault & Logistics */}
                    <Console title="Console 3: Instrument Vault & Logistics">
                         <InstrumentVaultCard formData={formData} />
                        <DateCard startDate={startDate} onChange={handleStartDateChange} deadlines={deadlines} />
                        <AutomationCard formData={formData} docType={docType} onCopy={copyToClipboard} />
                        <CaseLawCard />
                        <MaximsCard />
                    </Console>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default App;
