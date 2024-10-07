import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './category/routes';
import { ProductRoutes } from './product/routes';
import { FileUploadRoutes } from './file-upload/routes';
import { ImageRoutes } from './images/routes';

export class AppRoutes {

  private readonly authRoutes: AuthRoutes;
  private readonly categoryRoutes: CategoryRoutes;
  private readonly productRoutes: ProductRoutes;
  private readonly fileUploadRoutes: FileUploadRoutes;
  private readonly imageRoutes: ImageRoutes;

  constructor(
    private readonly envs: { [ key: string ]: any },
  ){

    this.authRoutes = new AuthRoutes( this.envs );
    this.categoryRoutes = new CategoryRoutes();
    this.productRoutes = new ProductRoutes();
    this.fileUploadRoutes = new FileUploadRoutes();
    this.imageRoutes = new ImageRoutes();
  };

  get routes(): Router {

    const router = Router();
    
    router.use('/api/auth', this.authRoutes.routes);
    router.use('/api/categories', this.categoryRoutes.routes);
    router.use('/api/products', this.productRoutes.routes);
    router.use('/api/upload', this.fileUploadRoutes.routes);
    router.use('/api/images', this.imageRoutes.routes);

    return router;
  };
};

