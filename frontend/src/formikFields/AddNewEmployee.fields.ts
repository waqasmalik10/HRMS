import * as Yup from 'yup';

const ADD_NEW_EMPLOYEES_FIELDS: { [key: string]: string} =  {
    FIRST_NAME: 'first_name',
    LAST_NAME: 'last_name',
    EMAIL: 'email',
    PASSWORD: 'password',
    EMPLOYEE_ID: 'employee_id',
    DESIGNATION_ID: 'designation',
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
    INITIAL_BASE_SALARY: 'initial_base_salary',
    CURRENT_BASE_SALARY: 'current_base_salary',
    JOINING_DATE: 'joining_date',
    FULL_TIME_JOINING_DATE: 'full_time_joining_date',
    LAST_INCREMENT_DATE: 'last_increment_date',
    LAST_INCREMENT_AMOUNT: 'last_increment_amount',
    MEDICAL_ALLOWANCE_AMOUNT: 'medical_allowance_amount',
    HOME_ADDRESS: 'home_address',
    CITY: 'city',
    STATE: 'state',
    POSTAL_CODE: 'zip_code',
    COUNTRY: 'country',
}

const ADD_NEW_EMPLOYEE_FIELDS_INITIAL_VALUES: { [key: string]: string } = {};
Object.keys(ADD_NEW_EMPLOYEES_FIELDS).map( (key: string)=> {
    ADD_NEW_EMPLOYEE_FIELDS_INITIAL_VALUES[ ADD_NEW_EMPLOYEES_FIELDS[key] ] = '';
});


const validationSchema = Yup.object({
    [ADD_NEW_EMPLOYEES_FIELDS.FIRST_NAME]: Yup.string()
                                            .min(3, "First name should be min. 3 characters long.")
                                            .max(50, "First name should be max. 50 characters long.")
                                            .required("First name is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.LAST_NAME]: Yup.string()
                                            .min(3, "Last name should be min. 3 characters long.")
                                            .max(50, "Last name should be max. 50 characters long.")
                                            .required("Last name is required."),
    [ADD_NEW_EMPLOYEES_FIELDS.EMAIL]: Yup.string()
                                        .email("Please enter a valid email address.")
                                        .required("Email address is required."),
})

export {
    ADD_NEW_EMPLOYEES_FIELDS,
    ADD_NEW_EMPLOYEE_FIELDS_INITIAL_VALUES,
    validationSchema,
};