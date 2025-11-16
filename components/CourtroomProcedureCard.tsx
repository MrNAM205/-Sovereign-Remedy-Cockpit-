
import React from 'react';
import { Card } from './Card';

export const CourtroomProcedureCard: React.FC = () => (
    <Card title="Courtroom Procedure Guide">
        <div className="space-y-4 text-sm text-gray-300">
            <div>
                <h3 className="text-md font-semibold text-gray-100 mb-2">The Courtroom is a Commercial Venue</h3>
                <p>A statutory court is a commercial venue where a judge, acting as a corporate administrator, settles debt. Their primary function is to protect the interests of the corporation (the state).</p>
            </div>
            
            <div className="space-y-3">
                <div>
                    <h4 className="font-semibold text-gray-100">1. Identifying Jurisdiction</h4>
                    <p className="my-1">When you enter, the judge will attempt to establish jurisdiction over your legal person (strawman). You must challenge this immediately.</p>
                    <blockquote className="border-l-4 border-yellow-500 pl-3 py-1 bg-yellow-900/20 text-yellow-300">
                        <p className="font-mono text-xs"><strong>Recommended phrase:</strong> "I am here as a living man/woman. Is this a court of competent jurisdiction to hear a claim against a living man/woman under the common law?"</p>
                    </blockquote>
                </div>

                <div>
                    <h4 className="font-semibold text-gray-100">2. Handling the "Plea"</h4>
                    <p className="my-1">A plea is a trap to enter a contract and acknowledge jurisdiction. Do not plead "guilty" or "not guilty."</p>
                    <blockquote className="border-l-4 border-yellow-500 pl-3 py-1 bg-yellow-900/20 text-yellow-300">
                        <p className="font-mono text-xs"><strong>Recommended response:</strong> "I do not plead. I am here to settle this matter. Is there a lawful claim against me, a living man/woman, where there has been harm or loss?" Then, stand on your filed affidavit.</p>
                    </blockquote>
                </div>

                <div>
                    <h4 className="font-semibold text-gray-100">3. Acknowledging the Judge</h4>
                    <p className="my-1">Calling the judge "Your Honor" is an admission of their authority over you. Address them as "Sir" or "Madam" to reinforce your equal footing.</p>
                </div>
            </div>
        </div>
    </Card>
);
