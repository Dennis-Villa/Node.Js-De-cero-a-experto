import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { UserEntity } from "../../domain";

export class AuthMiddleware {

    static async validateJWT( request: Request, response: Response, next: NextFunction ) {

        const authorization = request.header( 'Authorization' );
        if ( !authorization ) return response.status( 401 ).json({
            error: 'No token provided',
        });
        if ( !authorization.startsWith('Bearer ') ) return response.status( 401 ).json({
            error: 'Invalid Bearer token',
        });

        const token = authorization.split( ' ' ).at(1) || '';

        try {

            const payload = await JwtAdapter.validateToken<{ id: string }>( token );
            if ( !payload ) return response.status( 401 ).json({
                error: 'Invalid token',
            });

            const user = await UserModel.findById( payload.id );
            if ( !user /*|| !user.emaiValidated*/ ) return response.status( 401 ).json({
                error: 'Invalid user',
            });

            request.body.user = UserEntity.fromObject( user );
            next();
        }
        catch( error ) {

            console.log( error );
            return response.status( 500 ).json({ 
                error: 'Internal server error'
            });
        };
    };
};