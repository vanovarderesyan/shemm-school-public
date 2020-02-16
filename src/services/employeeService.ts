import EmployeeDetail from '../domain/entities/EmployeeDetail';
import Employee from '../models/Employee';
import EmployeeGeneral from '../models/EmployeeGeneral';
import Address from '../models/Address';
import OtherInformation from '../models/OtherInformation';
import EmployeeAddition from '../models/EmployeeAddition';
import EmployeeAccounts from '../models/EmployeeAccounts';
import EmployeePosition from '../models/EmployeePosition';



import transform from '../utils/transform';
import EmployeePayload from '../domain/requests/EmployeePayload';
import NotFoundError from '../exceptions/NotFoundError';
import config from '../config/config';
import * as object from '../utils/object';

const { errors } = config;

export async function fetchAll(limit:number,offset:number): Promise<EmployeeDetail[]> {
    const _employees = await Employee.fetchAll()
    const employees = await (_employees).query((qb)=>{
        qb.limit(limit),
        qb.offset(offset)
    }).fetch({ withRelated: ['general','addressies','otherInformation','employeePosition.positon','employeeAccounts','employeeAddition']  });


    console.log(employees.serialize(),'**********')
    const res = transform(employees.serialize(), (employee: EmployeeDetail) => ({
        id: employee.id,
        firstName: employee.firstName,
        fullName :employee.fullName,
        lastName : employee.lastName,
        tabelCounter:employee.tabelCounter,
        subdivisionId : employee.subdivisionId,
        addressies : employee.addressies,
        general : employee.general,
        otherInformation : employee.otherInformation,
        employeeAccounts : employee.employeeAccounts,
        employeeAddition :employee.employeeAddition,
        employeePosition : employee.employeePosition

    }))

    return res;
}

export async function count(): Promise<object> {
    const count = await (await Employee.fetchAll()).count();
    return {count}
}


export async function insert(params: EmployeePayload): Promise<EmployeeDetail> {

    console.log(params,'***********')
    const employee = (await new Employee({ ...params.selfData }).save()).serialize();
    const employeeId = employee.id;
    params.general.employeeId = employeeId; 
    params.addressies.employeeId = employeeId; 
    params.otherInformation.employeeId = employeeId;
    // params.employeePosition.employeeId = employeeId;
    // params.employeeAccounts.employeeId = employeeId;
    // params.employeeAddition.employeeId = employeeId;


    (await new EmployeeGeneral({ ...params.general }).save()).serialize();
    (await new Address({ ...params.addressies }).save()).serialize();
    (await new OtherInformation({ ...params.otherInformation }).save()).serialize();

    for (const key of params.employeePosition) {
        key.employeeId = employeeId;
        (await new EmployeePosition({ ...key }).save()).serialize();

    }

    for (const key of params.employeeAccounts) {
        key.employeeId = employeeId;
        (await new EmployeeAccounts({ ...key }).save()).serialize();

    }

    for (const key of params.employeeAddition) {
        key.employeeId = employeeId;
        (await new EmployeeAddition({ ...key }).save()).serialize();

    }

    return employee;
}

export async function getById(id: number): Promise<EmployeeDetail> {

    const employee = (await new Employee({ id: id }).fetch({ withRelated: ['general','addressies','otherInformation','employeePosition.positon','employeeAccounts','employeeAddition'] }));

    if (employee) {
        return employee.serialize();
    }
    else {
        throw new NotFoundError(errors.notFound);
    }
}

export async function destroy(id: number): Promise<EmployeeDetail> {

    const res = (await new Employee({ id: id }).destroy()).serialize();

    return res;
}


export async function update(id: number, params: EmployeePayload): Promise<EmployeeDetail> {


    const general = params.general;
    const addressies = params.addressies;
    const otherInformation = params.otherInformation;
    await new EmployeeGeneral().where({employee_id : id}).save({...general},{patch:true});
    await new Address().where({employee_id : id}).save({...addressies},{patch:true});
    await new OtherInformation().where({employee_id : id}).save({...otherInformation},{patch:true});

    const employeePosition = params.employeePosition;
    const employeeAccounts = params.employeeAccounts;
    const employeeAddition = params.employeeAddition;

    for (const iterator of employeePosition) {
        iterator.employeeId = id;
        try {
            console.log(iterator,'*********')
            if (iterator['id'] && iterator.status == 'unChanged') {
                delete iterator.status;
                (await new EmployeePosition().where({ id: iterator['id'] }).save({ ...iterator }, { patch: true })).serialize();
            } else if (iterator['id'] && iterator.status == 'deleted') {
                (await new EmployeePosition({ id: iterator['id'] }).destroy()).serialize();
            } else if (iterator.status == 'new'){
                delete iterator.status;
                (await new EmployeePosition({ ...iterator }).save()).serialize();
            }
        } catch (error) {
            console.log(error,'99999')
        }
    }

    for (const iterator of employeeAccounts) {
        iterator.employeeId = id;

        try {
            if (iterator['id'] && iterator.status == 'unChanged') {
                delete iterator.status;
                console.log('unChanged');
                (await new EmployeeAccounts().where({ id: iterator['id'] }).save({ ...iterator }, { patch: true })).serialize();
            } else if (iterator['id'] && iterator.status == 'deleted') {
                console.log('deleted');

                (await new EmployeeAccounts().where({ id: iterator['id'] }).destroy()).serialize();
            } else  if (iterator.status == 'new'){
                console.log('new');

                delete iterator.status;

                (await new EmployeeAccounts({ ...iterator }).save()).serialize();
            }
        } catch (error) {
            console.log(error,'154+++++++++++')
        }
    }

    for (const iterator of employeeAddition) {
        iterator.employeeId = id;

        try {
            if (iterator['id'] && !iterator['isDeleted']) {
                (await new EmployeeAddition().where({ id: iterator['id'] }).save({ ...iterator }, { patch: true })).serialize();
            } else if (iterator['id'] && iterator['isDeleted']) {
                (await new EmployeeAddition().where({ id: iterator['id'] }).destroy()).serialize();
            } else {
                (await new EmployeeAddition({ ...iterator }).save()).serialize();
            }
        } catch (error) {
            console.log(error,'154-------')
        }
    }

    

    const subdivision = (
        await new Employee().where({ id: id }).save({ ...params.selfData }, { patch: true })
    ).serialize();

    return object.camelize(subdivision);
}
