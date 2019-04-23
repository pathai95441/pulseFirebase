var firebase = require('firebase');
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
var express = require('express');
var app = express();
var port = process.env.PORT ||5441;

var config = {
    apiKey: "AIzaSyCfPVEnckJEV7jWX3GDd-3E0pR_Bd-zGFs",
    authDomain: "fpulsedb.firebaseapp.com",
    databaseURL: "https://fpulsedb.firebaseio.com",
    projectId: "fpulsedb",
    storageBucket: "fpulsedb.appspot.com",
    messagingSenderId: "326745521261"};

firebase.initializeApp(config);



server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});


server.on('message', function (message, remote) {
    //Insert key,value pair to database
    var Name = message.toString();
    var words = Name.split(':');
    var carID = words[0];
    var lat = words[1];
    var lng = words[2];
    firebase.database().ref('/car/'+carID).set({
        CarName: carID,
        latitude: lat,
        longitude: lng
    }, function (error) {
        if (error) {
            console.log(error);
        } else {
            console.log("Rx Succeesssss " + message);
        }
    });

});


app.listen(port, function () {
    console.log('Starting node.js on port ' + port);
});
server.bind(5442);