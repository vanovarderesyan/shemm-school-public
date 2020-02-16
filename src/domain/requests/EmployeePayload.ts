
import EmployeeGeneralPayload from './EmployeeGeneralPayload';
import AddressPayload from './AddressPayload';
import OtherInformationPayload from './OtherInformationPayload';




/**
 * EmployeePayload Interface.
 */
interface EmployeePayload {
    selfData: {
        fullName: string;
        tabelCounter : number;
        firstName: string;
        lastName : string;
        subdivisionId: number;
    };
    general: EmployeeGeneralPayload;
    addressies:AddressPayload;
    otherInformation:OtherInformationPayload;
    employeePosition?:any;
    employeeAccounts?:any;
    employeeAddition?:any;
}

export default EmployeePayload;

