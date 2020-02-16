import { MeasurementUnitDetail } from '../domain/entities/MeasurementUnitDetail';
import MeasurementUnit from '../models/MeasurementUnit';
import transform from '../utils/transform';
import { MeasurementUnitPayload } from '../domain/requests/MeasurementUnitPayload';
import * as object from '../utils/object';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<MeasurementUnitDetail[]> {

    const _measurementUnits = await MeasurementUnit.fetchAll();
    const measurementUnits = await (_measurementUnits).query().limit(limit).offset(offset);
    
    const res = transform(measurementUnits, (measurementUnit: MeasurementUnitDetail) => ({
        id:measurementUnit.id,
        code: measurementUnit.code,
        unit: measurementUnit.unit,
        abbreviation: measurementUnit.abbreviation
    } as MeasurementUnitDetail));

    return res;
}

export async function count(): Promise<object> {
    const count = await (await MeasurementUnit.fetchAll()).count();
    return {count}
}


export async function insert(params: MeasurementUnitPayload):Promise<MeasurementUnitDetail> {

    const measurementUnit = (await new MeasurementUnit({...params}).save()).serialize();

    return object.camelize(measurementUnit);
}

export async function getById(id: number): Promise<MeasurementUnitDetail> {

    const position = (await new MeasurementUnit({ id: id }).fetch());

    if (position) {
        return position.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<MeasurementUnitDetail> {

    const res = (await new MeasurementUnit({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: MeasurementUnitPayload): Promise<MeasurementUnitDetail> {

    const subdivision = (
        await new MeasurementUnit().where({ id: id }).save({ ...params }, { patch: true })
    ).serialize();

    return object.camelize(subdivision);
}