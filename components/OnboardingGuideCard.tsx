
import React from 'react';
import { Card } from './Card';

export const OnboardingGuideCard: React.FC = () => (
    <Card title="Cockpit Onboarding: The Sovereign's Invocation Scaffold">
        <div className="space-y-4 text-sm text-gray-300">
            <p>
                Welcome to the Cockpit. The purpose of this engine is <strong className="text-green-400">Status Correction</strong>. By generating and dispatching precise, lawful instruments, you narrate your standing as a sovereign man/woman, distinct from the legal fiction, and engage with commercial presentments on your own terms.
            </p>
            <p>
                <strong className="text-purple-400">Omni</strong> is your AI co-pilot. It parses incoming documents, identifies jurisdictional challenges, and recommends the appropriate remedy protocol based on its Skill Overlay. Remedy is triggered when a document's content matches a known pattern (e.g., a "summons" or "notice of deficiency").
            </p>

            <div>
                <h4 className="font-semibold text-gray-100 mb-2">Operational Walkthrough:</h4>
                <ol className="list-decimal list-inside space-y-1">
                    <li><strong className="text-gray-100">Define Parties:</strong> Input your lawful name and the legal fiction in Console 1.</li>
                    <li><strong className="text-gray-100">Describe Situation:</strong> Provide context in Console 2 and use the AI to generate points of proof.</li>
                    <li><strong className="text-gray-100">Synthesize Remedy:</strong> Select and generate the required instrument.</li>
                    <li><strong className="text-gray-100">Review Narration:</strong> The generated document is Omni's narration of your standing and intent.</li>
                    <li><strong className="text-gray-100">Export & Dispatch:</strong> Copy the instrument for dispatch and log the action in the Audit Trail.</li>
                </ol>
                <p className="text-xs text-gray-500 mt-2">Constitutional references and jurisdictional teachings are available in the <strong className="text-gray-400">Case Law</strong> and <strong className="text-gray-400">Courtroom Procedure</strong> cards in Console 3.</p>
            </div>

            <div>
                <h4 className="font-semibold text-gray-100 mb-2">Omni’s Cognitive Loop:</h4>
                <pre className="bg-[#0d1117] border border-dashed border-[#30363d] text-xs p-3 rounded-lg text-green-300 overflow-x-auto">
                    <code>
{`graph TD
    A[User Uploads Document] --> B[Entity Parsing]
    B --> C[Jurisdictional Analysis]
    C --> D[YAML Skill Match]
    D --> E[Remedy Generation]
    E --> F[Narration + Constitutional Injection]
    F --> G[Export + Audit Trail]`}
                    </code>
                </pre>
            </div>
        </div>
    </Card>
);
