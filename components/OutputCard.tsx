import React, { useState, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Card } from './Card';
import { Console } from './Console';
import { LoadingSpinner } from './LoadingSpinner';

const buttonStyles = "bg-[#238636] border border-[#30363d] text-white w-full p-3 rounded-lg font-bold hover:bg-[#2ea043] transition-colors disabled:bg-gray-600";
const outputStyles = "bg-[#0d1117] border border-dashed border-[#30363d] text-sm whitespace-pre-wrap break-words w-full p-3 rounded-lg text-gray-300";

const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
};

export const CreditDispute: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [inaccuracies, setInaccuracies] = useState<string[]>([]);
    const [affidavit, setAffidavit] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError('');
            setInaccuracies([]);
            setAffidavit('');
        }
    };

    const handleAnalyze = useCallback(async () => {
        if (!file) {
            setError("Please upload a credit report first.");
            return;
        }
        setIsLoading(true);
        setError('');
        setInaccuracies([]);
        
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const filePart = await fileToGenerativePart(file);
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [filePart, {text: "You are an expert in consumer credit law, specifically the FCRA. Scan this credit report for unverifiable items, potential inaccuracies, and any violations of the Fair Credit Reporting Act. Return a JSON array of strings, where each string is a single identified issue."}] },
                config: {
                     responseMimeType: "application/json",
                     responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            issues: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            }
                        }
                    },
                },
            });
            
            const jsonResponse = JSON.parse(response.text);
            if (jsonResponse.issues && Array.isArray(jsonResponse.issues)) {
                setInaccuracies(jsonResponse.issues);
            } else {
                throw new Error("Invalid response format from AI.");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to analyze the report. Please check the console.");
        } finally {
            setIsLoading(false);
        }
    }, [file]);

    const handleGenerate = useCallback(async () => {
        if (inaccuracies.length === 0) {
            setError("No inaccuracies identified to generate an affidavit.");
            return;
        }
        setIsGenerating(true);
        setError('');
        
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Based on the following list of identified credit report inaccuracies: \n- ${inaccuracies.join('\n- ')}\n\nDraft a formal Affidavit of Truth to dispute these items. The affidavit should be structured for a sovereign individual, ready for notarization, and served to the credit reporting agencies. Include placeholders for name, address, and date.`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            setAffidavit(response.text);
        } catch (err) {
            console.error(err);
            setError("Failed to generate the affidavit. Please check the console.");
        } finally {
            setIsGenerating(false);
        }
    }, [inaccuracies]);
    
    const copyToClipboard = (text: string) => navigator.clipboard.writeText(text).then(() => alert('Copied!'));

    return (
        <Console title="Credit Dispute">
            <Card title="Upload Credit Report">
                <p className="text-sm text-gray-400 mb-4">Upload a credit report in PDF or TXT format. The AI will scan for inaccuracies and FCRA violations.</p>
                <input type="file" onChange={handleFileChange} accept="application/pdf,text/plain" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-900 file:text-green-300 hover:file:bg-green-800" />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button onClick={handleAnalyze} disabled={isLoading || !file} className={`${buttonStyles} mt-4`}>
                    {isLoading ? <LoadingSpinner text="Analyzing Report..." /> : 'Analyze Report'}
                </button>
            </Card>

            {inaccuracies.length > 0 && (
                <Card title="Identified Inaccuracies">
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                        {inaccuracies.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                     <button onClick={handleGenerate} disabled={isGenerating} className={`${buttonStyles} mt-4`}>
                        {isGenerating ? <LoadingSpinner text="Generating..." /> : 'Generate Affidavit of Truth'}
                    </button>
                </Card>
            )}

            {affidavit && (
                <Card title="Generated Affidavit of Truth">
                    <textarea readOnly value={affidavit} rows={15} className={outputStyles} />
                    <button onClick={() => copyToClipboard(affidavit)} className={`${buttonStyles} mt-3`}>Copy to Clipboard</button>
                </Card>
            )}
        </Console>
    );
};