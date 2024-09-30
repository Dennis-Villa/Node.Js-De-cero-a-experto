import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { MongoDatabase } from '../../../src/data/mongo/init';
import mongoose from 'mongoose';
import { MongoLogDatasource } from '../../../src/infrastructure/datasources/mongo-log.datasource';
import { LogModel } from '../../../src/data/mongo';

describe('mongo-log.datasource', () => {

    const mongoLog = new MongoLogDatasource();
    const logSpy = jest.spyOn(console, 'log');

    const log = new LogEntity({
        origin: 'mongo-log.datasource.test.ts',
        message: 'test message',
        level: LogSeverityLevel.low,
    });

    beforeAll(async() => {

        await MongoDatabase.connect({
            mongoURL: process.env.MONGO_DB_URL!,
            dbName: process.env.MONGO_DB_NAME!,
        });

    });

    afterEach(async() => {

        await LogModel.deleteMany();

    });

    afterAll(async() => {

        await mongoose.connection.close();

    });

    test('should create a log', async () => {

        await mongoLog.saveLog(log);

        expect( logSpy ).toHaveBeenCalled();
        expect( logSpy ).toHaveBeenCalledWith('Mongo Log created: ', 
            expect.any(String)
        );

    });

    test('should get logs', async () => {

        await mongoLog.saveLog(log);

        const logs = await mongoLog.getLogs( LogSeverityLevel.low );

        expect( logs.length ).toBe(1);
        expect( logs[0] ).toEqual( expect.objectContaining({
            origin: log.origin,
            message: log.message,
            level: log.level,
        }));

    });

});