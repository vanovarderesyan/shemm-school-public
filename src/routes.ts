import { Router } from 'express';

import * as validate from './middlewares/validate';
import * as homeController from './controllers/home';
import * as userController from './controllers/user';
import * as authController from './controllers/auth';
import { authenticate, authenticateAdmin } from './middlewares/authenticate';
import { loginSchema } from './validators/loginRequest';
import { userPOSTSchema } from './validators/userRequest';
import { userDataPUTSchema } from './validators/userDataRequest';
import { resetPOSTSchema } from './validators/resetRequest';
import { checkTokenPOSTSchema } from './validators/checkTokenRequest';
import { resetPasswordPOSTSchema } from './validators/resetPasswordRequest';
import { paramValidationSchema } from './validators/paramRequest';
import { paginatSchema } from './validators/paginatRequest';




import validateRefreshToken from './middlewares/validateRefreshToken';

//bank
import * as bankController from './controllers/bank';
//bank post validation
import { bankPOSTSchema } from './validators/bankRequest';

//bank branche
import * as bankBrancheController from './controllers/bankBranche';
//bank branche validation
import { bankBranchePOSTSchema } from './validators/bankBrancheRequest';

//billing method
import * as billingMethodController from './controllers/billingMethod';
//billing method post validation
import { billingMethodPOSTSchema } from './validators/billingMethodRequest';

//classification
import * as classificationController from './controllers/classification';
//classification post validation
import { classificationPOSTSchema } from './validators/classificationRequest';

//materialValueGroup
import * as materialValueGroupController from './controllers/materialValueGroup';
//materialValueGroup post validation
import { materialValueGroupPOSTSchema } from './validators/materialValueGroupRequest';

//material value
import * as materialValueController from './controllers/materialValue';
//material value post validation 
import { materialValuePOSTSchema } from './validators/materialValueRequest';

//warehouse
import * as warehosueController from './controllers/warehosue';
//warehouse post validation
import { warehousePOSTSchema } from './validators/warehouseRequest';

//service type
import * as serviceTypeController from './controllers/serviceType';
//service type post validation
import { seviceTypePOSTSchema } from './validators/serviceTypeRequest';

//service name
import * as serviceNameController from './controllers/serviceName';
//service name post validation
import { seviceNamePOSTSchema } from './validators/serviceNameRequest';

//billing-account
import * as billingAccountController from './controllers/billingAccount';
import { billingAccountPOSTSchema } from './validators/billingAccountRequest';

//subdivision
import * as subdivisionController from './controllers/subdivision';
import { subdivisionPOSTSchema } from './validators/subdivisionRequest';

//measurement-unit
import * as measurementUnitController from './controllers/measurementUnit';
import { measurementUnitPOSTSchema } from './validators/measurementUnitRequest';

//co workers
import * as coWorkersController from './controllers/coWorkers';
import { coWorkersPOSTSchema } from './validators/coWorkersRequest';

//position
import * as positionController from './controllers/position';
import { positionPOSTSchema } from './validators/positionRequest';
/**********/
//profession
import * as professionController from './controllers/profession';
import { professionPOSTSchema } from './validators/professionRequest';
//expenseAccount
import * as expenseAccountController from './controllers/expenseAccount';
import { expenseAccountPOSTSchema } from './validators/expenseAccountRequest';
//type Of Income
import * as typeOfIncomeController from './controllers/typeOfIncome';
import { typeOfIncomePOSTSchema } from './validators/typeOfIncomeRequest';

//TypeOfVacation
import * as typeOfVacationController from './controllers/typeOfVacation';
import { typeOfVacationPOSTSchema } from './validators/typeOfVacationRequest';

//Addition
import * as additionController from './controllers/addition';
import { additionPOSTSchema } from './validators/additionRequest';

//tabel
import * as tabelController from './controllers/tabel';
import { tabelPOSTSchema } from './validators/tabelRequest';

