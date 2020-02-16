import AccountOfEmplCalculationsDetail from '../domain/entities/AccountOfEmployeeCalculationsDetail';
import AccountOfEmplCalculations from '../models/AccountOfEmployeeCalculations';
import CurrencyEmploye from '../models/CurrencyEmploye';

import transform from '../utils/transform';
import AccountOfEmplCalculationsPayload from '../domain/requests/AccountOfEmployeeCalculationsPayload';
import * as object from '../utils/object';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;

export async function fetchAll(limit: number, offset: number): Promise<AccountOfEmplCalculationsDetail[]> {

    const _accountOfEmplCalculationss = await AccountOfEmplCalculations.fetchAll();
    const accountOfEmplCalculationss = await (_accountOfEmplCalculationss).query((qb) => {
        qb.limit(limit),
            qb.offset(offset)
    }).fetch({ withRelated: ['currencies', 'calculationsType', 'acumulatedAccount'] });

    console.log(accountOfEmplCalculationss.serialize())
    const res = transform(accountOfEmplCalculationss.serialize(), (accountOfEmplCalculations: AccountOfEmplCalculationsDetail) => ({
        id: accountOfEmplCalculations.id,
        name: accountOfEmplCalculations.name,
        accountingByPartners: accountOfEmplCalculations.accountingByPartners,
        acumulatedAccountId: accountOfEmplCalculations.acumulatedAccountId,
        analyticalGroup1: accountOfEmplCalculations.analyticalGroup1,
        analyticalGroup2: accountOfEmplCalculations.analyticalGroup2,
        offBalanceSheet: accountOfEmplCalculations.offBalanceSheet,
        calculationsTypeId: accountOfEmplCalculations.calculationsTypeId,
        account: accountOfEmplCalculations.account,
        isAccumulatedAccount: accountOfEmplCalculations.isAccumulatedAccount,
        acumulatedAccount : accountOfEmplCalculations.acumulatedAccount,
        calculationsType : accountOfEmplCalculations.calculationsType

    }))

    return res;
}


export async function count(): Promise<object> {
    const count = await (await AccountOfEmplCalculations.fetchAll()).count();
    return { count }
}


export async function insert(param: AccountOfEmplCalculationsPayload): Promise<AccountOfEmplCalculationsPayload> {

    const currencies = param['currencies'] as any;

    delete param.currencies;

    const accountOfEmplCalculations = (await new AccountOfEmplCalculations({ ...param }).save()).serialize();

    for (const billingAccount of currencies) {
        billingAccount['employeeCalculationsId'] = accountOfEmplCalculations['id'];
        (await new CurrencyEmploye({ ...billingAccount }).save()).serialize();
    }
    // currencies

    return object.camelize(accountOfEmplCalculations);

}

export async function getById(id: number): Promise<AccountOfEmplCalculationsDetail> {

    const position = (await new AccountOfEmplCalculations({ id: id }).fetch({ withRelated: ['currencies', 'calculationsType', 'acumulatedAccount'] }));

    if (position) {
        return position.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<AccountOfEmplCalculationsDetail> {

    const res = (await new AccountOfEmplCalculations({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: AccountOfEmplCalculationsPayload): Promise<AccountOfEmplCalculationsDetail> {
    let currencies = params['currencies'] as any;
    delete params['currencies'];

    for (const billingAccount of currencies) {
        billingAccount['employeeCalculationsId'] = id;
        try {
            console.log(billingAccount);
            if (billingAccount['status'] == 'unChanged') {
                continue;
            } else if (billingAccount['status'] =='deleted') {
                (await new CurrencyEmploye().where({ employee_calculations_id: id,currency_id :billingAccount['currencyId'] }).destroy()).serialize();
            } else {
                delete billingAccount['status'];
                (await new CurrencyEmploye({ ...billingAccount }).save()).serialize();
            }
        } catch (error) {
            console.log(error)
        }
    }
    const accountOfEmplCalculations = (
        await new AccountOfEmplCalculations().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(accountOfEmplCalculations);
}
