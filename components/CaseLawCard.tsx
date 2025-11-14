
import React from 'react';
import { Card } from './Card';

const cases = [
    {
        name: "Hale v. Henkel (1906)",
        relevance: "Identity & Standing",
        summary: "Held that an individual is not bound by corporate privileges of the state unless they consent; distinguishes between the living man and the legal fiction (Strawman)."
    },
    {
        name: "U.S. v. Minker (1956)",
        relevance: "Jurisdictional Challenge",
        summary: "Recognized the right of individuals to challenge administrative jurisdiction and demand proof of authority."
    },
    {
        name: "Clearfield Trust Co. v. United States (1943)",
        relevance: "Commercial Remedy",
        summary: "Held that when the government enters commerce, it loses sovereign immunity and must operate under commercial law."
    },
    {
        name: "Marbury v. Madison (1803)",
        relevance: "Due Process",
        summary: "Affirms that any law repugnant to the Constitution is null and void, a cornerstone for challenging unlawful presentments."
    },
    {
        name: "Bond v. United States (2011)",
        relevance: "Sovereign Immunity",
        summary: "Affirms that individuals have standing to challenge federal statutes that infringe on personal sovereignty."
    }
];

export const CaseLawCard: React.FC = () => (
    <Card title="Foundational Case Law">
        <ul className="space-y-4 text-sm">
            {cases.map((caseItem, index) => (
                <li key={index} className="border-l-4 border-green-700 pl-3">
                    <div className="flex justify-between items-center">
                        <h4 className="font-bold text-gray-100">{caseItem.name}</h4>
                        <span className="text-xs bg-gray-600 text-green-300 font-semibold px-2 py-0.5 rounded-full">{caseItem.relevance}</span>
                    </div>
                    <p className="text-gray-400 mt-1">{caseItem.summary}</p>
                </li>
            ))}
        </ul>
    </Card>
);
