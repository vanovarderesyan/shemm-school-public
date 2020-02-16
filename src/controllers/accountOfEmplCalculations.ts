import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import * as accountOfEmplCalculationsService from '../services/accountOfEmplCalculationsService';
import config from '../config/config'; 
import  AccountOfEmplCalculationsPayload  from '../domain/requests/AccountOfEmployeeCalculationsPayload';
import PaginetPayload  from '../domain/requests/PaginetPayload';


const { messages } = config;

export async function index(req:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const params = Object(req.params) as PaginetPayload;

        const response = await accountOfEmplCalculationsService.fetchAll(params.limit,params.offset);
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.accountOfEmplCalculations.fetchAll
        })

    } catch (error) {
        next(error);
    }

}

export async function count(_:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const response = await accountOfEmplCalculationsService.count();
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.accountOfEmplCalculations.count
        })

    } catch (error) {
        next(error);
    }

}

export async function store(req:Request,res:Response,next:NextFunction):Promise<void>{
    
    try {
        const accountOfEmplCalculationsPayload = req.body as AccountOfEmplCalculationsPayload;
        
        const response = await accountOfEmplCalculationsService.insert(accountOfEmplCalculationsPayload);

        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.accountOfEmplCalculations.insert
        })

    } catch (error) {
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await accountOfEmplCalculationsService.getById(id);

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

        const response = (await accountOfEmplCalculationsService.destroy(id));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.position.delete
        })

    } catch (error) {
        next(error);
    }
}


export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);
        const accountOfEmplCalculationsPayload = req.body as AccountOfEmplCalculationsPayload;

        const response = (await accountOfEmplCalculationsService.update(id,accountOfEmplCalculationsPayload));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.accountOfEmplCalculations.edit
        })

    } catch (error) {
        next(error);
    }
}