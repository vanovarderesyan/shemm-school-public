import  CurrencyDetail  from '../domain/entities/CurrencyDetail';
import Currency from '../models/Currency';
import transform from '../utils/transform';
import  CurrencyPayload  from '../domain/requests/CurrencyPayload';
import * as object from '../utils/object';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<CurrencyDetail[]> {

    const _currency = await Currency.fetchAll();
    const currency = await (_currency).query().limit(limit).offset(offset)

    const res = transform(currency, (currency: CurrencyDetail) => ({
        id:currency.id,
        name: currency.name,
        currency :currency.currency
    }))

    return res;
}


export async function count(): Promise<object> {
    const count = await (await Currency.fetchAll()).count();
    return {count}
}


export async function insert(param: CurrencyPayload): Promise<CurrencyPayload> {

    const currency = (await new Currency({ ...param }).save()).serialize();

    return object.camelize(currency);

}

export async function getById(id: number): Promise<CurrencyDetail> {

    const position = (await new Currency({ id: id }).fetch());

    if (position) {
        return position.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<CurrencyDetail> {

    const res = (await new Currency({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: CurrencyPayload): Promise<CurrencyDetail> {

    const currency = (
        await new Currency().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(currency);
}
