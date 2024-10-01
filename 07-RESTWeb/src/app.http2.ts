import http2 from 'http2';
import fs from 'fs';

const server = http2.createSecureServer({

    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),

},( request, response ) => {

    console.log( request.url );

    // response.writeHead( 200, {
    //     'Content-Type': 'text/html',
    // });
    // response.write('<h1>Hola mundo</h1>');

    // const data = {
    //     name: 'John Doe',
    //     age: 30,
    //     city: 'New York',
    // };
    // response.writeHead( 200, {
    //     'Content-Type': 'application/json',
    // });
    // response.write(JSON.stringify(data));

    switch ( request.url ) {
        case '/':

            const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
            response.writeHead( 200, {
                'Content-Type': 'text/html',
            });
            response.write( htmlFile );

            break;
    
        case '/css/styles.css':

            const cssFile = fs.readFileSync('./public/css/styles.css', 'utf-8');
            response.writeHead( 200, {
                'Content-Type': 'text/css',
            });
            response.write( cssFile );

            break;
    
        case '/js/app.js':

            const jsFile = fs.readFileSync('./public/js/app.js', 'utf-8');
            response.writeHead( 200, {
                'Content-Type': 'aplication/javascript',
            });
            response.write( jsFile );

            break;
    
        default:

            response.writeHead( 404, {
                'Content-Type': 'text/html',
            });
            response.write('<h1>Page not found</h1>');

            break;
    }

    response.end();

});

server.listen(8080, () => {
    
    console.log( 'Server running on port 8080' );

});