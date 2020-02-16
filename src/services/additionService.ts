import AdditionDetail from '../domain/entities/AdditionDetail';
import Addition from '../models/Addition';
import transform from '../utils/transform';
import AdditionPayload from '../domain/requests/AdditionPayload';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';
import * as object from '../utils/object';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<AdditionDetail[]> {
    const _additions = await Addition.fetchAll()
    const additions = await (_additions).query((qb)=>{
        qb.limit(limit),
        qb.offset(offset)
    }).fetch({ withRelated: ['expenseAccount','tabel','typeOfIncome','typeOfVacation'] });


    const res = transform(additions.serialize(), (addition: AdditionDetail) => ({
        id: addition.id,
        name: addition.name,
        expense_account_id: addition.expense_account_id,
        table_id: addition.table_id,
        type_of_income_id: addition.type_of_income_id,
        type_of_vacation_id: addition.type_of_vacation_id,
        coefficient: addition.coefficient,
        by_the_employer_mandatory_pension: addition.by_the_employer_mandatory_pension,
        declining_income: addition.declining_income,
        is_for_tax_purposes_only: addition.is_for_tax_purposes_only,
        is_income: addition.is_income,
        is_mandatory_pension: addition.is_mandatory_pension,
        is_trade_union: addition.is_trade_union,
        participates_on_account_of_actual_hours: addition.participates_on_account_of_actual_hours,
        recalculation: addition.recalculation,
        expenseAccount : addition.expenseAccount,
        tabel : addition.tabel,
        typeOfIncome : addition.typeOfIncome,
        typeOfVacation : addition.typeOfVacation,
    }))

    return res;
}

export async function count(): Promise<object> {
    const count = await (await Addition.fetchAll()).count();
    return {count}
}


export async function insert(params: AdditionPayload): Promise<AdditionDetail> {

    const addition = (await new Addition({ ...params }).save()).serialize();

    return addition;


}

export async function getById(id: number): Promise<AdditionDetail> {

    const addition = (await new Addition({ id: id }).fetch({ withRelated: ['expenseAccount','tabel','typeOfIncome','typeOfVacation'] }));

    if (addition) {
        return addition.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<AdditionDetail> {

    const res = (await new Addition({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: AdditionPayload): Promise<AdditionDetail> {

    const subdivision = (
        await new Addition().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(subdivision);
}
