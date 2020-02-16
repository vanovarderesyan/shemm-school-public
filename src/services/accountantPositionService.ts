import AccountantPositionDetail  from '../domain/entities/AccountantPositionDetail';
import AccountantPosition from '../models/AccountantPosition';
import transform from '../utils/transform';
import AccountantPositionPayload  from '../domain/requests/AccountantPositionPayload';
import * as object from '../utils/object';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<AccountantPositionDetail[]> {

    const _accountantPositions = await AccountantPosition.fetchAll();
    const accountantPositions = await (_accountantPositions).query().limit(limit).offset(offset)

    const res = transform(accountantPositions, (accountantPosition: AccountantPositionDetail) => ({
        id: accountantPosition.id,
        name : accountantPosition.name,
    }))

    return res;
}


export async function count(): Promise<object> {
    const count = await (await AccountantPosition.fetchAll()).count();
    return {count}
}


export async function insert(param: AccountantPositionPayload): Promise<AccountantPositionPayload> {

    const accountantPosition = (await new AccountantPosition({ ...param }).save()).serialize();

    return object.camelize(accountantPosition);

}

export async function getById(id: number): Promise<AccountantPositionDetail> {

    const position = (await new AccountantPosition({ id: id }).fetch());

    if (position) {
        return position.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<AccountantPositionDetail> {

    const res = (await new AccountantPosition({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: AccountantPositionPayload): Promise<AccountantPositionDetail> {

    const accountantPosition = (
        await new AccountantPosition().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(accountantPosition);
}
