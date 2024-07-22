import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

interface AddEmployeeModalProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddEmployeeModal({ open, setOpen }: AddEmployeeModalProps) {
    //   const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log("data:::",data.getAll(''));
        console.log({
            EmployeeId: data.get('employee_id'),
            email: data.get('email'),
            password: data.get('password'),

        });

    }

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen('paper')}>scroll=paper</Button>
            <Button onClick={handleClickOpen('body')}>scroll=body</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Add Employee</DialogTitle>

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
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="first_name"
                            label="First Name"
                            name="first_name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="last_name"
                            label="Last Name"
                            name="last_name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="bank_name"
                            label="Bank Name"
                            name="bank_name"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="bank_account_title"
                            label="Bank Account Title"
                            name="bank_account_title"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="bank_branch_code"
                            label="Bank Branch Code"
                            name="bank_branch_code"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="bank_account_number"
                            label="Bank Account Number"
                            name="bank_account_number"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="bank_iban_number"
                            label="Bank Iban Number"
                            name="bank_iban_number"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="full_time_joining_date"
                            label="Full Time Joining Date"
                            name="full_time_joining_date"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="initial_base_salary"
                            label="Initial Base Salary"
                            name="initial_base_salary"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="current_base_salary"
                            label="Current Base Salary"
                            name="current_base_salary"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="last_increment_date"
                            label="Last Increment Date"
                            name="last_increment_date"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="last_increment_amount"
                            label="Last Increment Amount"
                            name="last_increment_amount"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="home_address"
                            label="Home Address"
                            name="home_address"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="city"
                            label="City"
                            name="city"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="state"
                            label="State"
                            name="state"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="zip_code"
                            label="Zip Code"
                            name="zip_code"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="country"
                            label="Country"
                            name="country"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="designation"
                            label="Designation"
                            name="designation"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="cnic"
                            label="CNIC"
                            name="cnic"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="id_card_date_of_birth"
                            label="Id card Date of Birth"
                            name="id_card_date_of_birth"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="actual_date_of_birth"
                            label="Actual Date of Birth"
                            name="actual_date_of_birth"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="hobbies"
                            label="Hobbies"
                            name="hobbies"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="vehicle_registration_number"
                            label="Vehicle Registration Number"
                            name="vehicle_registration_number"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add Employee
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