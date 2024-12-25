import * as Yup from 'yup';

const EDIT_EMPLOYEE_FIELDS: { [key: string]: string} = {
    FIRST_NAME: 'first_name',
    LAST_NAME: 'last_name',
    EMAIL: 'email',
    DESIGNATION: 'designation',
    CNIC: 'cnic',
    ID_CARD_DATE_OF_BIRTH: 'id_card_date_of_birth',
    ACTUAL_DATE_OF_BIRTH: 'actual_date_of_birth',
    HOBBIES: 'hobbies',
    VEHICLE_REGISTRATION_NUMBER: 'vehicle_registration_number',
    BANK_NAME: 'bank_name',
    BANK_ACCOUNT_TITLE: 'bank_account_title',
    BANK_BRANCH_CODE: 'bank_branch_code',
    BANK_ACCOUNT_NUMBER: 'bank_account_number',
    BANK_IBAN_NUMBER: 'bank_iban_number',
    FULL_TIME_JOINING_DATE: 'full_time_joining_date',
    MEDICAL_ALLOWANCE_AMOUNT: 'medical_allowance_amount',
    HOME_ADDRESS: 'home_address',
    CITY: 'city',
    STATE: 'state',
    POSTAL_CODE: 'zip_code',
    COUNTRY: 'country',
}

const ADD_NEW_EMPLOYEES_FIELDS: { [key: string]: string} =  {
    ...EDIT_EMPLOYEE_FIELDS,
    PASSWORD: 'password',
    EMPLOYEE_CODE: 'employee_code',
    INITIAL_BASE_SALARY: 'initial_base_salary',
    CURRENT_BASE_SALARY: 'current_base_salary',
    JOINING_DATE: 'joining_date',
    LAST_INCREMENT_DATE: 'last_increment_date',
    LAST_INCREMENT_AMOUNT: 'last_increment_amount',
}

const ADD_NEW_EMPLOYEE_FIELDS_INITIAL_VALUES: { [key: string]: string } = {};
Object.keys(ADD_NEW_EMPLOYEES_FIELDS).map( (key: string)=> {
    ADD_NEW_EMPLOYEE_FIELDS_INITIAL_VALUES[ ADD_NEW_EMPLOYEES_FIELDS[key] ] = '';
});


const EDIT_EMPLOYEE_FIELDS_INITIAL_VALUES: { [key: string]: string} = {};
Object.keys(EDIT_EMPLOYEE_FIELDS).map( (key: string)=> {
    EDIT_EMPLOYEE_FIELDS_INITIAL_VALUES[ EDIT_EMPLOYEE_FIELDS[key] ] = '';
});


const __editEmployeeValidationSchema = {
    [ADD_NEW_EMPLOYEES_FIELDS.FIRST_NAME]: Yup.string().min(3, "First name should be min. 3 characters long.").max(50, "First name should be max. 50 characters long.").required("First name is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.LAST_NAME]: Yup.string().min(3, "Last name should be min. 3 characters long.").max(50, "Last name should be max. 50 characters long.").required("Last name is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.EMAIL]: Yup.string().email("Please enter a valid email address.").required("Email address is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.DESIGNATION]: Yup.string().required("Designation is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.CNIC]: Yup.string().min(15, "CNIC should be 15 characters long").max(15, "CNIC should be 15 characters long").required("CNIC is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.ID_CARD_DATE_OF_BIRTH]: Yup.date().typeError("DOB should be a valid date").required("DOB is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.ACTUAL_DATE_OF_BIRTH]: Yup.date().typeError("DOB should be a valid date").required("DOB is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.BANK_NAME]: Yup.string().required("Bank name is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.BANK_ACCOUNT_TITLE]: Yup.string().required("Bank account title is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.BANK_BRANCH_CODE]: Yup.string().required("Bank Code is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.BANK_ACCOUNT_NUMBER]: Yup.string().required("Bank account number is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.BANK_IBAN_NUMBER]: Yup.string().required("Bank IBAN is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.FULL_TIME_JOINING_DATE]: Yup.date().typeError("Full time joining date should be a valid date").required("Full time joining date is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.MEDICAL_ALLOWANCE_AMOUNT]: Yup.number().typeError("Medical allowance should be a number.").required("Medical allowance is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.HOME_ADDRESS]: Yup.string().required("Home address is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.CITY]: Yup.string().required("City is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.STATE]: Yup.string().required("State is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.POSTAL_CODE]: Yup.string().required("PostalCode is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.COUNTRY]: Yup.string().required("Country is required"),
}
const validationSchema = Yup.object({
    ...__editEmployeeValidationSchema,
    [ADD_NEW_EMPLOYEES_FIELDS.PASSWORD]: Yup.string().min(8, "Password should be min. 8 characters.").max(12, "Password should be max. 12 characters.").required("Password is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.EMPLOYEE_CODE]: Yup.number().typeError("Employee Code must be a number (matching the number id value from attendance machine)").required("Employee Id is required."),
    // [ADD_NEW_EMPLOYEES_FIELDS.HOBBIES]: Yup.string(),
    // [ADD_NEW_EMPLOYEES_FIELDS.VEHICLE_REGISTRATION_NUMBER]: Yup.string(),
    [ADD_NEW_EMPLOYEES_FIELDS.INITIAL_BASE_SALARY]: Yup.number().typeError("Salary should be a number").required("Base salary is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.CURRENT_BASE_SALARY]: Yup.number().typeError("Salary should be a number").required("Current base salary is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.JOINING_DATE]: Yup.date().typeError("Joining date should be a valid date.").required("Joining date is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.LAST_INCREMENT_DATE]: Yup.date().typeError("Last increment date should be a valid date").required("Last increment date is required"),
    [ADD_NEW_EMPLOYEES_FIELDS.LAST_INCREMENT_AMOUNT]: Yup.number().typeError("Last increment amount should be a valid number").required("Last increment amount is required."),
});

const editValidationSchema = Yup.object({
    ...__editEmployeeValidationSchema
})

export {
    ADD_NEW_EMPLOYEES_FIELDS,
    ADD_NEW_EMPLOYEE_FIELDS_INITIAL_VALUES,
    validationSchema,
    EDIT_EMPLOYEE_FIELDS,
    EDIT_EMPLOYEE_FIELDS_INITIAL_VALUES,
    editValidationSchema,
};