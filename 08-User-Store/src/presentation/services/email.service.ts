import nodemailer, { Transporter } from 'nodemailer';

export interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

export interface Attachement {
  filename: string;
  path: string;
}


export class EmailService {

    private transporter: Transporter;

    constructor(
        private readonly postToProvider: boolean,
        private readonly mailerEmail: string,
        mailerService: string,
        sendEmailPassword: string,
    ) {

        this.transporter = nodemailer.createTransport({
            service: mailerService,
            auth: {
                user: mailerEmail,
                pass: sendEmailPassword,
            },
            tls:{
                rejectUnauthorized: false,
            },
        });
    };

    async sendEmail( options: SendMailOptions ): Promise<boolean> {

        const { to, subject, htmlBody, attachements = [] } = options;

        if( !this.postToProvider ) return true;

        try {

            const sentInformation = await this.transporter.sendMail({
                from: this.mailerEmail,
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachements,
            });


            return true;
        }
        catch ( error ) {

            throw error;
        };
    };
};