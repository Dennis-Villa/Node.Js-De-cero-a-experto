import { envs } from '../../../src/config/plugins/env.plugin';

describe('env.plugin', () => {

    test('should return env options', () => {
        
        expect( envs ).toEqual({

            PORT: 3000,
            MAILER_SERVICE: 'yahoo',
            MAILER_EMAIL: 'dennisvillaq@yahoo.com',
            MAILER_SECRET_KEY: 'jqllcthmhhoxtsuc',
            PRODUCTION: false,
            MONGO_DB_URL: 'mongodb://dennis:123456789@localhost:27017',
            MONGO_DB_NAME: 'NOC_TEST',
            MONGO_DB_USER: 'dennis',
            MONGO_DB_PASSWORD: '123456789',

        });

    });

    test('should return error if PORT env not integer', async () => {
        
        jest.resetModules();
        process.env.PORT = 'ABC';

        try {

            await import('../../../src/config/plugins/env.plugin');

            expect( true ).toBeFalsy();
        }
        catch(error) {

            expect( `${error}` ).toBe('EnvVarError: env-var: \"PORT\" should be a valid integer');
    
        }

    });

});