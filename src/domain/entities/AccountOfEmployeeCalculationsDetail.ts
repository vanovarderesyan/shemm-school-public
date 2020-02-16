/**
 * AccountOfEmployeeCalculationsDetail interface.
 */

import AccountOfEmployeeCalculationsTypeDetail from './AccountOfEmployeeCalculationsTypeDetail';

interface AccountOfEmployeeCalculationsDetail {
    id ?:number;
    name: string;
    calculationsTypeId ?: AccountOfEmployeeCalculationsTypeDetail;
    account :string;
    isAccumulatedAccount : boolean;
    offBalanceSheet : boolean;
    accountingByPartners : boolean;
    analyticalGroup1 : boolean;
    analyticalGroup2 : boolean;
    acumulatedAccountId : number;

    calculationsType ?: any;
    currencies ?: any;
    acumulatedAccount ? : any;
}

export default AccountOfEmployeeCalculationsDetail;
