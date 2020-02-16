import { CoWorkersDetail } from '../domain/entities/CoWorkersDetail';
import CoWorkers from '../models/CoWorkers';
import transform from '../utils/transform';
import { CoWorkerPayload } from '../domain/requests/CoWokerPayload';
import * as object from '../utils/object';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;
export async function fetchAll(limit:number,offset:number): Promise<CoWorkersDetail[]> {

    const _coWorkers = await CoWorkers.fetchAll();
    const coWorkers = await (_coWorkers).query().limit(limit).offset(offset)

    const res = transform(coWorkers, (coWorker: CoWorkersDetail) => ({
        id: coWorker.id,
        code: coWorker.code,
        hvhh: coWorker.hvhh,
        name: coWorker.name,
        creator: coWorker.creator,
        debetor: coWorker.debetor,
        legalAddress: coWorker.legalAddress,
        workAddress: coWorker.workAddress,
        transferPurpose: coWorker.transferPurpose,
        inflowAccount: coWorker.inflowAccount,
        leakageAccount: coWorker.leakageAccount,
        director: coWorker.director,
        accountent: coWorker.accountent,
        bankAccount: coWorker.bankAccount,
        bankId: coWorker.bankId
    }))

    return res;

}

export async function insert(params: CoWorkerPayload): Promise<CoWorkersDetail> {

    const coWorkers = (await new CoWorkers({...params}).save()).serialize();

    return object.camelize(coWorkers);

}

export async function count(): Promise<object> {
    const count = await (await CoWorkers.fetchAll()).count();
    return {count}
}

export async function getById(id: number): Promise<CoWorkersDetail> {

    const position = (await new CoWorkers({ id: id }).fetch());

    if (position) {
        return position.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<CoWorkersDetail> {

    const res = (await new CoWorkers({ id: id }).destroy()).serialize();

    return res;
}

export async function update(id: number, params: CoWorkerPayload): Promise<CoWorkersDetail> {

    const subdivision = (
        await new CoWorkers().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(subdivision);
}
