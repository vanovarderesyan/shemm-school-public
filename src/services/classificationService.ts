import ClassificationDetail  from '../domain/entities/ClassificationDetail';
import Classification from '../models/Classification';
import transform from '../utils/transform';
import ClassificationPayload  from '../domain/requests/ClassificationPayload';
import * as object from '../utils/object';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<ClassificationDetail[]> {

    const _classifications = await Classification.fetchAll();
    const classifications = await (_classifications).query().limit(limit).offset(offset)

    const res = transform(classifications, (classification: ClassificationDetail) => ({
        id: classification.id,
        name : classification.name,
         code: classification.code,
         type : classification.type
    }))

    return res;
}


export async function count(): Promise<object> {
    const count = await (await Classification.fetchAll()).count();
    return {count}
}


export async function insert(param: ClassificationPayload): Promise<ClassificationPayload> {

    const classification = (await new Classification({ ...param }).save()).serialize();

    return object.camelize(classification);

}

export async function getById(id: number): Promise<ClassificationDetail> {

    const position = (await new Classification({ id: id }).fetch());

    if (position) {
        return position.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<ClassificationDetail> {

    const res = (await new Classification({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: ClassificationPayload): Promise<ClassificationDetail> {

    const classification = (
        await new Classification().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(classification);
}