//Employee
import * as employeeController from './controllers/employee';
import { employeePOSTSchema } from './validators/employeeRequest';


//Contract
import * as contractController from './controllers/contract';
import { contractPOSTSchema } from './validators/contractRequest';

//group
import * as groupController from './controllers/group';
import { groupPOSTSchema } from './validators/groupRequest';

//headPosition
import * as headPositionController from './controllers/headPosition';
import { headPositionPOSTSchema } from './validators/headPositionRequest';

//group
import * as accountantPositionController from './controllers/accountantPosition';
import { accountantPositionPOSTSchema } from './validators/accountantPositionRequest';

//group
import * as partnersController from './controllers/partners';
import { partnersPOSTSchema } from './validators/partnersRequest';

//Currency
import * as currencyController from './controllers/currency';
import { currencyPOSTSchema } from './validators/currencyRequest';

//CalculationsType
import * as calculationsTypeController from './controllers/calculationsType';
import { calculationsTypePositionPOSTSchema } from './validators/calculationsTypeRequest';

//AccountOfEmplCalculations
import * as accountOfEmplCalculationsController from './controllers/accountOfEmplCalculations';
import { accountOfEmplCalculationsPOSTSchema } from './validators/accountOfEmplCalculationsRequest';

// AnaliticGroup1
import * as analiticGroup1Controller from './controllers/analiticGroup1';
import { analiticGroup1POSTSchema } from './validators/AnaliticGroup1Request';


// AnaliticGroup2
import * as analiticGroup2Controller from './controllers/analiticGroup2';
import { analiticGroup2POSTSchema } from './validators/AnaliticGroup2Request';

// AnaliticGroup2
import * as subsectionController from './controllers/subsection';
import { subsectionPOSTSchema } from './validators/subsectionRequest';

// AnaliticGroup2
import * as typesOfActionsController from './controllers/typesOfActions';
import { typeOfActionsPOSTSchema } from './validators/typesOfActionsRequest';


const router: Router = Router();

router.get('/', homeController.index);

router.post('/login', validate.schema(loginSchema), authController.login);
router.post('/refresh', validateRefreshToken, authController.refresh);
router.post('/logout', validateRefreshToken, authController.logout);

router.get('/users', authenticate, userController.index);
router.get('/users/me', authenticate, userController.me);
router.put('/users/me', validate.schema(userDataPUTSchema), authenticate, userController.update);
router.post('/users/reset', validate.schema(resetPOSTSchema), userController.resetPassword);
router.post('/users/check/reset/token', validate.schema(checkTokenPOSTSchema), userController.checkToken);
router.post('/users/reset/password', validate.schema(resetPasswordPOSTSchema), userController.checkTokenLong, userController.newPassword);

router.post('/users', authenticateAdmin, validate.schema(userPOSTSchema), userController.store);
router.post('/users/admin', validate.schema(userPOSTSchema), userController.storeAdmin);

//bank
// router.use(authenticate);
router.get('/banks', bankController.index);
router.post('/banks', validate.schema(bankPOSTSchema), bankController.store);
//bank branche
router.get('/banks-branche', bankBrancheController.index);
router.post('/banks-branche', validate.schema(bankBranchePOSTSchema), bankBrancheController.store);

//billing method
router.get('/billing-methods/:limit/:offset',validate.params(paginatSchema),billingMethodController.index)
router.get('/billing-methods', billingMethodController.index);
router.post('/billing-method', validate.schema(billingMethodPOSTSchema), billingMethodController.store);
router.route('/billing-method/:id')
    .get(validate.params(paramValidationSchema), billingMethodController.getOne)
    .delete(validate.params(paramValidationSchema), billingMethodController.destroy)
    .put(validate.params(paramValidationSchema), billingMethodController.update)


