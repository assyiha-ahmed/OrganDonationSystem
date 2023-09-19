// const API_KEY = "RqY_t_4NwQVLby9h5ycjMsNmME0a6MgU8dn1";
// const PROJECT_ID = "PJ63b1525fb9e2a739";


const API_KEY = "2KJFF_FWA01yhHRIhGBBjV8tTeEqg6ZhYPIm";
const PROJECT_ID = "PJee873a03c447c7fb";
import telerivet from 'telerivet';

function sendSingleMessage(phone, message) {
console.log("hiii");
// CHl9p_avxkvoYGO9rtfmho4VLt4MXfBLZIra
var tr = new telerivet.API(API_KEY);
var project = tr.initProjectById(PROJECT_ID);

project.sendMessage({
    content: message, 
    to_number: phone
}, function(err, message) {
    if (err) {
      console.log("error")
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
// sendSingleMessage(phone, message);

console.log("hello")


export default sendSingleMessage;