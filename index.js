 const EmployeeContainer = document.getElementById('employee-container')
const EmpTable = document.getElementById('EmpTable')
const EmpBody = document.getElementById('tbody')

let showEmployees = (EmpList) => {
    EmpBody.innerHTML = "";

    EmpList.forEach((emp)=> {

        const tRow = document.createElement('tr');

        const SNotd = document.createElement('td')
            SNotd.textContent = emp.id
        const Nametd = document.createElement('td')
            Nametd.textContent = emp.name;
        const Gendertd = document.createElement('td')
            Gendertd.textContent = emp.gender
        const Departmenttd = document.createElement('td')
            Departmenttd.textContent = emp.department;
        const Salarytd = document.createElement('td')
            Salarytd.textContent = emp.salary;
        
            tRow.append(
                SNotd ,
                Nametd,
                Gendertd,
                Departmenttd,
                Salarytd
            )
            EmpBody.appendChild(
                tRow
            )
            
            EmpTable.appendChild(
                EmpBody
            )
    })

}


const GetEmpData = async (sortValue , deptFilterValue , genderFiterValue) => {
    let URL = "https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?page=1&limit=10";
    
    if(sortValue) {
        URL += `&sort=salary&order=${sortValue}`;
    }
    if(deptFilterValue) {
        URL += `&filterBy=department&filterValue=${deptFilterValue}`;
    }
    if(genderFiterValue) {
        URL += `&filterBy=gender&filterValue=${genderFiterValue}`;
    }

    try {
        const response = await fetch(URL)
        const finalResponse = await response.json()
        showEmployees(finalResponse.data)
    } catch (error) {
        console.log(error)
    }
}

GetEmpData()

// Sorting Logic Here 
const sortOrder = document.getElementById('salary-sort')
sortOrder.addEventListener('change' , () => {
    GetEmpData(sortOrder.value , '' , '')
})


// Department Filter Logic here 
// Catch the element 
const deptFilter = document.getElementById('dept-filter')

deptFilter.addEventListener('change' , () => {
    GetEmpData('' , deptFilter.value , '')
})

// Gender Filter Logic here 
// Catch the element 
const genderFilter = document.getElementById('gender-filter')

genderFilter.addEventListener('change' , () => {
    GetEmpData('' , '' , genderFilter.value)
    // console.log(genderFilter.value)
})
