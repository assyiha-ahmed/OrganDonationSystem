let donorsData = [];


fetch('http://localhost:5000/users/donorsHistory', {
}).then(res => {
    return res.json();
})
    .then(data => {
        donorsData = JSON.parse(data); 
        console.log(donorsData);

        for (let i = 0; i < donorsData.length; i++) {
            creatDonor(donorsData[i].name, donorsData[i].age, donorsData[i].bloodType,donorsData[i].hla_a,donorsData[i].hla_b,donorsData[i].hla_dq,donorsData[i].hla_dr,donorsData[i].size);
           console.log(donorsData[i].name, donorsData[i].age, donorsData[i].bloodType)
          
        }

    })
    .catch(error => console.log(error))
    
var row = 1;

    function creatDonor(donors_name,donors_age,donors_bloodType,hla_a,hla_b,hla_dq,hla_dr,size){
        var Name = donors_name;
        var age = donors_age;
        var bt = donors_bloodType;
        var hla_A =hla_a;
        var hla_B =hla_b;
        var hla_DQ =hla_dq;
        var hla_DR =hla_dr;
        var Size =size;

        var display = document.querySelector(".display");

        var newRow = display.insertRow(row);
        
        // var cell1 = newRow.insertCell(0);
        // var cell2 = newRow.insertCell(1);
        // var cell3 = newRow.insertCell(2);
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
  
// }