import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import * as subsectionService from '../services/subsectionService';
import config from '../config/config'; 
import { SubsectionPayload } from '../domain/requests/SubsectionPayload';
import PaginetPayload  from '../domain/requests/PaginetPayload';


const { messages } = config;

export async function index(req:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const params = Object(req.params) as PaginetPayload;

        const response = await subsectionService.fetchAll(params.limit,params.offset);
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.subsection.fetchAll
        })

    } catch (error) {
        next(error);
    }

}

export async function count(_:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const response = await subsectionService.count();
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.subsection.count
        })

    } catch (error) {
        next(error);
    }

}

export async function store(req:Request,res:Response,next:NextFunction):Promise<void>{
    
    try {
        const subsectionPayload = req.body as SubsectionPayload;
        
        const response = await subsectionService.insert(subsectionPayload);

        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.subsection.insert
        })

    } catch (error) {
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await subsectionService.getById(id);

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

        const response = (await subsectionService.destroy(id));

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
        const subsectionPayload = req.body as SubsectionPayload;

        const response = (await subsectionService.update(id,subsectionPayload));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.subsection.edit
        })

    } catch (error) {
        next(error);
    }
}