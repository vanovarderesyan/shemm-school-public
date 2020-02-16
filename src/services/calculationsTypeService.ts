import  CalculationsTypeDetail  from '../domain/entities/CalculationsTypeDetail';
import CaclulationsType from '../models/CalculationsType';
import transform from '../utils/transform';
import  CalculationsTypePayload  from '../domain/requests/CalculationsTypePayload';
import * as object from '../utils/object';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<CalculationsTypeDetail[]> {

    const _caclulationsTypes = await CaclulationsType.fetchAll();
    const caclulationsTypes = await (_caclulationsTypes).query().limit(limit).offset(offset)

    const res = transform(caclulationsTypes, (caclulationsType: CalculationsTypeDetail) => ({
        name: caclulationsType.name,
        id :caclulationsType.id
    }))

    return res;
}


export async function count(): Promise<object> {
    const count = await (await CaclulationsType.fetchAll()).count();
    return {count}
}


export async function insert(param: CalculationsTypePayload): Promise<CalculationsTypePayload> {

    const caclulationsType = (await new CaclulationsType({ ...param }).save()).serialize();

    return object.camelize(caclulationsType);

}

export async function getById(id: number): Promise<CalculationsTypeDetail> {

    const position = (await new CaclulationsType({ id: id }).fetch());

    if (position) {
        return position.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<CalculationsTypeDetail> {

    const res = (await new CaclulationsType({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: CalculationsTypePayload): Promise<CalculationsTypeDetail> {

    const caclulationsType = (
        await new CaclulationsType().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(caclulationsType);
}
