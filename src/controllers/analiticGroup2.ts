import * as analiticGroup2Service from '../services/analiticGroup2Service';
import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import config from '../config/config';
import AnaliticGroup2Payload  from '../domain/requests/AnaliticGroup2Payload';
import PaginetPayload  from '../domain/requests/PaginetPayload';

const { messages } = config;

export async function index(_: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const params = Object(_.params) as PaginetPayload;

        const response = await analiticGroup2Service.fetchAll(params.limit,params.offset);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.analiticGroup2.fetchAll
        })
    } catch (error) {
        next(error);
    }

}

export async function count(_:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const response = await analiticGroup2Service.count();
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.analiticGroup2.count
        })

    } catch (error) {
        next(error);
    }

}


export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const analiticGroup2Payload = req.body as AnaliticGroup2Payload;

        const response = await  analiticGroup2Service.insert(analiticGroup2Payload);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.analiticGroup2.insert
        })
    } catch (error) {
        console.log(error,'*******')
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await analiticGroup2Service.getById(id);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.analiticGroup2.fetch
        })

    } catch (error) {
        next(error);
    }
}


export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = (await analiticGroup2Service.destroy(id));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.analiticGroup2.delete
        })

    } catch (error) {
        next(error);
    }
}


export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);
        const analiticGroup2Payload = req.body as AnaliticGroup2Payload;

        const response = (await analiticGroup2Service.update(id,analiticGroup2Payload));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.analiticGroup2.edit
        })

    } catch (error) {
        next(error);
    }
}