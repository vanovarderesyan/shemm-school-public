/**
 * AccountOfEmployeeCalculationsPayload interface.
 */
import CurrencyPayload from './CurrencyPayload'

import AccountOfEmployeeCalculationsPayload from './AccountOfEmployeeCalculationsPayload';

interface AccountOfEmployeeCalculationsDetail {
    name: string;
    account :string;
    isAccumulatedAccount : boolean;
    calculationsTypeId ?: AccountOfEmployeeCalculationsPayload;
    offBalanceSheet : boolean;
    accountingByPartners : boolean;
    analyticalGroup_1 : boolean;
    analyticalGroup_2 : boolean;
    acumulatedAccountId : number;
    currencies : Array<CurrencyPayload>;

}

export default AccountOfEmployeeCalculationsDetail;
