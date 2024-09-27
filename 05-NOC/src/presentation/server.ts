import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { SendLogEmail } from '../domain/use-cases/email/send-logs.use-case';
import { EmailService } from './email/email.service';

const fileSystemLogRepository = new LogRepositoryImplementation(
    new FileSystemDatasource()
);
const emailService = new EmailService();

export class Server {

    public static async start() {
        
        console.log('Server started...');

        // new SendLogEmail(
        //     emailService,
        //     fileSystemLogRepository,
        // ).execute(
        //     'dennisvillaq@yahoo.com'
        // );
    }
}