//analiticGroup1
router.get('/analitic-groups-one/:limit/:offset',validate.params(paginatSchema),analiticGroup1Controller.index)
router.get('/analitic-groups-one', analiticGroup1Controller.count);
router.post('/analitic-group-one', validate.schema(analiticGroup1POSTSchema), analiticGroup1Controller.store);
router.route('/analitic-group-one/:id')
    .get(validate.params(paramValidationSchema), analiticGroup1Controller.getOne)
    .delete(validate.params(paramValidationSchema), analiticGroup1Controller.destroy)
    .put(validate.params(paramValidationSchema),validate.schema(analiticGroup1POSTSchema), analiticGroup1Controller.update)


//analiticGroup2
router.get('/analitic-groups-two/:limit/:offset',validate.params(paginatSchema),analiticGroup2Controller.index)
router.get('/analitic-groups-two', analiticGroup2Controller.count);
router.post('/analitic-group-two', validate.schema(analiticGroup2POSTSchema), analiticGroup2Controller.store);
router.route('/analitic-group-two/:id')
    .get(validate.params(paramValidationSchema), analiticGroup2Controller.getOne)
    .delete(validate.params(paramValidationSchema), analiticGroup2Controller.destroy)
    .put(validate.params(paramValidationSchema),validate.schema(analiticGroup2POSTSchema), analiticGroup2Controller.update)

//classification
router.get('/classifications/:limit/:offset',validate.params(paginatSchema),classificationController.index)
router.get('/classifications', classificationController.count);
router.post('/classification', validate.schema(classificationPOSTSchema), classificationController.store);
router.route('/classification/:id')
    .get(validate.params(paramValidationSchema), classificationController.getOne)
    .delete(validate.params(paramValidationSchema), classificationController.destroy)
    .put(validate.params(paramValidationSchema),validate.schema(classificationPOSTSchema), classificationController.update)

//materialValueGroup
router.get('/material-value-groups/:limit/:offset',validate.params(paginatSchema),materialValueGroupController.index)
router.get('/material-value-groups', materialValueGroupController.count);
router.post('/material-value-group', validate.schema(materialValueGroupPOSTSchema), materialValueGroupController.store);
router.route('/material-value-group/:id')
    .get(validate.params(paramValidationSchema), materialValueGroupController.getOne)
    .delete(validate.params(paramValidationSchema), materialValueGroupController.destroy)
    .put(validate.params(paramValidationSchema),validate.schema(materialValueGroupPOSTSchema), materialValueGroupController.update)

//material value
router.get('/material-values/:limit/:offset',validate.params(paginatSchema),materialValueController.index)
router.get('/material-values', materialValueController.index);
router.post('/material-value', validate.schema(materialValuePOSTSchema), materialValueController.store);
router.route('/material-value/:id')
    .get(validate.params(paramValidationSchema), materialValueController.getOne)
    .delete(validate.params(paramValidationSchema), materialValueController.destroy)
    .put(validate.params(paramValidationSchema),validate.schema(materialValuePOSTSchema), materialValueController.update)


//warehouse
router.get('/warehouses/:limit/:offset',validate.params(paginatSchema),warehosueController.index)
router.get('/warehouses', warehosueController.count);
router.post('/warehouse', validate.schema(warehousePOSTSchema), warehosueController.store);
router.route('/warehouse/:id')
    .get(validate.params(paramValidationSchema), warehosueController.getOne)
    .delete(validate.params(paramValidationSchema), warehosueController.destroy)
    .put(validate.params(paramValidationSchema),validate.schema(warehousePOSTSchema), warehosueController.update)

//service type
router.get('/service-type', serviceTypeController.index);
router.post('/service-type', validate.schema(seviceTypePOSTSchema), serviceTypeController.store);

//service type
router.get('/service-name', serviceNameController.index);
router.post('/service-name', validate.schema(seviceNamePOSTSchema), serviceNameController.store);

