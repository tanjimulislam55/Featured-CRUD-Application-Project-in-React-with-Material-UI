import DateFnsUtils from '@date-io/date-fns';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    // eslint-disable-next-line prettier/prettier
    TextField
} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useEffect, useState } from 'react';
import * as employeeService from '../../services/employeeService';

const initialFormValues = {
    id: 0,
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    gender: '',
    departmentId: '',
    hireDate: new Date(),
    isPermanent: false,
};

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1),
        },
    },
    button: {
        margin: theme.spacing(0.5),
    },
    label: {
        textTransform: 'none',
    },
}));

export default function EmployeeForm({ addOrEdit, recordForEdit }) {
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const { root, button, label } = useStyles();

    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

    const validate = () => {
        const temp = {};
        temp.fullName = values.fullName ? '' : 'This field is required';
        temp.email = /$^|.+@.+..+/.test(values.email) ? '' : 'Email is not valid.';
        temp.departmentId = values.departmentId.length !== 0 ? '' : 'This field is required.';
        temp.mobile = values.mobile.length > 10 ? '' : 'Minimum 11 numbers is required.';
        setErrors({
            ...temp,
        });

        return Object.values(temp).every((x) => x === '');
    };

    const resetForm = () => {
        setValues(initialFormValues);
        setErrors({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    };

    useEffect(() => {
        if (recordForEdit != null) {
            setValues({ ...recordForEdit });
        }
    }, [recordForEdit]);

    return (
        <form className={root} autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
            <Grid container>
                <Grid item xs={6}>
                    <TextField
                        variant="outlined"
                        name="fullName"
                        label="Full Name"
                        value={values.fullName}
                        onChange={(e) => handleInputChange(e)}
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...(errors.fullName && { error: true, helperText: errors.fullName })}
                    />
                    <TextField
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...(errors.email && { error: true, helperText: errors.email })}
                        variant="outlined"
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <TextField
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...(errors.mobile && { error: true, helperText: errors.mobile })}
                        variant="outlined"
                        name="mobile"
                        label="Mobile"
                        value={values.mobile}
                        onChange={(e) => handleInputChange(e)}
                    />
                    <TextField
                        variant="outlined"
                        name="city"
                        label="City"
                        value={values.city}
                        onChange={(e) => handleInputChange(e)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl>
                        <FormLabel>Gender</FormLabel>
                        <RadioGroup
                            row
                            name="gender"
                            value={values.gender}
                            onChange={(e) => handleInputChange(e)}
                        >
                            <FormControlLabel
                                key="male"
                                value="male"
                                control={<Radio />}
                                label="Male"
                            />
                            <FormControlLabel
                                key="female"
                                value="female"
                                control={<Radio />}
                                label="Female"
                            />
                            <FormControlLabel
                                key="other"
                                value="other"
                                control={<Radio />}
                                label="Other"
                            />
                        </RadioGroup>
                    </FormControl>

                    <FormControl
                        variant="outlined"
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        {...(errors.departmentId && { error: true })}
                    >
                        <InputLabel>Department</InputLabel>
                        <Select
                            name="departmentId"
                            label="Department"
                            value={values.departmentId}
                            onChange={(e) => handleInputChange(e)}
                        >
                            <MenuItem value="">None</MenuItem>
                            {employeeService.getDepartmentCollection.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.title}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{errors.departmentId}</FormHelperText>
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            // name="hireDate"
                            value={values.hireDate}
                            inputVariant="outlined"
                            format="dd/MM/yyyy"
                            label="Hire Date"
                            onChange={(e) =>
                                setValues({
                                    ...values,
                                    hireDate: e,
                                })
                            }
                        />
                    </MuiPickersUtilsProvider>
                    <FormControl>
                        <FormControlLabel
                            value={values.isPermanent}
                            label="Permanent Employee"
                            control={
                                <Checkbox
                                    name="isPermanent"
                                    color="secondary"
                                    checked={values.isPermanent}
                                    onChange={(e) =>
                                        setValues({
                                            ...values,
                                            [e.target.name]: e.target.checked,
                                        })
                                    }
                                />
                            }
                        />
                    </FormControl>
                    <div>
                        <Button
                            className={button}
                            variant="contained"
                            type="submit"
                            text="Submit"
                            size="large"
                            color="primary"
                        >
                            Submit
                        </Button>
                        <Button
                            className={label}
                            variant="contained"
                            text="Reset"
                            size="large"
                            color="default"
                            onClick={resetForm}
                        >
                            Reset
                        </Button>
                    </div>
                </Grid>
            </Grid>
        </form>
    );
}
