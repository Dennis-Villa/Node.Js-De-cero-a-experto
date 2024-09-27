import { CheckService } from "../domain/use-cases/checks/check-service.use-case";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImplementation } from "../infrastructure/repositories/log.repository.implementation";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";

const fileSystemRepository = new LogRepositoryImplementation(
    new FileSystemDatasource()
);

export class Server {

    public static start() {
        
        // const url = 'http://google.com';
        const url = 'http://localhost:3000';

        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                new CheckService(
                    fileSystemRepository,
                    () => console.log(`${ url } is ok`),
                    ( error ) => console.log( error ),
                ).execute( url );
            },
        );
    }
}