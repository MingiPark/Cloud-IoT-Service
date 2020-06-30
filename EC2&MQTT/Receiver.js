var AWS = require('aws-sdk');
var s3 = new AWS.S3();
var mqtt = require('mqtt');
var receiver = mqtt.connect('mqtt://54.180.43.35');

var x = {
    bucket: "myreceiver"
}

var Readable = require('stream').Readable; 
function bufferToStream(buffer) {
    var stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
}

function createBucket(bucket_name) {
    var cb_params = {
        Bucket: bucket_name
    };
    return new Promise(function(resolve, reject) {
        s3.createBucket(cb_params, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        })
    })

}

function createObject(bucket_name, stream) {
    const co_params = {
        Bucket: bucket_name,
        Key: "hw1/Image/1_copy.jpg",
        ACL: "public-read",
        Body: stream
    }

    return new Promise(function(resolve, reject) {
        s3.upload(co_params, function(err, data) {
            if (err) reject(err);
            else resolve(data);
        })
    })
}

receiver.on('connect', () => {
    receiver.subscribe('hw1', () => {console.log('File Receiver subcribes hw1!')})
});

receiver.on('message', async function(topic, message){
    let readableStream = bufferToStream(message);
    try {
        try {
            const bucket = await s3.headBucket({Bucket : x.bucket}).promise();
            console.log(`Bucket "${x.bucket}" exists!`);
        } catch (err) {
            var newBucket = await createBucket(x.bucket);
            console.log(`Create Bucket "${x.bucket}"!`);
        }
        var newObj = await createObject(x.bucket, readableStream);
        console.log(`Finish uploading the file on Bucket "${x.bucket}"!`)
        receiver.end();
    } catch (err) {
        console.log(err);
    }
});