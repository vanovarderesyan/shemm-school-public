import Joi from 'joi';

export const partnersPOSTSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        hvhh: Joi.string()
            .min(4)
            .max(100)
            .label('hvhh')
            .required(),
        name: Joi.string()
            .min(4)
            .max(100)
            .label('Name')
            .required(),
        fullName: Joi.string()
            .min(4)
            .max(100)
            .label('fullName')
            .required(),
        groupId: Joi.number()
            .min(1)
            .label('groupId')
            .required(),
        headPositionId: Joi.number()
            .min(1)
            .label('headPositionId')
            .required(),
        accountantPositionId: Joi.number()
            .min(1)
            .label('accountantPositionId')
            .required(),
        AAHpayer: Joi.boolean()
            .label('AAHpayer')
            .required(),
        legalAddress: Joi.string()
            .label('legalAddress')
            .required(),
        practicalAddress: Joi.string()
            .min(4)
            .max(100)
            .label('practicalAddress')
            .required(),
        headAAH: Joi.string()
            .min(4)
            .max(100)
            .label('headAAH')
            .required(),
        accountantAAH: Joi.string()
            .min(4)
            .max(100)
            .label('accountantAAH')
            .required(),
        certificateNumber: Joi.string()
            .min(1)
            .max(100)
            .label('certificateNumber')
            .required(),
        passportNumber: Joi.string()
            .min(1)
            .max(100)
            .label('passportNumber')
            .required(),
        mainPurposeOfPayment: Joi.string()
            .min(1)
            .max(100)
            .label('certificateNumber')
            .required(),
        phone: Joi.string()
            .min(1)
            .max(100)
            .label('certificateNumber')
            .required(),
        contract: Joi.string()
            .min(1)
            .max(100)
            .label('certificateNumber')
            .required(),
        dateContract: Joi.date()
            .label('dateContract')
            .required(),
        percentageOfSalesDiscount: Joi.string()
            .min(1)
            .max(100)
            .label('percentageOfSalesDiscount')
            .required(),
        anotherAdditionalInformation: Joi.string()
            .min(1)
            .max(100)
            .label('anotherAdditionalInformation')
            .required(),
        anotherDeliveryTime: Joi.string()
            .min(1)
            .max(100)
            .label('anotherDeliveryTime')
            .required(),
        anotherFullname: Joi.string()
            .min(1)
            .max(100)
            .label('anotherFullname')
            .required(),
        anotherCredentialsNumber: Joi.string()
            .min(1)
            .max(100)
            .label('anotherCredentialsNumber')
            .required(),

        anotherCredentialsDate: Joi.string()
            .min(1)
            .max(100)
            .label('anotherCredentialsDate')
            .required(),
        email: Joi.string()
            .min(10)
            .max(100)
            .label('Email')
            .required(),
        additionalAddressePartners: Joi.array().items(Joi.object({
            name: Joi.string().min(1),
            isDeleted : Joi.boolean(),
            id : Joi.number().min(1)
        })).required(),

        billingAccounts: Joi.array().items(Joi.object({
            id : Joi.number().min(1),
            isDeleted : Joi.boolean(),
            name: Joi.string().min(1),
            isMain: Joi.boolean(),
            account: Joi.string(),
        })).required()
    });