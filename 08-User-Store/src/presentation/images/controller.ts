import { Request, Response } from "express";
import { CustomError} from "../../domain";
import fs from 'fs';
import path from 'path';
import { error } from "console";

export class ImageController {

    constructor(
        // public readonly fileUploadService: FileUploadService,
    ){};

    private handleError = ( error: Error | CustomError, response: Response ) => {

        if ( error instanceof CustomError ) {
        
            return response.status( error.statusCode ).json( error.message );
        };

        return response.status( 500 ).json({ 
            error: `Internal server error: ${error.message}`,
        });
    };

    getImage = ( request: Request, response: Response ) => {

        const { type, img } = request.params;
        const imagePath = path.resolve( __dirname, '../../../', `uploads/${ type }/${ img }` );

        if( !fs.existsSync( imagePath ) ){

            return response.status( 404 ).json({ error: 'Imgae not found' });
        };

        response.sendFile( imagePath );
    };
};