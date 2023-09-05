// import { Console } from "console";
import fs from "fs";
// import router from "./routes/users.js";


// let donorId;
// let patientId;

// router('/nonMatchableId', (sreq,res) =>{
//     const {query} = req;
//     donorId = query.idOne;
//     patientId = query.idTwo;
// })

// console.log(donorId,patientId);


let matchedusers = [];

function filterData() {

    var donor = fs.readFileSync('donor.txt','utf8');
    donor = JSON.parse(donor);

    var patient = fs.readFileSync('patient.txt', 'utf8');
    patient = JSON.parse(patient);

    for (let i = 0; i < donor.length; i++) {
        for (let x = patient.length - 1; x >= 0; x--) {
    
            if (donor[i] && patient[i] && donor[i].id != donorId && patient[i].id != patientId) {
                let donorBloodType = donor[i].bloodType;
                let patientBloodType = patient[x].bloodType;
                // console.log(donorBloodType, patientBloodType, "<--------------");
                let donorKidneySize = donor[i].size
                let donorKidneyLengthCm = donorKidneySize.substring(0, donorKidneySize.indexOf(":"));
                let donorKidneyWidthCm = donorKidneySize.substring(donorKidneySize.indexOf(":") + 1, donorKidneySize.lastIndexOf(":"));
                let donorKidneyThicknessCm = donorKidneySize.substring(donorKidneySize.lastIndexOf(":") + 1, donorKidneySize.length);

                let donorKidneyLength = donorKidneyLengthCm.substring(0, donorKidneyLengthCm.indexOf("c"));
                let donorKidneyWidth = donorKidneyWidthCm.substring(0, donorKidneyWidthCm.indexOf("c"));
                let donorKidneyThickness = donorKidneyThicknessCm.substring(0, donorKidneyThicknessCm.indexOf("c"));

                let patientKidneySize = patient[x].size
                let patientKidneyLength = parseInt(patientKidneySize.substring(0, patientKidneySize.indexOf(":")), 10);
                let patientKidneyWidth = parseInt(patientKidneySize.substring(patientKidneySize.indexOf(":") + 1, patientKidneySize.lastIndexOf(":")), 10);
                let patientKidneyThickness = parseInt(patientKidneySize.substring(patientKidneySize.lastIndexOf(":") + 1, patientKidneySize.length), 10);


                let lengthDifference = donorKidneyLength - patientKidneyLength;
                let widthDifference = donorKidneyWidth - patientKidneyWidth;
                let thicknessDifference = donorKidneyThickness - patientKidneyThickness;

                let donrHLA_A = donor[i].hla_a;
                let donorHLA_B = donor[i].hla_b;
                let donorHLA_DR = donor[i].hla_dr;
                let donorHLA_DQ = donor[i].hla_dq;

                let patientHLA_A = patient[x].hla_a;
                let patientHLA_B = patient[x].hla_b;
                let patientHLA_DR = patient[x].hla_dr;
                let patientHLA_DQ = patient[x].hla_dq;
                
                let counter = 0;
                if(donrHLA_A==patientHLA_A){
                    counter++;
                   }
                if(donorHLA_B==patientHLA_B){
                    counter++;
                }
                if(donorHLA_DR==patientHLA_DR){
                    counter++;
                }
                if(donorHLA_DQ==patientHLA_DQ){
                    counter++;
                }
              

                // If the difference for each dimension is less than or equal to 20%, then the donor kidney is a match for the recipient kidney.
                if (lengthDifference <= 0.2 * patientKidneyLength &&
                    widthDifference <= 0.2 * patientKidneyWidth &&
                    thicknessDifference <= 0.2 * patientKidneyThickness && donorBloodType == patientBloodType && counter >=2) {
                    console.log(donor[i].name + "'s kidney match with", patient[x].name);


                    matchedusers.push(matched(donor[i].id, donor));
                    matchedusers.push(matched(patient[x].id, patient));

                    deleteDonor(donor[i].id);
                    deletePatient(patient[x].id);

                    const getMatch = JSON.stringify(matchedusers);
                    fs.writeFileSync('matched.txt', getMatch, (err) => {
                        console.log("Saved");
                    });

                    const donors = JSON.stringify(donor);
                    fs.writeFileSync('donor.txt', donors, (err) => {
                        console.log("saved");
                    });

                    const patients = JSON.stringify(patient);
                    fs.writeFileSync('patient.txt', patients, (err) => {
                        console.log("saved");
                    });
                }


            }
        }

    }

    function matched(id, data) {
        const foundUser = data.find((user) => user.id == id);
        return foundUser;
    }
    function deleteDonor(id) {
        console.log(donor, id)
        donor = donor.filter((user) => user.id != id);
        console.log(donor, id)
    }

    function deletePatient(id) {
        patient = patient.filter((user) => user.id != id);
    }


}




export default filterData;