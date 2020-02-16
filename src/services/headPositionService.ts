import HeadPositionDetail  from '../domain/entities/HeadPositionDetail';
import HeadPosition from '../models/HeadPosition';
import transform from '../utils/transform';
import HeadPositionPayload  from '../domain/requests/HeadPositionPayload';
import * as object from '../utils/object';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<HeadPositionDetail[]> {

    const _headPositions = await HeadPosition.fetchAll();
    const headPositions = await (_headPositions).query().limit(limit).offset(offset)

    const res = transform(headPositions, (headPosition: HeadPositionDetail) => ({
        id: headPosition.id,
        name : headPosition.name,
    }))

    return res;
}


export async function count(): Promise<object> {
    const count = await (await HeadPosition.fetchAll()).count();
    return {count}
}


export async function insert(param: HeadPositionPayload): Promise<HeadPositionPayload> {

    const headPosition = (await new HeadPosition({ ...param }).save()).serialize();

    return object.camelize(headPosition);

}

export async function getById(id: number): Promise<HeadPositionDetail> {

    const position = (await new HeadPosition({ id: id }).fetch());

    if (position) {
        return position.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<HeadPositionDetail> {

    const res = (await new HeadPosition({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: HeadPositionPayload): Promise<HeadPositionDetail> {

    const headPosition = (
        await new HeadPosition().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(headPosition);
}
