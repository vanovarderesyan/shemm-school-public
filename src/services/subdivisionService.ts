import { SubdivisionDetail } from '../domain/entities/SubdivisionDetail';
import Subdivision from '../models/Subdivision';
import transform from '../utils/transform';
import { SubdivisionPayload } from '../domain/requests/SubdivisionPayload';
import * as object from '../utils/object';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<SubdivisionDetail[]> {

    const _subdivisions = await Subdivision.fetchAll();
    const subdivisions = await (_subdivisions).query().limit(limit).offset(offset)

    const res = transform(subdivisions, (subdivision: SubdivisionDetail) => ({
        id: subdivision.id,
        name: subdivision.name,
        updatedAt: new Date(subdivision.updatedAt).toLocaleString(),
        createdAt: new Date(subdivision.updatedAt).toLocaleString()
    }))

    return res;
}


export async function count(): Promise<object> {
    const count = await (await Subdivision.fetchAll()).count();
    return {count}
}


export async function insert(param: SubdivisionPayload): Promise<SubdivisionPayload> {

    const subdivision = (await new Subdivision({ ...param }).save()).serialize();

    return object.camelize(subdivision);

}

export async function getById(id: number): Promise<SubdivisionDetail> {

    const position = (await new Subdivision({ id: id }).fetch());

    if (position) {
        return position.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<SubdivisionDetail> {

    const res = (await new Subdivision({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: SubdivisionPayload): Promise<SubdivisionDetail> {

    const subdivision = (
        await new Subdivision().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(subdivision);
}
