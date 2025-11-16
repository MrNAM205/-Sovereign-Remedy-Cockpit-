
import React, { useState, useCallback, useMemo } from 'react';
import { Card } from './Card';
import { Console } from './Console';
import { TrustProcessGuide } from './TrustProcessGuide';
import { TrustLegalContextCard } from './TrustLegalContextCard';
import * as DocGen from '../services/documentGenerator';
import { type FormData, TrustDocType } from '../types';

const buttonStyles = "bg-[#238636] border border-[#30363d] text-white p-2 rounded-lg font-bold hover:bg-[#2ea043] transition-colors disabled:bg-gray-600";
const inputStyles = "bg-[#0d1117] border border-[#30363d] text-[#c9d1d9] w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500";
const outputStyles = "bg-[#0d1117] border border-dashed border-[#30363d] text-sm whitespace-pre-wrap break-words w-full p-3 rounded-lg text-gray-300 font-mono";

export const TrustOperations: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        manName: '',
        fictionName: '',
        trustName: '',
        trusteeName: '',
        creditor: '',
        vehicleVIN: '',
        purchasePrice: '',
        amendmentDetails: '',
        assetDescription: '',
        assetRecipient: '',
        proofPoints: [],
    });
    const [selectedDocType, setSelectedDocType] = useState<TrustDocType>(TrustDocType.DeclarationOfTrust);
    const [generatedDoc, setGeneratedDoc] = useState('');

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const generateDocument = useCallback(() => {
        const docGenerators: { [key in TrustDocType]?: (data: FormData) => string } = {
            [TrustDocType.DeclarationOfTrust]: DocGen.generateDeclarationOfTrust,
            [TrustDocType.AppointmentOfTrustee]: DocGen.generateAppointmentOfTrustee,
            [TrustDocType.ProofOfFunds]: DocGen.generateProofOfFundsLetter,
            [TrustDocType.TrustAmendment]: DocGen.generateTrustAmendment,
            [TrustDocType.AssetTransfer]: DocGen.generateAssetTransfer,
        };
        const generator = docGenerators[selectedDocType];
        if (generator) {
            setGeneratedDoc(generator(formData));
        } else {
            setGeneratedDoc(`No generator found for document type: ${selectedDocType}`);
        }
    }, [selectedDocType, formData]);
    
    const copyToClipboard = (text: string) => navigator.clipboard.writeText(text).then(() => alert('Copied!'));

    const docOptions = useMemo(() => Object.values(TrustDocType).map(doc => ({ value: doc, label: doc.replace(/([A-Z])/g, ' $1').trim() })), []);

    return (
        <Console title="Trust Operations & Entity Management">
            <TrustProcessGuide docType={selectedDocType} />

             <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card title="Omni Control Panel">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-bold text-gray-400 mb-1 block">Select Instrument Type</label>
                                <select value={selectedDocType} onChange={(e) => setSelectedDocType(e.target.value as TrustDocType)} className={inputStyles}>
                                    {docOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                            </div>
                            
                            <hr className="border-[#30363d]" />

                            {/* Common Inputs */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                <input type="text" name="manName" placeholder="Grantor's Lawful Name (e.g., John-Henry: Doe)" value={formData.manName} onChange={handleFormChange} className={inputStyles} />
                                <input type="text" name="trustName" placeholder="Trust Name (e.g., The John Henry Doe Trust)" value={formData.trustName} onChange={handleFormChange} className={inputStyles} />
                                <input type="text" name="trusteeName" placeholder="Trustee's Name" value={formData.trusteeName} onChange={handleFormChange} className={inputStyles} />
                                <input type="text" name="fictionName" placeholder="Legal Fiction to be held by Trust (e.g., JOHN H DOE)" value={formData.fictionName} onChange={handleFormChange} className={inputStyles} />
                            </div>
                           
                            {/* Conditional Inputs */}
                            {selectedDocType === TrustDocType.ProofOfFunds && (
                                <div className="grid sm:grid-cols-3 gap-4 p-3 border border-dashed border-gray-700 rounded-lg">
                                    <input type="text" name="creditor" placeholder="Dealership Name" value={formData.creditor} onChange={handleFormChange} className={inputStyles} />
                                    <input type="text" name="vehicleVIN" placeholder="Vehicle VIN" value={formData.vehicleVIN} onChange={handleFormChange} className={inputStyles} />
                                    <input type="text" name="purchasePrice" placeholder="Agreed Purchase Price" value={formData.purchasePrice} onChange={handleFormChange} className={inputStyles} />
                                </div>
                            )}
                             {selectedDocType === TrustDocType.TrustAmendment && (
                                <div className="p-3 border border-dashed border-gray-700 rounded-lg">
                                    <textarea name="amendmentDetails" placeholder="Specify amendment details here..." rows={4} value={formData.amendmentDetails} onChange={handleFormChange} className={inputStyles} />
                                </div>
                            )}
                            {selectedDocType === TrustDocType.AssetTransfer && (
                                <div className="grid sm:grid-cols-2 gap-4 p-3 border border-dashed border-gray-700 rounded-lg">
                                     <textarea name="assetDescription" placeholder="Describe asset to be transferred..." rows={3} value={formData.assetDescription} onChange={handleFormChange} className={`${inputStyles} sm:col-span-2`} />
                                     <input type="text" name="assetRecipient" placeholder="Recipient Name/Entity" value={formData.assetRecipient} onChange={handleFormChange} className={`${inputStyles} sm:col-span-2`} />
                                </div>
                            )}
                            
                             <button onClick={generateDocument} className={`${buttonStyles} w-full`}>Generate Document</button>
                        </div>
                    </Card>

                    {generatedDoc && (
                        <Card title="Generated Instrument">
                            <textarea readOnly value={generatedDoc} rows={15} className={outputStyles} />
                            <button onClick={() => copyToClipboard(generatedDoc)} className={`${buttonStyles} w-full mt-3`}>Copy to Clipboard</button>
                        </Card>
                    )}
                </div>

                <div className="space-y-6">
                   <TrustLegalContextCard docType={selectedDocType} />
                </div>
            </div>
        </Console>
    );
};
