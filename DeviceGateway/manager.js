// Fire Management System

var awsIot = require('aws-iot-device-sdk');

var fire_management_sys = awsIot.device({
    keyPath: "./credentials/fire_management_system/a38391afed-private.pem.key",
    certPath: "./credentials/fire_management_system/a38391afed-certificate.pem.crt",
    caPath: "./credentials/fire_management_system/AmazonRootCA1.pem",
    clientId: "fire_management_system",
    host: "a1wc5scouqf41e-ats.iot.ap-northeast-2.amazonaws.com"
});

// Device is an instance returned by mqtt.Client(), see mqtt.js for full documentation.
fire_management_sys.on('connect', function () {
    console.log('Fire Management System connected');
    fire_management_sys.subscribe('fire/alarm', function () {
        console.log('subscribing to the topic fire/alarm !');
    });

    var fire = ['fire1', 'fire2', 'fire3', 'fire4', 'fire5', 'fire6', 'fire7', 'fire8', 'fire9', 'fire10'];
    fire_management_sys.on('message', function (topic, message) {
        console.log('Request:', message.toString());
        if (topic != 'fire/alarm') return;
        var req = JSON.parse(message.toString());
        var id = fire.indexOf(req.alarm);
        var news = {news : "Alert! On Fire!!!"};
        if (id != -1) {
            fire_management_sys.publish(req.notify, JSON.stringify({ 'alarm': req.alarm, 'command': 'Fire' }));
            fire_management_sys.publish('fire/alert/sprinkler',  JSON.stringify(news));
        } else {
            fire_management_sys.publish(req.notify, JSON.stringify({ 'alarm': req.alarm, 'command': 'Safe' }));
        }
    })
});


