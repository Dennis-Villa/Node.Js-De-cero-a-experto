import { buildLogger, logger } from '../../src/plugins/logger.plugin';

describe('logger.plugin.ts', () => {
    test('httpClientPlugin should return a function logger', () => {
        const testLogger = buildLogger('test');

        expect( typeof testLogger.log ).toBe('function');
        expect( typeof testLogger.error ).toBe('function');
    });

    test('logger.log should log a message', () => {
        const loggerMock = jest.spyOn( logger, 'log');

        const message = 'test message';
        const service = 'test service';

        const testLogger = buildLogger(service);
        
        testLogger.log(message);

        expect( loggerMock ).toHaveBeenCalled();
        expect( loggerMock ).toHaveBeenCalledWith(
            'info',
            expect.objectContaining({
                "level": "info",
                "message": "test message",
                "service": "test service",
            })
        );
    });

    test('logger.error should log a message', () => {
        const loggerMock = jest.spyOn( logger, 'error');

        const message = 'test message';
        const service = 'test service';

        const testLogger = buildLogger(service);
        
        testLogger.error(message);

        expect( loggerMock ).toHaveBeenCalled();
        expect( loggerMock ).toHaveBeenCalledWith(
            "error",
            {
                "message": "test message", 
                "service": "test service"
            }
        );
    });
});