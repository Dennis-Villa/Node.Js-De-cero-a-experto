import crypto from 'crypto';
import { NextFunction, Request, Response } from "express";
import { envs } from "../../config";

export class GithubSha256Middleware {

    static verifySignature( request: Request, response: Response, next: NextFunction ) {

        try {

            const secretToken = envs.SECRET_TOKEN;
            const body = JSON.stringify(request.body);
            const githubSignature = request.header('x-hub-signature-256') ?? '';

            const mySignature = crypto
                .createHmac( 'sha256', secretToken )
                .update( body )
                .digest( 'hex' );
            
            const trusted = Buffer.from( `sha256=${ mySignature }`, 'ascii' );
            const untrusted = Buffer.from( githubSignature, 'ascii' );

            if( !crypto.timingSafeEqual( trusted, untrusted ) ){

                response.status( 401 ).json({ error: 'Unauthorized' });
            };

            next();
        }
        catch (error) {

            console.log( error );
            response.status( 401 ).json({ error: 'Unauthorized' });
        };
    };
};