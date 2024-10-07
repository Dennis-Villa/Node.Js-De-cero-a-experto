import { Request, Response } from "express";
import { CustomError} from "../../domain";
import { FileUploadService } from "../services";
import { UploadedFile } from 'express-fileupload';

export class FileUploadController {

    constructor(
        public readonly fileUploadService: FileUploadService,
    ){};

    private handleError = ( error: Error | CustomError, response: Response ) => {

        if ( error instanceof CustomError ) {
        
            return response.status( error.statusCode ).json( error.message );
        };

        return response.status( 500 ).json({ 
            error: `Internal server error: ${error.message}`,
        });
    };

    uploadFile = ( request: Request, response: Response ) => {

        const { type } = request.params;
        const file = request.body.files.at(0) as UploadedFile;

        return this.fileUploadService.uploadSingle( file,  `uploads/${ type }` )
            .then( ( uploaded) => response.json( uploaded ))
            .catch( ( error ) => this.handleError( error, response ));
    };

    uploadMultipleFiles = ( request: Request, response: Response ) => {

        const { type } = request.params;
        const files = request.body.files as UploadedFile[];

        return this.fileUploadService.uploadMultiple( files,  `uploads/${ type }` )
            .then( ( uploaded) => response.json( uploaded ))
            .catch( ( error ) => this.handleError( error, response ));
    };
};