
const fstat= require('fs');


const requestHandler = (req, res) => {

    const url= req.url;
    const method = req.method;

    if(url === '/') {
        res.write('<html>');
        res.write('<head>');
        res.write('<title> Enter message</title>');
        res.write('</head>')
        res.write('<body><form action="/message" method="POST" ><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        res.end();
        }
    else if(url ==='/message' && method === 'POST'){
    
        const body=[];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
    
        req.on('end', () => {
            
            const parsedBody= Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            
            fstat.writeFile('message.txt', message, err => {
                res.statusCode=302;
                res.setHeader('Location', '/');
                return res.end();
            });
           
        });
    
    
    }
    else{
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head>');
        res.write('<title> Node project</title>');
        res.write('</head>')
        res.write('<body><h3>My First title</h3></body>');
        res.write('</html>');
        res.end();
    }
};

module.exports= {
    handler: requestHandler,
    someText:"some hard coded"
}

// module.exports.handler= requestHandler; 
// module.exportssomeText= "Some hard Text";