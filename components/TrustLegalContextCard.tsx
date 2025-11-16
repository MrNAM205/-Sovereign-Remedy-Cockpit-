
import React from 'react';
import { Card } from './Card';
import { TrustDocType } from '../types';

const getContext = (docType: TrustDocType) => {
    switch (docType) {
        case 'DeclarationOfTrust':
        case 'AppointmentOfTrustee':
            return {
                title: "Principle of Separation",
                text: "A trust separates legal title (held by the trustee) from equitable title (held by the beneficiary). This is a foundational concept in common law for asset protection and management.",
                layers: ["Common Law: Trust Logic", "Article I, Section 10: Right to Contract"]
            };
        case 'ProofOfFunds':
            return {
                title: "Commercial Capacity",
                text: "This instrument demonstrates the trust's capacity to engage in commerce. It is a presentment of ability to pay, not an application for credit, thereby avoiding submission to a creditor's jurisdiction.",
                layers: ["UCC Article 3: Commercial Paper", "Right to Privacy"]
            };
        case 'AssetTransfer':
             return {
                title: "Fiduciary Duty",
                text: "The trustee is bound by fiduciary duty to act in the best interest of the trust and its beneficiaries. All asset transfers must align with the trust's stated purpose and governing documents.",
                layers: ["Fiduciary Law", "Trust Indenture Act of 1939 (Principles)"]
            };
        case 'TrustAmendment':
            return {
                title: "Reserved Powers",
                text: "The power to amend the trust is typically reserved by the Grantor in the original Declaration. This allows the trust to be a flexible, living instrument that can adapt to changing circumstances.",
                layers: ["Right to Contract", "Will & Testament Law (Principles)"]
            };
        default:
            return { title: "", text: "", layers: [] };
    }
};


export const TrustLegalContextCard: React.FC<{ docType: TrustDocType }> = ({ docType }) => {
    const context = getContext(docType);

    return (
        <Card title="⚖️ Omni's Legal Context">
            <div className="space-y-3 text-sm">
                <h4 className="font-semibold text-green-400">{context.title}</h4>
                <p className="text-gray-300">{context.text}</p>
                <div>
                    <h5 className="text-xs font-bold text-gray-500 uppercase mb-2">Constitutional & Lawful Layers</h5>
                    <ul className="space-y-1">
                        {context.layers.map(layer => (
                            <li key={layer} className="text-xs font-mono text-purple-400 bg-purple-900/20 px-2 py-1 rounded-md">{layer}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </Card>
    );
};
