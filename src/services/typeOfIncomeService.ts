import  TypeOfIncomeDetail  from '../domain/entities/TypeOfIncomeDetail';
import TypeOfIncome from '../models/TypeOfIncome';
import transform from '../utils/transform';
import  TypeOfIncomePayload  from '../domain/requests/TypeOfIncomePayload';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';
import * as object from '../utils/object';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<TypeOfIncomeDetail[]> {
    const _typeOfIncomes = await TypeOfIncome.fetchAll();
    const typeOfIncomes = await (_typeOfIncomes).query().limit(limit).offset(offset);
    const res = transform(typeOfIncomes, (TypeOfIncome: TypeOfIncomeDetail) => ({
        id: TypeOfIncome.id,
        name: TypeOfIncome.name
    }))

    return res;
}

export async function count(): Promise<object> {
    const count = await (await TypeOfIncome.fetchAll()).count();
    return {count}
}

export async function insert(params: TypeOfIncomePayload): Promise<TypeOfIncomeDetail> {

    const typeOfIncome = (await new TypeOfIncome({ ...params }).save()).serialize();

    return typeOfIncome;


}

export async function getById(id: number): Promise<TypeOfIncomeDetail> {

    const typeOfIncome = (await new TypeOfIncome({ id: id }).fetch({ withRelated: ['subdivision'] }));

    if(typeOfIncome){
        return typeOfIncome.serialize();
    }
    else{
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<TypeOfIncomeDetail> {

    const res = (await new TypeOfIncome({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: TypeOfIncomePayload): Promise<TypeOfIncomeDetail> {

    const subdivision = (
        await new TypeOfIncome().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(subdivision);
}
