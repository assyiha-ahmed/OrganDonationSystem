const API_KEY = "2KJFF_FWA01yhHRIhGBBjV8tTeEqg6ZhYPIm";
const PROJECT_ID = "PJee873a03c447c7fb";
import telerivet from 'telerivet';

function sendSingleMessage(phone, message) {

var tr = new telerivet.API(API_KEY);
var project = tr.initProjectById(PROJECT_ID);

project.sendMessage({
    content: message, 
    to_number: phone
}, function(err, message) {
    if (err) {
      console.log(err)
    } else {
      console.log("message sent!", message)
    }
});
}


function sendGroupMessage() {
var tr = new telerivet.API(API_KEY);
var project = tr.initProjectById(PROJECT_ID);

project.sendBroadcast({
    content: "hello [[contact.name]]!", 
    to_numbers: ["+251903035284", "+251903035284", "+251903035284"], 
    replace_variables: true
},function(err, broadcast) {    
    console.log(err, broadcast)
});
}

async function checkGatewayStatus() {
    const client = new telerivet.API(API_KEY);

    client.getGateways({sort_field: 'name'}, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        const gateways = result.data;
        
        console.log('Available SMS Gateways:');
        gateways.forEach(gateway => {
          console.log(`- ${gateway.name} (${gateway.type})`);
        });
      }
    });

  }

export default sendSingleMessage;