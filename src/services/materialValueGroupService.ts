import MaterialValueGroupDetail  from '../domain/entities/MaterialValueGroupDetail';
import MaterialValueGroup from '../models/MaterialValueGroup';
import transform from '../utils/transform';
import MaterialValueGroupPayload  from '../domain/requests/MaterialValueGroupPayload';
import * as object from '../utils/object';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<MaterialValueGroupDetail[]> {

    const _materialValueGroups = await MaterialValueGroup.fetchAll();
    const materialValueGroups = await (_materialValueGroups).query().limit(limit).offset(offset);
    
    const res = transform(materialValueGroups, (materialValueGroup: MaterialValueGroupDetail) => ({
        id:materialValueGroup.id,
        code: materialValueGroup.code,
        materialValueGroupId : materialValueGroup.materialValueGroupId,
        name : materialValueGroup.name
    } as MaterialValueGroupDetail));

    return res;
}

export async function count(): Promise<object> {
    const count = await (await MaterialValueGroup.fetchAll()).count();
    return {count}
}


export async function insert(params: MaterialValueGroupPayload):Promise<MaterialValueGroupDetail> {

    const materialValueGroup = (await new MaterialValueGroup({...params}).save()).serialize();

    return object.camelize(materialValueGroup);
}

export async function getById(id: number): Promise<MaterialValueGroupDetail> {

    const position = (await new MaterialValueGroup({ id: id }).fetch({withRelated:['parent']}));

    if (position) {
        return position.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<MaterialValueGroupDetail> {

    const res = (await new MaterialValueGroup({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: MaterialValueGroupPayload): Promise<MaterialValueGroupDetail> {

    const subdivision = (
        await new MaterialValueGroup().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(subdivision);
}