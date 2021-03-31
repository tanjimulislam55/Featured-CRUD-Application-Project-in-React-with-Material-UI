// eslint-disable-next-line import/prefer-default-export
export const getDepartmentCollection = [
    { id: '1', title: 'Development' },
    { id: '2', title: 'Accounting' },
    { id: '3', title: 'HR' },
    { id: '4', title: 'Marketing' },
];

const KEYS = {
    employees: 'employees',
    employeeId: 'employeeId',
};

export function getAllEmployees() {
    if (localStorage.getItem(KEYS.employees) === null) {
        localStorage.setItem(KEYS.employees, JSON.stringify([]));
    }
    const employees = JSON.parse(localStorage.getItem(KEYS.employees));
    // map department id to department title
    return employees.map((employee) => ({
        ...employee,
        department: getDepartmentCollection[employee.departmentId - 1].title,
    }));
}

export function generateEmployeeId() {
    if (localStorage.getItem(KEYS.employeeId) === null) {
        localStorage.setItem(KEYS.employeeId, 0);
    }
    let id = localStorage.getItem(KEYS.employeeId);
    // eslint-disable-next-line no-plusplus
    localStorage.setItem(KEYS.employeeId, ++id);
    return id;
}

export function insertEmployee(data) {
    const employees = getAllEmployees();
    // eslint-disable-next-line no-param-reassign
    data.id = generateEmployeeId();
    employees.push(data);
    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function UpdateEmployee(data) {
    const employees = getAllEmployees();
    const recordIndex = employees.findIndex((x) => x.id === data.id);
    employees[recordIndex] = { ...data };
    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export function deleteEmployee(id) {
    let employees = getAllEmployees();
    employees = employees.filter((x) => x.id !== id);
    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}
