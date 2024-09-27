import { EmailService } from '../../../presentation/email/email.service';
import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

const origin = 'send-logs.use-case.ts';

interface SendLogEmailUseCase {
    execute( to: string | string[] ): Promise<boolean>;
};

// type EmailServiceFunction = ( to: string | string[] ) => Promise<boolean>;

export class SendLogEmail implements SendLogEmailUseCase{

    constructor(
        private readonly emailService: EmailService,
        // private readonly emailServiceFunction: EmailServiceFunction,
        private readonly logRepository: LogRepository,
    ) {};

    public async execute( to: string | string[] ): Promise<boolean> {

        try {

            const sent = await this.emailService.sendEmailWithFileSystemLogs( to );
            // const sent = await this.emailServiceFunction( to );
            
            if ( !sent ) {
                throw new Error('Email log not sent');
            }

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email sent',
                origin,
            });
            this.logRepository.saveLog( log );

            return true;
        }
        catch( error ) {

            const log = new LogEntity({
                message: `${ error }`,
                level: LogSeverityLevel.high,
                origin,
            });
            this.logRepository.saveLog( log );

            return false;
        }

        
    };
}