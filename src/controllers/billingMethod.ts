import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import * as billingMethodService from '../services/billingMethodService';
import config from '../config/config'; 
import BillingMethodPayload  from '../domain/requests/BillingMethodPayload';
import PaginetPayload  from '../domain/requests/PaginetPayload';


const { messages } = config;

export async function index(req:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const params = Object(req.params) as PaginetPayload;

        const response = await billingMethodService.fetchAll(params.limit,params.offset);
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.billingMethod.fetchAll
        })

    } catch (error) {
        next(error);
    }

}

export async function count(_:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const response = await billingMethodService.count();
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.billingMethod.count
        })

    } catch (error) {
        next(error);
    }

}

export async function store(req:Request,res:Response,next:NextFunction):Promise<void>{
    
    try {
        const billingMethodPayload = req.body as BillingMethodPayload;
        
        const response = await billingMethodService.insert(billingMethodPayload);

        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.billingMethod.insert
        })

    } catch (error) {
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await billingMethodService.getById(id);

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

        const response = (await billingMethodService.destroy(id));

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
        const billingMethodPayload = req.body as BillingMethodPayload;

        const response = (await billingMethodService.update(id,billingMethodPayload));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.billingMethod.edit
        })

    } catch (error) {
        next(error);
    }
}