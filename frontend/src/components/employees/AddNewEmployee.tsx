import {useState} from "react";
import {useFormik} from 'formik';
import http from "../../services/http";
import {ADD_NEW_EMPLOYEES_FIELDS, ADD_NEW_EMPLOYEE_FIELDS_INITIAL_VALUES, validationSchema} from '../../formikFields/AddNewEmployee.fields';
import {BANK_NAMES, DESIGNATIONS, COUNTRIES} from '../../consts/miscallenous'
import Select from '../theme/Select/Select';
import Button from "../theme/Button/Button";

const AddNewEmployee = () => {

    const [formSubmissionError, setFormSubmissionError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const formik = useFormik({
        initialValues: ADD_NEW_EMPLOYEE_FIELDS_INITIAL_VALUES,
        validationSchema: validationSchema,
        onSubmit: async values => {
            try {
                await http.post('/employees/', values);
                setSuccessMessage(true);
                setFormSubmissionError(false);
            } catch(error) {
                console.log('Something went wrong while creating employees.', error);
                setSuccessMessage(false);
                setFormSubmissionError(true);
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="space-y-12">

                {successMessage && <p>Employee has been created successfully.</p>}

                {formSubmissionError && <p>Something went wrong. Please try again later.</p>}

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.FIRST_NAME} className="block text-sm/6 font-medium text-gray-900">
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.FIRST_NAME}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.FIRST_NAME}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.FIRST_NAME]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                { formik.touched[ADD_NEW_EMPLOYEES_FIELDS.FIRST_NAME] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.FIRST_NAME]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.FIRST_NAME]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.LAST_NAME} className="block text-sm/6 font-medium text-gray-900">
                                Last name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.LAST_NAME}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.LAST_NAME}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.LAST_NAME]}
                                />
                                { formik.touched[ADD_NEW_EMPLOYEES_FIELDS.LAST_NAME] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.LAST_NAME]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.LAST_NAME]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-5">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.EMAIL} className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.EMAIL}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.EMAIL}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.EMAIL]}
                                />
                                { formik.touched[ADD_NEW_EMPLOYEES_FIELDS.EMAIL] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.EMAIL]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.EMAIL]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.PASSWORD} className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.PASSWORD}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.PASSWORD}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.PASSWORD]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.PASSWORD] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.PASSWORD]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.PASSWORD]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.EMPLOYEE_CODE} className="block text-sm/6 font-medium text-gray-900">
                                Employee Code
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.EMPLOYEE_CODE}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.EMPLOYEE_CODE}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.EMPLOYEE_CODE]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.EMPLOYEE_CODE] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.EMPLOYEE_CODE]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.EMPLOYEE_CODE]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.DESIGNATION} className="block text-sm/6 font-medium text-gray-900">
                                Designation
                            </label>
                            <div className="mt-2">
                                <Select
                                    data={DESIGNATIONS}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.DESIGNATION}
                                    id={ADD_NEW_EMPLOYEES_FIELDS.DESIGNATION}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.DESIGNATION]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.DESIGNATION] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.DESIGNATION]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.DESIGNATION]}</span>
                                    : null}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.CNIC} className="block text-sm/6 font-medium text-gray-900">
                                CNIC
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.CNIC}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.CNIC}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.CNIC]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.CNIC] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.CNIC]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.CNIC]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.ID_CARD_DATE_OF_BIRTH}
                                   className="block text-sm/6 font-medium text-gray-900">
                                Date of Birth (Id Card)
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.ID_CARD_DATE_OF_BIRTH}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.ID_CARD_DATE_OF_BIRTH}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.ID_CARD_DATE_OF_BIRTH]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.ID_CARD_DATE_OF_BIRTH] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.ID_CARD_DATE_OF_BIRTH]
                                    ? formik.errors[ADD_NEW_EMPLOYEES_FIELDS.ID_CARD_DATE_OF_BIRTH]
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.ACTUAL_DATE_OF_BIRTH}
                                   className="block text-sm/6 font-medium text-gray-900">
                                Date of Birth (Actual)
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.ACTUAL_DATE_OF_BIRTH}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.ACTUAL_DATE_OF_BIRTH}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.ACTUAL_DATE_OF_BIRTH]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.ACTUAL_DATE_OF_BIRTH] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.ACTUAL_DATE_OF_BIRTH]
                                    ? formik.errors[ADD_NEW_EMPLOYEES_FIELDS.ACTUAL_DATE_OF_BIRTH]
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.HOBBIES}
                                   className="block text-sm/6 font-medium text-gray-900">
                            </label>
                            Hobbies
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.HOBBIES}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.HOBBIES}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.HOBBIES]}
                                />
                                {/*{formik.touched[ADD_NEW_EMPLOYEES_FIELDS.HOBBIES] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.HOBBIES]*/}
                                {/*    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.HOBBIES]}</span>*/}
                                {/*    : null*/}
                                {/*}*/}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.VEHICLE_REGISTRATION_NUMBER}
                                   className="block text-sm/6 font-medium text-gray-900">
                            </label>
                            Registered Vehicle Number
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.VEHICLE_REGISTRATION_NUMBER}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.VEHICLE_REGISTRATION_NUMBER}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.VEHICLE_REGISTRATION_NUMBER]}
                                />
                                {/*{formik.touched[ADD_NEW_EMPLOYEES_FIELDS.VEHICLE_REGISTRATION_NUMBER] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.VEHICLE_REGISTRATION_NUMBER]*/}
                                {/*    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.VEHICLE_REGISTRATION_NUMBER]}</span>*/}
                                {/*    : null*/}
                                {/*}*/}
                            </div>
                        </div>

                    </div>
                </div>


                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Bank Account Information</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">Use a permanent bank account where employee can receive
                        salaries.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.BANK_NAME} className="block text-sm/6 font-medium text-gray-900">
                                Bank Name
                            </label>
                            <div className="mt-2">
                                <Select
                                    data={BANK_NAMES}
                                    id={ADD_NEW_EMPLOYEES_FIELDS.BANK_NAME}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.BANK_NAME}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.BANK_NAME]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.BANK_NAME] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.BANK_NAME]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.BANK_NAME]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.BANK_ACCOUNT_TITLE} className="block text-sm/6 font-medium text-gray-900">
                                Account Title
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.BANK_ACCOUNT_TITLE}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.BANK_ACCOUNT_TITLE}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.BANK_ACCOUNT_TITLE]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.BANK_ACCOUNT_TITLE] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.BANK_ACCOUNT_TITLE]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.BANK_ACCOUNT_TITLE]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.BANK_BRANCH_CODE} className="block text-sm/6 font-medium text-gray-900">
                                Branch Code
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.BANK_BRANCH_CODE}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.BANK_BRANCH_CODE}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.BANK_BRANCH_CODE]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.BANK_BRANCH_CODE] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.BANK_BRANCH_CODE]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.BANK_BRANCH_CODE]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.BANK_ACCOUNT_NUMBER} className="block text-sm/6 font-medium text-gray-900">
                                Account Number
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.BANK_ACCOUNT_NUMBER}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.BANK_ACCOUNT_NUMBER}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.BANK_ACCOUNT_NUMBER]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.BANK_ACCOUNT_NUMBER] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.BANK_ACCOUNT_NUMBER]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.BANK_ACCOUNT_NUMBER]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.BANK_IBAN_NUMBER} className="block text-sm/6 font-medium text-gray-900">
                                IBAN Number
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.BANK_IBAN_NUMBER}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.BANK_IBAN_NUMBER}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.BANK_IBAN_NUMBER]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.BANK_IBAN_NUMBER] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.BANK_IBAN_NUMBER]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.BANK_IBAN_NUMBER]}</span>
                                    : null
                                }
                            </div>
                        </div>

                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Salary & Joining Information</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">Use proper data specially for dates.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.INITIAL_BASE_SALARY} className="block text-sm/6 font-medium text-gray-900">
                                Initial Base Salary
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.INITIAL_BASE_SALARY}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.INITIAL_BASE_SALARY}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.INITIAL_BASE_SALARY]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.INITIAL_BASE_SALARY] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.INITIAL_BASE_SALARY]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.INITIAL_BASE_SALARY]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.CURRENT_BASE_SALARY} className="block text-sm/6 font-medium text-gray-900">
                                Current Base Salary
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.CURRENT_BASE_SALARY}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.CURRENT_BASE_SALARY}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.CURRENT_BASE_SALARY]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.CURRENT_BASE_SALARY] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.CURRENT_BASE_SALARY]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.CURRENT_BASE_SALARY]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.JOINING_DATE} className="block text-sm/6 font-medium text-gray-900">
                                Joining Date
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.JOINING_DATE}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.JOINING_DATE}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.JOINING_DATE]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.JOINING_DATE] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.JOINING_DATE]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.JOINING_DATE]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.FULL_TIME_JOINING_DATE}
                                   className="block text-sm/6 font-medium text-gray-900">
                                Full Time Joining Date
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.FULL_TIME_JOINING_DATE}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.FULL_TIME_JOINING_DATE}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.FULL_TIME_JOINING_DATE]}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.LAST_INCREMENT_DATE}
                                   className="block text-sm/6 font-medium text-gray-900">
                                Last Increment Date
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.LAST_INCREMENT_DATE}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.LAST_INCREMENT_DATE}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.LAST_INCREMENT_DATE]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.LAST_INCREMENT_DATE] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.LAST_INCREMENT_DATE]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.LAST_INCREMENT_DATE]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.LAST_INCREMENT_AMOUNT}
                                   className="block text-sm/6 font-medium text-gray-900">
                                Last Increment Amount
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.LAST_INCREMENT_AMOUNT}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.LAST_INCREMENT_AMOUNT}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.LAST_INCREMENT_AMOUNT]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.LAST_INCREMENT_AMOUNT] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.LAST_INCREMENT_AMOUNT]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.LAST_INCREMENT_AMOUNT]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.MEDICAL_ALLOWANCE_AMOUNT}
                                   className="block text-sm/6 font-medium text-gray-900">
                                Medical Allowance Amount (If any)
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.MEDICAL_ALLOWANCE_AMOUNT}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.MEDICAL_ALLOWANCE_AMOUNT}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.MEDICAL_ALLOWANCE_AMOUNT]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.MEDICAL_ALLOWANCE_AMOUNT] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.MEDICAL_ALLOWANCE_AMOUNT]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.MEDICAL_ALLOWANCE_AMOUNT]}</span>
                                    : null
                                }
                            </div>
                        </div>

                    </div>
                </div>


                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Address Information</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="col-span-full">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.HOME_ADDRESS}
                                   className="block text-sm/6 font-medium text-gray-900">
                                Home Address
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.HOME_ADDRESS}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.HOME_ADDRESS}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.HOME_ADDRESS]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.HOME_ADDRESS] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.HOME_ADDRESS]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.HOME_ADDRESS]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label
                                htmlFor={ADD_NEW_EMPLOYEES_FIELDS.CITY}
                                className="block text-sm/6 font-medium text-gray-900">
                                City
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.CITY}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.CITY}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.CITY]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.CITY] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.CITY]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.CITY]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.STATE}
                                   className="block text-sm/6 font-medium text-gray-900">
                                State / Province
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.STATE}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.STATE}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.STATE]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.STATE] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.STATE]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.STATE]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.POSTAL_CODE}
                                   className="block text-sm/6 font-medium text-gray-900">
                                ZIP / Postal code
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={ADD_NEW_EMPLOYEES_FIELDS.POSTAL_CODE}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.POSTAL_CODE}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.POSTAL_CODE]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.POSTAL_CODE] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.POSTAL_CODE]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.POSTAL_CODE]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={ADD_NEW_EMPLOYEES_FIELDS.COUNTRY}
                                   className="block text-sm/6 font-medium text-gray-900">
                                Country
                            </label>
                            <div className="mt-2">
                                <Select
                                    data={ COUNTRIES }
                                    id={ADD_NEW_EMPLOYEES_FIELDS.COUNTRY}
                                    name={ADD_NEW_EMPLOYEES_FIELDS.COUNTRY}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[ADD_NEW_EMPLOYEES_FIELDS.COUNTRY]}
                                />
                                {formik.touched[ADD_NEW_EMPLOYEES_FIELDS.COUNTRY] && formik.errors[ADD_NEW_EMPLOYEES_FIELDS.COUNTRY]
                                    ? <span className="error">{formik.errors[ADD_NEW_EMPLOYEES_FIELDS.COUNTRY]}</span>
                                    : null
                                }
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm/6 font-semibold text-gray-900">
                    Cancel
                </button>
                <Button
                    type="submit"
                >
                    Save
                </Button>
            </div>
        </form>
    );
}

export default AddNewEmployee;