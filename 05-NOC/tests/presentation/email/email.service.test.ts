import { EmailService, SendMailOptions } from '../../../src/presentation/email/email.service';
import nodemailer from 'nodemailer';

describe('email.service', () => {

    const mockSendMail = jest.fn();

    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail,
    });

    const emailService = new EmailService();
    const options: SendMailOptions = {
        to: 'dennisvilla@yahoo.com',
        subject: 'Test subject',
        htmlBody: '<h1>Test</h1>',
    };

    beforeEach(() => {

        jest.clearAllMocks();

    });

    test('should send email', async() => {

        const sent = await emailService.sendEmail(options);

        expect( mockSendMail ).toHaveBeenCalledTimes(1);
        expect( mockSendMail ).toHaveBeenCalledWith(
            expect.objectContaining({ 
                to: options.to,
                subject: options.subject,
                html: options.htmlBody,
            })
        );
    });

    test('should send email with attachments', async() => {

        const sent = await emailService.sendEmailWithFileSystemLogs( options.to );

        expect( mockSendMail ).toHaveBeenCalledTimes(1);
        expect( mockSendMail ).toHaveBeenCalledWith(
            expect.objectContaining({ 
                to: options.to,
                subject: expect.any(String),
                html: expect.any(String),
                attachments: [
                    {
                        filename: 'logs-all.log',
                        path: './logs/all.log',
                    }, 
                    {
                        filename: 'logs-medium.log',
                        path: './logs/medium.log',
                    }, 
                    {
                        filename: 'logs-high.log',
                        path: './logs/high.log',
                    }, 
                ]
            })
        );
    });

});