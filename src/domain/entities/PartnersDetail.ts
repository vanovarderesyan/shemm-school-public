import { AdditionalAddressePartnersPayload } from '../requests/AdditionalAddressePartnersPayload';
import { BillingAccountPayload } from '../requests/BillingAccountPayload';

/**
 * PartnersDetail Interface.
 */
interface PartnersDetail {
    id?: number;
    hvhh: string;
    name: string;
    fullName : string;
    groupId  :number;
    headPositionId : number;
    accountantPositionId : number;
    AAHpayer : boolean;
    legalAddress : string;
    practicalAddress : string;
    headAAH : string;
    accountantAAH : string;
    certificateNumber  : string;
    passportNumber : string;
    mainPurposeOfPayment : string;
    phone : string;
    email : string;
    contract : string;
    dateContract  :Date;
    percentageOfSalesDiscount  :string;
    anotherAdditionalInformation : string;
    anotherDeliveryTime : string;
    anotherFullname:string;
    anotherCredentialsNumber : string;
    anotherCredentialsDate : string;
    additionalAddressePartners ?: Array<AdditionalAddressePartnersPayload>;
    billingAccounts ?: Array<BillingAccountPayload>;
  }
  
  export default PartnersDetail;
  