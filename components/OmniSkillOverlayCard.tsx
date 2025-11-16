
import React from 'react';
import { Card } from './Card';

const schemaCode = `
type OmniTrigger = {
  entity_type: 'summons' | 'notice' | 'ticket';
  match: string; // Regex or keyword to match
};

type OmniResponse = {
  replace_with: string; // Template for response
};

type OmniSkill = {
  skill_id: string;
  description: string;
  triggers: OmniTrigger[];
  response: OmniResponse;
  remedy_protocol: 'CA' | 'AOS' | 'NTA';
  annotations?: string[];
  narration?: string;
};
`;

export const OmniSkillOverlayCard: React.FC = () => (
    <Card title="Omni Skill Overlay">
         <div className="space-y-3 text-sm text-gray-300">
            <p>
                The Omni Skill Overlay is a formal schema defining the cognitive models for the AI. Each "skill" is a structured object that maps specific triggers (e.g., keywords in a document) to a lawful response and a corresponding remedy protocol.
            </p>
            <p>
                This modular design allows for dynamic registration and validation of new skills, enabling the AI to adapt its reasoning flow and expand its repertoire of sovereign remedies. Below is the TypeScript representation of the core schema.
            </p>
            <pre className="bg-[#0d1117] border border-dashed border-[#30363d] text-xs p-3 mt-2 rounded-lg text-gray-300 overflow-x-auto">
                <code>
                    {schemaCode.trim()}
                </code>
            </pre>
        </div>
    </Card>
);
