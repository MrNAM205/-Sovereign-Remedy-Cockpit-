import React from 'react';
import { Console } from './Console';
import { OnboardingGuideCard } from './OnboardingGuideCard';
import { OmniSkillOverlayCard } from './OmniSkillOverlayCard';

export const OmniSystems: React.FC = () => (
    <Console title="Omni Systems & Cognitive Architecture">
        <OnboardingGuideCard />
        <OmniSkillOverlayCard />
    </Console>
);