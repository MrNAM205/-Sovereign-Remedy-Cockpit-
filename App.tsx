import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InstrumentAnalysis } from './components/InputCards';
import { CreditDispute } from './components/OutputCard';
import { VehicleFinancing } from './components/MaximsCard';
import { DebtCollectorLog } from './components/AutomationCard';
import { LegalResources } from './components/CaseLawCard';
import { RemedyProcess } from './components/RemedyProcess';
import { About } from './components/About';
import { TrustOperations } from './components/TrustOperations';
import { OmniChat } from './components/OmniChat';
import { OmniSystems } from './components/OmniSystems';

const TABS = [
    'Omni Chat',
    'Instrument Analysis', 
    'Credit Dispute', 
    'Vehicle Financing', 
    'Debt Collector Log', 
    'Trust Operations',
    'Remedy Process',
    'Legal Resources',
    'Omni Systems',
    'About'
];

const App: React.FC = () => {
    const [activeTab, setActiveTab] = React.useState(TABS[0]);

    const renderContent = () => {
        switch (activeTab) {
            case 'Omni Chat':
                return <OmniChat />;
            case 'Instrument Analysis':
                return <InstrumentAnalysis />;
            case 'Credit Dispute':
                return <CreditDispute />;
            case 'Vehicle Financing':
                return <VehicleFinancing />;
            case 'Debt Collector Log':
                return <DebtCollectorLog />;
            case 'Trust Operations':
                return <TrustOperations />;
            case 'Remedy Process':
                return <RemedyProcess />;
            case 'Legal Resources':
                return <LegalResources />;
            case 'Omni Systems':
                return <OmniSystems />;
            case 'About':
                return <About />;
            default:
                return null;
        }
    };

    const tabBaseStyles = "px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0d1117] focus:ring-green-500";
    const activeTabStyles = "bg-green-600 text-white";
    const inactiveTabStyles = "bg-[#161b22] text-gray-400 hover:bg-[#30363d]";

    return (
        <div className="p-4 sm:p-8">
            <div className="max-w-screen-xl mx-auto">
                <Header />
                <nav className="flex justify-center flex-wrap gap-2 mb-8 p-2 bg-[#0d1117] rounded-lg">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`${tabBaseStyles} ${activeTab === tab ? activeTabStyles : inactiveTabStyles}`}
                            aria-current={activeTab === tab ? 'page' : undefined}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
                <main>
                    {renderContent()}
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default App;