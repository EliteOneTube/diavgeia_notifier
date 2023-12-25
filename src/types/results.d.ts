export interface AdvancedSearchResults {
    decisions: Decision[];
    info: Info;
}

export interface Decision {
    protocolNumber:      string;
    subject:             string;
    issueDate:           number;
    organizationId:      string;
    signerIds:           string[];
    unitIds:             string[];
    decisionTypeId:      string;
    thematicCategoryIds: string[];
    extraFieldValues:    ExtraFieldValues;
    privateData:         boolean;
    ada:                 string;
    submissionTimestamp: number;
    versionId:           string;
    status:              string;
    url:                 string;
    documentUrl:         string;
    documentChecksum:    string;
    attachments:         null;
}

export interface ExtraFieldValues {
    relatedDecisions: any[];
    financialYear?: number;
    budgettype?: string;
    amountWithVAT?: AmountWithVAT;
    amountWithKae?: AmountWithKae[];
    partialead?: boolean;
}

export interface AmountWithKae {
    kae: string;
    amountWithVAT: number;
}

export interface AmountWithVAT {
    amount: number;
    currency: string;
}

export interface Info {
    query: string;
    page: number;
    size: number;
    actualSize: number;
    total: number;
    order: string;
}
