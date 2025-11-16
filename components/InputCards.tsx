import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Card } from './Card';
import { Console } from './Console';
import { LoadingSpinner } from './LoadingSpinner';

const buttonStyles = "bg-[#238636] border border-[#30363d] text-white w-full p-3 rounded-lg font-bold hover:bg-[#2ea043] transition-colors disabled:bg-gray-600";

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

export const InstrumentAnalysis: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [analysis, setAnalysis] = useState('');
    const [guidance, setGuidance] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError('');
        }
    };

    const handleAnalyze = useCallback(async () => {
        if (!file) {
            setError("Please upload a file first.");
            return;
        }
        setIsLoading(true);
        setError('');
        setAnalysis('');
        setGuidance('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const imagePart = await fileToGenerativePart(file);
            
            const contents = {
                parts: [
                    imagePart,
                    { text: `You are an expert in commercial law, specifically UCC Article 3. Analyze the following negotiable instrument. Identify its type (e.g., promissory note, bill of exchange), the parties involved (drawer, drawee, payee), key financial data (amount, dates), any endorsements, and special clauses. Provide a detailed analysis in one section, and then in a separate section titled "Sovereign Guidance", provide a negotiability assessment and suggest a sovereign action plan. Format the output as clean markdown.` }
                ],
            };
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents,
            });

            const text = response.text;
            const guidanceIndex = text.toLowerCase().indexOf('sovereign guidance');
            if (guidanceIndex !== -1) {
                setAnalysis(text.substring(0, guidanceIndex));
                setGuidance(text.substring(guidanceIndex));
            } else {
                setAnalysis(text);
                setGuidance("No specific guidance was generated.");
            }

        } catch (err) {
            console.error(err);
            setError("Failed to analyze the instrument. Please check the console for details.");
        } finally {
            setIsLoading(false);
        }
    }, [file]);

    return (
        <Console title="Instrument Analysis">
            <Card title="Upload Instrument">
                <p className="text-sm text-gray-400 mb-4">Upload an image or PDF of a promissory note, bill of exchange, or check for AI analysis.</p>
                <input type="file" onChange={handleFileChange} accept="image/*,application/pdf" className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-900 file:text-green-300 hover:file:bg-green-800" />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                 <button onClick={handleAnalyze} disabled={isLoading || !file} className={`${buttonStyles} mt-4`}>
                    {isLoading ? <LoadingSpinner text="Analyzing..." /> : 'Analyze Instrument'}
                </button>
            </Card>

            {analysis && (
                <Card title="Analysis Results">
                    <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }} />
                </Card>
            )}
            {guidance && (
                <Card title="Sovereign Guidance">
                     <div className="prose prose-invert max-w-none text-gray-300" dangerouslySetInnerHTML={{ __html: guidance.replace(/\n/g, '<br />') }} />
                </Card>
            )}
        </Console>
    );
};