//billing account
router.get('/billing-accounts/:limit/:offset',validate.params(paginatSchema),billingAccountController.index)
router.get("/billing-accounts",billingAccountController.count);
router.post("/billing-account",validate.schema(billingAccountPOSTSchema), billingAccountController.store);
router.route('/billing-account/:id')
    .get(validate.params(paramValidationSchema), billingAccountController.getOne)
    .delete(validate.params(paramValidationSchema), billingAccountController.destroy)
    .put(validate.params(paramValidationSchema), billingAccountController.update)


//type-of-actions
router.get('/type-of-actions/:limit/:offset',validate.params(paginatSchema),typesOfActionsController.index)
router.get("/type-of-actions",typesOfActionsController.count);
router.post("/type-of-action",validate.schema(typeOfActionsPOSTSchema), typesOfActionsController.store);
router.route('/type-of-action/:id')
    .get(validate.params(paramValidationSchema), typesOfActionsController.getOne)
    .delete(validate.params(paramValidationSchema), typesOfActionsController.destroy)
    .put(validate.params(paramValidationSchema), validate.schema(typeOfActionsPOSTSchema),typesOfActionsController.update)


//subdivision
router.get('/subdivisions/:limit/:offset',validate.params(paginatSchema),subdivisionController.index)
router.get("/subdivisions",subdivisionController.count);
router.post("/subdivision",validate.schema(subdivisionPOSTSchema), subdivisionController.store);
router.route('/subdivision/:id')
    .get(validate.params(paramValidationSchema), subdivisionController.getOne)
    .delete(validate.params(paramValidationSchema), subdivisionController.destroy)
    .put(validate.params(paramValidationSchema), subdivisionController.update)

//Subsection
router.get('/subsections/:limit/:offset',validate.params(paginatSchema),subsectionController.index)
router.get("/subsections",subsectionController.count);
router.post("/subsection",validate.schema(subsectionPOSTSchema), subsectionController.store);
router.route('/subsection/:id')
    .get(validate.params(paramValidationSchema), subsectionController.getOne)
    .delete(validate.params(paramValidationSchema), subsectionController.destroy)
    .put(validate.params(paramValidationSchema),validate.schema(subsectionPOSTSchema), subsectionController.update)

//measurement unit
router.get('/measurement-units/:limit/:offset',validate.params(paginatSchema),measurementUnitController.index)
router.get("/measurement-units",measurementUnitController.count);
router.post('/measurement-unit',validate.schema(measurementUnitPOSTSchema), measurementUnitController.store);
router.route('/measurement-unit/:id')
    .get(validate.params(paramValidationSchema), measurementUnitController.getOne)
    .delete(validate.params(paramValidationSchema), measurementUnitController.destroy)
    .put(validate.params(paramValidationSchema), validate.schema(measurementUnitPOSTSchema),measurementUnitController.update)

//co workers
router.route('/co-workers')
    .get(coWorkersController.index)
    .post(validate.schema(coWorkersPOSTSchema), coWorkersController.store);

//position
router.get('/positions/:limit/:offset',validate.params(paginatSchema), positionController.index)
router.get("/positions",positionController.count);
router.post('/position',validate.schema(positionPOSTSchema), positionController.store);
router.route('/position/:id')
    .get(validate.params(paramValidationSchema), positionController.getOne)
    .delete(validate.params(paramValidationSchema), positionController.destroy);

//profession
router.get('/professions/:limit/:offset',validate.params(paginatSchema),professionController.index)
router.get("/professions",professionController.count);
router.post('/profession',validate.schema(professionPOSTSchema), professionController.store);
router.route('/profession/:id')
    .get(validate.params(paramValidationSchema), professionController.getOne)
    .delete(validate.params(paramValidationSchema), professionController.destroy)
    .put(validate.params(paramValidationSchema), validate.schema(professionPOSTSchema),professionController.update)

