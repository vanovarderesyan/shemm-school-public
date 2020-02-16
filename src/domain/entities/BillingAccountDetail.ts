/**
 * Billing Account Detail
 */
interface BillingAccountDetail {
    id?: number;
    name: string;
    bankAccount: string;
    account: string;
    serialNumber: string;
    isMain:boolean;
    partnersId:number
}

export default BillingAccountDetail;