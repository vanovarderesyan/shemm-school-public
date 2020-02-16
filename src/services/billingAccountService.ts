import BillingAccountDetail  from '../domain/entities/BillingAccountDetail';
import BillingAccount from '../models/BillingAccount';
import transform from '../utils/transform';
import {BillingAccountPayload}  from '../domain/requests/BillingAccountPayload';
import * as object from '../utils/object';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<BillingAccountDetail[]> {

    const _billingAccounts = await BillingAccount.fetchAll();
    const billingAccounts = await (_billingAccounts).query().limit(limit).offset(offset)

    const res = transform(billingAccounts, (billingAccount: BillingAccountDetail) => ({
        id: billingAccount.id,
        name : billingAccount.name,
         isMain: billingAccount.isMain,
         account:billingAccount.account,
         bankAccount : billingAccount.account,
         partnersId: billingAccount.partnersId,
         serialNumber: billingAccount.serialNumber
    }))

    return res;
}


export async function count(): Promise<object> {
    const count = await (await BillingAccount.fetchAll()).count();
    return {count}
}


export async function insert(param: BillingAccountPayload): Promise<BillingAccountPayload> {

    const billingAccount = (await new BillingAccount({ ...param }).save()).serialize();

    return object.camelize(billingAccount);

}

export async function getById(id: number): Promise<BillingAccountDetail> {

    const position = (await new BillingAccount({ id: id }).fetch());

    if (position) {
        return position.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<BillingAccountDetail> {

    const res = (await new BillingAccount({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: BillingAccountPayload): Promise<BillingAccountDetail> {

    const billingAccount = (
        await new BillingAccount().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(billingAccount);
}
