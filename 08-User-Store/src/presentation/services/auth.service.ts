import { userModel } from '../../data';
import { CustomError } from '../../domain';
import { RegisterUserDto, LoginUserDto } from '../../domain';
import { UserEntity } from '../../domain';
import { cryptAdapter, JwtAdapter } from '../../config';

export class AuthService {

    constructor(

    ){};

    public async registerUser( registerUserDto: RegisterUserDto ) {

        try {

            const existUser = await userModel.findOne({
                email: registerUserDto.email,
            });
            if( existUser ) throw CustomError.badRequest( 'Email already exist' );

            const user = new userModel( registerUserDto );
            user.password = cryptAdapter.hash( user.password );

            await user.save();

            // *JWT

            // *Email de confirmacion

            const { password, ...userEntity } = UserEntity.fromObject( user );
            return {
                user: userEntity,
                token: 'ABC',
            };
        }
        catch( error ){

            throw CustomError.internalServer(`${ error }`);
        };
    };

    public async loginUser( loginUserDto: LoginUserDto ) {

        try {

            const user = await userModel.findOne({
                email: loginUserDto.email,
            });
            if( !user ) throw CustomError.badRequest( 'Incorrect Email or Password' );

            const isMatching = cryptAdapter.compare(
                loginUserDto.password,
                user.password,
            );
            if( !isMatching ) throw CustomError.badRequest( 'Incorrect Email or Password' );

            const token = await JwtAdapter.generateToken({ 
                    id: user.id, 
                    email: user.email, 
                });
            if( !token ) throw CustomError.internalServer( 'Error while creating JWT' );

            // *Email de confirmacion

            const { password, ...userEntity } = UserEntity.fromObject( user );
            return {
                user: userEntity,
                token,
            };
        }
        catch( error ){

            throw CustomError.internalServer(`${ error }`);
        };
    };
};