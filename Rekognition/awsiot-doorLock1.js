
// Door Lock Device Example
// awsiot-doorLock.js

var awsIot = require('aws-iot-device-sdk');

var doorLock = awsIot.device({
  keyPath: "./credentials/lock/ba7962bcae-private.pem.key",
  certPath: "./credentials/lock/ba7962bcae-certificate.pem.crt",
  caPath: "./credentials/lock/AmazonRootCA1.pem",
  clientId: "doorLock1",
  host: "a1wc5scouqf41e-ats.iot.ap-northeast-2.amazonaws.com"
});

// Device is an instance returned by mqtt.Client(), see mqtt.js for full documentation.
doorLock.on('connect', function () {
  console.log('Door Lock connected');
  doorLock.subscribe('faceRecog/notify/door1', function () {
    console.log('subscribing to the topic faceRecog/notify/door1 !');
  });

  doorLock.on('message', function (topic, message) {
    if (topic == 'faceRecog/notify/door1') {
      var noti = JSON.parse(message.toString());
      if (noti.command == 'unlock') console.log(noti.image, ': unlock door1')
      else console.log(noti.image, ': unauthenticated person')
    }
  })
});

