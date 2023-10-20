const http = require('http');


const hostname = 'localhost';
const port = 3000;

// Ex 2 - we need a path module and file system
// right now, our server doesn't care what kinds of request comes in
const path = require('path');
const fs = require('fs');

//request and response are special types of objects called strings
// request coming from browser or postman
// request gives us access to the headers

// status code of 200 means everything is OK!
// setHeader this tells the client what to expect in the response body = string "text/html"
// res.end close the body passing the string we want to send of the body

// now a response is completed and will be sent back to the client
// We'll console log the URL and the HTTP method, we only want the server to response with the Get Method
const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    if (req.method === 'GET') {
        let fileUrl = req.url;
        //if true we'll set to index.html
        if (fileUrl === '/') {
            fileUrl = '/index.html';
        }
        //convert from relative path to absolute path,  requested should be in public folder and fileUrl in '/' , store in filePath

        
        const filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);
        // check if the requested file is an html file 
        if (fileExt === '.html') {
            //this method lets us know if the file is accessible through file.access
            // filefath and err 
            //if error is truthy then sends a 404 error
            fs.access(filePath, err => {
                if (err) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return;  //code after this is not executed.
                }
                //reach situation without errors / final stop
                //expect html document
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');

                //this method does is reading the contents of the files is given in small chunks, rather than all at once
                //chunks at a time, lazy loading this file
                //pipe method, to send information , to send information from one to the other
                //Createstream - creates a stream object
                //metaphorically -- two streams of water that carries physical from one type to the other
                //by defautl - it will cause the res to end.  So no need to add an end method
                fs.createReadStream(filePath).pipe(res);
            });
        //if file ext is not html
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }
});

//  Now we need to start the server - server.listen , passing 2 arguments: port and hostname
//  callback function that will be executed when a server starts up / running


server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});