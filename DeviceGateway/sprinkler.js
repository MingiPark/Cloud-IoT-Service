//Fire Sprinkler

var awsIot = require('aws-iot-device-sdk');

var sprinkler = awsIot.device({
  keyPath: "./credentials/fire_sprinkler/d6e00be68e-private.pem.key",
  certPath: "./credentials/fire_sprinkler/d6e00be68e-certificate.pem.crt",
  caPath: "./credentials/fire_sprinkler/AmazonRootCA1.pem",
  clientId: "sprinkler",
  host: "a1wc5scouqf41e-ats.iot.ap-northeast-2.amazonaws.com"
});

// Device is an instance returned by mqtt.Client(), see mqtt.js for full documentation.
sprinkler.on('connect', function () {
  console.log('Sprinkler connected');
  sprinkler.subscribe('fire/sprinkler', function () {
    console.log('subscribing to the topic fire/sprinkler !');
  });
  sprinkler.subscribe('fire/alert/sprinkler', function () {
    console.log('subscribing to the topic fire/alert/sprinkler !');
  });

  sprinkler.on('message', function (topic, message) {
    if (topic == 'fire/sprinkler') {
      var noti = JSON.parse(message.toString());
      if (noti.command == 'Fire') console.log(noti.alarm, ' : Fire! Go Sprinkler!!!')
      else console.log(noti.alarm, ': its Safe')
    }
    if (topic == "fire/alert/sprinkler"){
        var noti2 = JSON.parse(message.toString());
        console.log(noti2.news);
    }
  })
});

