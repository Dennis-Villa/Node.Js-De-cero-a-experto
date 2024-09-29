import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { SendLogEmail } from '../domain/use-cases/email/send-logs.use-case';
import { EmailService } from './email/email.service';
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { CronService } from "./cron/cron.service";
import { CheckService } from "../domain/use-cases/checks/check-service.use-case";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple.use-case";

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

        // new SendLogEmail(
        //     emailService,
        //     fileSystemLogRepository,
        // ).execute(
        //     'dennisvillaq@yahoo.com'
        // );
    }
}