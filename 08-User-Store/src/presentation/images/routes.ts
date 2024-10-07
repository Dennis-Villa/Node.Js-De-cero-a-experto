import { Router } from 'express';
import { ImageController } from './controller';
import { TypeMiddleware } from '../middlewares/type.middleware';

export class ImageRoutes {

    public readonly validTypes = [
        'users',
        'products',
        'categories',
    ];

    constructor(){};

    get routes(): Router {

        const router = Router();
        const controller = new ImageController();

        router.get('/:type/:img', TypeMiddleware.validTypes( this.validTypes ), controller.getImage );
        
        return router;
    };
};

