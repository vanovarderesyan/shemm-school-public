import  ExpenseAccountDetail  from '../domain/entities/ExpenseAccountDetail';
import ExpenseAccount from '../models/ExpenseAccount';
import transform from '../utils/transform';
import  ExpenseAccountPayload  from '../domain/requests/ExpenseAccountPayload';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';
import * as object from '../utils/object';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<ExpenseAccountDetail[]> {
    const _expenseAccounts = await ExpenseAccount.fetchAll();
    const expenseAccounts = await (_expenseAccounts).query().limit(limit).offset(offset);

    const res = transform(expenseAccounts, (ExpenseAccount: ExpenseAccountDetail) => ({
        id: ExpenseAccount.id,
        name: ExpenseAccount.name
    }))

    return res;
}

export async function count(): Promise<object> {
    const count = await (await ExpenseAccount.fetchAll()).count();
    return {count}
}

export async function insert(params: ExpenseAccountPayload): Promise<ExpenseAccountDetail> {

    const expenseAccount = (await new ExpenseAccount({ ...params }).save()).serialize();

    return expenseAccount;


}

export async function getById(id: number): Promise<ExpenseAccountDetail> {

    const expenseAccount = (await new ExpenseAccount({ id: id }).fetch({ withRelated: ['subdivision'] }));

    if(expenseAccount){
        return expenseAccount.serialize();
    }
    else{
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<ExpenseAccountDetail> {

    const res = (await new ExpenseAccount({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: ExpenseAccountPayload): Promise<ExpenseAccountDetail> {

    const subdivision = (
        await new ExpenseAccount().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(subdivision);
}
