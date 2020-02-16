import  WarehouseDetail  from '../domain/entities/WarehouseDetail';
import Warehouse from '../models/Warehouse';
import transform from '../utils/transform';
import WarehousePayload  from '../domain/requests/WarehousePayload';
import * as object from '../utils/object';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<WarehouseDetail[]> {

    const _warehouses = await Warehouse.fetchAll();
    const warehouses = await (_warehouses).query().limit(limit).offset(offset)

    const res = transform(warehouses, (warehouse: WarehouseDetail) => ({
        id: warehouse.id,
        name: warehouse.name,
        address  : warehouse.address,
        code : warehouse.code,
        responsible : warehouse.responsible
    }))

    return res;
}


export async function count(): Promise<object> {
    const count = await (await Warehouse.fetchAll()).count();
    return {count}
}


export async function insert(param: WarehousePayload): Promise<WarehousePayload> {

    const warehouse = (await new Warehouse({ ...param }).save()).serialize();

    return object.camelize(warehouse);

}

export async function getById(id: number): Promise<WarehouseDetail> {

    const position = (await new Warehouse({ id: id }).fetch());

    if (position) {
        return position.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<WarehouseDetail> {

    const res = (await new Warehouse({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: WarehousePayload): Promise<WarehouseDetail> {

    const warehouse = (
        await new Warehouse().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(warehouse);
}
