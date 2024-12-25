import React, {useEffect, useState} from "react";
import moment from 'moment';
import {useFormik} from 'formik';
import http from "../../services/http";
import {EDIT_EMPLOYEE_FIELDS, EDIT_EMPLOYEE_FIELDS_INITIAL_VALUES, editValidationSchema} from '../../formikFields/AddNewEmployee.fields';
import {BANK_NAMES, DESIGNATIONS, COUNTRIES} from '../../consts/miscallenous';
import Select from '../theme/Select/Select';
import Button from "../theme/Button/Button";

interface IProps {
    id: number
}
const EditEmployee: React.FC<IProps> = ({id}) => {

    const [employee, setEmployee] = useState<{[key: string]: string}>( EDIT_EMPLOYEE_FIELDS_INITIAL_VALUES );
    const [formSubmissionError, setFormSubmissionError] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);

    const DATE_FORMT = "YYYY-MM-DD";

    useEffect(() => {
        http.get(`/employees/${id}`).then(response => {
            const data = response.data;
            delete data.id;
            delete data.employee_code;
            delete data.initial_base_salary;
            delete data.current_base_salary;
            delete data.joining_date;
            delete data.last_increment_date;
            delete data.last_increment_amount;
            delete data.employeeIncrements;
            setEmployee(data);
        }).catch(err =>{
            console.error(`Something went wrong while retrieving employee ${id}`, err);
        });
    }, [id]);


    const formik = useFormik({
        initialValues: employee,
        enableReinitialize: true,
        validationSchema: editValidationSchema,
        onSubmit: async values => {
            console.log("Form submitted")
            try {
                await http.put(`/employees/${id}`, values);
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

                {successMessage && <p>Employee has been updated successfully.</p>}

                {formSubmissionError && <p>Something went wrong. Please try again later.</p>}

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="sm:col-span-3">
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.FIRST_NAME} className="block text-sm/6 font-medium text-gray-900">
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={EDIT_EMPLOYEE_FIELDS.FIRST_NAME}
                                    name={EDIT_EMPLOYEE_FIELDS.FIRST_NAME}
                                    value={formik.values[EDIT_EMPLOYEE_FIELDS.FIRST_NAME]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                { formik.touched[EDIT_EMPLOYEE_FIELDS.FIRST_NAME] && formik.errors[EDIT_EMPLOYEE_FIELDS.FIRST_NAME]
                                    ? <span className="error">{formik.errors[EDIT_EMPLOYEE_FIELDS.FIRST_NAME]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.LAST_NAME} className="block text-sm/6 font-medium text-gray-900">
                                Last name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={EDIT_EMPLOYEE_FIELDS.LAST_NAME}
                                    name={EDIT_EMPLOYEE_FIELDS.LAST_NAME}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[EDIT_EMPLOYEE_FIELDS.LAST_NAME]}
                                />
                                { formik.touched[EDIT_EMPLOYEE_FIELDS.LAST_NAME] && formik.errors[EDIT_EMPLOYEE_FIELDS.LAST_NAME]
                                    ? <span className="error">{formik.errors[EDIT_EMPLOYEE_FIELDS.LAST_NAME]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-5">
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.EMAIL} className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={EDIT_EMPLOYEE_FIELDS.EMAIL}
                                    name={EDIT_EMPLOYEE_FIELDS.EMAIL}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[EDIT_EMPLOYEE_FIELDS.EMAIL]}
                                />
                                { formik.touched[EDIT_EMPLOYEE_FIELDS.EMAIL] && formik.errors[EDIT_EMPLOYEE_FIELDS.EMAIL]
                                    ? <span className="error">{formik.errors[EDIT_EMPLOYEE_FIELDS.EMAIL]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.DESIGNATION} className="block text-sm/6 font-medium text-gray-900">
                                Designation
                            </label>
                            <div className="mt-2">
                                <Select
                                    data={DESIGNATIONS}
                                    name={EDIT_EMPLOYEE_FIELDS.DESIGNATION}
                                    id={EDIT_EMPLOYEE_FIELDS.DESIGNATION}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[EDIT_EMPLOYEE_FIELDS.DESIGNATION]}
                                />
                                {formik.touched[EDIT_EMPLOYEE_FIELDS.DESIGNATION] && formik.errors[EDIT_EMPLOYEE_FIELDS.DESIGNATION]
                                    ? <span className="error">{formik.errors[EDIT_EMPLOYEE_FIELDS.DESIGNATION]}</span>
                                    : null}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.CNIC} className="block text-sm/6 font-medium text-gray-900">
                                CNIC
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={EDIT_EMPLOYEE_FIELDS.CNIC}
                                    name={EDIT_EMPLOYEE_FIELDS.CNIC}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[EDIT_EMPLOYEE_FIELDS.CNIC]}
                                />
                                {formik.touched[EDIT_EMPLOYEE_FIELDS.CNIC] && formik.errors[EDIT_EMPLOYEE_FIELDS.CNIC]
                                    ? <span className="error">{formik.errors[EDIT_EMPLOYEE_FIELDS.CNIC]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.ID_CARD_DATE_OF_BIRTH}
                                   className="block text-sm/6 font-medium text-gray-900">
                                Date of Birth (Id Card)
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={EDIT_EMPLOYEE_FIELDS.ID_CARD_DATE_OF_BIRTH}
                                    name={EDIT_EMPLOYEE_FIELDS.ID_CARD_DATE_OF_BIRTH}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={moment(formik.values[EDIT_EMPLOYEE_FIELDS.ID_CARD_DATE_OF_BIRTH], "YYYY-MM-DD").format(DATE_FORMT)}
                                />
                                {formik.touched[EDIT_EMPLOYEE_FIELDS.ID_CARD_DATE_OF_BIRTH] && formik.errors[EDIT_EMPLOYEE_FIELDS.ID_CARD_DATE_OF_BIRTH]
                                    ? formik.errors[EDIT_EMPLOYEE_FIELDS.ID_CARD_DATE_OF_BIRTH]
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.ACTUAL_DATE_OF_BIRTH}
                                   className="block text-sm/6 font-medium text-gray-900">
                                Date of Birth (Actual)
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={EDIT_EMPLOYEE_FIELDS.ACTUAL_DATE_OF_BIRTH}
                                    name={EDIT_EMPLOYEE_FIELDS.ACTUAL_DATE_OF_BIRTH}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={moment(formik.values[EDIT_EMPLOYEE_FIELDS.ACTUAL_DATE_OF_BIRTH]).format(DATE_FORMT)}
                                />
                                {formik.touched[EDIT_EMPLOYEE_FIELDS.ACTUAL_DATE_OF_BIRTH] && formik.errors[EDIT_EMPLOYEE_FIELDS.ACTUAL_DATE_OF_BIRTH]
                                    ? formik.errors[EDIT_EMPLOYEE_FIELDS.ACTUAL_DATE_OF_BIRTH]
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.HOBBIES}
                                   className="block text-sm/6 font-medium text-gray-900">
                            </label>
                            Hobbies
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={EDIT_EMPLOYEE_FIELDS.HOBBIES}
                                    name={EDIT_EMPLOYEE_FIELDS.HOBBIES}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[EDIT_EMPLOYEE_FIELDS.HOBBIES]}
                                />
                                {/*{formik.touched[EDIT_EMPLOYEE_FIELDS.HOBBIES] && formik.errors[EDIT_EMPLOYEE_FIELDS.HOBBIES]*/}
                                {/*    ? <span className="error">{formik.errors[EDIT_EMPLOYEE_FIELDS.HOBBIES]}</span>*/}
                                {/*    : null*/}
                                {/*}*/}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.VEHICLE_REGISTRATION_NUMBER}
                                   className="block text-sm/6 font-medium text-gray-900">
                            </label>
                            Registered Vehicle Number
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={EDIT_EMPLOYEE_FIELDS.VEHICLE_REGISTRATION_NUMBER}
                                    name={EDIT_EMPLOYEE_FIELDS.VEHICLE_REGISTRATION_NUMBER}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[EDIT_EMPLOYEE_FIELDS.VEHICLE_REGISTRATION_NUMBER]}
                                />
                                {/*{formik.touched[EDIT_EMPLOYEE_FIELDS.VEHICLE_REGISTRATION_NUMBER] && formik.errors[EDIT_EMPLOYEE_FIELDS.VEHICLE_REGISTRATION_NUMBER]*/}
                                {/*    ? <span className="error">{formik.errors[EDIT_EMPLOYEE_FIELDS.VEHICLE_REGISTRATION_NUMBER]}</span>*/}
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
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.BANK_NAME} className="block text-sm/6 font-medium text-gray-900">
                                Bank Name
                            </label>
                            <div className="mt-2">
                                <Select
                                    data={BANK_NAMES}
                                    id={EDIT_EMPLOYEE_FIELDS.BANK_NAME}
                                    name={EDIT_EMPLOYEE_FIELDS.BANK_NAME}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[EDIT_EMPLOYEE_FIELDS.BANK_NAME]}
                                />
                                {formik.touched[EDIT_EMPLOYEE_FIELDS.BANK_NAME] && formik.errors[EDIT_EMPLOYEE_FIELDS.BANK_NAME]
                                    ? <span className="error">{formik.errors[EDIT_EMPLOYEE_FIELDS.BANK_NAME]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.BANK_ACCOUNT_TITLE} className="block text-sm/6 font-medium text-gray-900">
                                Account Title
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={EDIT_EMPLOYEE_FIELDS.BANK_ACCOUNT_TITLE}
                                    name={EDIT_EMPLOYEE_FIELDS.BANK_ACCOUNT_TITLE}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[EDIT_EMPLOYEE_FIELDS.BANK_ACCOUNT_TITLE]}
                                />
                                {formik.touched[EDIT_EMPLOYEE_FIELDS.BANK_ACCOUNT_TITLE] && formik.errors[EDIT_EMPLOYEE_FIELDS.BANK_ACCOUNT_TITLE]
                                    ? <span className="error">{formik.errors[EDIT_EMPLOYEE_FIELDS.BANK_ACCOUNT_TITLE]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.BANK_BRANCH_CODE} className="block text-sm/6 font-medium text-gray-900">
                                Branch Code
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={EDIT_EMPLOYEE_FIELDS.BANK_BRANCH_CODE}
                                    name={EDIT_EMPLOYEE_FIELDS.BANK_BRANCH_CODE}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[EDIT_EMPLOYEE_FIELDS.BANK_BRANCH_CODE]}
                                />
                                {formik.touched[EDIT_EMPLOYEE_FIELDS.BANK_BRANCH_CODE] && formik.errors[EDIT_EMPLOYEE_FIELDS.BANK_BRANCH_CODE]
                                    ? <span className="error">{formik.errors[EDIT_EMPLOYEE_FIELDS.BANK_BRANCH_CODE]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.BANK_ACCOUNT_NUMBER} className="block text-sm/6 font-medium text-gray-900">
                                Account Number
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={EDIT_EMPLOYEE_FIELDS.BANK_ACCOUNT_NUMBER}
                                    name={EDIT_EMPLOYEE_FIELDS.BANK_ACCOUNT_NUMBER}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[EDIT_EMPLOYEE_FIELDS.BANK_ACCOUNT_NUMBER]}
                                />
                                {formik.touched[EDIT_EMPLOYEE_FIELDS.BANK_ACCOUNT_NUMBER] && formik.errors[EDIT_EMPLOYEE_FIELDS.BANK_ACCOUNT_NUMBER]
                                    ? <span className="error">{formik.errors[EDIT_EMPLOYEE_FIELDS.BANK_ACCOUNT_NUMBER]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.BANK_IBAN_NUMBER} className="block text-sm/6 font-medium text-gray-900">
                                IBAN Number
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={EDIT_EMPLOYEE_FIELDS.BANK_IBAN_NUMBER}
                                    name={EDIT_EMPLOYEE_FIELDS.BANK_IBAN_NUMBER}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[EDIT_EMPLOYEE_FIELDS.BANK_IBAN_NUMBER]}
                                />
                                {formik.touched[EDIT_EMPLOYEE_FIELDS.BANK_IBAN_NUMBER] && formik.errors[EDIT_EMPLOYEE_FIELDS.BANK_IBAN_NUMBER]
                                    ? <span className="error">{formik.errors[EDIT_EMPLOYEE_FIELDS.BANK_IBAN_NUMBER]}</span>
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
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.FULL_TIME_JOINING_DATE}
                                   className="block text-sm/6 font-medium text-gray-900">
                                Full Time Joining Date
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={EDIT_EMPLOYEE_FIELDS.FULL_TIME_JOINING_DATE}
                                    name={EDIT_EMPLOYEE_FIELDS.FULL_TIME_JOINING_DATE}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={moment(formik.values[EDIT_EMPLOYEE_FIELDS.FULL_TIME_JOINING_DATE]).format(DATE_FORMT)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.MEDICAL_ALLOWANCE_AMOUNT}
                                   className="block text-sm/6 font-medium text-gray-900">
                                Medical Allowance Amount (If any)
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={EDIT_EMPLOYEE_FIELDS.MEDICAL_ALLOWANCE_AMOUNT}
                                    name={EDIT_EMPLOYEE_FIELDS.MEDICAL_ALLOWANCE_AMOUNT}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[EDIT_EMPLOYEE_FIELDS.MEDICAL_ALLOWANCE_AMOUNT]}
                                />
                                {formik.touched[EDIT_EMPLOYEE_FIELDS.MEDICAL_ALLOWANCE_AMOUNT] && formik.errors[EDIT_EMPLOYEE_FIELDS.MEDICAL_ALLOWANCE_AMOUNT]
                                    ? <span className="error">{formik.errors[EDIT_EMPLOYEE_FIELDS.MEDICAL_ALLOWANCE_AMOUNT]}</span>
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
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.HOME_ADDRESS}
                                   className="block text-sm/6 font-medium text-gray-900">
                                Home Address
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={EDIT_EMPLOYEE_FIELDS.HOME_ADDRESS}
                                    name={EDIT_EMPLOYEE_FIELDS.HOME_ADDRESS}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[EDIT_EMPLOYEE_FIELDS.HOME_ADDRESS]}
                                />
                                {formik.touched[EDIT_EMPLOYEE_FIELDS.HOME_ADDRESS] && formik.errors[EDIT_EMPLOYEE_FIELDS.HOME_ADDRESS]
                                    ? <span className="error">{formik.errors[EDIT_EMPLOYEE_FIELDS.HOME_ADDRESS]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label
                                htmlFor={EDIT_EMPLOYEE_FIELDS.CITY}
                                className="block text-sm/6 font-medium text-gray-900">
                                City
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={EDIT_EMPLOYEE_FIELDS.CITY}
                                    name={EDIT_EMPLOYEE_FIELDS.CITY}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[EDIT_EMPLOYEE_FIELDS.CITY]}
                                />
                                {formik.touched[EDIT_EMPLOYEE_FIELDS.CITY] && formik.errors[EDIT_EMPLOYEE_FIELDS.CITY]
                                    ? <span className="error">{formik.errors[EDIT_EMPLOYEE_FIELDS.CITY]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.STATE}
                                   className="block text-sm/6 font-medium text-gray-900">
                                State / Province
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={EDIT_EMPLOYEE_FIELDS.STATE}
                                    name={EDIT_EMPLOYEE_FIELDS.STATE}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[EDIT_EMPLOYEE_FIELDS.STATE]}
                                />
                                {formik.touched[EDIT_EMPLOYEE_FIELDS.STATE] && formik.errors[EDIT_EMPLOYEE_FIELDS.STATE]
                                    ? <span className="error">{formik.errors[EDIT_EMPLOYEE_FIELDS.STATE]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.POSTAL_CODE}
                                   className="block text-sm/6 font-medium text-gray-900">
                                ZIP / Postal code
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    id={EDIT_EMPLOYEE_FIELDS.POSTAL_CODE}
                                    name={EDIT_EMPLOYEE_FIELDS.POSTAL_CODE}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[EDIT_EMPLOYEE_FIELDS.POSTAL_CODE]}
                                />
                                {formik.touched[EDIT_EMPLOYEE_FIELDS.POSTAL_CODE] && formik.errors[EDIT_EMPLOYEE_FIELDS.POSTAL_CODE]
                                    ? <span className="error">{formik.errors[EDIT_EMPLOYEE_FIELDS.POSTAL_CODE]}</span>
                                    : null
                                }
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor={EDIT_EMPLOYEE_FIELDS.COUNTRY}
                                   className="block text-sm/6 font-medium text-gray-900">
                                Country
                            </label>
                            <div className="mt-2">
                                <Select
                                    data={ COUNTRIES }
                                    id={EDIT_EMPLOYEE_FIELDS.COUNTRY}
                                    name={EDIT_EMPLOYEE_FIELDS.COUNTRY}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values[EDIT_EMPLOYEE_FIELDS.COUNTRY]}
                                />
                                {formik.touched[EDIT_EMPLOYEE_FIELDS.COUNTRY] && formik.errors[EDIT_EMPLOYEE_FIELDS.COUNTRY]
                                    ? <span className="error">{formik.errors[EDIT_EMPLOYEE_FIELDS.COUNTRY]}</span>
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

export default EditEmployee;