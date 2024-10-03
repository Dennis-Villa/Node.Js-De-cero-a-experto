import express, { Router } from 'express';
import compression from 'compression';
import path from 'path';

interface Options {

    port: number;
    routes: Router;
    public_path?: string;

}

export class Server {

    public readonly app = express();
    private serverListener?: any;
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor( options: Options ) {
        
        const { port, routes, public_path = 'public' } = options;

        this.port = port;
        this.routes = routes;
        this.publicPath = public_path;

    }

    async start() {

        // *Middleware
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }) );
        this.app.use( compression() );

        // *Public Folder
        this.app.use(express.static( this.publicPath ) ); 

        // *Routes
        this.app.use( this.routes );

        // *SPA
        this.app.get('*', ( request, response ) => {
            
            const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );

            response.sendFile( indexPath );

            return;

        });

        this.serverListener = this.app.listen( this.port, () => {
            
            console.log(`Server running on port ${ this.port }`);

        })

    };

    public close() {

        this.serverListener.close();
    }

};