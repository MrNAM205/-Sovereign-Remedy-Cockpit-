
export interface LogEntry {
    id: number;
    timestamp: string;
    collector: string;
    description: string;
    violations?: string;
}

export enum DocType {
    ConditionalAcceptance = 'ConditionalAcceptance',
    AffidavitOfStatus = 'AffidavitOfStatus',
    NoticeToAgent = 'NoticeToAgent',
    Estoppel10 = 'Estoppel10',
    Estoppel28 = 'Estoppel28',
    FaultAndCure = 'FaultAndCure',
}

export enum TrustDocType {
    DeclarationOfTrust = 'DeclarationOfTrust',
    AppointmentOfTrustee = 'AppointmentOfTrustee',
    ProofOfFunds = 'ProofOfFunds',
    TrustAmendment = 'TrustAmendment',
    AssetTransfer = 'AssetTransfer',
}

export interface FormData {
    creditor?: string;
    claimRef?: string;
    manName?: string;
    fictionName?: string;
    proofPoints: string[];
    trustName?: string;
    trusteeName?: string;
    // For Trust Ops
    vehicleVIN?: string;
    purchasePrice?: string;
    amendmentDetails?: string;
    assetDescription?: string;
    assetRecipient?: string;
}
