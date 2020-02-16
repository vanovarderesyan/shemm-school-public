import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import * as calculationsTypeService from '../services/calculationsTypeService';
import config from '../config/config'; 
import  CalculationsTypePayload  from '../domain/requests/CalculationsTypePayload';
import PaginetPayload  from '../domain/requests/PaginetPayload';


const { messages } = config;

export async function index(req:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const params = Object(req.params) as PaginetPayload;

        const response = await calculationsTypeService.fetchAll(params.limit,params.offset);
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.calculationsType.fetchAll
        })

    } catch (error) {
        next(error);
    }

}

export async function count(_:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const response = await calculationsTypeService.count();
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.calculationsType.count
        })

    } catch (error) {
        next(error);
    }

}

export async function store(req:Request,res:Response,next:NextFunction):Promise<void>{
    
    try {
        const calculationsTypePayload = req.body as CalculationsTypePayload;
        
        const response = await calculationsTypeService.insert(calculationsTypePayload);

        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.calculationsType.insert
        })

    } catch (error) {
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await calculationsTypeService.getById(id);

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

        const response = (await calculationsTypeService.destroy(id));

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
        const calculationsTypePayload = req.body as CalculationsTypePayload;

        const response = (await calculationsTypeService.update(id,calculationsTypePayload));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.calculationsType.edit
        })

    } catch (error) {
        next(error);
    }
}