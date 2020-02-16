/**
 * List of database tables.
 */
enum Table {
  USERS = 'users',
  USER_ROLES = 'user_roles',
  USER_SESSIONS = 'user_sessions',
  BANK = 'bank',
  BANK_BRANCHE='bank_branche',
  SUBDIVISION = 'subdivision',
  MEASUREMENT_UNIT = 'measurement_unit',
  BILLING_METHOD = 'billing_method',
  CLASSIFICATION = 'classification',
  MATERIAL_VALUE = 'material_value',
  MATERIAL_VALUE_GROUP = 'material_value_group',
  CO_WORKERS = 'co_workers',
  BILLING_ACCOUNT = 'billing_account',
  WAREHOUSE = 'warehouse',
  POSITION = 'position',
  SERVICE_TYPE ='service_type',
  SERVICE_NAME = 'service_name',
  PROFESSION = 'profession',//մասնագիտություն
  ADDITION = 'addition',
  TABLE_CODE = 'table_code',//տաբելի կոդ
  TYPE_OF_INCOME = 'type_of_income',//եկամտի տեսակ
  TYPE_OF_VACATION = 'type_of_vacation',//արձակուրդաինի տեսակ
  EXPENSE_ACCOUNT = 'expense_account',//ծախսի հաշվարկ
  TABEL ='tabel',
  EMPLOYEE = 'employee',//աշխատակից
  EMPLOYEE_GENERAL = 'employee_general',//ընդանուր
  EMPLOYEE_ACCOUNTS='employee_accounts',
  EMPLOYEE_POSITION = 'employee_position',
  CONTRACT = 'contract',//պայմանագիր
  LEGISLATIVE ='legislative',//օրենսդրական
  ADDRESSES = 'addresses',//
  OTHER_INFORMATION ='other_information',//այլ տվյալներ
  DOCUMENT_TYPE = 'document_type',//փաստաթխտի տեսակ
  EMPLOYEE_ADDITION = 'employee_addition',
  BILLING_SHEET = 'billing_sheet',//հաշվարկաին թերթիկ
  SUMMARY_DATA = 'summary_data',//ամփոփ տվյալներ,
  PARTNERS = 'partners',//Գործընկերներ,
  GROUP = 'group',//խումբ
  HEAD_POSITION = 'head_osition',//ղեկավարի պաշտոն
  ACCOUNTANT_POSITION = 'accountant_position',//հաշվապահի պաշտոն
  ADDITIONAL_ADDRESSE_PARTNERS = 'additional_addresses',//լրացուցիչ հասցեներ
  ACCOUNT_OF_EMPLOYEE_CALCULATIONS = 'accounts',//աշխատավարցի գծով հաշվարկների հաշիվ
  ACCOUNT_OF_EMPLOYEE_CALCULATIONS_TYPE = 'account_of_employee_calculations_type',//
  CURRENCY = 'currency',
  ACCOUNT_OF_EMPLOYEE_CALCULATIONS_CURRENCY = 'calculations_currency',//many many
  ANALITIC_GROUP_1 = 'analitic_group_1',
  ANALITIC_GROUP_2 = 'analitic_group_2',
  SUBSECTION = 'subsection',
  ACCOUNT_PRODUCTS = 'ACCOUNT_PRODUCTS',
  AAH_ACCOUNT_TYPE = 'aah_account_type',
  ACCOUNT_PRODUCTS_OF_PRODUCTS = 'account_products_of_products',
  TYPES_OF_ACTIONS = 'types_of_actions'
}

export default Table;
