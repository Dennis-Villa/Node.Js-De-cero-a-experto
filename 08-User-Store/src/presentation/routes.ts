import { Router } from 'express';
import { AuthRoutes } from './auth/routes';
import { CategoryRoutes } from './category/routes';

export class AppRoutes {

  private readonly authRoutes: AuthRoutes;
  private readonly categoryRoutes: CategoryRoutes;

  constructor(
    private readonly envs: { [ key: string ]: any },
  ){

    this.authRoutes = new AuthRoutes( this.envs );
    this.categoryRoutes = new CategoryRoutes();
  };

  get routes(): Router {

    const router = Router();
    
    router.use('/api/auth', this.authRoutes.routes);
    router.use('/api/categories', this.categoryRoutes.routes);

    return router;
  };
};

