import Moment from 'react-moment';
import Theme from '../theme/theme';
import Button from '../theme/Button/Button';
import Modal from '../theme/Modal/Modal';
import AddNewEmployee from "./AddNewEmployee";
import {useEffect, useState} from "react";
import http from "../../services/http";

interface IEmployeeType {
    first_name: string;
    last_name: string;
    email: string;
    isActive: boolean;
    employee_code: string,
    designation: string,
    joining_date: Date,
    full_time_joining_date: Date;
    current_base_salary: number;
    medical_allowance_amount: number;
    last_increment_amount: number;
    last_increment_date: Date;
}

const Employees = () => {

    const [showModal, setShowModal] = useState(false);
    const [employees, setEmployees] = useState<IEmployeeType[]>([]);

    const DATE_FORMAT = "MMM DD, YYYY";

    useEffect(() => {
        http.get("/employees")
            .then(response => {
                setEmployees(response.data.data);
            })
            .catch(err => console.log('error while loading employees', err));
    }, []);

    return (
        <Theme>
            <div className="md:px-6 px-3 py-5 font-inter bg-f6f7f9">
                <div className="md:px-1.5">
                    <div className="sm:flex justify-between items-center">
                        <div className="sm:w-6/12 md:pr-3">
                            <h2 className="text-xl sm:leading-5 leading-3 text-212121 font-gilroyBold">Employees</h2>
                        </div>
                        <div className="sm:pl-3 relative">
                            <Button type="button" onClick={() => setShowModal(true)}>Add Employee</Button>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-7">
                        <form className="w-1/2 md:block hidden">
                            <div className="relative flex items-center py-2 px-4 border rounded border-e0e0e0 bg-white">
                                <input className="fs-13 font-medium leading-3 text-9e9e9e w-full pl-8 h-6" type="text"
                                       name="search" placeholder="Search"/>
                                <img className="absolute" src="images/search.png" alt="Search"/>
                            </div>
                        </form>
                    </div>
                </div>
                <form className="w-full md:hidden mt-5">
                    <div className="relative flex items-center py-2 px-4 border rounded border-e0e0e0 bg-white">
                        <input className="fs-13 font-medium leading-3 text-9e9e9e w-full sm:pl-8 pl-5 h-6" type="text"
                               name="search" placeholder="Placeholder (Optional)"/>
                        <img className="absolute" src="images/search.png"/>
                    </div>
                </form>

                <div className=" shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <div className="mt-6 flex flex-col">
                        <div className="-my-2 overflow-x-auto">
                            <div className="inline-block min-w-full py-2 align-middle">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-t-lg">
                                    <table
                                        className="min-w-full divide-y divide-gray-300 fs-13 font-medium search-table lg:w-auto">
                                        <thead className="bg-gray-50">
                                        <tr className="divide-x divide-gray-200">
                                            <th scope="col"
                                                className="py-3 pl-3 pr-3 text-left fs-13 font-medium text-757575 w-3/4">Name
                                            </th>
                                            <th scope="col"
                                                className="py-3 pl-3 pr-3 text-left fs-13 font-medium text-757575 w-3/4">Employee
                                                Code
                                            </th>
                                            <th scope="col"
                                                className="py-3 pl-3 pr-3 fs-13 font-medium text-757575 text-left lg:min-w-[250px] lg:w-[250px] min-w-[200px] w-[200px] md:table-cell hidden">
                                                Joining Date (Full time)
                                            </th>
                                            <th scope="col"
                                                className="py-3 pl-3 pr-3 fs-13 font-medium text-757575 text-left lg:min-w-[250px] lg:w-[250px] min-w-[200px] w-[200px] md:table-cell hidden">
                                                Salary (PKR)
                                            </th>
                                            <th scope="col"
                                                className="py-3 pl-3 pr-3 fs-13 font-medium text-757575 text-left  min-w-[200px] w-[200px] lg:table-cell hidden">
                                                Status
                                            </th>
                                            <th scope="col"
                                                className="py-3 pl-3 pr-3  fs-13 font-medium text-757575 text-left w-[150px]"> Actions<img
                                                src="images/down-arrow.png" className="inline-block  pl-2" alt="arrow"/>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">

                                        {
                                            employees.map(employee => {

                                                return (
                                                    <tr key={employee.employee_code}
                                                        className="divide-x divide-gray-200 align-center xl:h-[70px]">

                                                        <td className="whitespace-nowrap py-3 pl-3 pr-3 fs-13 font-normal text-616161 md:min-w-[300px] md:w-[300px] sm:min-w-[250px] sm:w-[250px] min-w-[200px] w-[200px]">
                                                            <div className="">
                                                                <span className="font-medium">{employee.first_name} {employee.last_name}</span> &nbsp;&nbsp;&nbsp;
                                                                {
                                                                    employee.isActive
                                                                        ? <span
                                                                            className="py-0.5 px-2.5 text-xs font-medium leading-3 rounded-full text-209d7d bg-d5f7eb">Active</span>
                                                                        : <span
                                                                            className="py-0.5 px-2.5 text-xs font-medium leading-3 rounded-full text-red-200 bg-red-500">Deactived</span>

                                                                }
                                                                <br/>
                                                                <span style={{fontSize: '11px'}}>{employee.email}</span>
                                                                <br/>
                                                                <span
                                                                    className="rounded-md bg-slate-200 py-0.5 px-2.5 border border-transparent text-xs text-black transition-all shadow-sm">
                                                                    {employee.designation}
                                                                </span>
                                                            </div>
                                                        </td>

                                                        <td className="whitespace-nowrap py-3 pl-3 pr-3 fs-13 font-medium text-616161 min-w-[200px] w-[200px] lg:table-cell hidden">
                                                            {employee.employee_code}
                                                        </td>
                                                        <td className="whitespace-nowrap py-3 pl-3 pr-3 fs-13 font-medium text-616161 min-w-[200px] w-[200px] md:table-cell hidden">
                                                            <Moment format={DATE_FORMAT}
                                                                    date={employee.full_time_joining_date}/>
                                                            {employee.joining_date && <><br/><span
                                                                style={{fontSize: "10px"}}>Originally Joined: <Moment
                                                                format={DATE_FORMAT}
                                                                date={employee.joining_date}/></span></>}
                                                        </td>
                                                        <td className="whitespace-nowrap py-3 pl-3 pr-3 fs-13 font-medium text-616161 min-w-[200px] w-[200px] lg:table-cell hidden">
                                                            {
                                                                new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(
                                                                    employee.current_base_salary+employee.medical_allowance_amount,
                                                                )
                                                            }
                                                            <br />
                                                            <span style={{fontSize: "10px"}}>
                                                                Base Salary: {new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 3}).format(
                                                                        employee.current_base_salary
                                                                    )}
                                                                <br />
                                                                Medical Allowance: {new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 3}).format(
                                                                        employee.medical_allowance_amount
                                                                    )}
                                                                <br />
                                                                Last Increment: <Moment format={DATE_FORMAT} date={employee.last_increment_date} />

                                                            </span>
                                                        </td>
                                                        <td className="whitespace-nowrap py-3 pl-3 pr-3 fs-13 text-616161 sm:text-right text-left lg:min-w-[290px] lg:w-[290px] min-w-[150px] w-[150px]">
                                                            <button
                                                                className="text-sm font-medium leading-5 p-2 text-ryzeoBlue inline-block flex items-center">
                                                                <img className="mr-1" src="images/edit-blue.png"/>
                                                                Edit
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );

                                            })
                                        }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex justify-center sm:justify-end items-center px-5 bg-white border-t rounded-b-lg py-5">
                        <a className="w-6 h-6 mr-2.5 rounded flex justify-center items-center border border-bdbdbd page-active"
                           href="#/">
                            <img src="images/prev.png"/>
                        </a>
                        <a className="w-6 h-6 mr-2.5 rounded flex justify-center items-center border text-sm font-medium leading-3 focus:text-white text-bdbdbd border-bdbdbd page-active"
                           href="#/">
                            1
                        </a>
                        <a className="w-6 h-6 mr-2.5 rounded flex justify-center items-center border text-sm font-medium leading-3 focus:text-white text-bdbdbd border-bdbdbd page-active"
                           href="#/">
                            2
                        </a>
                        <a className="w-6 h-6 mr-2.5 rounded flex justify-center items-center border text-sm font-medium leading-3 focus:text-white text-bdbdbd border-bdbdbd page-active"
                           href="#/">
                            3
                        </a>
                        <a className="w-6 h-6 mr-2.5 rounded flex justify-center items-center border text-sm font-medium leading-3 focus:text-white text-bdbdbd border-bdbdbd page-active"
                           href="#/">
                            ...
                        </a>
                        <a className="w-6 h-6 rounded flex justify-center items-center border border-bdbdbd page-active"
                           href="#/">
                            <img src="images/next.png"/>
                        </a>
                    </div>
                </div>
            </div>


            <div id="upload-contact"
                 className="leaveReview_modal z-40 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                <div className="w-full max-w-md mx-auto px-6">
                    <div className="bg-white p-5 rounded-lg">
                        <div
                            className="relative border border-dashed border-ryzeo-blue flex justify-center items-center sm:pt-16 pt-6 sm:pb-12 pb-6">
                            <div className="sm:px-20">
                                <div>
                                    <img className="mx-auto" src="images/upload2.png"/>
                                </div>
                                <p className="text-sm font-medium leading-4 text-212121 mt-6 text-center">Drag and drop
                                    files to
                                    upload or</p>
                                <div className="px-0.5">
                                    <button
                                        className="text-[13px] font-medium leading-4 text-white rounded flex items-center justify-center py-3 px-2 w-full mt-2.5 ryeo-blue-bg">
                                        <img src="images/plus.png"/>
                                        <span className="ml-3">Select files to upload</span>
                                    </button>
                                </div>
                            </div>
                            <input className="absolute top-0 w-full h-full opacity-0 z-50 cursor-pointer" type="file"
                                   name="upload"/>
                        </div>
                        <p className="text-sm font-normal leading-4 text-757575 my-4">Single upload file should not be
                            more than
                            10MB. Only the .xls, .xlsx file types are allowed</p>
                        <div>
                            <button
                                className="w-full border border-[#cfcfcf] py-1.5 flex justify-center items-center z-50 rounded text-[13px] font-medium leading-4 text-616161">Cancel
                            </button>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="opacity-30 bg-black image"></div>
                </div>
                <a href="#/"
                   className="fixed top-0 bottom-0 left-0 right-0 opacity-0 block z-20 cursor-pointer closeoverlay"></a>


                <Modal
                    open={showModal}
                    setOpen={setShowModal}
                    title="Add Employee"
                    subTitle="Fill up the form and submit to add employee."
                    showCloseButton={false}
                >
                    <AddNewEmployee/>

                </Modal>

            </div>
        </Theme>
    );
}

export default Employees;