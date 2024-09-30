import { CheckServiceMultiple } from '../../../../src/domain/use-cases/checks/check-service-multiple.use-case';

describe('check-service-multiple.use-case', () => {

    const testUrlOk = 'https://google.com';
    const testUrlBad = 'https://localhost/fer444-erfw234';
    const mockRepository1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };
    const mockRepository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkServiceMultiple = new CheckServiceMultiple(
        [
            mockRepository1,
            mockRepository2,
        ],
        successCallback,
        errorCallback,
    );

    beforeEach(() => {

        jest.clearAllMocks();

    });

    test('should call successCallback when fetch returns true', async () => {

        const wasOk = await checkServiceMultiple.execute( testUrlOk );

        expect( wasOk ).toBeTruthy();
        expect( successCallback ).toHaveBeenCalledTimes(1);
        expect( errorCallback ).not.toHaveBeenCalled();
        expect( mockRepository1.saveLog ).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
                origin: expect.any(String),
                level: 'low',
            })
        );
        expect( mockRepository2.saveLog ).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
                origin: expect.any(String),
                level: 'low',
            })
        );
        
    });

    test('should call errorCallback when fetch fails', async () => {

        const wasOk = await checkServiceMultiple.execute( testUrlBad );

        expect( wasOk ).toBeFalsy();
        expect( successCallback ).not.toHaveBeenCalled();
        expect( errorCallback ).toHaveBeenCalledTimes(1);
        expect( mockRepository1.saveLog ).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
                origin: expect.any(String),
                level: 'high',
            })
        );
        expect( mockRepository2.saveLog ).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
                origin: expect.any(String),
                level: 'high',
            })
        );
        
    });

});