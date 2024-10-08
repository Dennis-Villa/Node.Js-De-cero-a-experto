import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

const origin = 'check-service.use-case.ts';

interface CheckServiceUseCase {
    execute( url: string ): Promise<boolean>;
};

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;

export class CheckService implements CheckServiceUseCase{

    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback: SuccessCallback = undefined,
        private readonly errorCallback: ErrorCallback = undefined,
    ) {};

    public async execute( url: string ): Promise<boolean> {

        try {

            const request = await fetch( url );

            if ( !request.ok ){
                throw new Error(`Error on check service ${ url }`);
            }

            const log = new LogEntity({
                message: `Service ${ url } working`,
                level: LogSeverityLevel.low,
                origin,
            });
            await this.logRepository.saveLog( log );

            this.successCallback && this.successCallback();

            return true;
        }
        catch( error ) {

            const errorInfo = `${url} is not ok. ${ error}`;

            const log = new LogEntity({
                message: errorInfo,
                level: LogSeverityLevel.high,
                origin,
            });
            await this.logRepository.saveLog( log );

            this.errorCallback && this.errorCallback( errorInfo );

            return false;
        }

        
    };
}