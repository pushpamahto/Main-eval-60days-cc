
const EmpBody = document.getElementById('tbody');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let currentPage = 1;
const limit = 10; 

const showEmployees = (EmpList) => {
    EmpBody.innerHTML = "";

    EmpList.forEach((emp, index) => {
        const tRow = document.createElement('tr');

        const SNotd = document.createElement('td');
        SNotd.textContent = (currentPage - 1) * limit + index + 1;

        const Nametd = document.createElement('td');
        Nametd.textContent = emp.name;

        const Gendertd = document.createElement('td');
        Gendertd.textContent = emp.gender;

        const Departmenttd = document.createElement('td');
        Departmenttd.textContent = emp.department;

        const Salarytd = document.createElement('td');
        Salarytd.textContent = emp.salary;

        tRow.append(SNotd, Nametd, Gendertd, Departmenttd, Salarytd);
        EmpBody.appendChild(tRow);
    });
};

const GetEmpData = async (sortValue, deptFilterValue, genderFiterValue, page) => {
    
    let URL = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10`;
    if(page) {
        let URL = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=${page}&limit=${limit}`;
    }
    
    if (sortValue) {
        URL += `&sort=salary&order=${sortValue}`;
    }
    if (deptFilterValue) {
        URL += `&filterBy=department&filterValue=${deptFilterValue}`;
    }
    if (genderFiterValue) {
        URL += `&filterBy=gender&filterValue=${genderFiterValue}`;
    }

    try {
        const response = await fetch(URL);
        const finalResponse = await response.json();
        showEmployees(finalResponse.data);
    } catch (error) {
        console.log(error);
    }
};

GetEmpData();

const sortOrder = document.getElementById('salary-sort');
sortOrder.addEventListener('change', () => {
    GetEmpData(sortOrder.value, '', '', currentPage);
});

const deptFilter = document.getElementById('dept-filter');
deptFilter.addEventListener('change', () => {
    GetEmpData('', deptFilter.value, '', currentPage);
});

const genderFilter = document.getElementById('gender-filter');
genderFilter.addEventListener('change', () => {
    GetEmpData('', '', genderFilter.value, currentPage);
});

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        GetEmpData('', '', '', currentPage);
    }
});

nextButton.addEventListener('click', () => {
    currentPage++;
    GetEmpData('', '', '', currentPage);
});
