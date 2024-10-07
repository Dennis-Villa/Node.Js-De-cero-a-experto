import { Validators } from '../../../config';

export class CreateProductDto {

    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string,
        public readonly category: string,
    ){};

    static create( props: { [ key: string ]: any } ): [ string?, CreateProductDto? ] {

        const { name, price, user, category, available = false, description = '' } = props;
        let availableBoolean = available;

        if( !name ) return [ 'Name is required' ];
        if( !price ) return [ 'Price is required' ];
        if( !user ) return [ 'User is required' ];
        if( !Validators.isMongoId( user ) ) return [ 'Invalid User ID' ];
        if( !category ) return [ 'Category is required' ];
        if( !Validators.isMongoId( category ) ) return [ 'Invalid Category ID' ];

        if( typeof available === 'string' ) {
            
            availableBoolean = ( available.toLowerCase() === 'true' );
        }
        else if( typeof available === 'number' ) {
            
            availableBoolean = ( available > 0 );
        }

        return [ undefined, new CreateProductDto( 
            name, availableBoolean, price, description, user, category
        )];
    };
};