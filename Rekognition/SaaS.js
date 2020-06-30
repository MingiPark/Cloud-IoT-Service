
var AWS = require('aws-sdk');  
AWS.config.update({region : 'ap-northeast-2'});    

var rekognitionSys = new AWS.Rekognition();  

var iotdata = new AWS.IotData({ endpoint: 'a1wc5scouqf41e-ats.iot.ap-northeast-2.amazonaws.com'});

async function rekognitionFunc(check){ 

    var bucket = 'saveimagebucket';   
    var answer = false; 
    var answerImage = ['Answer/face3.jpg'];
    var jsonData = JSON.parse(check.toString());
    var imageName = jsonData.imageInfo;
    var command = "";

    var Params = {
        "QualityFilter" : "AUTO",
        "SimilarityThreshold": 70,

        "SourceImage": {
            "S3Object": {
                "Bucket": bucket,
                "Name" : answerImage[0]
            }
        },

        "TargetImage": {
            "S3Object": {
                "Bucket": bucket,
                "Name" : imageName 
            }
        }
    }

    var checkResult = await rekognitionSys.compareFaces(Params, function(err,data) {
        if (err) console.log(err, err.stack);
        else { answer = !Boolean(data.UnmatchedFaces.length); }
    }).promise();
    
    command = (answer) ? 'unlock' : 'reject';
    
    console.log(command); 
    return command; 
      
};

var images = ['face/face1.jpg','face/face2.jpg','face/face3.jpg','face/face4.jpg','face/face5.jpg'];

setInterval(function () { 
    
    var inputImage = images[Math.ceil(Math.random()*5)-1];
    console.log('inputImage: ' + inputImage);
    var check = { 'location': 'door1', 'imageInfo': inputImage};
    rekognitionFunc(JSON.stringify(check)); 

}, 15000);
