import { Router } from 'express';
import { CategoryController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CategoryService } from '../services/category.service';

export class CategoryRoutes {

    constructor(
        // private readonly envs: { [ key: string ]: any },
      ){};

    get routes(): Router {

        const router = Router();

        const categoryService = new CategoryService()
        const controller = new CategoryController( categoryService );

        router.get('/', controller.getCategories );
        router.post('/', AuthMiddleware.validateJWT, controller.createCategory );

        return router;
    };
};

