import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
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

const SovereignScriptCard: React.FC = () => (
    <Card title="🛡️ Sovereign Script: Asserting Independent Financing">
        <div className="space-y-4 text-sm text-gray-300">
            <div>
                <h3 className="font-semibold text-gray-100 mb-1">Your Goal:</h3>
                <p>Secure the vehicle <strong className="text-green-400">without</strong> using the dealer’s financing. You are the principal, not the debtor. You bring your own funding source (bank, credit union, or private trust).</p>
            </div>
            
            <div>
                <h3 className="font-semibold text-gray-100 mb-2">🗣️ What to Say (Verbatim or Adapted):</h3>
                <div className="space-y-2">
                    <blockquote className="border-l-4 border-yellow-500 pl-3 py-1 bg-yellow-900/20 text-yellow-300 font-mono text-xs">“I’m here to purchase this vehicle using my own financing. I already have pre-approval from my lender and will not be using dealer-arranged financing.”</blockquote>
                    <blockquote className="border-l-4 border-yellow-500 pl-3 py-1 bg-yellow-900/20 text-yellow-300 font-mono text-xs">“Please prepare the buyer’s order or purchase agreement with the total out-the-door price, including all taxes and fees. I’ll take that to my lender.”</blockquote>
                    <blockquote className="border-l-4 border-yellow-500 pl-3 py-1 bg-yellow-900/20 text-yellow-300 font-mono text-xs">“I’m not authorizing a credit pull. I’ve already secured funding. Let’s focus on the vehicle and the final price.”</blockquote>
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-gray-100 mb-2">🧠 Tactical Tips:</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>Negotiate price <strong className="text-green-400">first</strong>, before mentioning financing.</li>
                    <li>Bring your pre-approval letter or proof of funds.</li>
                    <li>Request the <strong className="text-green-400">“buyer’s order”</strong> — this is the document your lender needs.</li>
                    <li>Avoid unnecessary fees like VIN etching or “dealer prep” charges.</li>
                    <li>Be ready to walk away. The dealer's financing is a major profit center for them.</li>
                </ul>
            </div>
            
            <div>
                <h3 className="font-semibold text-gray-100 mb-2">🧾 Optional Sovereign Framing:</h3>
                <blockquote className="border-l-4 border-purple-500 pl-3 py-1 bg-purple-900/20 text-purple-300 font-mono text-xs">“This conveyance is being acquired for private, non-commercial use. I am not engaging in a commercial transaction requiring third-party financing. I am the authorized agent for the trust providing the funds.”</blockquote>
            </div>

             <div>
                <h3 className="font-semibold text-gray-100 mb-2">🧰 What to Bring:</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>Pre-approval letter or cashier’s check</li>
                    <li>Valid ID (or trust documentation if applicable)</li>
                    <li>Insurance binder (required before driving off)</li>
                </ul>
            </div>
        </div>
    </Card>
);

export const VehicleFinancing: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [violations, setViolations] = useState<string>('');
    const [remedyLetter, setRemedyLetter] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError('');
            setViolations('');
            setRemedyLetter('');
        }
    };

    const handleAnalyze = useCallback(async () => {
        if (!file) {
            setError("Please upload a contract first.");
            return;
        }
        setIsLoading(true);
        setError('');
        setViolations('');
        
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const filePart = await fileToGenerativePart(file);
            const prompt = "You are an expert in consumer protection law, specializing in vehicle financing and the Truth in Lending Act (TILA). Scrutinize the following vehicle financing contract for any TILA violations, hidden fees, potential misrepresentation, or other predatory clauses. List all identified issues clearly in markdown format.";
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: { parts: [filePart, {text: prompt}] },
            });
            
            setViolations(response.text);
        } catch (err) {
            console.error(err);
            setError("Failed to analyze the contract. Please check the console.");
        } finally {
            setIsLoading(false);
        }
    }, [file]);

    const handleGenerate = useCallback(async () => {
        if (!violations) {
            setError("No violations identified to generate a letter.");
            return;
        }
        setIsGenerating(true);
        setError('');
        
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `Based on the following identified issues in a vehicle financing contract:\n\n${violations}\n\nDraft a formal Notice and Opportunity to Cure letter to be sent to the lender. The letter should clearly state the violations and demand a remedy within a specific timeframe (e.g., 10 days). Include placeholders for names, addresses, account numbers, and dates.`;
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
            });
            setRemedyLetter(response.text);
        } catch (err) {
            console.error(err);
            setError("Failed to generate the remedy letter. Please check the console.");
        } finally {
            setIsGenerating(false);
        }
    }, [violations]);
    
    const copyToClipboard = (text: string) => navigator.clipboard.writeText(text).then(() => alert('Copied!'));

    return (
        <Console title="Vehicle Financing">
            <SovereignScriptCard />
            <Card title="Upload Financing Contract For Scrutiny">
                <p className="text-sm text-gray-400 mb-4">After you receive a contract, upload it here. The AI will check for Truth in Lending Act (TILA) violations and other issues.</p>
                <input type="file" onChange={handleFileChange} accept="application/pdf,image/*" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-900 file:text-green-300 hover:file:bg-green-800" />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <button onClick={handleAnalyze} disabled={isLoading || !file} className={`${buttonStyles} mt-4`}>
                    {isLoading ? <LoadingSpinner text="Scrutinizing Contract..." /> : 'Scrutinize Contract'}
                </button>
            </Card>

            {violations && (
                <Card title="Identified Violations & Issues">
                    <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: violations.replace(/\n/g, '<br />') }} />
                     <button onClick={handleGenerate} disabled={isGenerating} className={`${buttonStyles} mt-4`}>
                        {isGenerating ? <LoadingSpinner text="Generating..." /> : 'Generate Remedy Letter'}
                    </button>
                </Card>
            )}

            {remedyLetter && (
                <Card title="Generated Notice & Opportunity to Cure">
                    <textarea readOnly value={remedyLetter} rows={15} className={outputStyles} />
                    <button onClick={() => copyToClipboard(remedyLetter)} className={`${buttonStyles} mt-3`}>Copy to Clipboard</button>
                </Card>
            )}
        </Console>
    );
};