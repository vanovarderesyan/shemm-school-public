import  TypeOfActionsDetail  from '../domain/entities/TypesOfActionsDetail';
import TypeOfActions from '../models/TypesOfActions';
import transform from '../utils/transform';
import  TypeOfActionsPayload  from '../domain/requests/TypesOfActionsPayload';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';
import * as object from '../utils/object';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<TypeOfActionsDetail[]> {
    const _typeOfActionss = await TypeOfActions.fetchAll();
    const typeOfActionss = await (_typeOfActionss).query().limit(limit).offset(offset);
    const res = transform(typeOfActionss, (typeOfActions: TypeOfActionsDetail) => ({
        id: typeOfActions.id,
        name: typeOfActions.name,
        code : typeOfActions.code
    }))

    return res;
}

export async function count(): Promise<object> {
    const count = await (await TypeOfActions.fetchAll()).count();
    return {count}
}

export async function insert(params: TypeOfActionsPayload): Promise<TypeOfActionsDetail> {

    const typeOfActions = (await new TypeOfActions({ ...params }).save()).serialize();

    return typeOfActions;


}

export async function getById(id: number): Promise<TypeOfActionsDetail> {

    const typeOfActions = (await new TypeOfActions({ id: id }).fetch());

    if(typeOfActions){
        return typeOfActions.serialize();
    }
    else{
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<TypeOfActionsDetail> {

    const res = (await new TypeOfActions({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: TypeOfActionsPayload): Promise<TypeOfActionsDetail> {

    const subdivision = (
        await new TypeOfActions().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(subdivision);
}
