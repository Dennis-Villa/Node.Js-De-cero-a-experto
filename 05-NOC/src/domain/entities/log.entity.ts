
export enum LogSeverityLevel {
    low = 'low',
    medium = 'medium',
    high = 'high',
};

export interface LogEntityOptions {
    message: string;
    level: LogSeverityLevel;
    createdAt?: Date;
    origin: string;
};

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor( options: LogEntityOptions ) {
        
        const { message, level, origin, createdAt = new Date() } = options;

        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;

    };

    static fromJson( jsonData: string ): LogEntity {

        const { level, message, createdAt, origin } = JSON.parse( jsonData );

        if( !level ) throw new Error('Level is required');
        if( !message ) throw new Error('Message is required');
        if( !createdAt ) throw new Error('Creation date is required');

        const log = new LogEntity({ 
            message, 
            level,
            createdAt: createdAt,
            origin: origin,
        });

        return log;
        
    };

};