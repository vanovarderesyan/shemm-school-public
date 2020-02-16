import  TypeOfVacationDetail  from '../domain/entities/TypeOfVacationDetail';
import TypeOfVacation from '../models/TypeOfVacation';
import transform from '../utils/transform';
import  TypeOfVacationPayload  from '../domain/requests/TypeOfVacationPayload';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';
import * as object from '../utils/object';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<TypeOfVacationDetail[]> {
    const _typeOfVacations = await TypeOfVacation.fetchAll();
    const typeOfVacations = await (_typeOfVacations).query().limit(limit).offset(offset);

    const res = transform(typeOfVacations, (TypeOfVacation: TypeOfVacationDetail) => ({
        id: TypeOfVacation.id,
        name: TypeOfVacation.name
    }))

    return res;
}

export async function count(): Promise<object> {
    const count = await (await TypeOfVacation.fetchAll()).count();
    return {count}
}


export async function insert(params: TypeOfVacationPayload): Promise<TypeOfVacationDetail> {

    const typeOfVacation = (await new TypeOfVacation({ ...params }).save()).serialize();

    return typeOfVacation;


}

export async function getById(id: number): Promise<TypeOfVacationDetail> {

    const typeOfVacation = (await new TypeOfVacation({ id: id }).fetch({ withRelated: ['subdivision'] }));

    if(typeOfVacation){
        return typeOfVacation.serialize();
    }
    else{
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<TypeOfVacationDetail> {

    const res = (await new TypeOfVacation({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: TypeOfVacationPayload): Promise<TypeOfVacationDetail> {

    const subdivision = (
        await new TypeOfVacation().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(subdivision);
}
