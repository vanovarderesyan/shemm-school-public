import { Request, Response, NextFunction } from 'express';
import * as expenseAccountService from '../services/expenseAccountService';
import * as HttpStatus from 'http-status-codes';
import config from '../config/config';
import ExpenseAccountPayload  from '../domain/requests/ExpenseAccountPayload';
import PaginetPayload  from '../domain/requests/PaginetPayload';

const { messages } = config;

export async function index(_: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const params = Object(_.params) as PaginetPayload;

        const response = await expenseAccountService.fetchAll(params.limit,params.offset);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.expenseAccount.fetchAll
        })
    } catch (error) {
        next(error);
    }

}

export async function count(_:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const response = await expenseAccountService.count();
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.expenseAccount.count
        })

    } catch (error) {
        next(error);
    }

}

export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const expenseAccountPayload = req.body as ExpenseAccountPayload;

        const expenseAccount = await expenseAccountService.insert(expenseAccountPayload);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: expenseAccount,
            message: messages.expenseAccount.insert
        })

    } catch (error) {
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await expenseAccountService.getById(id);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.expenseAccount.fetch
        })

    } catch (error) {
        next(error);
    }
}


export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = (await expenseAccountService.destroy(id));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.expenseAccount.delete
        })

    } catch (error) {
        next(error);
    }
}


export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);
        const expenseAccountPayload = req.body as ExpenseAccountPayload;

        const response = (await expenseAccountService.update(id,expenseAccountPayload));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.subdivision.edit
        })

    } catch (error) {
        next(error);
    }
}