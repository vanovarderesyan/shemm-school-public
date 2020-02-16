/**
 * AddressPayload interface.
 */
interface AddressPayload {
    employeeId: number;
    placeOfRegistration: boolean;
    state:string;
    community:string;
    city:string;
    street:string;
    sameResidence:boolean;
    hhResidence:boolean;
    hhState:string;
    hhCommunity:string;
    hhCity:string;
    hhStreet:string;
    country:string;
    addressee1:string;
    addressee2:string;
    addressee3:string;
    post : string;
}

export default AddressPayload;
