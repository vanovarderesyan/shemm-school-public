import Joi from 'joi';

export const additionPOSTSchema = Joi.object()
    .options({ abortEarly: false })
    .keys({
        name: Joi.string()
            .min(4)
            .max(100)
            .label('Name')
            .required(),
            tabel_id: Joi.number()
            .min(1)
            .label('tabel_id')
            .required(),
        type_of_income_id: Joi.number()
            .min(1)
            .label('type_of_income_id')
            .required(),
        type_of_vacation_id: Joi.number()
            .min(1)
            .label('type_of_vacation_id')
            .required(),
        expense_account_id: Joi.number()
            .min(1)
            .label('expense_account_id')
            .required(),
        coefficient: Joi.string()
            .label('expense_account_id')
            .required(),
        recalculation: Joi.boolean()
            .label('expense_account_id')
            .required(),
        is_income: Joi.boolean()
            .label('expense_account_id')
            .required(),
        declining_income: Joi.boolean()
            .label('expense_account_id')
            .required(),
        is_trade_union: Joi.boolean()
            .label('expense_account_id')
            .required(),
        is_for_tax_purposes_only: Joi.boolean()
            .label('expense_account_id')
            .required(),
        is_mandatory_pension: Joi.boolean()
            .label('expense_account_id')
            .required(),
        by_the_employer_mandatory_pension: Joi.boolean()
            .label('expense_account_id')
            .required(),
        participates_on_account_of_actual_hours: Joi.boolean()
            .label('expense_account_id')
            .required()
    });