
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    constructor( message: string, level: LogSeverityLevel ) {
        
        this.message = message;
        this.level = level;
        this.createdAt = new Date();

    };

    static fromJson( jsonData: string ): LogEntity {

        const { level, message, createdAt } = JSON.parse( jsonData );

        if( !level ) throw new Error('Level is required');
        if( !message ) throw new Error('Message is required');
        if( !createdAt ) throw new Error('Creation date is required');

        const log = new LogEntity( message, level );
        log.createdAt = new Date( createdAt );

        return log;
        
    };

};