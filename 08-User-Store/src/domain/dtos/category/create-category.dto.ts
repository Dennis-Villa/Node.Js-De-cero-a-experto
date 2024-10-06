
export class CreateCategoryDto {

    private constructor(
        public readonly name: string,
        public readonly available?: boolean,
    ){};

    static create( object: { [ key: string ]: any } ): [ string?, CreateCategoryDto? ] {

        const { name, available = false } = object;
        let availableBoolean = available;

        if( !name ) return [ 'Name is required' ];

        if( typeof available === 'string' ) {
            
            availableBoolean = ( available.toLowerCase() === 'true' );
        }
        else if( typeof available === 'number' ) {
            
            availableBoolean = ( available > 0 );
        }

        return [ undefined, new CreateCategoryDto( name, availableBoolean )];
    };
};