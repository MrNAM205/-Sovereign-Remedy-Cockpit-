
import React, { useState, useMemo } from 'react';
import { Card } from './Card';
import { DocType, type FormData } from '../types';

type ScriptType = 'powershell' | 'curl';

const generatePowerShellScript = (formData: FormData, docType: DocType): string => {
    const { manName, fictionName, creditor, claimRef } = formData;

    const identityPayload = `@{
    strawmanName = "${fictionName || 'LEGAL FICTION NAME'}"
    livingName   = "${manName || 'Lawful Name'}"
}`;

    const presentmentPayload = `@{
    presentmentId = "${claimRef || 'REFERENCE-ID'}"
    claimant      = "${creditor || 'Claimant Name'}"
}`;

    let mainAction = `# Select a document type to see the corresponding action.`;
    if (docType === DocType.ConditionalAcceptance) {
        mainAction = `
# Step 2: Send Conditional Acceptance
Write-Host "→ Generating Conditional Acceptance..."
Invoke-RestMethod -Uri "http://localhost:3000/api/instrument/generate-ca" -Method POST -Body (${presentmentPayload} | ConvertTo-Json) -ContentType "application/json"`;
    } else if (docType === DocType.Estoppel10 || docType === DocType.Estoppel28) {
        const days = docType === DocType.Estoppel10 ? 10 : 28;
        const estoppelPayload = `@{
    referenceNotice = "${claimRef || 'REFERENCE-ID'}"
    daysElapsed     = ${days}
}`;
        mainAction = `
# Step 3: Invoke Estoppel after ${days} days
Write-Host "→ Generating Notice of Estoppel..."
Invoke-RestMethod -Uri "http://localhost:3000/api/remedy/generate-estoppel" -Method POST -Body (${estoppelPayload} | ConvertTo-Json) -ContentType "application/json"`;
    }

    return `# ⚔️ Sovereign Autonomy & Discharge Protocol — PowerShell Ritual
# This script is a template for automating your correspondence.
# It requires a compatible backend API running on localhost:3000.

# Step 1: Set Identity Profile
Write-Host "🛡️ Defining Identity & Standing..."
Invoke-RestMethod -Uri "http://localhost:3000/api/identity/set-profile" -Method POST -Body (${identityPayload} | ConvertTo-Json) -ContentType "application/json"
${mainAction}

Write-Host "✅ Protocol Executed. Action logged."
`;
};

const generateCurlScript = (formData: FormData, docType: DocType): string => {
    const { manName, fictionName, creditor, claimRef } = formData;

    const identityPayload = `'{
    "strawmanName": "${fictionName || 'LEGAL FICTION NAME'}",
    "livingName": "${manName || 'Lawful Name'}"
}'`;

    const presentmentPayload = `'{
    "presentmentId": "${claimRef || 'REFERENCE-ID'}",
    "claimant": "${creditor || 'Claimant Name'}"
}'`;

    let mainAction = `# Select a document type to see the corresponding action.`;
    if (docType === DocType.ConditionalAcceptance) {
        mainAction = `
# Step 2: Send Conditional Acceptance
echo "→ Generating Conditional Acceptance..."
curl -X POST http://localhost:3000/api/instrument/generate-ca \\
  -H "Content-Type: application/json" \\
  -d ${presentmentPayload}`;
    } else if (docType === DocType.Estoppel10 || docType === DocType.Estoppel28) {
        const days = docType === DocType.Estoppel10 ? 10 : 28;
        const estoppelPayload = `'{
    "referenceNotice": "${claimRef || 'REFERENCE-ID'}",
    "daysElapsed": ${days}
}'`;
        mainAction = `
# Step 3: Invoke Estoppel after ${days} days
echo "→ Generating Notice of Estoppel..."
curl -X POST http://localhost:3000/api/remedy/generate-estoppel \\
  -H "Content-Type: application/json" \\
  -d ${estoppelPayload}`;
    }

    return `#!/bin/bash
# ⚔️ Sovereign Autonomy & Discharge Protocol — cURL/Bash Ritual
# This script is a template for automating your correspondence.
# It requires a compatible backend API running on localhost:3000.

# Step 1: Set Identity Profile
echo "🛡️ Defining Identity & Standing..."
curl -X POST http://localhost:3000/api/identity/set-profile \\
  -H "Content-Type: application/json" \\
  -d ${identityPayload}
${mainAction}

echo "✅ Protocol Executed. Action logged."
`;
};

interface AutomationCardProps {
    formData: FormData;
    docType: DocType;
    onCopy: (text: string) => void;
}

export const AutomationCard: React.FC<AutomationCardProps> = ({ formData, docType, onCopy }) => {
    const [scriptType, setScriptType] = useState<ScriptType>('powershell');

    const scriptContent = useMemo(() => {
        return scriptType === 'powershell' 
            ? generatePowerShellScript(formData, docType)
            : generateCurlScript(formData, docType);
    }, [formData, docType, scriptType]);

    const buttonStyles = "bg-[#238636] border border-[#30363d] text-white w-full p-2 rounded-lg mt-3 text-sm hover:bg-[#2ea043] transition-colors";
    const tabBaseStyles = "px-4 py-2 text-sm font-medium rounded-md transition-colors";
    const activeTabStyles = "bg-green-600 text-white";
    const inactiveTabStyles = "bg-[#161b22] text-gray-400 hover:bg-[#30363d]";
    
    return (
        <Card title="Automation Ritual">
            <p className="text-xs text-gray-500 mb-4">Generate command-line scripts to automate actions with a compatible backend API.</p>
            <div className="flex space-x-2 mb-3 p-1 bg-[#0d1117] rounded-lg">
                <button 
                    onClick={() => setScriptType('powershell')} 
                    className={`${tabBaseStyles} ${scriptType === 'powershell' ? activeTabStyles : inactiveTabStyles}`}
                >
                    PowerShell
                </button>
                <button 
                    onClick={() => setScriptType('curl')} 
                    className={`${tabBaseStyles} ${scriptType === 'curl' ? activeTabStyles : inactiveTabStyles}`}
                >
                    cURL (Bash)
                </button>
            </div>
            <pre className="bg-[#0d1117] border border-dashed border-[#30363d] text-xs p-3 rounded-lg text-gray-300 overflow-x-auto">
                <code>
                    {scriptContent}
                </code>
            </pre>
            <button onClick={() => onCopy(scriptContent)} className={buttonStyles}>
                Copy Script
            </button>
        </Card>
    );
};
