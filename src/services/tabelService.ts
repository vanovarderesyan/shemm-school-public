import TabelDetail from '../domain/entities/TabelDetail';
import Tabel from '../models/Tabel';
import transform from '../utils/transform';
import TabelPayload from '../domain/requests/TabelPayload';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';
import * as object from '../utils/object';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<TabelDetail[]> {
    const _tabels = await Tabel.fetchAll();
    const tabels = await (_tabels).query().limit(limit).offset(offset);
    const res = transform(tabels, (tabel: TabelDetail) => ({
        id: tabel.id,
        name: tabel.name,
        hours : tabel.hours,
        months : tabel.months,
        year : tabel.year
    }))

    return res;
}

export async function count(): Promise<object> {
    const count = await (await Tabel.fetchAll()).count();
    return {count}
}


export async function insert(params: TabelPayload): Promise<TabelDetail> {

    const tabel = (await new Tabel({ ...params }).save()).serialize();

    return tabel;


}

export async function getById(id: number): Promise<TabelDetail> {

    const tabel = (await new Tabel({ id: id }).fetch());

    if (tabel) {
        return tabel.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<TabelDetail> {

    const res = (await new Tabel({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: TabelPayload): Promise<TabelDetail> {

    const subdivision = (
        await new Tabel().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(subdivision);
}
