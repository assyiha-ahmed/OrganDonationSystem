let donorsData = [];


fetch('http://localhost:5000/users/donorsHistory', {
}).then(res => {
    return res.json();
})
    .then(data => {
        donorsData = JSON.parse(data); 
        console.log(donorsData);

        for (let i = 0; i < donorsData.length; i++) {
            creatDonor(donorsData[i].name, donorsData[i].age, donorsData[i].bloodType);
           console.log(donorsData[i].name, donorsData[i].age, donorsData[i].bloodType)
          
        }

    })
    .catch(error => console.log(error))


// var btn = document.querySelector(".btn-upload");

// btn.addEventListener("click", displayDetails);

var row = 1;

// function displayDetails(){

    function creatDonor(donors_name,donors_age,donors_bloodType){
        var Name = donors_name;
        var age = donors_age;
        var bt = donors_bloodType;

        // if(!Name || !age || !bt){
        //     alert("please fill all the boxes");
        //     return;   
        // }

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
  
// }