
/**
 * EmployeeDetail Interface.
 */
interface EmployeeDetail {
    id?: number;
    fullName: string;
    firstName: string;
    lastName : string;
    subdivisionId: number;
    general: any;
    addressies:any;
    otherInformation:any;
    employeePosition?:any;
    employeeAccounts?:any;
    employeeAddition?:any;
    tabelCounter: number;

}

export default EmployeeDetail;

