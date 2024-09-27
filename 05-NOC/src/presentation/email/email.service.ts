import  nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/env.plugin';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[],
};

interface Attachment {
    filename?: string;
    path: string;
};

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
          user: envs.MAILER_EMAIL,
          pass: envs.MAILER_SECRET_KEY,
        },
        tls:{
            rejectUnauthorized: false,
        },
    });

    constructor() {};

    async sendEmail( options: SendMailOptions ): Promise<boolean> {
        
        const { to, subject, htmlBody } = options;

        try {
            const sentInformation = await this.transporter.sendMail({
                from: envs.MAILER_EMAIL,
                to,
                subject,
                html: htmlBody,
            });

            return true;
        }
        catch (error) {

            throw error;
        }

        return false;
    };

    async sendEmailWithFileSystemLogs( to: string | string[] ): Promise<boolean> {
        
        const subject = 'Logs del servidor';
        const htmlBody = `
        <h3>Logs de sistema - NOC</h3>
        <p>Ver logs adjuntos</p>
        `;

        const attachments: Attachment[] = [
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

        try {

            return this.sendEmail({
                to,
                subject,
                htmlBody,
                attachments,
            });
            
        }
        catch (error) {

            throw error;
        }

        return false;
    };

};