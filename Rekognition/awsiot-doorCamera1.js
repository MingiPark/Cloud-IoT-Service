
// Door Camera Device Example
// awsiot-camera.js

var awsIot = require('aws-iot-device-sdk');

var doorCamera = awsIot.device({
  keyPath: "./credentials/Camera/fa0f36070e-private.pem.key",
  certPath: "./credentials/Camera/fa0f36070e-certificate.pem.crt",
  caPath: "./credentials/Camera/AmazonRootCA1.pem",
  clientId: "doorCamera1",
  host: "a1wc5scouqf41e-ats.iot.ap-northeast-2.amazonaws.com"
});

// Device is an instance returned by mqtt.Client(), see mqtt.js for full documentation.
doorCamera.on('connect', function () {
  console.log('Door Camera connected');

var images = ['face/face1.jpg','face/face2.jpg','face/face3.jpg','face/face4.jpg','face/face5.jpg'];
var sourceBucket = 'saveimagebucket';

  setInterval(function () {
    // randomly select one of the five images
    var imageParam = {
      image : images[Math.ceil(Math.random()*5)],
      bucket : sourceBucket
    }
    
    var message = { 'notify': 'faceRecog/notify/door1', 'image': imageParam };
    console.log('publish to faceRecog/request' + JSON.stringify(message));
    doorCamera.publish('faceRecog/request', JSON.stringify(message));
  }, 15000);//15초마다 함수 실행
});




