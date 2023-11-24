var intChange = function(event) {
    SM.parametersCache["SS_INT_P"] = { value: $("#SS_INT_P").val() };
    SM.sendParameters();
}


var boolChange = function(event) {
    SM.parametersCache["SS_BOOL_P"] = {
        value: $("#SS_BOOL_P option:selected").val() ? true : false
    };
    SM.sendParameters();
}

//metemos nuevo
APP.led_state = false;

   // program checks if led_state button was clicked
   $('#led_state').click(function() {

       // changes local led state
       if (APP.led_state == true){
           $('#led_on').hide();
           $('#led_off').show();
           APP.led_state = false;
       }
       else{
           $('#led_off').hide();
           $('#led_on').show();
           APP.led_state = true;
       }

       // sends current led state to backend
       var local = {};
       local['LED_STATE'] = { value: APP.led_state };
       APP.ws.send(JSON.stringify({ parameters: local }));
   });
//end nuevo

//Create callback
var changeCallbacks = {}

changeCallbacks["SS_INT_P"] = intChange;
changeCallbacks["SS_BOOL_P"] = boolChange;

var clickCallbacks = {}


//Subscribe changes and clicks
$(document).ready(function() {
    for (var k in changeCallbacks) {
        $("#" + k).change(changeCallbacks[k]);
    }
    for (var i in clickCallbacks) {
        $("#" + i).click(clickCallbacks[i]);
    }
})
