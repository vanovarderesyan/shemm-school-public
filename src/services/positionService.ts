import { PositionDetail } from '../domain/entities/PositionDetail';
import Position from '../models/Position';
import transform from '../utils/transform';
import { PositionPayload } from '../domain/requests/PositionPayload';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<PositionDetail[]> {
    const _positions = await Position.fetchAll()
    const positions = await (_positions).query((qb)=>{
        qb.limit(limit),
        qb.offset(offset)
    }).fetch({ withRelated: ['subdivision']})

    const res = transform(positions.serialize(), (position: PositionDetail) => ({
        id: position.id,
        name: position.name,
        
        subdivision: position.subdivision,
        subdivisionId: position.subdivisionId
    }))

    return res;
}

export async function count(): Promise<object> {
    const count = await (await Position.fetchAll()).count();
    return {count}
}


export async function insert(params: PositionPayload): Promise<PositionDetail> {

    const position = (await new Position({ ...params }).save()).serialize();

    return position;


}

export async function getById(id: number): Promise<PositionDetail> {

    const position = (await new Position({ id: id }).fetch({ withRelated: ['subdivision'] }));

    if(position){
        return position.serialize();
    }
    else{
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<PositionDetail> {

    const res = (await new Position({ id: id }).destroy()).serialize();

    return res;
}