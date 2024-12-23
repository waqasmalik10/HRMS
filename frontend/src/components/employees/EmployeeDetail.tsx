import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from '../common/ListItems';

import { useLocation } from "react-router-dom";
import http from '../../services/http';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function EmployeeDetail() {
    //   const [openEmployeeModel, setOpenEmployeeModel] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    //   const [modalState, setModalState] = React.useState("");
    //   const [employeeId, setEmployeeId] = React.useState(0);
    //   const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [employee, setEmployee] = React.useState({});

    const location = useLocation();
    // const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const employeeId = Number(queryParams.get("employeeid"));

    console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvv", queryParams.get("employeeid"));
    const toggleDrawer = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        console.log("employee id: ", employeeId);
        const getEmployeeData = async () => {
            const res = await http.get<any>(`/employees/employee/${employeeId}`);
            //employees/employee/{id}?id=21
            setEmployee(res.data);
            console.log(res.data);
        }
        getEmployeeData();
    }, []);

    //   const handleViewEmployee = (id: number) => {
    //     console.log(`employee ${id} to view`);
    //     setModalState("view");
    //     setEmployeeId(id);
    //     setOpenEmployeeModel(true);
    //   }

    //   const handleEditEmployee = (id: number) => {
    //     console.log(`employee ${id} to edit`);
    //     setModalState("edit");
    //     setEmployeeId(id);
    //     setOpenEmployeeModel(true);
    //   }

    //   const handleDeleteEmployee = (id: number) => {
    //     console.log(`employee ${id} to delete`);
    //     setOpenDeleteModal(true);
    //     setEmployeeId(id);
    //   }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Employee Detail
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {mainListItems}
                        <Divider sx={{ my: 1 }} />
                        {secondaryListItems}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <div>
                                <h2>Employee Data:</h2>
                                <ul align="left">
                                    {Object.keys(employee).map((key, index) => (
                                        <li key={index}>{`${key}...........${employee[key]}`}</li>

                                    ))}
                                </ul>
                            </div>
                            {/* <p>{JSON.stringify(employee)}</p> */}
                            {/* <Button variant="outlined" onClick={() => { 
                setEmployeeId(0);
                setModalState('add');
                setOpenEmployeeModel(true); 
                }}>Add Employees</Button> */}
                            {/* Chart */}
                            {/* <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid> */}
                            {/* Recent Deposits */}
                            {/* <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid> */}
                            {/* Recent Orders */}
                            {/* <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <EmployeesTable
                    handleViewEmployee={handleViewEmployee}
                    handleEditEmployee={handleEditEmployee}
                    handleDeleteEmployee={handleDeleteEmployee} />
                </Paper>
              </Grid> */}
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>

        </ThemeProvider>
    );
}