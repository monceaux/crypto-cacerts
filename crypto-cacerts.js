var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var cacerts = [];

var parsePEMFile = function(filename){
    var pems = [];
    var buf = fs.readFileSync(filename, {encoding: 'utf8'});
    var lines = buf.split('\n');
    var foundBegin = false;
    var pem = "";
    for(var i = 0; i < lines.length; i++){
        var line = lines[i];
        if(line.indexOf("-BEGIN CERTIFICATE-") >= 0){
            foundBegin = true;
            pem = line + "\n";
        }
        else if(line.indexOf("-END CERTIFICATE-") >= 0){
            foundBegin = false;
            pem += line + "\n";
            pems.push(new Buffer(pem));
        }
        else if(foundBegin){
            pem += line + "\n";
        }
    }
    return pems;
}

var parsePEMDirectory = function(dirname){
    var files = fs.readdirSync(dirname);
    var pems = [];
    for(var i = 0; i < files.length; i++){
        var f = path.join(dirname,files[i]);
        var stat = fs.statSync(f);
        if(stat.isFile()){
            pems = pems.concat(parsePEMFile(f));
        }
    }
    return pems;
}

var createCredentials = function(options, context) {
    if(options.ca){
        options.ca = options.ca.concat(cacerts);
    }
    else{
        options.ca = cacerts;
    }
    return crypto.createCredentialsOriginal(options, context);
}


var cryptoPatch = function(dirname){
    cacerts = parsePEMDirectory(dirname);
    crypto.createCredentialsOriginal = crypto.createCredentials;
    crypto.createCredentials = createCredentials;
}

exports.parsePEMDirectory = parsePEMDirectory;
exports.cryptoPatch = cryptoPatch;

//console.log(parsePEMDirectory("/home/monceaux/Downloads/node_test"));
