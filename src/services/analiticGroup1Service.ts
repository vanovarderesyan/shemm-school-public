import AnaliticGroup1Detail  from '../domain/entities/AnaliticGroup1Detail';
import AnaliticGroup1 from '../models/AnaliticGroup1';
import transform from '../utils/transform';
import AnaliticGroup1Payload  from '../domain/requests/AnaliticGroup1Payload';
import * as object from '../utils/object';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<AnaliticGroup1Detail[]> {

    const _analiticGroup1s = await AnaliticGroup1.fetchAll();
    const analiticGroup1s = await (_analiticGroup1s).query((qb)=>{
        qb.limit(limit),
        qb.offset(offset)
    }).fetch()
    
    const res = transform(analiticGroup1s.serialize(), (analiticGroup1: AnaliticGroup1Detail) => ({
        id:analiticGroup1.id,
        code: analiticGroup1.code,
        analiticGroup1Id : analiticGroup1.analiticGroup1Id,
        isAccumulate : analiticGroup1.isAccumulate,
        name : analiticGroup1.name
    }));

    return res;
}

export async function count(): Promise<object> {
    const count = await (await AnaliticGroup1.fetchAll()).count();
    return {count}
}


export async function insert(params: AnaliticGroup1Payload):Promise<AnaliticGroup1Detail> {

    const analiticGroup1 = (await new AnaliticGroup1({...params}).save()).serialize();

    return object.camelize(analiticGroup1);
}

export async function getById(id: number): Promise<AnaliticGroup1Detail> {

    const position = (await new AnaliticGroup1({ id: id }).fetch());

    if (position) {
        return position.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<AnaliticGroup1Detail> {

    const res = (await new AnaliticGroup1({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: AnaliticGroup1Payload): Promise<AnaliticGroup1Detail> {

    const subdivision = (
        await new AnaliticGroup1().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(subdivision);
}