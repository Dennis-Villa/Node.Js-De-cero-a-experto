import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogRepositoryImplementation } from '../../../src/infrastructure/repositories/log.repository.implementation';

describe('log.repository.implementation', () => {

    const log = new LogEntity({
        origin: 'mongo-log.datasource.test.ts',
        message: 'test message',
        level: LogSeverityLevel.low,
    });

    const mockDatasource = {

        saveLog: jest.fn(),
        getLogs: jest.fn(),
        
    }

    const logRepository = new LogRepositoryImplementation( mockDatasource );

    afterEach(async() => {

        jest.clearAllMocks();
        
    });

    test('saveLog should call the datasource with arguments', () => {

        logRepository.saveLog( log );

        expect( mockDatasource.saveLog ).toHaveBeenCalledTimes(1);
        expect( mockDatasource.saveLog ).toHaveBeenCalledWith(
            expect.objectContaining(log)
        );

    });

    test('getLogs should create a low level log in all.log and low.log files', async () => {

        const severity = LogSeverityLevel.low;

        logRepository.getLogs( severity );

        expect( mockDatasource.getLogs ).toHaveBeenCalledTimes(1);
        expect( mockDatasource.getLogs ).toHaveBeenCalledWith( severity );

    });

});