const baseUrl = "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees"
let currentPage = 1;
let totalPages = 1;

const departmentFilter = document.getElementById("department");
const genderFilter = document.getElementById("gender");
const sortOption = document.getElementById("sort");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const tableBody = document.getElementById("employeeData");

async function fetchEmployees(){
    const url = `${baseUrl}?page=${currentPage}&limit=10`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function populateTable(){
    const employees = await fetchEmployees();
    totalPages = Math.ceil(employees.length / 10);

    tableBody.innerHTML = "";

    employees.forEach((employees, index) =>{
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index+1}</td>
            <td>${employees.name}</td>
            <td>${employees.gender}</td>
            <td>${employees.department}</td>
            <td>${employees.salary}</td>
         `;
         tableBody.appendChild(row);
    })

    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === totalPages;
}

departmentFilter.addEventListener("change",populateTable);
genderFilter.addEventListener("change",populateTable);
sortOption.addEventListener("change",populateTable);
prevPageBtn.addEventListener("click", () =>{
    if(currentPage > 1){
        currentPage--;
        populateTable();
    }
})
nextPageBtn.addEventListener("click", () =>{
    if(currentPage < totalPages){
        currentPage++;
        populateTable();
    }
})

populateTable();
