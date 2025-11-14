
export enum DocType {
    ConditionalAcceptance = 'CA',
    Estoppel10 = 'E10',
    Estoppel28 = 'E28',
    FaultAndCure = 'FC',
    AffidavitOfStatus = 'AOS',
    DeclarationOfTrust = 'DOT',
    AppointmentOfTrustee = 'AOT',
    NoticeToAgent = 'NTA',
}

export interface FormData {
    manName: string;
    fictionName: string;
    creditor: string;
    claimRef: string;
    situationContext: string;
    proofPoints: string[];
    trustName?: string;
    trusteeName?: string;
}
