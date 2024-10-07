import { CategoryModel, ProductModel } from '../../data';
import { PaginationDto, CustomError, UserEntity, CreateProductDto } from '../../domain';

export class ProductService {

    constructor(
        
    ) {}

    async createProduct( createProductDto: CreateProductDto ) {

        const { name } = createProductDto;

        const productExists = await ProductModel.findOne({ name });
        if( productExists ) throw CustomError.badRequest( 'Product already exisits' );

        try {

            const product = new ProductModel( createProductDto );

            await product.save();

            return await product.populate('user category', 'name email');
        }
        catch( error ) {

            console.log( error );
            throw CustomError.internalServer( 'Internal server error' );
        };
    };

    async getProducts( paginationDto: PaginationDto ) {

        const { page, limit } = paginationDto;

        try {

            const [ total, products ] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip( ( page - 1 ) * limit )
                    .limit( limit )
                    .populate('user', 'name email')
                    .populate('category', 'name'),
            ]);

            return {
                page,
                limit,
                total,
                prev: ( page - 1 > 0) ? `/api/products?page=${( page-1 )}&limit=${ limit }` : null,
                next: ( page * limit < total ) ? `/api/products?page=${( page+1 )}&limit=${ limit }`: null,
                products,
            }; 
        }
        catch( error ) {

            console.log( error );
            throw CustomError.internalServer( 'Internal server error' );
        };
    };
};