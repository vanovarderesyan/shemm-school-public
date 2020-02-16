/**
 *  MaterialValuePayload Interface.
 */
interface MaterialValuePayload {
/**
 * MaterialValueDetail Interface.
 */

    name : string;
    measurementUnitId: number;
    classificationId : number;
    accountId :number;
    wholesalePrice : number;
    retailerPrice : number;
    currencyId : number;
    wholesalePriceCurrency : number;
    characteristic : number;
    barCode : number;
    externalCode : number;
    hcbCoefficient : number;
    billingMethodId : number;
    isAah : boolean;
    salesRevenueAccountId : number;
    retailRevenueAccountId : number;
    salesExpenseAccountId : number;
    materialValueGroupId : number;
}
  
export default MaterialValuePayload;
  