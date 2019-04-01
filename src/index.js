//prevent memoryleaks
require('events').EventEmitter.defaultMaxListeners = Infinity;

var io = require('socket.io-client');
var socket = io.connect('https://endpoint-demo.cognigy.ai');

// random number to be used as userId and sessionId
var random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

// just a welcome message
console.log("Hi, welcome to the future")
// Add a connect listener
socket.on("connect", function (response) {
    
    // Sending out the first message on connect to initiate the chat
    if (socket && socket.connected) {
        socket.emit("processInput", {
            "URLToken":"25522722e3ec50d2cbad8f16662ff006e4e39933eb804e9842f932a125bbab49",
            "sessionId": random,
            "userId": random,
            "passthroughIP":"127.0.0.1",
            "reloadFlow":"true",
            "resetFlow":"false",
            "resetState":"false",
            "resetContext":"true",
            "text":"hello",
            "data":{}
        });
       
    }
});
// npm prompt package for taking user input
var prompt = require('prompt');
prompt.start();
// user input schema/configuration
var schema = {
    properties: {
      userinput: {
        description: 'User input'
      }
    }
};

// Add a output listener for receiving messages
socket.on("output", function (output) {
    // if output contains text, log it to console
    if (typeof output.data.text !== 'undefined') {
        console.log('output: ', output.data.text);
    }

    prompt.get(schema, function (err, result) {      
       
        socket.emit("processInput", {
           "URLToken":"25522722e3ec50d2cbad8f16662ff006e4e39933eb804e9842f932a125bbab49",
           "sessionId":"222",
           "userId":"111",
           "passthroughIP":"127.0.0.1",
           "reloadFlow":"true",
           "resetFlow":"false",
           "resetState":"false",
           "resetContext":"true",
           "text": result.userinput,
           "data":{}
       });
      
     });
});
