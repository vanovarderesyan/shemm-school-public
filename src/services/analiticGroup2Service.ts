import AnaliticGroup2Detail  from '../domain/entities/AnaliticGroup2Detail';
import AnaliticGroup2 from '../models/AnaliticGroup2';
import transform from '../utils/transform';
import AnaliticGroup2Payload  from '../domain/requests/AnaliticGroup2Payload';
import * as object from '../utils/object';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<AnaliticGroup2Detail[]> {

    const _analiticGroup2s = await AnaliticGroup2.fetchAll();
    const analiticGroup2s = await (_analiticGroup2s).query((qb)=>{
        qb.limit(limit),
        qb.offset(offset)
    }).fetch({withRelated:['parent']})
    console.log(analiticGroup2s.serialize())
    const res = transform(analiticGroup2s.serialize(), (analiticGroup2: AnaliticGroup2Detail) => ({
        id:analiticGroup2.id,
        code: analiticGroup2.code,
        analiticGroup2Id : analiticGroup2.analiticGroup2Id,
        isAccumulate : analiticGroup2.isAccumulate,
        name : analiticGroup2.name,
        parent : analiticGroup2.parent
    }));

    return res;
}

export async function count(): Promise<object> {
    const count = await (await AnaliticGroup2.fetchAll()).count();
    return {count}
}


export async function insert(params: AnaliticGroup2Payload):Promise<AnaliticGroup2Detail> {

    const analiticGroup2 = (await new AnaliticGroup2({...params}).save()).serialize();
    console.log(analiticGroup2)

    console.log(object.camelize(analiticGroup2));
    return object.camelize(analiticGroup2);
}

export async function getById(id: number): Promise<AnaliticGroup2Detail> {

    const position = (await new AnaliticGroup2({ id: id }).fetch());

    if (position) {
        return position.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<AnaliticGroup2Detail> {

    const res = (await new AnaliticGroup2({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: AnaliticGroup2Payload): Promise<AnaliticGroup2Detail> {

    const subdivision = (
        await new AnaliticGroup2().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(subdivision);
}