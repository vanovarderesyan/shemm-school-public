import { Request, Response, NextFunction } from 'express';
import * as typeOfActionsService from '../services/typesOfActionsService';
import * as HttpStatus from 'http-status-codes';
import config from '../config/config';
import TypeOfActionsPayload  from '../domain/requests/TypesOfActionsPayload';
import PaginetPayload  from '../domain/requests/PaginetPayload';

const { messages } = config;

export async function index(_: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const params = Object(_.params) as PaginetPayload;

        const response = await typeOfActionsService.fetchAll(params.limit,params.offset);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.typesOfActions.fetchAll
        })
    } catch (error) {
        next(error);
    }

}

export async function count(_:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const response = await typeOfActionsService.count();
        
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
        const typeOfActionsPayload = req.body as TypeOfActionsPayload;

        const typeOfActions = await typeOfActionsService.insert(typeOfActionsPayload);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: typeOfActions,
            message: messages.typesOfActions.insert
        })

    } catch (error) {
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await typeOfActionsService.getById(id);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.typesOfActions.fetch
        })

    } catch (error) {
        next(error);
    }
}


export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = (await typeOfActionsService.destroy(id));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.typesOfActions.delete
        })

    } catch (error) {
        next(error);
    }
}


export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);
        const typeOfActionsPayload = req.body as TypeOfActionsPayload;

        const response = (await typeOfActionsService.update(id,typeOfActionsPayload));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.typesOfActions.edit
        })

    } catch (error) {
        next(error);
    }
}