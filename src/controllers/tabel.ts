import { Request, Response, NextFunction } from 'express';
import * as tabelService from '../services/tabelService';
import * as HttpStatus from 'http-status-codes';
import config from '../config/config';
import TabelPayload from '../domain/requests/TabelPayload';
import PaginetPayload from '../domain/requests/PaginetPayload';

const { messages } = config;

export async function index(_: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const params = Object(_.params) as PaginetPayload;

        const response = await tabelService.fetchAll(params.limit, params.offset);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.tabel.fetchAll
        })
    } catch (error) {
        next(error);
    }

}

export async function count(_: Request, res: Response, next: NextFunction): Promise<void> {



    try {
        const response = await tabelService.count();

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.tabel.count
        })

    } catch (error) {
        next(error);
    }

}

export async function store(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const tabelPayload = req.body as TabelPayload;

        const tabel = await tabelService.insert(tabelPayload);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: tabel,
            message: messages.tabel.insert
        })

    } catch (error) {
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await tabelService.getById(id);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.tabel.fetch
        })

    } catch (error) {
        next(error);
    }
}


export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = (await tabelService.destroy(id));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.tabel.delete
        })

    } catch (error) {
        next(error);
    }
}


export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);
        const tabelPayload = req.body as TabelPayload;

        const response = (await tabelService.update(id, tabelPayload));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.subdivision.edit
        })

    } catch (error) {
        next(error);
    }
}