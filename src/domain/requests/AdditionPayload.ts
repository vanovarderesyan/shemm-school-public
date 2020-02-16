/**
 * AdditionPayload interface.
 */
interface AdditionPayload {
    name: string;
    table_id:number;
    type_of_income_id:number;
    type_of_vacation_id:number;
    expense_account_id:number;
    coefficient:string;
    recalculation:boolean;
    is_income:boolean;
    declining_income:boolean;
    is_trade_union:boolean;
    is_for_tax_purposes_only:boolean;
    is_mandatory_pension:boolean;
    by_the_employer_mandatory_pension:boolean;
    participates_on_account_of_actual_hours : boolean;
}

export default AdditionPayload;
