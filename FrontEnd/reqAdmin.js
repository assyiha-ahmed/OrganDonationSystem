fetch("http://localhost:5000/users/getRequest", {
}).then(res => {
    return res.json();
})
.then(data => {
    requestedHospitals = JSON.parse(data);

    console.log(requestedHospitals);
    // console.log(requestedHospitals[0].Name);


    requestedHospitals.forEach((value, key) => {

        let name = value.Name;
        let address = value.Address;
        let email = value.EmailAddress;

        console.log(name,address,email);
        createRequest(name,address,email);     
    
      });
   
})
.catch(error => console.log(error))

function createRequest(hospital_name,hospital_address,hospital_email){

// Create donor-patient div
const reqDiv = document.createElement("div");
reqDiv.classList.add("req-div");


// /Create donor-info div
const hospitalInfoDiv = document.createElement("div");
hospitalInfoDiv.classList.add("hospital-info");

// Create donor-title paragraph
const reqTitle = document.createElement("p");
reqTitle.classList.add("req-title");
reqTitle.textContent = "Request";

// Create donor-name div
const hospitalNameDiv = document.createElement("div");
hospitalNameDiv.classList.add("hospital-name", "info");
const hospitalNameSpan = document.createElement("span");
hospitalNameSpan.classList.add("spans");
hospitalNameSpan.textContent = "Hospital Name: ";
const hospitalName = document.createTextNode(hospital_name);
hospitalNameDiv.appendChild(hospitalNameSpan);
hospitalNameDiv.appendChild(hospitalName);

// Create donor-age div
const addressDiv = document.createElement("div");
addressDiv.classList.add("address", "info");
const addressSpan = document.createElement("span");
addressSpan.classList.add("spans");
addressSpan.textContent = "Address: ";
const address = document.createTextNode(hospital_address);
addressDiv.appendChild(addressSpan);
addressDiv.appendChild(address);

// Create donor-bt div
const emailDiv = document.createElement("div");
emailDiv.classList.add("donor-bt", "info");
const emailSpan = document.createElement("span");
emailSpan.classList.add("spans");
emailSpan.textContent = "Email address: ";
const email = document.createTextNode(hospital_email);
emailDiv.appendChild(emailSpan);
emailDiv.appendChild(email);

// Create approve button
const allowBtn = document.createElement("button");
allowBtn.classList.add("a-btn");
allowBtn.textContent = "Allow";

// Create disapprove button
const denyBtn = document.createElement("button");
denyBtn.classList.add("d-btn");
denyBtn.textContent = "Deny";


// Append donor-title, donor-name, donor-age, and donor-bt to donor-info
hospitalInfoDiv.appendChild(reqTitle);
hospitalInfoDiv.appendChild(document.createElement("hr"));
hospitalInfoDiv.appendChild(hospitalNameDiv);
hospitalInfoDiv.appendChild(addressDiv);
hospitalInfoDiv.appendChild(emailDiv);
hospitalInfoDiv.appendChild(allowBtn);
hospitalInfoDiv.appendChild(denyBtn);


// Create button container div
const btnContainerDiv = document.createElement("div");
btnContainerDiv.classList.add("btn-container");

reqDiv.appendChild(hospitalInfoDiv);

const container = document.querySelector(".req-container");
container.classList.add("container");

container.appendChild(reqDiv);
}