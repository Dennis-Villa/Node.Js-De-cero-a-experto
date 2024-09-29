import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

const origin = 'check-service-multiple.use-case.ts';

interface CheckServiceMultipleUseCase {
    execute( url: string ): Promise<boolean>;
};

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;

type NonEmptyArray<T> = [T, ...T[]];

export class CheckServiceMultiple implements CheckServiceMultipleUseCase{

    constructor(
        private readonly logRepositories: NonEmptyArray<LogRepository>,
        private readonly successCallback: SuccessCallback = undefined,
        private readonly errorCallback: ErrorCallback = undefined,
    ) {};

    private callLogs( log: LogEntity ) {

        this.logRepositories.forEach(
            async ( repository ) => await repository.saveLog( log )
        );

    };

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
            this.callLogs( log );

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
            this.callLogs( log );

            this.errorCallback && this.errorCallback( errorInfo );

            return false;
        }

        
    };
}