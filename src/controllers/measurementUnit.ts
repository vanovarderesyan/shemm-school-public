import * as measurementUnitService from '../services/measurementUnitService';
import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import config from '../config/config';
import { MeasurementUnitPayload } from '../domain/requests/MeasurementUnitPayload';
import PaginetPayload  from '../domain/requests/PaginetPayload';

const { messages } = config;

export async function index(_: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const params = Object(_.params) as PaginetPayload;

        const response = await measurementUnitService.fetchAll(params.limit,params.offset);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.measurementUnit.fetchAll
        })
    } catch (error) {
        next(error);
    }

}

export async function count(_:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const response = await measurementUnitService.count();
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.measurementUnit.count
        })

    } catch (error) {
        next(error);
    }

}


export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const measurementUnitPayload = req.body as MeasurementUnitPayload;

        const response = measurementUnitService.insert(measurementUnitPayload);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.measurementUnit.insert
        })
    } catch (error) {
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await measurementUnitService.getById(id);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.measurementUnit.fetch
        })

    } catch (error) {
        next(error);
    }
}


export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = (await measurementUnitService.destroy(id));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.measurementUnit.delete
        })

    } catch (error) {
        next(error);
    }
}


export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);
        const measurementUnitPayload = req.body as MeasurementUnitPayload;

        const response = (await measurementUnitService.update(id,measurementUnitPayload));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.measurementUnit.edit
        })

    } catch (error) {
        next(error);
    }
}