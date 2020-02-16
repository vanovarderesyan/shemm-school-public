import GroupDetail  from '../domain/entities/GroupDetail';
import Group from '../models/Group';
import transform from '../utils/transform';
import GroupPayload  from '../domain/requests/GroupPayload';
import * as object from '../utils/object';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<GroupDetail[]> {

    const _groups = await Group.fetchAll();
    const groups = await (_groups).query().limit(limit).offset(offset)

    const res = transform(groups, (group: GroupDetail) => ({
        id: group.id,
        accumulator : group.accumulator,
        name : group.name
    }))

    return res;
}


export async function count(): Promise<object> {
    const count = await (await Group.fetchAll()).count();
    return {count}
}


export async function insert(param: GroupPayload): Promise<GroupPayload> {

    const group = (await new Group({ ...param }).save()).serialize();

    return object.camelize(group);

}

export async function getById(id: number): Promise<GroupDetail> {

    const position = (await new Group({ id: id }).fetch());

    if (position) {
        return position.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<GroupDetail> {

    const res = (await new Group({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: GroupPayload): Promise<GroupDetail> {

    const group = (
        await new Group().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(group);
}
