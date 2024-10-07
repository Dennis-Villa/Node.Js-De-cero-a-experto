import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';

export class FileUploadRoutes {

    public readonly validTypes = [
        'users',
        'products',
        'categories',
    ];

    constructor(){};

    get routes(): Router {

        const router = Router();

        const fileUploadService = new FileUploadService();
        const controller = new FileUploadController( fileUploadService );

        router.use( FileUploadMiddleware.containFiles );
        router.use( TypeMiddleware.validTypes( this.validTypes ) );

        router.post('/single/:type', controller.uploadFile );
        router.post('/multiple/:type', controller.uploadMultipleFiles );

        return router;
    };
};

