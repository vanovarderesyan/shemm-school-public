import { Request, Response, NextFunction } from 'express';
import * as additionService from '../services/additionService';
import * as HttpStatus from 'http-status-codes';
import config from '../config/config';
import AdditionPayload  from '../domain/requests/AdditionPayload';
import PaginetPayload from '../domain/requests/PaginetPayload';

const { messages } = config;

export async function index(_: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const params = Object(_.params) as PaginetPayload;
        const response = await additionService.fetchAll(params.limit, params.offset);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.addition.fetchAll
        })
    } catch (error) {
        next(error);
    }

}

export async function count(_:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const response = await additionService.count();
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.tabel.count
        })

    } catch (error) {
        next(error);
    }

}

export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const additionPayload = req.body as AdditionPayload;

        const addition = await additionService.insert(additionPayload);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: addition,
            message: messages.addition.insert
        })

    } catch (error) {
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await additionService.getById(id);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.addition.fetch
        })

    } catch (error) {
        next(error);
    }
}


export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = (await additionService.destroy(id));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.addition.delete
        })

    } catch (error) {
        next(error);
    }
}


export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);
        const additionPayload = req.body as AdditionPayload;

        const response = (await additionService.update(id,additionPayload));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.subdivision.edit
        })

    } catch (error) {
        next(error);
    }
}