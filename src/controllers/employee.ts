import { Request, Response, NextFunction } from 'express';
import * as employeeService from '../services/employeeService';
import * as HttpStatus from 'http-status-codes';
import config from '../config/config';
import EmployeePayload  from '../domain/requests/EmployeePayload';
import PaginetPayload from '../domain/requests/PaginetPayload';

const { messages } = config;

export async function index(_: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const params = Object(_.params) as PaginetPayload;
        const response = await employeeService.fetchAll(params.limit, params.offset);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.employee.fetchAll
        })
    } catch (error) {
        next(error);
    }

}

export async function count(_:Request,res:Response,next:NextFunction):Promise<void>{

    

    try {
        const response = await employeeService.count();
        
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
        const employeePayload = req.body as EmployeePayload;

        const employee = await employeeService.insert(employeePayload);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: employee,
            message: messages.employee.insert
        })

    } catch (error) {
        next(error);
    }
}

export async function getOne(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = await employeeService.getById(id);

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.employee.fetch
        })

    } catch (error) {
        next(error);
    }
}


export async function destroy(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);

        const response = (await employeeService.destroy(id));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.employee.delete
        })

    } catch (error) {
        next(error);
    }
}


export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {

    try {
        const id: number = Number(req.params.id);
        const employeePayload = req.body as EmployeePayload;

        const response = (await employeeService.update(id,employeePayload));

        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: response,
            message: messages.subdivision.edit
        })

    } catch (error) {
        next(error);
    }
}