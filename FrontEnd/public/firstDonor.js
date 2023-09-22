let firstDonorData = [];

fetch('http://localhost:5000/users/firstDonor', {
}).then(res => {
    return res.json();
})
    .then(data => {
        firstDonorData = JSON.parse(data);
        for(let i = 0; i < firstDonorData.length; i++){
            let firstDonor = firstDonorData[i];
            createFirstDonors(firstDonor.name,firstDonor.age,firstDonor.address,firstDonor.contactNumber,firstDonor.id)
        }
    })
    .catch(error => console.log(error))

function createFirstDonors(donor_name,donor_age,donor_address,donor_contactNumber,donor_id){

    console.log("hellooooooooooooooooo");

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
const donorAddressDiv = document.createElement("div");
donorAddressDiv.classList.add("donor-address", "info");
const donorAddressSpan = document.createElement("span");
donorAddressSpan.classList.add("spans");
donorAddressSpan.textContent = "Address: ";
const donorAddress = document.createTextNode(donor_address);
donorAddressDiv.appendChild(donorAddressSpan);
donorAddressDiv.appendChild(donorAddress);

const donorContactNumberDiv = document.createElement("div");
donorContactNumberDiv.classList.add("donor-contactNumber", "info");
const donorContactNumberSpan = document.createElement("span");
donorContactNumberSpan.classList.add("spans");
donorContactNumberSpan.textContent = "ContactNumber: ";
const donorContactNumber = document.createTextNode(donor_contactNumber);
donorContactNumberDiv.appendChild(donorContactNumberSpan);
donorContactNumberDiv.appendChild(donorContactNumber);

const donorIdDiv = document.createElement("div");
donorIdDiv.classList.add("donor-id", "info");
const donorIdSpan = document.createElement("span");
donorIdSpan.classList.add("spans");
donorIdSpan.textContent = "Id: ";
const donorId = document.createTextNode(donor_id);
donorIdDiv.appendChild(donorIdSpan);
donorIdDiv.appendChild(donorId);

// Append donor-title, donor-name, donor-age, and donor-bt to donor-info
donorInfoDiv.appendChild(donorTitle);
donorInfoDiv.appendChild(document.createElement("hr"));
donorInfoDiv.appendChild(donorNameDiv);
donorInfoDiv.appendChild(donorAgeDiv);
donorInfoDiv.appendChild(donorContactNumberDiv);
donorInfoDiv.appendChild(donorAddressDiv);
donorInfoDiv.appendChild(donorIdDiv);

let donorContainer = document.querySelector(".donorContainer");
donorContainer.appendChild(donorInfoDiv);


}