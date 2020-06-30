var AWS = require('aws-sdk');
var fs = require('fs');
var s3 = new AWS.S3({
    "accessKeyId": "...",
    "secretAccessKey":"..."
});

AWS.config.region = 'ap-northeast-2';
AWS.config.apiVersions = {
    s3: '2006-03-01',
};

function createObject(params) {
    return new Promise(function (resolve, reject) {
        s3.upload(params, function (err, data) {
            if (err) reject(err);
            else resolve(data);
        })
    });
}

var test = async function () {
    try {
        // 1st Object
        const co_params1 = {
            Bucket: "hw2mingi",
            Key: 'nodejstest.jpg',
            Body: fs.createReadStream("./nodejstest.jpg")
        };
        var res2 = await createObject(co_params1);
        console.log(res2);
    }catch (err) {
        console.log('-- Error --');
        console.log(err);
    }
}
// run the test
test();