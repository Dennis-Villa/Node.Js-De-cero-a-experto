import { CheckService } from './../../../../src/domain/use-cases/checks/check-service.use-case';

describe('check-service.use-case', () => {

    const testUrlOk = 'https://google.com';
    const testUrlBad = 'https://localhost/fer444-erfw234';
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkService = new CheckService(
        mockRepository,
        successCallback,
        errorCallback,
    );

    beforeEach(() => {

        jest.clearAllMocks();

    });

    test('should call successCallback when fetch returns true', async () => {

        const wasOk = await checkService.execute( testUrlOk );

        expect( wasOk ).toBeTruthy();
        expect( successCallback ).toHaveBeenCalledTimes(1);
        expect( errorCallback ).not.toHaveBeenCalled();
        expect( mockRepository.saveLog ).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
                origin: expect.any(String),
                level: 'low',
            })
        );
        
    });

    test('should call errorCallback when fetch fails', async () => {

        const wasOk = await checkService.execute( testUrlBad );

        expect( wasOk ).toBeFalsy();
        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).toHaveBeenCalledTimes(1);
        expect( mockRepository.saveLog ).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
                origin: expect.any(String),
                level: 'high',
            })
        );
        
    });

});