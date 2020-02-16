import  ProfessionDetail  from '../domain/entities/ProfessionDetail';
import Profession from '../models/Profession';
import transform from '../utils/transform';
import  ProfessionPayload  from '../domain/requests/ProfessionPayload';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';
import * as object from '../utils/object';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<ProfessionDetail[]> {
    const _professions = await Profession.fetchAll();
    const professions = await (_professions).query().limit(limit).offset(offset)

    const res = transform(professions, (profession: ProfessionDetail) => ({
        id: profession.id,
        name: profession.name
    }))

    return res;
}


export async function count(): Promise<object> {
    const count = await (await Profession.fetchAll()).count();
    return {count}
}

export async function insert(params: ProfessionPayload): Promise<ProfessionDetail> {

    const profession = (await new Profession({ ...params }).save()).serialize();

    return profession;


}

export async function getById(id: number): Promise<ProfessionDetail> {

    const profession = (await new Profession({ id: id }).fetch());

    if(profession){
        return profession.serialize();
    }
    else{
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<ProfessionDetail> {

    const res = (await new Profession({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: ProfessionPayload): Promise<ProfessionDetail> {

    const subdivision = (
        await new Profession().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(subdivision);
}
