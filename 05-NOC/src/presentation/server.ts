import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from './email/email.service';
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";

const fsLogRepository = new LogRepositoryImplementation(
    new FileSystemDatasource()
);
const mongoLogRepository = new LogRepositoryImplementation(
    new MongoLogDatasource()
);
const postgresLogRepository = new LogRepositoryImplementation(
    new PostgresLogDatasource()
);

const emailService = new EmailService();

export class Server {

    public static async start() {
        
        console.log('Server started...');

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'https://localhost:3000';

        //         new CheckServiceMultiple(
        //             [
        //                 fsLogRepository,
        //                 mongoLogRepository,
        //                 postgresLogRepository
        //             ],
        //         ).execute( url );
        //     }
        // );

        // const logs = await logRepository.getLogs( LogSeverityLevel.low );
        // console.log( logs );

        // const emailService = new EmailService();
        // emailService.sendEmail({
        //     to: 'dennisvillaq@yahoo.com',
        //     subject: 'Test',
        //     htmlBody: '<h1>Test</h1>'
        // })

    }
}