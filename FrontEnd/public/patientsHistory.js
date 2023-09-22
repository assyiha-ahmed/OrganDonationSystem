let patientsData=[];
fetch('http://localhost:5000/users/patientsHistory', {
}).then(res => {
    return res.json();
})
    .then(data => { 
       patientsData = JSON.parse(data);
       console.log(patientsData);
      
       for(let i = 0; i < patientsData.length; i++ ){
        creatPatient(patientsData[i].name,patientsData[i].age,patientsData[i].bloodType);
        
       }

    })
    .catch(error => console.log(error))




    function creatPatient(patients_name,patients_age,patients_bloodType){

        console.log("hello  function")
        var Name = patients_name;
        var age = patients_age;
        var bt = patients_bloodType;

        var display = document.querySelector(".display");

        var newRow = display.insertRow(row);

        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);

        cell1.innerHTML = Name;
        cell2.innerHTML = age;
        cell3.innerHTML = bt;

        row++;

    }



// function creatpatient(patient_name,patient_age,patient_bt){

// const patientInfoDiv = document.createElement("div");
// patientInfoDiv.classList.add("patient-info");

// const patientTitle = document.createElement("p");
// patientTitle.classList.add("patient-title");
// patientTitle.textContent = "Patient";

// const patientNameDiv = document.createElement("div");
// patientNameDiv.classList.add("patient-name", "info");
// const patientNameSpan = document.createElement("span");
// patientNameSpan.classList.add("spans");
// patientNameSpan.textContent = "patient Name: ";
// const patientName = document.createTextNode(patient_name);
// patientNameDiv.appendChild(patientNameSpan);
// patientNameDiv.appendChild(patientName);

// const patientAgeDiv = document.createElement("div");
// patientAgeDiv.classList.add("patient-age", "info");
// const patientAgeSpan = document.createElement("span");
// patientAgeSpan.classList.add("spans");
// patientAgeSpan.textContent = "Age: ";
// const patientAge = document.createTextNode(patient_age);
// patientAgeDiv.appendChild(patientAgeSpan);
// patientAgeDiv.appendChild(patientAge);

// const patientBtDiv = document.createElement("div");
// patientBtDiv.classList.add("patient-bt", "info");
// const patientBtSpan = document.createElement("span");
// patientBtSpan.classList.add("spans");
// patientBtSpan.textContent = "Blood Type: ";
// const patientBt = document.createTextNode(patient_bt);
// patientBtDiv.appendChild(patientBtSpan);
// patientBtDiv.appendChild(patientBt);

// patientInfoDiv.appendChild(patientTitle);
// patientInfoDiv.appendChild(document.createElement("hr"));
// patientInfoDiv.appendChild(patientNameDiv);
// patientInfoDiv.appendChild(patientAgeDiv);
// patientInfoDiv.appendChild(patientBtDiv);

// const patientsContainer = document.querySelector(".patient-container");
// patientsContainer.appendChild(patientInfoDiv);
// }

