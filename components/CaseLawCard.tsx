
import React from 'react';
import { Card } from './Card';
import { Console } from './Console';
import { CourtroomProcedureCard } from './CourtroomProcedureCard';

const resources = {
    "Uniform Commercial Code (UCC)": [
        { name: "UCC Article 3: Negotiable Instruments", desc: "Governs the rights and liabilities of parties in relation to commercial paper." },
        { name: "UCC Article 9: Secured Transactions", desc: "Pertains to security interests in personal property." },
    ],
    "Federal Statutes": [
        { name: "Fair Credit Reporting Act (FCRA)", desc: "Regulates credit reporting agencies and the information they collect and share." },
        { name: "Fair Debt Collection Practices Act (FDCPA)", desc: "Prohibits deceptive, abusive, and unfair debt collection practices." },
        { name: "Truth in Lending Act (TILA)", desc: "Requires disclosures about the terms and cost of credit to consumers." },
    ],
    "Foundational Case Law": [
        { name: "Marbury v. Madison (1803)", desc: "Establishes the principle of judicial review and affirms that laws repugnant to the Constitution are void." },
        { name: "Clearfield Trust Co. v. United States (1943)", desc: "When the government enters commerce, it operates under commercial law, not sovereign immunity." },
        { name: "Hale v. Henkel (1906)", desc: "Distinguishes between a living individual and a corporate/legal fiction created by the state." },
    ]
};

export const LegalResources: React.FC = () => (
    <Console title="Legal Resources Library">
        {Object.entries(resources).map(([category, items]) => (
            <Card title={category} key={category}>
                <ul className="space-y-3 text-sm">
                    {items.map(item => (
                        <li key={item.name} className="border-l-4 border-green-700 pl-3">
                            <h4 className="font-bold text-gray-100">{item.name}</h4>
                            <p className="text-gray-400">{item.desc}</p>
                        </li>
                    ))}
                </ul>
            </Card>
        ))}
        <CourtroomProcedureCard />
    </Console>
);
