const employeeBody = document.getElementById('employee-body');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
let currentPage = 1;
const limit = 10; 

const showEmployees = (employeeList) => {
    employeeBody.innerHTML = "";

    employeeList.forEach((emp, index) => {
        const tRow = document.createElement('tr');

        const sNoTd = document.createElement('td');
        sNoTd.textContent = (currentPage - 1) * limit + index + 1;

        const nameTd = document.createElement('td');
        nameTd.textContent = emp.name;

        const genderTd = document.createElement('td');
        genderTd.textContent = emp.gender;

        const departmentTd = document.createElement('td');
        departmentTd.textContent = emp.department;

        const salaryTd = document.createElement('td');
        salaryTd.textContent = emp.salary;

        tRow.append(sNoTd, nameTd, genderTd, departmentTd, salaryTd);
        employeeBody.appendChild(tRow);
    });
};

const getEmployeeData = async (sortValue, departmentFilterValue, genderFilterValue, page) => {
    
    let URL = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10`;
    if(page) {
        URL = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}&limit=${limit}`;
    }
    
    if (sortValue) {
        URL += `&sort=salary&order=${sortValue}`;
    }
    if (departmentFilterValue) {
        URL += `&filterBy=department&filterValue=${departmentFilterValue}`;
    }
    if (genderFilterValue) {
        URL += `&filterBy=gender&filterValue=${genderFilterValue}`;
    }

    try {
        const response = await fetch(URL);
        const finalResponse = await response.json();
        showEmployees(finalResponse.data);
    } catch (error) {
        console.log(error);
    }
};

getEmployeeData();

const salarySortFilter = document.getElementById('salary-sort-filter');
salarySortFilter.addEventListener('change', () => {
    getEmployeeData(salarySortFilter.value, '', '', currentPage);
});

const departmentFilter = document.getElementById('department-filter');
departmentFilter.addEventListener('change', () => {
    getEmployeeData('', departmentFilter.value, '', currentPage);
});

const genderFilter = document.getElementById('gender-filter');
genderFilter.addEventListener('change', () => {
    getEmployeeData('', '', genderFilter.value, currentPage);
});

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        getEmployeeData('', '', '', currentPage);
    }
});

nextButton.addEventListener('click', () => {
    currentPage++;
    getEmployeeData('', '', '', currentPage);
});
