
import React from 'react';
import { Card } from './Card';

interface OutputCardProps {
    generatedDocument: string;
    onCopy: () => void;
}

const outputStyles = "bg-[#0d1117] border border-dashed border-[#30363d] text-sm whitespace-pre-wrap break-words w-full p-3 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500";
const buttonStyles = "bg-[#238636] border border-[#30363d] text-white w-full p-2 rounded-lg mt-3 text-sm hover:bg-[#2ea043] transition-colors";

export const OutputCard: React.FC<OutputCardProps> = ({ generatedDocument, onCopy }) => (
    <Card title="Generated Instrument">
        <textarea
            id="outputArea"
            rows={15}
            readOnly
            className={outputStyles}
            value={generatedDocument}
        />
        <button onClick={onCopy} className={buttonStyles}>
            Copy to Clipboard
        </button>
    </Card>
);
