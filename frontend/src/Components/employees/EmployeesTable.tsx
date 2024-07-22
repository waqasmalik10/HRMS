
import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../common/Title';
import { useEffect, useState } from 'react';
import http from "../../services/http/index"

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function EmployeesTable() {

  const [employees, setEmployees] = useState<any[]>([]);

  const getEmployeesData = async () => {
    try {
      const res = await http.get<any>('/employees?page=1&limit=10');
      setEmployees(res.data.data)
      console.log(res);
    } catch (err) {
      console.log("error in getting employees: ", err);
    }
  }

  useEffect(() => {
    getEmployeesData();
  }, []);
  return (
    <React.Fragment>
      <Title>Employees</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Designation</TableCell>
            <TableCell>Joining Date</TableCell>
            <TableCell align="right">CNIC</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Country</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.first_name}</TableCell>
              <TableCell>{employee.last_name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.designation}</TableCell>
              <TableCell>{employee.joining_date}</TableCell>
              <TableCell align="right">{employee.cnic}</TableCell>
              <TableCell>{employee.city}</TableCell>
              <TableCell>{employee.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}