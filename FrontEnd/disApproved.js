let disAprovedData = [];


fetch('http://localhost:5000/users/disApproved', {
}).then(res => {
    return res.json();
})
.then(data => {
    disapproved = JSON.parse(data)

    console.log(disapproved)

    for (let i = 0; i < disapproved.length - 1; i += 2) {
        let donordisapproved = disapproved[i];
        let patientdisapproved = disapproved[i+1];

        // console.log(donorApproved,patientApproved);

        creatDisapproved(donordisapproved.name, donordisapproved.age, donordisapproved.bloodType, patientdisapproved.name, patientdisapproved.age, patientdisapproved.bloodType);
    }
})

.catch(error => console.log(error))



function creatDisapproved(donor_name, donor_age,donor_bt,patient_name, patient_age,patient_bt){
     // Create a new single match div
const singleMatchDiv = document.createElement("div");
singleMatchDiv.classList.add("singl-match");

// Create donor-patient div
const donorPatientDiv = document.createElement("div");
donorPatientDiv.classList.add("donor-patient");

// Create donor-info div
const donorInfoDiv = document.createElement("div");
donorInfoDiv.classList.add("donor-info");

// Create donor-title paragraph
const donorTitle = document.createElement("p");
donorTitle.classList.add("donor-title");
donorTitle.textContent = "Donor";

// Create donor-name div
const donorNameDiv = document.createElement("div");
donorNameDiv.classList.add("donor-name", "info");
const donorNameSpan = document.createElement("span");
donorNameSpan.classList.add("spans");
donorNameSpan.textContent = "Donor Name: ";
const donorName = document.createTextNode(donor_name);
donorNameDiv.appendChild(donorNameSpan);
donorNameDiv.appendChild(donorName);

// Create donor-age div
const donorAgeDiv = document.createElement("div");
donorAgeDiv.classList.add("donor-age", "info");
const donorAgeSpan = document.createElement("span");
donorAgeSpan.classList.add("spans");
donorAgeSpan.textContent = "Age: ";
const donorAge = document.createTextNode(donor_age);
donorAgeDiv.appendChild(donorAgeSpan);
donorAgeDiv.appendChild(donorAge);

// Create donor-bt div
const donorBtDiv = document.createElement("div");
donorBtDiv.classList.add("donor-bt", "info");
const donorBtSpan = document.createElement("span");
donorBtSpan.classList.add("spans");
donorBtSpan.textContent = "Blood Type: ";
const donorBt = document.createTextNode(donor_bt);
donorBtDiv.appendChild(donorBtSpan);
donorBtDiv.appendChild(donorBt);

// Append donor-title, donor-name, donor-age, and donor-bt to donor-info
donorInfoDiv.appendChild(donorTitle);
donorInfoDiv.appendChild(document.createElement("hr"));
donorInfoDiv.appendChild(donorNameDiv);
donorInfoDiv.appendChild(donorAgeDiv);
donorInfoDiv.appendChild(donorBtDiv);

// Create patient-info div (similar structure as donor-info)

// Create patient-info div
const patientInfoDiv = document.createElement("div");
patientInfoDiv.classList.add("patient-info");

// Create patient-title paragraph
const patientTitle = document.createElement("p");
patientTitle.classList.add("patient-title");
patientTitle.textContent = "Patient ";

// Create patient-name div
const patientNameDiv = document.createElement("div");
patientNameDiv.classList.add("donor-name", "info");
const patientNameSpan = document.createElement("span");
patientNameSpan.classList.add("spans");
patientNameSpan.textContent = "Patient Name: ";
const patientName = document.createTextNode(patient_name); // Replace with the actual patient name
patientNameDiv.appendChild(patientNameSpan);
patientNameDiv.appendChild(patientName);

// Create patient-age div
const patientAgeDiv = document.createElement("div");
patientAgeDiv.classList.add("donor-age", "info");
const patientAgeSpan = document.createElement("span");
patientAgeSpan.classList.add("spans");
patientAgeSpan.textContent = "Age: ";
const patientAge = document.createTextNode(patient_age); // Replace with the actual patient age
patientAgeDiv.appendChild(patientAgeSpan);
patientAgeDiv.appendChild(patientAge);

// Create patient-bt div
const patientBtDiv = document.createElement("div");
patientBtDiv.classList.add("donor-bt", "info");
const patientBtSpan = document.createElement("span");
patientBtSpan.classList.add("spans");
patientBtSpan.textContent = "Blood Type: ";
const patientBt = document.createTextNode(patient_bt); // Replace with the actual patient blood type
patientBtDiv.appendChild(patientBtSpan);
patientBtDiv.appendChild(patientBt);

// Append patient-title, patient-name, patient-age, and patient-bt to patient-info
patientInfoDiv.appendChild(patientTitle);
patientInfoDiv.appendChild(document.createElement("hr"));
patientInfoDiv.appendChild(patientNameDiv);
patientInfoDiv.appendChild(patientAgeDiv);
patientInfoDiv.appendChild(patientBtDiv);

// Append donor-info, patient-info, and button container to donor-patient div
donorPatientDiv.appendChild(donorInfoDiv);

// Append patient-info to donor-patient div
donorPatientDiv.appendChild(patientInfoDiv);


// ... (Repeat the same steps for patient-info)

// Create button container div
// const btnContainerDiv = document.createElement("div");
// btnContainerDiv.classList.add("btn-container");

// Create approve button
// const approveBtn = document.createElement("button");
// approveBtn.classList.add("a-btn");
// approveBtn.textContent = "Approve";

// Create disapprove button
// const disapproveBtn = document.createElement("button");
// disapproveBtn.classList.add("d-btn");
// disapproveBtn.textContent = "Disapprove";

// Append buttons to button container div
// btnContainerDiv.appendChild(approveBtn);
// btnContainerDiv.appendChild(disapproveBtn);



// Append patient-info here
// donorPatientDiv.appendChild(btnContainerDiv);

// Append donor-patient div to single match div
singleMatchDiv.appendChild(donorPatientDiv);

// Append single match div to matched container
const disApprovedContainer = document.querySelector(".disApprovedMatches");
disApprovedContainer.appendChild(singleMatchDiv);
}