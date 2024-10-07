import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './category/routes';
import { ProductRoutes } from './product/routes';

export class AppRoutes {

  private readonly authRoutes: AuthRoutes;
  private readonly categoryRoutes: CategoryRoutes;
  private readonly productRoutes: ProductRoutes;

  constructor(
    private readonly envs: { [ key: string ]: any },
  ){

    this.authRoutes = new AuthRoutes( this.envs );
    this.categoryRoutes = new CategoryRoutes();
    this.productRoutes = new ProductRoutes();
  };

  get routes(): Router {

    const router = Router();
    
    router.use('/api/auth', this.authRoutes.routes);
    router.use('/api/categories', this.categoryRoutes.routes);
    router.use('/api/products', this.productRoutes.routes);

    return router;
  };
};

