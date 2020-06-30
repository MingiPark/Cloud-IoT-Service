var AWS = require('aws-sdk');
var keys = require('./credentials.js');
AWS.config.region = 'ap-northeast-2';
var lambda = new AWS.Lambda ( { 
    "apiVersion" : '2015-03-31',
    "accessKeyId": keys.aws_access_key_id,
    "secretAccessKey": keys.aws_secret_access_key 
} );

const path = require('path');

var params = {
    FunctionName : "hw2",
    InvocationType : "RequestResponse", 
};

lambda.invoke(params, function (err, data) {
    if(err) console.log(err);
    else console.log(JSON.parse(data.Payload));
});

