import {useEffect, useState} from "react";
import Moment from "react-moment";

import http from "../../services/http";
import { DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT, ATTENDANCE_CHECK_IN_CHECKOUT_STATUS } from '../../consts/miscallenous';
import Theme from "../theme/theme.tsx";
import Button from "../theme/Button/Button.tsx";


type IAttendances = {
    id: number,
    checkin_time: Date,
    checkout_time: Date,
    status: number,
    date: Date,
    employee_code: number,
    first_name: string,
    last_name: string,
    employee_id: number,
    email: string,
    designation: string,
}

const Attendances = () => {

    const [attendances, setAttendances] = useState<IAttendances[]>([]);

    useEffect(() => {
        http.get('/attendances/get-company-attendances')
            .then(response => {
                if(response && response.data) {
                    setAttendances(response.data);
                }
            })
            .catch(error => console.log("Error while getting attedances: ",error));
    }, []);

    return (
        <Theme>
            <div className="md:px-6 px-3 py-5 font-inter bg-f6f7f9">
                <div className="md:px-1.5">
                    <div className="sm:flex justify-between items-center">
                        <div className="sm:w-6/12 md:pr-3">
                            <h2 className="text-xl sm:leading-5 leading-3 text-212121 font-gilroyBold">Attendances</h2>
                        </div>
                        <div className="sm:pl-3 relative">
                            <Button type="button" onClick={() => {}}>Add Attendance Record</Button>
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
                                                className="py-3 pl-3 pr-3 text-left fs-13 font-medium text-757575 w-3/4">Employee
                                            </th>
                                            <th scope="col"
                                                className="py-3 pl-3 pr-3 fs-13 font-medium text-757575 text-left  min-w-[200px] w-[200px] lg:table-cell hidden">Date
                                            </th>
                                            <th scope="col"
                                                className="py-3 pl-3 pr-3 fs-13 font-medium text-757575 text-left lg:min-w-[250px] lg:w-[250px] min-w-[200px] w-[200px] md:table-cell hidden">
                                                Check-In
                                            </th>
                                            <th scope="col"
                                                className="py-3 pl-3 pr-3 fs-13 font-medium text-757575 text-left lg:min-w-[250px] lg:w-[250px] min-w-[200px] w-[200px] md:table-cell hidden">
                                                Check-Out
                                            </th>
                                            <th scope="col"
                                                className="py-3 pl-3 pr-3  fs-13 font-medium text-757575 text-left w-[150px]"> Actions
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">

                                        {
                                            attendances?.map(attendance => {

                                                return (
                                                    <tr key={attendance.id}
                                                        className="divide-x divide-gray-200 align-center xl:h-[70px]">

                                                        <td className="whitespace-nowrap py-3 pl-3 pr-3 fs-13 font-normal text-616161 md:min-w-[300px] md:w-[300px] sm:min-w-[250px] sm:w-[250px] min-w-[200px] w-[200px]">
                                                            <div className="">
                                                                <span
                                                                    className="font-medium">{attendance.first_name} {attendance.last_name}</span> &nbsp;&nbsp;&nbsp;

                                                                <br/>
                                                                <span style={{fontSize: '11px'}}>{attendance.email}</span>
                                                                <br/>
                                                                <span
                                                                    className="rounded-md bg-slate-200 py-0.5 px-2.5 border border-transparent text-xs text-black transition-all shadow-sm">
                                                                {attendance.designation}
                                                            </span>
                                                            </div>
                                                        </td>


                                                        <td className="whitespace-nowrap py-3 pl-3 pr-3 fs-13 font-medium text-616161 min-w-[200px] w-[200px] md:table-cell hidden">
                                                            <Moment format={DEFAULT_DATE_FORMAT} date={attendance.date}/>
                                                        </td>

                                                        <td className="whitespace-nowrap py-3 pl-3 pr-3 fs-13 text-616161 text-left lg:min-w-[150px] lg:w-[150px] min-w-[150px] w-[150px]">
                                                            <Moment format={DEFAULT_TIME_FORMAT} date={attendance.checkin_time}/>
                                                        </td>

                                                        <td className="whitespace-nowrap py-3 pl-3 pr-3 fs-13 text-616161 text-left lg:min-w-[150px] lg:w-[150px] min-w-[150px] w-[150px]">
                                                            <Moment format={DEFAULT_TIME_FORMAT} date={attendance.checkout_time} />
                                                        </td>

                                                        <td>
                                                            <button className="btn btn-primary" onClick={() => {
                                                            }}>View
                                                            </button>
                                                            <button className="btn btn-primary"
                                                                    onClick={() => {}}>Edit
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

        </Theme>
    )
}

export default Attendances;