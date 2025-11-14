
import React from 'react';
import { Card } from './Card';

export const MaximsCard: React.FC = () => (
    <Card title="Key Commercial Maxims">
        <ul className="text-sm list-disc list-inside text-gray-300 space-y-2">
            <li><strong className="text-gray-100">Maxim 3:</strong> In commerce, truth is sovereign.</li>
            <li><strong className="text-gray-100">Maxim 4:</strong> Truth is expressed in the form of an <strong className="text-yellow-400">Affidavit</strong> [cite: 1.1132].</li>
            <li><strong className="text-gray-100">Maxim 5:</strong> An <strong className="text-yellow-400">unrebutted Affidavit stands as truth</strong> in commerce [cite: 1.1136].</li>
            <li><strong className="text-gray-100">Maxim 6:</strong> An unrebutted Affidavit becomes <strong className="text-yellow-400">judgment</strong> in commerce [cite: 1.1137].</li>
            <li><strong className="text-gray-100">Maxim 8:</strong> He who leaves the field of battle first (fails to respond) <strong className="text-yellow-400">loses by default</strong> (Estoppel) [cite: 1.1141].</li>
        </ul>
    </Card>
);
