import * as materialValueGroupService from '../services/materialValueGroupService';
import { Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import config from '../config/config';
import MaterialValueGroupPayload  from '../domain/requests/MaterialValueGroupPayload';
import PaginetPayload  from '../domain/requests/PaginetPayload';

const { messages } = config;

export async function index(_: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const params = Object(_.params) as PaginetPayload;

        const response = await materialValueGroupService.fetchAll(params.limit,params.offset);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.materialValueGroup.fetchAll
        })
    } catch (error) {
        next(error);
    }

}

export async function count(_:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const response = await materialValueGroupService.count();
        
        res.status(HttpStatus.OK).json({
            code:HttpStatus.OK,
            data:response,
            message:messages.materialValueGroup.count
        })

    } catch (error) {
        next(error);
    }

}


export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const materialValueGroupPayload = req.body as MaterialValueGroupPayload;

        const response = await materialValueGroupService.insert(materialValueGroupPayload);

        console.log(response)
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.materialValueGroup.insert
        })
    } catch (error) {
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await materialValueGroupService.getById(id);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.materialValueGroup.fetch
        })

    } catch (error) {
        next(error);
    }
}


export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = (await materialValueGroupService.destroy(id));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.materialValueGroup.delete
        })

    } catch (error) {
        next(error);
    }
}


export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);
        const materialValueGroupPayload = req.body as MaterialValueGroupPayload;

        const response = (await materialValueGroupService.update(id,materialValueGroupPayload));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.materialValueGroup.edit
        })

    } catch (error) {
        next(error);
    }
}