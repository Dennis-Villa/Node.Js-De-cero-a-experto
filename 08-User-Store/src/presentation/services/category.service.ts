import { CategoryModel } from '../../data';
import { CreateCategoryDto, PaginationDto, CustomError, UserEntity } from '../../domain';

export class CategoryService {


    constructor(
        
    ) {}

    async createCategory( createCategoryDto: CreateCategoryDto, user: UserEntity ) {

        const { name } = createCategoryDto;

        const categoryExists = await CategoryModel.findOne({ name });
            if( categoryExists ) throw CustomError.badRequest( 'Category already exisits' );

        try {

            const category = new CategoryModel({
                ...createCategoryDto,
                user: user.id,
            });

            await category.save();

            return {
                id: category.id,
                name: category.name,
                available: category.available,
            };
        }
        catch( error ) {

            console.log( error );
            throw CustomError.internalServer( 'Internal server error' );
        };
    };

    async getCategories( paginationDto: PaginationDto ) {

        const { page, limit } = paginationDto;

        try {

            const [ total, categories ] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find()
                    .skip( ( page - 1 ) * limit )
                    .limit( limit ),
            ]);

            return {
                page,
                limit,
                total,
                prev: ( page - 1 > 0) ? `/api/categories?page=${( page-1 )}&limit=${ limit }` : null,
                next: ( page * limit < total ) ? `/api/categories?page=${( page+1 )}&limit=${ limit }`: null,
                categories: categories.map( (category) => ({
                    id: category.id,
                    name: category.name,
                    available: category.available,
                })),
            }; 
        }
        catch( error ) {

            console.log( error );
            throw CustomError.internalServer( 'Internal server error' );
        };
    };
};