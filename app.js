var http = require('https');
var fs = require('fs');
require('./crypto-cacerts').cryptoPatch("/etc/ssl/certs");


console.log(JSON.stringify(http.globalAgent));
var options = {
  host: 'www.google.com',
    agent: false,
    rejectUnauthorized: true,
    path: '/',

    //cert: fs.readFileSync('/etc/ssl/certs/uit.pem')
    };

    callback = function(response) {
      var str = '';

        //another chunk of data has been recieved, so append it to `str`
          response.on('data', function (chunk) {
              str += chunk;
                });

                  //the whole response has been recieved, so we just print it out here
                    response.on('end', function () {
                        console.log(str);
                          });
                          }

                          http.request(options, callback).end();

