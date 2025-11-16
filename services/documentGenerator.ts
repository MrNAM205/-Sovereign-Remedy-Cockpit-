
import { type FormData } from '../types';

function generateHeader(data: FormData): string {
    const date = new Date().toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    return `
[Your Address Here]
Near [Your Zip Code]

Date: ${date}

TO: ${data.creditor || '[Intended Recipient]'} (The Claimant/Agency/Fiduciary)
Reference: ${data.claimRef}
`;
}

function generateFooter(data: FormData): string {
    return `
I reserve all my Lawful Rights.

Sincerely, and without ill will, vexation, or frivolity,

By:
________________________________
${data.manName}
Sui Juris
WITHOUT PREJUDICE UCC 1-308
`;
}

export function generateConditionalAcceptance(data: FormData): string {
    const { manName, fictionName } = data;
    
    const pointsList = data.proofPoints.length > 0
        ? data.proofPoints.map((point, index) => `${index + 1}.  ${point}`).join('\n\n')
        : '1.  [AI-Generated points will appear here. Describe your situation and click "Generate Proofs with AI".]';

    return `
${generateHeader(data)}

NOTICE OF CONDITIONAL ACCEPTANCE FOR VALUE

Dear Sirs/Madams,

I, ${manName}, am in receipt of your presentment dated [Insert Date of Presentment], which attempts to establish an obligation on the legal fiction/person, ${fictionName}.

I conditionally agree to settle any alleged obligation ON CONDITION that you provide SWORN EVIDENCE (AFFIDAVIT), under your full commercial liability, of the following points. This demand for proof of jurisdiction is made pursuant to my right to challenge administrative authority as recognized in cases such as U.S. v. Minker (1956). Furthermore, should this matter involve a government entity acting in a commercial capacity, it is bound by commercial law as per Clearfield Trust Co. v. United States (1943).

${pointsList}

Failure to provide the requested sworn, point-for-point evidence, within TEN (10) days of the date of this Notice, will constitute your tacit agreement (Estoppel) that no such obligation exists, that any claim is void, and that you will cease all further communication and collection activity immediately [Commercial Maxim 8].

${generateFooter(data)}
`;
}

