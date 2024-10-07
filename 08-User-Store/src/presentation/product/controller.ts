import { Request, Response } from "express";
import { PaginationDto, CustomError, UserEntity, CreateProductDto } from "../../domain";
import { ProductService } from "../services";

export class ProductController {

    constructor(
        public readonly productService: ProductService,
    ){};

    private handleError = ( error: Error | CustomError, response: Response ) => {

        if ( error instanceof CustomError ) {
        
            return response.status( error.statusCode ).json( error.message );
        };

        return response.status( 500 ).json({ 
            error: `Internal server error: ${error.message}`,
        });
    };

    createProduct = ( request: Request, response: Response ) => {

        const [ error, createCategoryDto ] = CreateProductDto.create({ 
            ...request.body,
            user: request.body.user.id,
        });
        if( error ) return response.status( 400 ).json({ error });

        return this.productService.createProduct( createCategoryDto! )
            .then( ( product ) => response.status( 201 ).json( product ) )
            .catch( ( error ) => this.handleError( error, response ) );
    };

    getProducts = ( request: Request, response: Response ) => {

        const { page = 1, limit = 10 } = request.query;

        const [ error, paginationDto ] = PaginationDto.create( Number( page ), Number( limit ) );
        if( error ) return response.status( 400 ).json({ error });

        return this.productService.getProducts( paginationDto! )
            .then( ( products ) => response.status( 201 ).json( products ) )
            .catch( ( error ) => this.handleError( error, response ) );
    };
};