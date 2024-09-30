import { SendLogEmail } from '../../../../src/domain/use-cases/email/send-logs.use-case';

describe('send-logs.use-case', () => {

    const falseEmail = 'pepe23@pepe21.com';
    const mockEmailService = {
        sendEmail: jest.fn(),
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true),
    };
    const mockRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    };

    const sendLogEmail = new SendLogEmail(
        mockEmailService as any,
        mockRepository,
    );

    beforeEach(() => {

        jest.clearAllMocks();

    });

    test('should use emailService and logRepository', async () => {

        const sent = await sendLogEmail.execute( falseEmail );

        expect( sent ).toBeTruthy();
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1);
        expect( mockRepository.saveLog ).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
                origin: expect.any(String),
                level: 'low',
            })
        );

    });

    test('should use logRepository in case of error', async () => {

        mockEmailService.sendEmailWithFileSystemLogs.mockReturnValue(false);
        
        const sent = await sendLogEmail.execute( falseEmail );

        expect( sent ).toBeFalsy();
        expect( mockEmailService.sendEmailWithFileSystemLogs ).toHaveBeenCalledTimes(1);
        expect( mockRepository.saveLog ).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String),
                origin: expect.any(String),
                level: 'high',
            })
        );

    });

});