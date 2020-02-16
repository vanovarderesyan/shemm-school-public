import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import * as warehosueService from '../services/warehouseService';
import config from '../config/config'; 
import  WarehosuePayload  from '../domain/requests/WarehousePayload';
import PaginetPayload  from '../domain/requests/PaginetPayload';


const { messages } = config;

export async function index(req:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const params = Object(req.params) as PaginetPayload;

        const response = await warehosueService.fetchAll(params.limit,params.offset);
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.warehouse.fetchAll
        })

    } catch (error) {
        next(error);
    }

}

export async function count(_:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const response = await warehosueService.count();
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.warehouse.count
        })

    } catch (error) {
        next(error);
    }

}

export async function store(req:Request,res:Response,next:NextFunction):Promise<void>{
    
    try {
        const warehosuePayload = req.body as WarehosuePayload;
        
        const response = await warehosueService.insert(warehosuePayload);

        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.warehouse.insert
        })

    } catch (error) {
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await warehosueService.getById(id);

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

        const response = (await warehosueService.destroy(id));

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
        const warehosuePayload = req.body as WarehosuePayload;

        const response = (await warehosueService.update(id,warehosuePayload));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.warehouse.edit
        })

    } catch (error) {
        next(error);
    }
}