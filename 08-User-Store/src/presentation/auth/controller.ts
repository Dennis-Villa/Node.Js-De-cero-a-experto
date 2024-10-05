import { Request, Response } from "express";
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { AuthService } from "../services/auth.service";
import { CustomError } from "../../domain";
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';

export class AuthController {

    constructor(
        public readonly authService: AuthService,
    ){};

    private handleError = ( error: Error | CustomError, response: Response ) => {

        if ( error instanceof CustomError ) {
        
            return response.status( error.statusCode ).json( error.message );
        };

        return response.status( 500 ).json({ 
            error: `Internal server error: ${error.message}`,
        });
    };

    registerUser = ( request: Request, response: Response ) => {

        const [ error, registerUserDto ] = RegisterUserDto.create( request.body );

        if( error ){

            return response.status( 400 ).json( error );
        }

        return this.authService.registerUser( registerUserDto! )
            .then( ( user ) => response.json( user ))
            .catch( ( error ) => this.handleError( error, response ));
    };

    loginUser = ( request: Request, response: Response ) => {

        const [ error, loginUserDto ] = LoginUserDto.create( request.body );

        if( error ){

            return response.status( 400 ).json( error );
        }

        return this.authService.loginUser( loginUserDto! )
            .then( ( user ) => response.json( user ))
            .catch( ( error ) => this.handleError( error, response ));
    };

    validateEmail = ( request: Request, response: Response ) => {

        response.json( 'validateEmail' );
    };
};