//expenseAccount
router.get('/expense-accounts/:limit/:offset',validate.params(paginatSchema),expenseAccountController.index)
router.get("/expense-accounts",expenseAccountController.count);
router.post('/expense-account',validate.schema(expenseAccountPOSTSchema), expenseAccountController.store);
router.route('/expense-account/:id')
    .get(validate.params(paramValidationSchema), expenseAccountController.getOne)
    .delete(validate.params(paramValidationSchema), expenseAccountController.destroy)
    .put(validate.params(paramValidationSchema), validate.schema(expenseAccountPOSTSchema),expenseAccountController.update)

//type of income
router.get('/type-of-incomes/:limit/:offset',validate.params(paginatSchema),typeOfIncomeController.index)
router.get("/type-of-incomes",typeOfIncomeController.count);
router.post('/type-of-income',validate.schema(typeOfIncomePOSTSchema), typeOfIncomeController.store);
router.route('/type-of-income/:id')
    .get(validate.params(paramValidationSchema), typeOfIncomeController.getOne)
    .delete(validate.params(paramValidationSchema), typeOfIncomeController.destroy)
    .put(validate.params(paramValidationSchema), validate.schema(typeOfIncomePOSTSchema),typeOfIncomeController.update)

//type of vacation
router.get('/type-of-vacations/:limit/:offset',validate.params(paginatSchema),typeOfVacationController.index)
router.get("/type-of-vacations",typeOfVacationController.count);
router.post('/type-of-vacation',validate.schema(typeOfIncomePOSTSchema), typeOfVacationController.store);
router.route('/type-of-vacation/:id')
    .get(validate.params(paramValidationSchema), typeOfVacationController.getOne)
    .delete(validate.params(paramValidationSchema), typeOfVacationController.destroy)
    .put(validate.params(paramValidationSchema), validate.schema(typeOfVacationPOSTSchema),typeOfVacationController.update)

//Addition
router.get('/additions/:limit/:offset',validate.params(paginatSchema),additionController.index)
router.get("/additions",additionController.count);
router.post('/addition',validate.schema(additionPOSTSchema), additionController.store);
router.route('/addition/:id')
    .get(validate.params(paramValidationSchema), additionController.getOne)
    .delete(validate.params(paramValidationSchema), additionController.destroy)
    .put(validate.params(paramValidationSchema), validate.schema(additionPOSTSchema),additionController.update)

//tabel
router.get('/tabels/:limit/:offset',validate.params(paginatSchema),tabelController.index)
router.get('/tabels',tabelController.count)
router.post('/tabel',validate.schema(tabelPOSTSchema), tabelController.store);
router.route('/tabel/:id')
    .get(validate.params(paramValidationSchema), tabelController.getOne)
    .delete(validate.params(paramValidationSchema), tabelController.destroy)
    .put(validate.params(paramValidationSchema), validate.schema(tabelPOSTSchema),tabelController.update)


//employees
router.get('/employees/:limit/:offset',validate.params(paginatSchema),employeeController.index)
router.get("/employees",employeeController.count);
router.post('/employee',validate.schema(employeePOSTSchema), employeeController.store);
router.route('/employee/:id')
    .get(validate.params(paramValidationSchema), employeeController.getOne)
    .delete(validate.params(paramValidationSchema), employeeController.destroy)
    .put(validate.params(paramValidationSchema), validate.schema(employeePOSTSchema),employeeController.update)

//contracts
router.get('/contracts/:limit/:offset',validate.params(paginatSchema),contractController.index)
router.get("/contracts",contractController.count);
router.post('/contract',validate.schema(contractPOSTSchema), contractController.store);
router.route('/contract/:id')
    .get(validate.params(paramValidationSchema), contractController.getOne)
    .delete(validate.params(paramValidationSchema), contractController.destroy)
    .put(validate.params(paramValidationSchema), validate.schema(contractPOSTSchema),contractController.update)

