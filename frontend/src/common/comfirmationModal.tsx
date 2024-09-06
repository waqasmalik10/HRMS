import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import http from '../services/http';
import { useNavigate } from 'react-router-dom';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    modalText: string;
    employeId: number;
}

export default function AlertDialog({ open, setOpen, modalText, employeId }: Props) {
    // const [open, setOpen] = React.useState(false);

    const navigate = useNavigate();

    const handleYes = async () => {
        try {
            console.log("deleting enployee id ", employeId);
            const res = await http.patch<any>(`/employees/deactivate/${employeId}`);
            navigate(0);
            console.log(res);
        } catch (err) {
            console.log("error in getting employees: ", err);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Alert"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {modalText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleYes} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}