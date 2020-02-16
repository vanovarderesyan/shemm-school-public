import BillingMethodDetail  from '../domain/entities/BillingMethodDetail';
import BillingMethod from '../models/BillingMethod';
import transform from '../utils/transform';
import BillingMethodPayload  from '../domain/requests/BillingMethodPayload';
import * as object from '../utils/object';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<BillingMethodDetail[]> {

    const _billingMethods = await BillingMethod.fetchAll();
    const billingMethods = await (_billingMethods).query().limit(limit).offset(offset)

    const res = transform(billingMethods, (billingMethod: BillingMethodDetail) => ({
        id: billingMethod.id,
        name : billingMethod.name,
        abbreviation : billingMethod.abbreviation

    }))

    return res;
}


export async function count(): Promise<object> {
    const count = await (await BillingMethod.fetchAll()).count();
    return {count}
}


export async function insert(param: BillingMethodPayload): Promise<BillingMethodPayload> {

    const billingMethod = (await new BillingMethod({ ...param }).save()).serialize();

    return object.camelize(billingMethod);

}

export async function getById(id: number): Promise<BillingMethodDetail> {

    const position = (await new BillingMethod({ id: id }).fetch());

    if (position) {
        return position.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<BillingMethodDetail> {

    const res = (await new BillingMethod({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: BillingMethodPayload): Promise<BillingMethodDetail> {

    const billingMethod = (
        await new BillingMethod().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(billingMethod);
}
