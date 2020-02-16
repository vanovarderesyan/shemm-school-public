import  ContractDetail  from '../domain/entities/ContractDetail';
import Contract from '../models/Contract';
import transform from '../utils/transform';
import  ContractPayload  from '../domain/requests/ContractPayload';
import * as object from '../utils/object';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<ContractDetail[]> {

    const _contracts = await Contract.fetchAll();
    const contracts = await (_contracts).query().limit(limit).offset(offset)

    const res = transform(contracts, (contract: ContractDetail) => ({
        name: contract.name,
    }))

    return res;
}


export async function count(): Promise<object> {
    const count = await (await Contract.fetchAll()).count();
    return {count}
}


export async function insert(param: ContractPayload): Promise<ContractPayload> {

    const contract = (await new Contract({ ...param }).save()).serialize();

    return object.camelize(contract);

}

export async function getById(id: number): Promise<ContractDetail> {

    const position = (await new Contract({ id: id }).fetch());

    if (position) {
        return position.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<ContractDetail> {

    const res = (await new Contract({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: ContractPayload): Promise<ContractDetail> {

    const contract = (
        await new Contract().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(contract);
}
