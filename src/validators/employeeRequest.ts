import Joi  from 'joi';

export const employeePOSTSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({

        selfData: Joi.object().keys({
            fullName: Joi.string()
                .min(4)
                .max(100)
                .label('fullName')
                .required(),
            tabelCounter: Joi.number()
                .min(1)
                .label('tabel_counter')
                .required(),
            firstName: Joi.string()
                .label('firstName')
                .required(),
            lastName: Joi.string()
                .min(6)
                .max(100)
                .label('lastName')
                .required(),
            subdivisionId: Joi.number()
                .min(1)
                .label('subdivisionId')
                .required()
        }),
        general: Joi.object().keys({
            professionId: Joi.number()
                .min(1)
                .label('profession_id')
                .allow(null)
                .required(),
            gender: Joi.string()
                .label('gender')
                .required(),
            birthdate: Joi.string()
                .label('birthdate')
                .required(),
            contractId: Joi.number()
                .min(1)
                .label('contract_id')
                .allow(null)
                .required(),
            accountId: Joi.number()
                .min(1)
                .label('account_id')
                .allow(null)
                .required(),

            dateOfAccept: Joi.string()
                .label('date_of_accept')
                .required(),
            releaseDate: Joi.string()
                .label('release_date')
                .required(),
            acceptedCommand: Joi.string()
                .label('accepted_command')
                .required(),
            releaseCommand: Joi.string()
                .min(1)
                .label('release_command')
                .required()
        }).required(),
        addressies: Joi.object().keys({
            state: Joi.string()
                .label('state').required(),
            community: Joi.string()
                .label('community').required(),
            city: Joi.string()
                .label('city').required(),
            // name: Joi.string()
            //     .label('name').required(),
            street: Joi.string()
                .label('street').required(),
            hhState: Joi.string()
                .label('HHState').required(),
            hhCommunity: Joi.string()
                .label('HHCommunity').required(),
            hhCity: Joi.string()
                .label('HHCity').required(),
            hhStreet: Joi.string()
                .label('HHStreet').required(),
            country: Joi.string()
                .label('country').required(),
            addressee1: Joi.string()
                .label('addressee1').required(),
            addressee2: Joi.string()
                .label('addressee2').required(),
            addressee3: Joi.string()
                .label('addressee3').required(),
            post: Joi.string()
                .label('post').required(),
            placeOfRegistration: Joi.boolean()
                .label('placeOfRegistration').required(),
            sameResidence: Joi.boolean()
                .label('sameResidence').required(),
            hhResidence: Joi.boolean()
                .label('HHResidence').required(),
        }).required(),
        otherInformation: Joi.object().keys({
            bankNumber: Joi.string()
                .label('bankNumber').required(),
            socialCardNumber: Joi.string()
                .label('socialCardNumber').required(),
            documentTypeId: Joi.number()
                .label('documentTypeId').required(),
            passportNumber: Joi.string()
                .label('passportNumber').required(),
            dueDate: Joi.string()
                .label('dueDate').required(),
            byWhom: Joi.string()
                .label('byWhom').required(),
            nationality: Joi.string()
                .label('nationality').required(),
            anotherDocumentNumber: Joi.string()
                .label('anotherDocumentNumber').required(),
            phone: Joi.string()
                .label('phone').required(),
            phone2: Joi.string()
                .label('phone2').allow(null).required(),
            // email: Joi.string()
            //     .label('email').required(),
            language: Joi.string()
                .label('language').allow(null).required(),
            // maritalStatus: Joi.string()
            //     .label('maritalStatus').required(),
            education: Joi.string()
                .label('education').required(),
            // service: Joi.string()
            //     .label('service').required(),
            // membersOfFamily: Joi.string()
            //     .label('membersOfFamily').required(),
        }).required(),
        employeePosition: Joi.array().items(Joi.object({
            id : Joi.number().allow(null),
            positionId: Joi.number().min(1),
            startOfPosition: Joi.date(),
            endOfPosition: Joi.date(),
            status : Joi.string().allow(null)
        })).required(),
        employeeAccounts: Joi.array().items(Joi.object({
            id : Joi.number().allow(null),

            accountOfEmployeeCalculationId: Joi.number().min(1).allow(null),
            type: Joi.string(),
            percent: Joi.string(),
            status : Joi.string().allow(null)

        })).required(),
        employeeAddition: Joi.array().items(Joi.object({
            id : Joi.number().allow(null),

            additionId: Joi.number().min(1).allow(null),
            isMain: Joi.boolean(),
            money: Joi.number(),
            status : Joi.string().allow(null),
            isDeleted : Joi.boolean().allow(null)

        })).required()
    });