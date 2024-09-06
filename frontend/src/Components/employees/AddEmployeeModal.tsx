import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import http from '../../services/http';

interface AddEmployeeModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    modalState: string;
    employeeId: number;
}

export default function AddEmployeeModal({ open, setOpen, modalState, employeeId }: AddEmployeeModalProps) {
    //   const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const [joiningDate, setJoiningDate] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [fullTimeJoiningDate, setFullTimeJoiningDate] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [lastIncrementDate, setLastIncrementDate] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [cnicDOB, setCnicDOB] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [actualDOB, setActualDOB] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
    const [employee, setEmployee] = React.useState<any>();

    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const getEmployeeData = async () => {
        const response: any = await http.get<any>(`/employees/employee/${employeeId}`);
        setEmployee(response.data);
        console.log("employee data: ", employee);
        if(employee){
            setJoiningDate(dayjs(employee.joining_date));
            setFullTimeJoiningDate(dayjs(employee.full_time_joining_date));
            setLastIncrementDate(dayjs(employee.last_increment_date));
            setCnicDOB(dayjs(employee.id_card_date_of_birth));
            setActualDOB(dayjs(employee.actual_date_of_birth));
        }
        
    }

    React.useEffect(() => {
        if (modalState === 'edit') {
            getEmployeeData();
        }
        console.log("modalstate: ", modalState);
        if(modalState==='add'){
            console.log("add new employee");
            setEmployee(null);
        }
    }, [modalState, employeeId])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const employeeData = {
            "employee_id": parseInt((data.get('employee_id') || '').toString()),
            "email": data.get('email'),
            "password": data.get('password'),
            "first_name": data.get('first_name'),
            "last_name": data.get('last_name'),
            "bank_name": data.get('bank_name'),
            "bank_account_title": data.get('bank_account_title'),
            "bank_branch_code": data.get('bank_branch_code'),
            "bank_account_number": data.get('bank_account_number'),
            "bank_iban_number": data.get('bank_iban_number'),
            "joining_date": joiningDate,//data.get('joining_date'),
            "full_time_joining_date": fullTimeJoiningDate,//,data.get('full_time_joining_date'),
            "initial_base_salary": parseInt((data.get('initial_base_salary') || '').toString()),
            "current_base_salary": parseInt((data.get('current_base_salary') || '').toString()),
            "last_increment_date": lastIncrementDate,//data.get('last_increment_date'),
            "last_increment_amount": parseInt((data.get('last_increment_amount') || '').toString()),
            "home_address": data.get('home_address'),
            "city": data.get('city'),
            "state": data.get('state'),
            "zip_code": data.get('zip_code'),
            "country": data.get('country'),
            "designation": data.get('designation'),
            "cnic": data.get('cnic'),
            "id_card_date_of_birth": cnicDOB,//data.get('id_card_date_of_birth'),
            "actual_date_of_birth": actualDOB, //data.get('actual_date_of_birth'),
            "hobbies": data.get('hobbies'),
            "vehicle_registration_number": data.get('vehicle_registration_number'),
            "isActive": true
        }

        console.log(">>>>><<<<<><><><", employeeData);

        const res = await http.post<any>('/employees/create', employeeData);

        console.log("resspspspspsps", res);
    }

    return (
        <React.Fragment>
            {/* <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
            <Button onClick={handleClickOpen('body')}>scroll=body</Button> */}
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">{employee ? "Edit": "Add"} Employee</DialogTitle>

                <DialogContent dividers={scroll === 'paper'}>
                    {/* <DialogContentText
                            id="scroll-dialog-description"
                            ref={descriptionElementRef}
                            tabIndex={-1}
                        > */}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="employee_id"
                            label="Employee id"
                            name="employee_id"
                            autoFocus
                            value={(employee) ? employee.employee_id : ''}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={(employee) ? employee.email : ''}
                            // autoFocus
                        />
                        {modalState==='add' &&
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="first_name"
                            label="First Name"
                            name="first_name"
                            value={(employee) ? employee.first_name : ''}

                            // autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="last_name"
                            label="Last Name"
                            name="last_name"
                            value={(employee) ? employee.last_name : ''}

                            // autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="bank_name"
                            label="Bank Name"
                            name="bank_name"
                            value={(employee) ? employee.bank_name : ''}
                            // autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="bank_account_title"
                            label="Bank Account Title"
                            name="bank_account_title"
                            value={(employee) ? employee.bank_account_title : ''}
                            // autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="bank_branch_code"
                            label="Bank Branch Code"
                            name="bank_branch_code"
                            value={(employee) ? employee.bank_branch_code : ''}
                            // autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="bank_account_number"
                            label="Bank Account Number"
                            name="bank_account_number"
                            value={(employee) ? employee.bank_account_number : ''}
                            // autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="bank_iban_number"
                            label="Bank Iban Number"
                            name="bank_iban_number"
                            value={(employee) ? employee.bank_iban_number : ''}
                            // autoFocus
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                    label="Joining Date"
                                    name="joining_date"
                                    // autoFocus
                                    value={joiningDate}
                                    onChange={(newValue) => setJoiningDate(newValue)}
                                />
                                <DatePicker
                                    label="Full Time Joining Date"
                                    name="full_time_joining_date"
                                    // autoFocus
                                    value={fullTimeJoiningDate}
                                    onChange={(newValue) => setFullTimeJoiningDate(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="initial_base_salary"
                            label="Initial Base Salary"
                            name="initial_base_salary"
                            value={(employee) ? employee.initial_base_salary : ''}
                            // autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="current_base_salary"
                            label="Current Base Salary"
                            name="current_base_salary"
                            value={(employee) ? employee.current_base_salary : ''}
                            // autoFocus
                        />

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                    label="Last Increment Date"
                                    name="last_increment_date"
                                    // autoFocus
                                    value={lastIncrementDate}
                                    onChange={(newValue) => setLastIncrementDate(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="last_increment_amount"
                            label="Last Increment Amount"
                            name="last_increment_amount"
                            value={(employee) ? employee.last_increment_amount : ''}
                            // autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="home_address"
                            label="Home Address"
                            name="home_address"
                            value={(employee) ? employee.home_address : ''}
                            // autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="city"
                            label="City"
                            name="city"
                            value={(employee) ? employee.city : ''}
                            // autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="state"
                            label="State"
                            name="state"
                            value={(employee) ? employee.state : ''}
                            // autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="zip_code"
                            label="Zip Code"
                            name="zip_code"
                            value={(employee) ? employee.zip_code : ''}
                            // autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="country"
                            label="Country"
                            name="country"
                            value={(employee) ? employee.country : ''}
                            // autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="designation"
                            label="Designation"
                            name="designation"
                            value={(employee) ? employee.designation : ''}
                            // autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="cnic"
                            label="CNIC"
                            name="cnic"
                            value={(employee) ? employee.cnic : ''}
                            // autoFocus
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                    label="Id card Date of Birth"
                                    name="id_card_date_of_birth"
                                    // autoFocus
                                    value={cnicDOB}
                                    onChange={(newValue) => setCnicDOB(newValue)}
                                />
                                <DatePicker
                                    label="Actual Date of Birth"
                                    name="actual_date_of_birth"
                                    // autoFocus
                                    value={actualDOB}
                                    onChange={(newValue) => setActualDOB(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="hobbies"
                            label="Hobbies"
                            name="hobbies"
                            value={(employee) ? employee.hobbies : ''}
                            // autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="vehicle_registration_number"
                            label="Vehicle Registration Number"
                            name="vehicle_registration_number"
                            value={(employee) ? employee.vehicle_registration_number : ''}
                            // autoFocus
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {employee ? "Edit": "Add"} Employee
                        </Button>

                    </Box>

                    {/* </DialogContentText> */}
                </DialogContent>
                {/* <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit" >Add</Button>

                    </DialogActions> */}

            </Dialog>
        </React.Fragment>
    );
}