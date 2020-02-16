import * as analiticGroup1Service from '../services/analiticGroup1Service';
import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import config from '../config/config';
import AnaliticGroup1Payload  from '../domain/requests/AnaliticGroup1Payload';
import PaginetPayload  from '../domain/requests/PaginetPayload';

const { messages } = config;

export async function index(_: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const params = Object(_.params) as PaginetPayload;

        const response = await analiticGroup1Service.fetchAll(params.limit,params.offset);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.analiticGroup1.fetchAll
        })
    } catch (error) {
        next(error);
    }

}

export async function count(_:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const response = await analiticGroup1Service.count();
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.analiticGroup1.count
        })

    } catch (error) {
        next(error);
    }

}


export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const analiticGroup1Payload = req.body as AnaliticGroup1Payload;

        const response = await analiticGroup1Service.insert(analiticGroup1Payload);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.analiticGroup1.insert
        })
    } catch (error) {
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await analiticGroup1Service.getById(id);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.analiticGroup1.fetch
        })

    } catch (error) {
        next(error);
    }
}


export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = (await analiticGroup1Service.destroy(id));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.analiticGroup1.delete
        })

    } catch (error) {
        next(error);
    }
}


export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);
        const analiticGroup1Payload = req.body as AnaliticGroup1Payload;

        const response = (await analiticGroup1Service.update(id,analiticGroup1Payload));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.analiticGroup1.edit
        })

    } catch (error) {
        next(error);
    }
}