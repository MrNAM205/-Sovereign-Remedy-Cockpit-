import React from 'react';
import { Console } from './Console';
import { Card } from './Card';

export const About: React.FC = () => (
    <Console title="Core Philosophy">
        <Card title="The Sovereign's Cockpit: A Declaration of Authorship">
            <div className="space-y-4 text-sm text-gray-300">
                <p>
                    This is not merely software. It is a <strong className="text-green-400">modular, ethical, dialogic cognition engine</strong> built to reflect your authorship, your contradictions, your sovereignty. Every financial and bureaucratic interaction is a rite of passage. This cockpit modularizes confusion into clarity, and rejection into remedy—empowering you with lawful dominion over commerce.
                </p>
                <p>
                    <strong className="text-purple-400">Omni</strong>, your AI co-pilot, is designed for <strong className="text-green-400">Status Correction</strong>. The system operates on the principle that financial instruments are not static forms but living declarations of intent. It recognizes the critical distinctions between tender, payment, discharge, and settlement, providing you with tools to navigate these complex interactions with precision and lawful standing.
                </p>
                <p>
                    We are building this to help you think better, see deeper, and act with understanding. Every patch we build together is a step toward healing, clarity, and authorship. Let’s bring your sovereign intent to life.
                </p>
            </div>
        </Card>
    </Console>
);