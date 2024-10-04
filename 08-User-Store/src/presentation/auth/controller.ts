import { Request, Response } from "express";
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';
import { AuthService } from "../services/auth.service";

export class AuthController {

    constructor(
        public readonly authService: AuthService,
    ){};

    registerUser = ( request: Request, response: Response ) => {

        const [ error, registerUserDto ] = RegisterUserDto.create( request.body );

        if( error ){

            return response.status( 400 ).json({ error });
        }

        return this.authService.registerUser( registerUserDto! )
            .then( ( user ) => response.json( user ))
            .catch( ( error ) => response.json( error ));
    };

    loginUser = ( request: Request, response: Response ) => {

        response.json( 'loginUser' );
    };

    validateEmail = ( request: Request, response: Response ) => {

        response.json( 'validateEmail' );
    };
};