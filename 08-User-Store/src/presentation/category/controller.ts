import { Request, Response } from "express";
import { CreateCategoryDto, PaginationDto, CustomError, UserEntity } from "../../domain";
import { CategoryService } from "../services";

export class CategoryController {

    constructor(
        public readonly categoryService: CategoryService,
    ){};

    private handleError = ( error: Error | CustomError, response: Response ) => {

        if ( error instanceof CustomError ) {
        
            return response.status( error.statusCode ).json( error.message );
        };

        return response.status( 500 ).json({ 
            error: `Internal server error: ${error.message}`,
        });
    };

    createCategory = ( request: Request, response: Response ) => {

        const [ error, createCategoryDto ] = CreateCategoryDto.create( request.body );
        if( error ) return response.status( 400 ).json({ error });
        
        const { user } = request.body;

        return this.categoryService.createCategory( createCategoryDto!, UserEntity.fromObject( user ) )
            .then( ( category ) => response.status( 201 ).json( category ) )
            .catch( ( error ) => this.handleError( error, response ) );
    };

    getCategories = ( request: Request, response: Response ) => {

        const { page = 1, limit = 10 } = request.query;

        const [ error, paginationDto ] = PaginationDto.create( Number( page ), Number( limit ) );
        if( error ) return response.status( 400 ).json({ error });

        return this.categoryService.getCategories( paginationDto! )
            .then( ( categories ) => response.status( 201 ).json( categories ) )
            .catch( ( error ) => this.handleError( error, response ) );
    };
};