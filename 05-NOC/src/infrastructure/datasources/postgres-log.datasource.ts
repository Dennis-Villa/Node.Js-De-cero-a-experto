import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

const severityLevelEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
};

export class PostgresLogDatasource implements LogDatasource {
    
    async saveLog(log: LogEntity): Promise<void> {
        
        const level = severityLevelEnum[ log.level ];

        const newLog = await prisma.log.create({
            data: {
                ...log,
                level,
            }
        });

        console.log( 'PostgreSQL Log created: ', newLog.id );

    }
    
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        const level = severityLevelEnum[ severityLevel ];

        const logs = await prisma.log.findMany({
            where: {
                level,
            }
        });
        
        return logs.map( mongoLog => LogEntity.fromObject( mongoLog ) );

    }

};