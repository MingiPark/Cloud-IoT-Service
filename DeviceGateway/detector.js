//fire_detector
var awsIot = require("aws-iot-device-sdk");

var fire_detector = awsIot.device({
    keyPath: "./credentials/fire_detector/b0d984534d-private.pem.key",
    certPath: "./credentials/fire_detector/b0d984534d-certificate.pem.crt",
    caPath: "./credentials/fire_detector/AmazonRootCA1.pem",
    clientId: "fire_detector",
    host: "a1wc5scouqf41e-ats.iot.ap-northeast-2.amazonaws.com" // MQTT DN for Device Gateway
  });
  
  // Device is an instance returned by mqtt.Client(), see mqtt.js for full documentation.
  fire_detector.on('connect', function () {
    console.log('fire_detector connected!');
  
    // String Instead.
    var fire = ['fire1', 'fire2', 'fire3', 'fire4', 'fire5', 'fire6', 'fire7', 'fire8', 'fire9', 'fire10'];

    // Every 3 seconds, fire_detector send a request to fire_management_System
    setInterval(function () {
      // randomly select one of the ten images // ceil : return whole number(정수)
      var idx = Math.ceil(Math.random() * 10);
      var message = { 'notify': 'fire/sprinkler', 'alarm': fire[idx] };
      console.log('publish to fire/alarm' + JSON.stringify(message));
      fire_detector.publish('fire/alarm', JSON.stringify(message));//json topic에 publish
    }, 3000);
  });
  
  
  
  
  