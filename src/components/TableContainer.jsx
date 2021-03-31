import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    InputAdornment,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Toolbar,
    // eslint-disable-next-line prettier/prettier
    Typography
} from '@material-ui/core';
import { DeleteOutlined, Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/Edit';
import { useState } from 'react';
import EmployeeForm from '../pages/Employees/EmployeeForm';
import * as employeeService from '../services/employeeService';
import ConfirmDialog from './ConfirmDialog';
import Notification from './Notification';

const useStyles = makeStyles((theme) => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontweight: '600',
            color: 'white',
            backgroundColor: '#2e2e2e',
        },
        '& tbody td': {
            fontweight: '300',
        },
        '& tbody tr:hover': {
            cursor: 'pointer',
            backgroundColor: '#e0e0e0',
        },
    },
    searchInput: {
        width: '75%',
    },
    newButton: {
        position: 'absolute',
        right: '10px',
    },
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5),
    },
    dialogTitle: {
        paddingRight: '0px',
    },
}));

const headCells = [
    { id: 'fullName', label: 'Employee Name' },
    { id: 'email', label: 'Email Adress' },
    { id: 'mobile', label: 'Mobile Number' },
    { id: 'department', label: 'Department' },
    { id: 'actions', label: 'Actions' },
];

export default function TableContainer() {
    const { table, searchInput, newButton, dialogWrapper, dialogTitle } = useStyles();
    const pages = [5, 10, 25];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
    const [records, setRecords] = useState(employeeService.getAllEmployees());
    const [filterFn, setFilterFn] = useState({
        fn: (items) => items,
    });
    const [openPopup, setOpenPopup] = useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [notify, setNotify] = useState({
        isOpen: false,
        message: '',
        type: '',
    });
    const [confirmDialog, setConfirmDialog] = useState({
        isOpen: false,
        title: '',
        subTitle: '',
    });

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    const recordsAfterPagingAndSorting = () =>
        filterFn.fn(records).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
    // records.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

    const handleSearch = (e) => {
        setFilterFn({
            fn: (items) => {
                if (e.target.value === '') return items;
                return items.filter((x) => x.fullName.toLowerCase().includes(e.target.value));
            },
        });
    };

    const addOrEdit = (employee, resetForm) => {
        if (employee.id === 0) employeeService.insertEmployee(employee);
        else employeeService.UpdateEmployee(employee);
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        setRecords(employeeService.getAllEmployees());
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success',
        });
    };

    const OpenInPopup = (item) => {
        setRecordForEdit(item);
        setOpenPopup(true);
    };

    const onDelete = (id) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false,
        });
        employeeService.deleteEmployee(id);
        setRecords(employeeService.getAllEmployees());
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error',
        });
    };

    return (
        <>
            <Toolbar>
                <TextField
                    className={searchInput}
                    placeholder="Search Employee"
                    onChange={(e) => handleSearch(e)}
                    autoComplete="off"
                    autoFocus="true"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    className={newButton}
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        setOpenPopup(true);
                        setRecordForEdit(null);
                    }}
                >
                    Add New
                </Button>
            </Toolbar>

            <Table className={table}>
                <TableHead>
                    <TableRow>
                        {headCells.map((headCell) => (
                            <TableCell key={headCell.id}>{headCell.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {' '}
                    {recordsAfterPagingAndSorting().map((item) => (
                        <TableRow key={item.id}>
                            <TableCell> {item.fullName} </TableCell>
                            <TableCell> {item.email} </TableCell>
                            <TableCell> {item.mobile} </TableCell>
                            <TableCell> {item.department} </TableCell>
                            <TableCell>
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        OpenInPopup(item);
                                    }}
                                >
                                    <EditOutlinedIcon fontSize="small" />{' '}
                                </Button>
                                <Button
                                    color="secondary"
                                    onClick={() => {
                                        setConfirmDialog({
                                            isOpen: true,
                                            title: 'Are you sure to delete this record?',
                                            subTitle: "You can't undo this operation",
                                            onConfirm: () => {
                                                onDelete(item.id);
                                            },
                                        });
                                    }}
                                >
                                    {' '}
                                    <DeleteOutlined fontsize="small" />{' '}
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}{' '}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={pages}
                count={records.length}
                onChangePage={(e, newPage) => handleChangePage(e, newPage)}
                onChangeRowsPerPage={(e) => handleChangeRowsPerPage(e)}
            />

            <Dialog open={openPopup} maxWidth="md" classes={{ paper: dialogWrapper }}>
                <DialogTitle className={dialogTitle}>
                    <div style={{ display: 'flex' }}>
                        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                            Employee Form
                        </Typography>
                        <Button
                            color="secondary"
                            startIcon={<CloseIcon />}
                            onClick={() => setOpenPopup(false)}
                        />
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    {' '}
                    <EmployeeForm addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
                </DialogContent>
            </Dialog>

            <Notification notify={notify} setNotify={setNotify} />
            <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
        </>
    );
}