export function generateEstoppelNotice(data: FormData, days: number, startDate: string): string {
    const { manName, fictionName, creditor } = data;
    
    let deadlineDateString = '[Date of Deadline]';
    if (startDate) {
        const deadlineDate = new Date(startDate + 'T00:00:00');
        deadlineDate.setDate(deadlineDate.getDate() + days);
        deadlineDateString = deadlineDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    return `
${generateHeader(data)}

NOTICE OF ESTOPPEL BY TACIT AGREEMENT (${days}-DAY DEFAULT)

Dear Sirs/Madams,

I, ${manName}, refer to my previous Notice of Conditional Acceptance dated [Insert Date of Previous Notice].

WHEREAS: The deadline for your point-for-point rebuttal and presentation of Lawful proof of claim was ${deadlineDateString}.

WHEREAS: ${creditor} has failed to provide a sworn, timely, and lawful rebuttal of my Affidavit, thereby leaving the facts stated therein unrebutted.

NOW, THEREFORE, BE IT KNOWN: Pursuant to the Maxims of Commercial Law, my Affidavit stands as Truth in Commerce, and by your silence, Estoppel by Tacit Agreement is fully established. This is consistent with the principle that an unrebutted affidavit stands as the judgment in commerce.

This constitutes a Final and Binding Legal Determination that the alleged obligation is void and all collection attempts against ${manName} and the legal fiction ${fictionName} are now fraudulent.

${generateFooter(data)}
`;
}

export function generateFaultAndCureNotice(data: FormData): string {
    const { manName, fictionName } = data;
    return `
${generateHeader(data)}

NOTICE OF FAULT AND OPPORTUNITY TO CURE

Dear Sirs/Madams,

This notice follows my previous correspondence, including a Notice of Conditional Acceptance and a Notice of Estoppel, to which you have failed to lawfully respond. Your continued collection activities, despite the established estoppel, place you in FAULT.

You are in breach of our binding agreement established by your tacit consent.

This is your final opportunity to CURE THIS FAULT within THREE (3) days of receipt of this notice. To cure, you must:

1.  Cease all collection activities against ${manName} and the fiction ${fictionName}.
2.  Correct your records to reflect a zero balance for the reference number above.
3.  Send written confirmation via mail that the account is closed and the matter is resolved.

Failure to cure will result in the immediate issuance of a commercial lien, reporting of your unlawful activities to relevant authorities, and all other available lawful remedies.

${generateFooter(data)}
`;
}

export function generateAffidavitOfStatus(data: FormData): string {
    const { manName, fictionName } = data;
    return `
${generateHeader(data)}

AFFIDAVIT OF STATUS

I, ${manName}, being of sound mind and competent to testify, do hereby state, declare, and affirm under my unlimited liability, signing under penalty of perjury, that the following is true, correct, and complete to the best of my knowledge and belief:

1.  I am a living man/woman on the land, a creation of God, and not a legal fiction, corporate entity, or ward of the state.
2.  My lawful appellation is as styled above and is not to be confused with the legal fiction, ${fictionName}, which is a creation of the state. This distinction between the individual and the state's creation is foundational, as affirmed in principles derived from cases like Hale v. Henkel, 201 U.S. 43 (1906).
3.  I am sovereign and subject only to the laws of God and the common law which demands I do not harm others or their property.
4.  I reserve all my rights and waive no privileges, now and forever.

This Affidavit stands as truth in commerce unless rebutted point-for-point by a sworn affidavit from another living soul with first-hand knowledge of the facts.

${generateFooter(data)}
`;
}

export function generateDeclarationOfTrust(data: FormData): string {
    const { manName, trustName, fictionName } = data;
    return `
${generateHeader(data)}

DECLARATION OF TRUST

BE IT KNOWN TO ALL, that I, ${manName}, the Grantor, being of sound mind and not under duress, do hereby irrevocably declare the creation of a private trust, effective this day.

1.  **Trust Name:** The trust shall be known as: ${trustName || '[Trust Name]'}.
2.  **Grantor:** The Grantor is ${manName}, a sovereign man/woman.
3.  **Corpus:** The trust corpus shall include, but not be limited to, the legal fiction ${fictionName} and all associated property, titles, and interests.
4.  **Beneficiary:** The primary beneficiary is ${manName}.
5.  **Purpose:** The purpose of this trust is for the holding of assets, the separation of legal and equitable title, and the management of affairs for the benefit of the beneficiary, outside of statutory public jurisdiction.

This Declaration stands as the foundational document of this trust.

${generateFooter(data)}
`;
}

export function generateAppointmentOfTrustee(data: FormData): string {
    const { manName, trustName, trusteeName } = data;
    return `
${generateHeader(data)}

APPOINTMENT OF TRUSTEE

I, ${manName}, in my capacity as Grantor of the ${trustName || '[Trust Name]'}, do hereby appoint the following individual to act as Trustee:

**Trustee:** ${trusteeName || '[Trustee Name]'}

The appointed Trustee shall have the full power and authority to administer the trust according to its terms, for the benefit of the beneficiary. This appointment is effective immediately.

The Trustee accepts this appointment and acknowledges their fiduciary duty to act always in the best interest of the trust and its beneficiary.

${generateFooter(data)}
`;
}

export function generateNoticeToAgent(data: FormData): string {
    const { manName, creditor } = data;
    return `
${generateHeader(data)}

NOTICE TO AGENT IS NOTICE TO PRINCIPAL;
NOTICE TO PRINCIPAL IS NOTICE TO AGENT

This is a lawful notice.

Be advised that you, ${data.creditor}, are considered an agent acting on behalf of a principal. Any and all communication, presentments, or claims sent by you are considered to have been sent with the full knowledge and authority of your principal.

Conversely, this notice, served upon you as agent, shall be deemed to be simultaneously served upon your principal. Ignorance of this notice by your principal will not be considered a defense.

You and your principal are now bound by the contents of this and all related correspondence. Govern yourselves accordingly.

${generateFooter(data)}
`;
}

export function generateProofOfFundsLetter(data: FormData): string {
    const { trustName, trusteeName, manName, creditor, vehicleVIN, purchasePrice } = data;
    const date = new Date().toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    return `
From the Office of the Trustee
${trustName || '[Trust Name]'}
[Trust Address]

Date: ${date}

TO: ${creditor || '[Dealership Name]'}

RE: PROOF OF FUNDS & INTENT TO PURCHASE
VEHICLE IDENTIFICATION NUMBER (VIN): ${vehicleVIN || '[Vehicle VIN]'}

Dear Sirs/Madams,

This letter serves as formal notification that the ${trustName || '[Trust Name]'} (hereinafter "the Trust") has approved the acquisition of the above-referenced vehicle.

The Trustee for the Trust, ${trusteeName || '[Trustee Name]'}, is authorized to tender the agreed upon purchase price of ${purchasePrice ? '$' + purchasePrice : '[Purchase Price]'}.

This letter shall serve as sufficient proof of funds for this private, non-commercial conveyance. The Trust will be providing its own financing and will not be seeking or accepting any third-party, dealer-arranged financing.

Please prepare the buyer's order or purchase agreement reflecting the Trust as the purchaser and forward it to the Trustee for execution.

This is not an application for credit. No credit inquiry is authorized.

Sincerely,

By:
________________________________
${trusteeName || '[Trustee Name]'}, Trustee
For and on behalf of ${trustName || '[Trust Name]'}
`;
}

export function generateTrustAmendment(data: FormData): string {
    const { trustName, amendmentDetails, manName } = data;
    return `
${generateHeader(data)}

AMENDMENT TO THE DECLARATION OF TRUST
OF
${trustName || '[Trust Name]'}

BE IT KNOWN TO ALL, that I, ${manName}, the Grantor, having reserved the right to amend the trust, do hereby make the following amendment to the Declaration of Trust dated [Original Date of Declaration].

Article [Number] is hereby amended to read as follows:

${amendmentDetails || '[Specify the amendment details here. For example: "The name of the Trustee is hereby changed to Jane Smith." Or "A new article is added to detail the process for asset distribution."]' }

All other provisions of the Declaration of Trust shall remain in full force and effect.

IN WITNESS WHEREOF, the Grantor has executed this amendment on this day.

${generateFooter(data)}
`;
}

export function generateAssetTransfer(data: FormData): string {
    const { trustName, trusteeName, assetDescription, assetRecipient } = data;
    const date = new Date().toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    return `
From the Office of the Trustee
${trustName || '[Trust Name]'}
[Trust Address]

Date: ${date}

NOTICE OF ASSET TRANSFER

This document serves as notice that the Trustee of the ${trustName || '[Trust Name]'}, ${trusteeName || '[Trustee Name]'}, has authorized the transfer of the following trust asset:

Asset Description:
${assetDescription || '[Describe the asset being transferred, e.g., "Real property located at 123 Main Street", "100 shares of XYZ Corp stock", "Vehicle with VIN: XXXXX"]'}

This asset is hereby conveyed from the Trust to:
${assetRecipient || '[Name of Recipient/Entity]'}

This transfer is made in accordance with the powers granted to the Trustee under the terms of the Declaration of Trust.

Sincerely,

By:
________________________________
${trusteeName || '[Trustee Name]'}, Trustee
For and on behalf of ${trustName || '[Trust Name]'}
`;
}
