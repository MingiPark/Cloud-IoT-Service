var keys = require('./credentials.js');
var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.region = 'ap-northeast-2';
    
var s3 = new AWS.S3({
    "apiVersion": '2006-03-01',
    "accessKeyId": keys.aws_access_key_id ,
    "secretAccessKey": keys.aws_secret_access_key
});

function createObject(params){
    return new Promise(function (resolve, reject) {
        s3.upload(params, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        });
    });
}
exports.handler = async () => {
    var params = {
        Bucket : 'hw2mingi',
        Key : 'invoke_result.jpg',
        Body : fs.createReadStream("./test_image.jpg")
    }

    const response = {
        statusCode : 200,
        body: ''
    };

    try{
        var res = await createObject(params);
        response.body = 'Success!';
        return response;
    }catch(err){
        response.body = err; return response;
    }
};
