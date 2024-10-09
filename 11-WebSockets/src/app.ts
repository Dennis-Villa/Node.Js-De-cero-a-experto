import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', function connection(ws) {

    console.log( 'Client connected' );

    ws.on('error', console.error);

    ws.on('message', function message(data) {

        wss.clients.forEach( ( client ) => {

            // * Todos incluyente
            if( client.readyState === WebSocket.OPEN ){

                client.send( 
                    JSON.stringify({
                        type: 'custom-message',
                        payload: data.toString(),
                    }),
                    { binary: false }
                );
            };

            // * Todos excluyente
            // if( client !== ws && client.readyState === WebSocket.OPEN ){

            //     client.send( 
            //         JSON.stringify({
            //             type: 'custom-message',
            //             payload: data.toString(),
            //         }),
            //         { binary: false }
            //     );
            // };
        });

    });

    ws.on('close', () => {

        console.log('Client disconnected');
    })
});

console.log( `Server running on port 3000` );