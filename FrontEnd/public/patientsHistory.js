let patientsData=[];
fetch('http://localhost:5000/users/patientsHistory', {
}).then(res => {
    return res.json();
})
    .then(data => { 
       patientsData = JSON.parse(data);
       console.log(patientsData);
      
       for(let i = 0; i < patientsData.length; i++ ){
        creatPatient(patientsData[i].name,patientsData[i].age,patientsData[i].bloodType,patientsData[i].hla_a,patientsData[i].hla_b,patientsData[i].hla_dq,patientsData[i].hla_dr,patientsData[i].size);
        
       }

    })
    .catch(error => console.log(error))


    var row = 1;

    function creatPatient(patients_name,patients_age,patients_bloodType,hla_a,hla_b,hla_dq,hla_dr,size){

        console.log("hello  function")
        var Name = patients_name;
        var age = patients_age;
        var bt = patients_bloodType;
        var hla_A =hla_a;
        var hla_B =hla_b;
        var hla_DQ =hla_dq;
        var hla_DR =hla_dr;
        var Size =size;

        var display = document.querySelector(".display");

        var newRow = display.insertRow(row);


        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);
        var cell7 = newRow.insertCell(6);
        var cell8 = newRow.insertCell(7);

        cell1.innerHTML = Name;
        cell2.innerHTML = age;
        cell3.innerHTML = bt;
        cell1.innerHTML = Name;
        cell2.innerHTML = age;
        cell3.innerHTML = bt;
        cell4.innerHTML = hla_A;
        cell5.innerHTML = hla_B;
        cell6.innerHTML = hla_DQ;
        cell7.innerHTML = hla_DR;
        cell8.innerHTML = Size; 

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

