import { userModel } from '../../data';
import { CustomError } from '../../domain';
import { RegisterUserDto } from '../../domain/dtos/auth/register-user.dto';

export class AuthService {

    constructor(

    ){};

    public async registerUser( registerUserDto: RegisterUserDto ) {

        const existUser = await userModel.findOne({
            email: registerUserDto.email,
        });

        if( existUser ) throw CustomError.badRequest( 'Email already exist' );

        return 'todo ok';
    };
};