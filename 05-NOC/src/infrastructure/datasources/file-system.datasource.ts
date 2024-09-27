import fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDatasource implements LogDatasource {
    
    private readonly logsPath = 'logs/';
    private readonly allLogsPath    = 'logs/all.log';
    private readonly lowLogsPath    = 'logs/low.log';
    private readonly mediumLogsPath = 'logs/medium.log';
    private readonly highLogsPath   = 'logs/high.log';

    constructor() {

        this.createLogsFile();

    };

    private createLogsFile() {

        if ( !fs.existsSync( this.logsPath ) ) {
            fs.mkdirSync( this.logsPath );
        }

        [
            this.allLogsPath,
            this.lowLogsPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach( path => {
            if ( fs.existsSync( path ) ) return;

            fs.writeFileSync( path, '' )
        });

    };

    private getLogsFromFile( path: string ): LogEntity[] {
        
        const content = fs.readFileSync( path, 'utf-8' );

        const logs = content.split( '\n' ).map( 
            log => LogEntity.fromJson( log )
        );

        return logs;

    };

    async saveLog( newLog: LogEntity ): Promise<void> {

        const logAsJson = `${ JSON.stringify(newLog) },\n`;

        fs.appendFileSync( this.allLogsPath, logAsJson );
        
        switch ( newLog.level ) {
            case LogSeverityLevel.low:
                
                fs.appendFileSync( this.lowLogsPath, logAsJson );
                break;
        
            case LogSeverityLevel.medium:

                fs.appendFileSync( this.mediumLogsPath, logAsJson );
                break;
        
            case LogSeverityLevel.high:

                fs.appendFileSync( this.highLogsPath, logAsJson );
                break;
        
            default:

                throw new Error(`${ newLog.level } is not implemented`);
                break;
        };

        return;
    };

    async getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {

        switch ( severityLevel ) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile( this.lowLogsPath );
        
            case LogSeverityLevel.medium:
                return this.getLogsFromFile( this.mediumLogsPath );
        
            case LogSeverityLevel.high:
                return this.getLogsFromFile( this.highLogsPath );
        
            default:
                throw new Error(`${ severityLevel } is not implemented`);
                break;
        };

    };

};