//group
router.get('/groups/:limit/:offset',validate.params(paginatSchema),groupController.index)
router.get("/groups",groupController.count);
router.post('/group',validate.schema(groupPOSTSchema), groupController.store);
router.route('/group/:id')
    .get(validate.params(paramValidationSchema), groupController.getOne)
    .delete(validate.params(paramValidationSchema), groupController.destroy)
    .put(validate.params(paramValidationSchema), validate.schema(groupPOSTSchema),groupController.update)

//HeadPosition
router.get('/head-positions/:limit/:offset',validate.params(paginatSchema),headPositionController.index)
router.get("/head-positions",headPositionController.count);
router.post('/head-position',validate.schema(headPositionPOSTSchema), headPositionController.store);
router.route('/head-positions/:id')
    .get(validate.params(paramValidationSchema), headPositionController.getOne)
    .delete(validate.params(paramValidationSchema), headPositionController.destroy)
    .put(validate.params(paramValidationSchema), validate.schema(headPositionPOSTSchema),headPositionController.update)

//accountantPosition
router.get('/account-positions/:limit/:offset',validate.params(paginatSchema),accountantPositionController.index)
router.get("/account-positions",accountantPositionController.count);
router.post('/account-position',validate.schema(accountantPositionPOSTSchema), accountantPositionController.store);
router.route('/accountad-positions/:id')
    .get(validate.params(paramValidationSchema), accountantPositionController.getOne)
    .delete(validate.params(paramValidationSchema), accountantPositionController.destroy)
    .put(validate.params(paramValidationSchema), validate.schema(accountantPositionPOSTSchema),accountantPositionController.update)

//partners
router.get('/partners/:limit/:offset',validate.params(paginatSchema),partnersController.index)
router.get("/partners",partnersController.count);
router.post('/partner',validate.schema(partnersPOSTSchema), partnersController.store);
router.route('/partner/:id')
    .get(validate.params(paramValidationSchema), partnersController.getOne)
    .delete(validate.params(paramValidationSchema), partnersController.destroy)
    .put(validate.params(paramValidationSchema), validate.schema(partnersPOSTSchema),partnersController.update)


//currency
router.get('/currencies/:limit/:offset',validate.params(paginatSchema),currencyController.index)
router.get("/currencies",currencyController.count);
router.post('/currency',validate.schema(currencyPOSTSchema), currencyController.store);
router.route('/currency/:id')
    .get(validate.params(paramValidationSchema), currencyController.getOne)
    .delete(validate.params(paramValidationSchema), currencyController.destroy)
    .put(validate.params(paramValidationSchema), validate.schema(currencyPOSTSchema),currencyController.update)

//CalculationsType
router.get('/calculations-types/:limit/:offset',validate.params(paginatSchema),calculationsTypeController.index)
router.get("/calculations-types/",calculationsTypeController.count);
router.post('/calculations-type',validate.schema(calculationsTypePositionPOSTSchema), calculationsTypeController.store);
router.route('/calculations-type/:id')
    .get(validate.params(paramValidationSchema), calculationsTypeController.getOne)
    .delete(validate.params(paramValidationSchema), calculationsTypeController.destroy)
    .put(validate.params(paramValidationSchema), validate.schema(calculationsTypePositionPOSTSchema),calculationsTypeController.update)

//CalculationsType
router.get('/account-plans/:limit/:offset',validate.params(paginatSchema),accountOfEmplCalculationsController.index)
router.get("/account-plans/",accountOfEmplCalculationsController.count);
router.post('/account-plan',validate.schema(accountOfEmplCalculationsPOSTSchema), accountOfEmplCalculationsController.store);
router.route('/account-plan/:id')
    .get(validate.params(paramValidationSchema), accountOfEmplCalculationsController.getOne)
    .delete(validate.params(paramValidationSchema), accountOfEmplCalculationsController.destroy)
    .put(validate.params(paramValidationSchema), validate.schema(accountOfEmplCalculationsPOSTSchema),accountOfEmplCalculationsController.update)

export default router;
