const http = require('http');


const hostname = 'localhost';
const port = 3000;

//request and response are special types of objects called strings
// request coming from browser or postman
// request gives us access to the headers

// status code of 200 means everything is OK!
// setHeader this tells the client what to expect in the response body = string "text/html"
// res.end close the body passing the string we want to send of the body

// now a response is completed and will be sent back to the client

const server = http.createServer((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hello World!</h1></body></html>');
});


//  Now we need to start the server - server.listen , passing 2 arguments: port and hostname
//  callback function that will be executed when a server starts up / running


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});