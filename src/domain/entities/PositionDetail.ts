import Subdivision from '../../models/Subdivision';

export interface PositionDetail {
    id?: number;
    name: string;
    // code: string;
    
    subdivisionId: number;
    subdivision?: Subdivision
}