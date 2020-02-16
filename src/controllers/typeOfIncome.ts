import { Request, Response, NextFunction } from 'express';
import * as typeOfIncomeService from '../services/typeOfIncomeService';
import * as HttpStatus from 'http-status-codes';
import config from '../config/config';
import TypeOfIncomePayload  from '../domain/requests/TypeOfIncomePayload';
import PaginetPayload  from '../domain/requests/PaginetPayload';

const { messages } = config;

export async function index(_: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const params = Object(_.params) as PaginetPayload;

        const response = await typeOfIncomeService.fetchAll(params.limit,params.offset);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.typeOfIncome.fetchAll
        })
    } catch (error) {
        next(error);
    }

}

export async function count(_:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const response = await typeOfIncomeService.count();
        
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
        const typeOfIncomePayload = req.body as TypeOfIncomePayload;

        const typeOfIncome = await typeOfIncomeService.insert(typeOfIncomePayload);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: typeOfIncome,
            message: messages.typeOfIncome.insert
        })

    } catch (error) {
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await typeOfIncomeService.getById(id);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.typeOfIncome.fetch
        })

    } catch (error) {
        next(error);
    }
}


export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = (await typeOfIncomeService.destroy(id));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.typeOfIncome.delete
        })

    } catch (error) {
        next(error);
    }
}


export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);
        const typeOfIncomePayload = req.body as TypeOfIncomePayload;

        const response = (await typeOfIncomeService.update(id,typeOfIncomePayload));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.subdivision.edit
        })

    } catch (error) {
        next(error);
    }
}