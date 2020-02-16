import { Request, Response, NextFunction } from 'express';
import * as positionService from '../services/positionService';
import * as HttpStatus from 'http-status-codes';
import config from '../config/config';
import { PositionPayload } from '../domain/requests/PositionPayload';
import PaginetPayload  from '../domain/requests/PaginetPayload';

const { messages } = config;

export async function index(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const params = Object(req.params) as PaginetPayload;

        const response = await positionService.fetchAll(params.limit,params.offset);
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.position.fetchAll
        })
    } catch (error) {
        next(error);
    }

}

export async function count(_:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const response = await positionService.count();
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.subdivision.count
        })

    } catch (error) {
        next(error);
    }

}

export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const positionPayload = req.body as PositionPayload;

        const position = await positionService.insert(positionPayload);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: position,
            message: messages.position.insert
        })

    } catch (error) {
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await positionService.getById(id);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.position.fetch
        })

    } catch (error) {
        next(error);
    }
}


export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = (await positionService.destroy(id));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.position.delete
        })

    } catch (error) {
        next(error);
    }
}