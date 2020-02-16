import { Request, Response, NextFunction } from 'express';
import * as typeOfVacationService from '../services/typeOfVacationService';
import * as HttpStatus from 'http-status-codes';
import config from '../config/config';
import TypeOfVacationPayload  from '../domain/requests/TypeOfVacationPayload';
import PaginetPayload  from '../domain/requests/PaginetPayload';

const { messages } = config;

export async function index(_: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const params = Object(_.params) as PaginetPayload;

        const response = await typeOfVacationService.fetchAll(params.limit,params.offset);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.typeOfVacation.fetchAll
        })
    } catch (error) {
        next(error);
    }

}

export async function count(_:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const response = await typeOfVacationService.count();
        
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
        const typeOfVacationPayload = req.body as TypeOfVacationPayload;

        const typeOfVacation = await typeOfVacationService.insert(typeOfVacationPayload);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: typeOfVacation,
            message: messages.typeOfVacation.insert
        })

    } catch (error) {
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await typeOfVacationService.getById(id);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.typeOfVacation.fetch
        })

    } catch (error) {
        next(error);
    }
}


export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = (await typeOfVacationService.destroy(id));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.typeOfVacation.delete
        })

    } catch (error) {
        next(error);
    }
}


export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);
        const typeOfVacationPayload = req.body as TypeOfVacationPayload;

        const response = (await typeOfVacationService.update(id,typeOfVacationPayload));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.subdivision.edit
        })

    } catch (error) {
        next(error);
    }
}