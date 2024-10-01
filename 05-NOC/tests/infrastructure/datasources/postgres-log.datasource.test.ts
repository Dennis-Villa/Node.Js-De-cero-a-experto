import { PrismaClient, SeverityLevel } from '@prisma/client';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { PostgresLogDatasource } from '../../../src/infrastructure/datasources/postgres-log.datasource';

describe('postgres-log.datasource', () => {

    const prisma = new PrismaClient();
    const postgresLog = new PostgresLogDatasource();
    const logSpy = jest.spyOn(console, 'log');

    const log = new LogEntity({
        origin: 'mongo-log.datasource.test.ts',
        message: 'test message',
        level: LogSeverityLevel.low,
    });

    afterEach(async() => {

        await prisma.log.deleteMany({});
        

    });

    test('should create a log', async () => {

        await postgresLog.saveLog(log);

        expect( logSpy ).toHaveBeenCalled();
        expect( logSpy ).toHaveBeenCalledWith('PostgreSQL Log created: ', 
            expect.any(Number)
        );

    });

    test('should get logs', async () => {

        await postgresLog.saveLog(log);

        const logs = await postgresLog.getLogs( LogSeverityLevel.low );

        expect( logs.length ).toBe(1);
        expect( logs[0] ).toEqual( expect.objectContaining({
            origin: log.origin,
            message: log.message,
            level: SeverityLevel.LOW,
        }));

    });

});