import { Router } from 'express';
import { AuthRoutes } from './auth/routes';

export class AppRoutes {

  private readonly authRoutes: AuthRoutes;

  constructor(
    private readonly envs: { [ key: string ]: any },
  ){

    this.authRoutes = new AuthRoutes( this.envs );
  };

  get routes(): Router {

    const router = Router();
    
    router.use('/api/auth', this.authRoutes.routes);

    return router;
  };
};

