
/**
 * EmployeeGeneralPayload Interface.
 */
interface EmployeeGeneralPayload {
    employeeId: number;
    professionId: number;
    gender : string;
    birthdate : string;
    contractId: number;
    accountId: number;
    releaseDate: Date;
    dateOfAccept : Date;
    acceptedCommand: string;
    releaseCommand: string;
}

export default EmployeeGeneralPayload;

