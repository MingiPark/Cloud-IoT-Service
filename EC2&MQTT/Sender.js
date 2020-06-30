var AWS = require('aws-sdk');
var mqtt = require('mqtt');
var fs = require('fs')
var util = require('util');

var s3 = new AWS.S3();

let file;
let sender;

param = { filePath : '1.jpg'}

async function sendFile(x) {
    try {
        sender = mqtt.connect('mqtt://54.180.43.35');
        sender.on('connect', () => sender.subscribe('hw1', () => { console.log('File Sender subcribes hw1!'); }));
        
        file = fs.createReadStream(x.filePath);
        let buffer = []
        for await(let chunk of file) {
            buffer.push(chunk);
        }
        let realContents = Buffer.concat(buffer);
        
        sender.publish('hw1', realContents);

        console.log('Finish the upload image file on mqtt!\n\n');
        console.log('\n');
        sender.end();

    } catch (err) {
        console.log(err);
    }
}

sendFile(param);

