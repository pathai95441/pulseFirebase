var firebase = require('firebase');
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var express = require('express');
var app = express();
var port = 5441;

var config = {
    apiKey: "AIzaSyCfPVEnckJEV7jWX3GDd-3E0pR_Bd-zGFs",
    authDomain: "fpulsedb.firebaseapp.com",
    databaseURL: "https://fpulsedb.firebaseio.com",
    projectId: "fpulsedb",
    storageBucket: "fpulsedb.appspot.com",
    messagingSenderId: "326745521261"
  };

firebase.initializeApp(config);



server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});


server.on('message', function (message, remote) {
    var Name = message.toString();
    console.log("Rx Succeesssss " + Name);
    var words = Name.split(':');
    var pulse = words[1];
    firebase.database().ref('logs/'+Date.now()).set({
        pulseValue:pulse
    }, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log( message.toString());
        }
    });

});


app.listen(port, function () {
    console.log('Starting node.js on port ' + port);
});
server.bind(5442);