import { SubsectionDetail } from '../domain/entities/SubsectionDetail';
import Subsection from '../models/Subsection';
import transform from '../utils/transform';
import {SubsectionPayload}  from '../domain/requests/SubsectionPayload';
import * as object from '../utils/object';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<SubsectionDetail[]> {

    const _subsections = await Subsection.fetchAll();
    const subsections = await (_subsections).query((qb)=>{
        qb.limit(limit),
        qb.offset(offset)
    }).fetch({withRelated:['customerAccount','aahAccount','prepaidAccountReceived','typesOfAction']})
    const res = transform(subsections.serialize(), (subsection: SubsectionDetail) => ({
        id: subsection.id,
        name: subsection.name,
        aahAccountId : subsection.aahAccountId,
        code : subsection.code,
        customerAccountId : subsection.customerAccountId,
        prepaidAccountReceivedId : subsection.prepaidAccountReceivedId,
        aahAccount : subsection.aahAccount,
        customerAccount : subsection.customerAccount,
        prepaidAccountReceived : subsection.prepaidAccountReceived,
        typesOfAction : subsection.typesOfAction
    }))

    return res;
}


export async function count(): Promise<object> {
    const count = await (await Subsection.fetchAll()).count();
    return {count}
}


export async function insert(param: SubsectionPayload): Promise<SubsectionPayload> {

    const subsection = (await new Subsection({ ...param }).save()).serialize();

    return object.camelize(subsection);

}

export async function getById(id: number): Promise<SubsectionDetail> {

    const position = (await new Subsection({ id: id }).fetch({withRelated:['customerAccount','aahAccount','prepaidAccountReceived']}));

    if (position) {
        return position.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<SubsectionDetail> {

    const res = (await new Subsection({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: SubsectionPayload): Promise<SubsectionDetail> {

    const subsection = (
        await new Subsection().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(subsection);
}
