import { CheckService } from "../domain/use-cases/checks/check-service.use-case";
import { CronService } from "./cron/cron-service";

export class Server {

    public static start() {
        
        const url = 'http://google.com';

        console.log('Server started...');

        CronService.createJob(
            '*/20 * * * * *',
            () => {
                new CheckService(
                    () => console.log(`${ url } is ok`),
                    ( error ) => console.log( error ),
                ).execute( url );
            },
        );
    }
}