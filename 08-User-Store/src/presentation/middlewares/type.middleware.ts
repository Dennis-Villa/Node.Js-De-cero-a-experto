import { NextFunction, Request, Response } from "express";

export class TypeMiddleware {

    static validTypes( validTypes: string[] ) {

        return async( request: Request, response: Response, next: NextFunction ) => {



            const type = ( 
                request.params.type
                || request.url.split( '/' ).pop()
                || ''
            );

            if( !validTypes.includes( type ) ) {
    
                return response.status( 400 ).json({ 
                    error: `Invalid type ${ type }, valid ones ${ validTypes }`,
                });
            };
    
            next();
        };
    };

    
};