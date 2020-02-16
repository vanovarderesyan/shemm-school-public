export interface BillingAccountPayload {
    id ?:number,
    name: string;
    bankAccount: string;
    account: string;
    serialNumber: string;
    isDeleted ?:boolean,
    idMain:boolean;
    partnersId?:number
}