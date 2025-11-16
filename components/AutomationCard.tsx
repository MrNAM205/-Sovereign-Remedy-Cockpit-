
import React, { useState, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Card } from './Card';
import { Console } from './Console';
import { type LogEntry } from '../types';

const buttonStyles = "bg-[#238636] border border-[#30363d] text-white p-2 rounded-lg font-bold hover:bg-[#2ea043] transition-colors disabled:bg-gray-600";
const inputStyles = "bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500";
const outputStyles = "bg-[#0d1117] border border-dashed border-[#30363d] text-sm whitespace-pre-wrap break-words w-full p-3 rounded-lg text-gray-300";

export const DebtCollectorLog: React.FC = () => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [newLog, setNewLog] = useState({ collector: '', description: '' });
    const [isLoading, setIsLoading] = useState<number | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [ceaseAndDesist, setCeaseAndDesist] = useState('');
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewLog({ ...newLog, [e.target.name]: e.target.value });
    };

    const addLog = () => {
        if (!newLog.collector || !newLog.description) return;
        const entry: LogEntry = {
            id: Date.now(),
            timestamp: new Date().toLocaleString(),
            ...newLog,
        };
        setLogs([entry, ...logs]);
        setNewLog({ collector: '', description: '' });
    };
    
    const suggestViolations = useCallback(async (logId: number, description: string) => {
        setIsLoading(logId);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const prompt = `I had this interaction with a debt collector: "${description}". Based on the Fair Debt Collection Practices Act (FDCPA), what potential violations might have occurred? Be specific and list them in a concise markdown format.`;
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setLogs(prevLogs => prevLogs.map(log => log.id === logId ? { ...log, violations: response.text } : log));
        } catch (err) {
            console.error(err);
            alert("Failed to get suggestions. Check console.");
        } finally {
            setIsLoading(null);
        }
    }, []);

    const generateCeaseAndDesist = useCallback(async () => {
        if (logs.length === 0) return;
        setIsGenerating(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const logText = logs.map(l => `On ${l.timestamp}, I was contacted by ${l.collector}. The interaction was as follows: ${l.description}`).join('\n\n');
            const prompt = `Based on the following log of interactions with debt collectors:\n\n${logText}\n\nGenerate a powerful, legally-structured Cease and Desist letter demanding they halt all communication immediately. Reference the FDCPA. Include placeholders for names, addresses, and dates.`;
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            setCeaseAndDesist(response.text);
        } catch (err) {
            console.error(err);
            alert("Failed to generate letter. Check console.");
        } finally {
            setIsGenerating(false);
        }
    }, [logs]);
    
    const copyToClipboard = (text: string) => navigator.clipboard.writeText(text).then(() => alert('Copied!'));

    return (
        <Console title="Debt Collector Log">
            <Card title="Log New Interaction">
                <input type="text" name="collector" placeholder="Debt Collector Name" value={newLog.collector} onChange={handleInputChange} className={`${inputStyles} mb-2`} />
                <textarea name="description" placeholder="Describe the interaction..." rows={3} value={newLog.description} onChange={handleInputChange} className={`${inputStyles} mb-2`} />
                <button onClick={addLog} className={buttonStyles}>Add Log Entry</button>
            </Card>

            <Card title="Interaction History">
                {logs.length > 0 ? (
                    <div className="space-y-4">
                        {logs.map(log => (
                            <div key={log.id} className="p-3 bg-[#161b22] border border-[#30363d] rounded-lg">
                                <p className="text-xs text-gray-500">{log.timestamp}</p>
                                <p><strong className="text-gray-200">Collector:</strong> {log.collector}</p>
                                <p><strong className="text-gray-200">Description:</strong> {log.description}</p>
                                <button onClick={() => suggestViolations(log.id, log.description)} disabled={isLoading === log.id} className="text-sm text-purple-400 hover:text-purple-300 mt-2 disabled:opacity-50">
                                    {isLoading === log.id ? 'Analyzing...' : 'Suggest FDCPA Violations'}
                                </button>
                                {log.violations && <div className="mt-2 p-2 border-t border-[#30363d] text-xs text-gray-400 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: log.violations.replace(/\n/g, '<br />') }} />}
                            </div>
                        ))}
                         <button onClick={generateCeaseAndDesist} disabled={isGenerating || logs.length === 0} className={`${buttonStyles} w-full mt-4`}>
                            {isGenerating ? 'Generating...' : 'Generate Cease & Desist Letter'}
                        </button>
                    </div>
                ) : <p className="text-gray-500">No interactions logged yet.</p>}
            </Card>
            
            {ceaseAndDesist && (
                 <Card title="Generated Cease & Desist">
                    <textarea readOnly value={ceaseAndDesist} rows={15} className={outputStyles} />
                    <button onClick={() => copyToClipboard(ceaseAndDesist)} className={`${buttonStyles} w-full mt-3`}>Copy to Clipboard</button>
                </Card>
            )}
        </Console>
    );
};
