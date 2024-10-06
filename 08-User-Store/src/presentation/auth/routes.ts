import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService, EmailService } from '../services';

export class AuthRoutes {

    constructor(
        private readonly envs: { [ key: string ]: any },
      ){};

    get routes(): Router {

        const router = Router();

        const emailService = new EmailService(
            this.envs.SEND_EMAIL,
            this.envs.MAILER_EMAIL,
            this.envs.MAILER_SERVICE,
            this.envs.MAILER_SECRET_KEY,
        );

        const authService = new AuthService(
            this.envs.WEB_SERVICE_URL,
            emailService,
        );

        const controller = new AuthController(
            authService,
        );
        
        router.post('/login', controller.loginUser );
        router.post('/register', controller.registerUser );

        router.get('/validate-email/:token', controller.validateEmail );

        return router;
    };
};

