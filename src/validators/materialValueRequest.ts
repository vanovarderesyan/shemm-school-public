import Joi from 'joi';

export const materialValuePOSTSchema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    name: Joi.string()
      .max(100)
      .label('name')
      .required(),
    measurementUnitId: Joi.number()
      .label('measurementUnitId')
      .required(),
    classificationId: Joi.number()
      .label('classificationId')
      .required(),
    accountId: Joi.number()
      .label('accountId')
      .required(),
    wholesalePrice: Joi.number()
      .label('wholesalePrice')
      .required(),
    retailerPrice: Joi.number()
      .label('retailerPrice')
      .required(),
    currencyId: Joi.number()
      .label('currencyId')
      .required(),

    wholesalePriceCurrency: Joi.number()
      .label('wholesalePriceCurrency')
      .required(),
    characteristic: Joi.string()
      .label('characteristic')
      .required(),
    barCode: Joi.number()
      .label('barCode')
      .required(),
    externalCode: Joi.number()
      .label('externalCode')
      .required(),
    hcbCoefficient: Joi.number()
      .label('hcbCoefficient')
      .required(),
    billingMethodId: Joi.number()
      .label('billingMethodId')
      .required(),
    isAah: Joi.boolean()
      .label('isAah')
      .required(),
    salesRevenueAccountId: Joi.number()
      .label('salesRevenueAccountId')
      .required(),
    retailRevenueAccountId: Joi.number()
      .label('retailRevenueAccountId')
      .required(),
    salesExpenseAccountId: Joi.number()
      .label('salesExpenseAccountId')
      .required(),
    materialValueGroupId: Joi.number()
      .label('materialValueGroupId')
      .required(),
  });
