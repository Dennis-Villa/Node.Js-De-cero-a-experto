import fs from 'fs';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { FileSystemDatasource } from '../../../src/infrastructure/datasources/file-system.datasource';

describe('file-system.datasource', () => {

    const path =`${__dirname}/../../../logs`;
    const logSpy = jest.spyOn(console, 'log');

    const log = new LogEntity({
        origin: 'mongo-log.datasource.test.ts',
        message: 'test message',
        level: LogSeverityLevel.low,
    });

    afterEach(async() => {

        fs.rmSync( path, { recursive: true } );
        
    });

    test('should create log files if they do not exists', () => {

        const fileSystemLog = new FileSystemDatasource();

        const files = fs.readdirSync( path );

        expect( files ).toHaveLength(4);
        expect( files ).toEqual([
            'all.log',
            'high.log',
            'low.log',
            'medium.log',
        ]);

    });

    test('should create a low level log in all.log and low.log files', async () => {

        const fileSystemLog = new FileSystemDatasource();

        await fileSystemLog.saveLog( log );

        const allContent = fs.readFileSync( `${ path }/all.log`, 'utf-8' );
        const lowContent = fs.readFileSync( `${ path }/low.log`, 'utf-8' );
        const mediumContent = fs.readFileSync( `${ path }/medium.log`, 'utf-8' );
        const highContent = fs.readFileSync( `${ path }/high.log`, 'utf-8' );

        expect( allContent ).toContain( JSON.stringify( log ));
        expect( lowContent ).toContain( JSON.stringify( log ));
        expect( mediumContent.length ).toBe(0);
        expect( highContent.length ).toBe(0);

    });

    test('should create a medium level log in all.log and medium.log files', async () => {

        const fileSystemLog = new FileSystemDatasource();
        const newLog = {
            ...log,
            level: LogSeverityLevel.medium,
        };

        await fileSystemLog.saveLog( newLog );

        const allContent = fs.readFileSync( `${ path }/all.log`, 'utf-8' );
        const lowContent = fs.readFileSync( `${ path }/low.log`, 'utf-8' );
        const mediumContent = fs.readFileSync( `${ path }/medium.log`, 'utf-8' );
        const highContent = fs.readFileSync( `${ path }/high.log`, 'utf-8' );

        expect( allContent ).toContain( JSON.stringify( newLog ));
        expect( mediumContent ).toContain( JSON.stringify( newLog ));
        expect( lowContent.length ).toBe(0);
        expect( highContent.length ).toBe(0);

    });

    test('should create a high level log in all.log and high.log files', async () => {

        const fileSystemLog = new FileSystemDatasource();
        const newLog = {
            ...log,
            level: LogSeverityLevel.high,
        };

        await fileSystemLog.saveLog( newLog );

        const allContent = fs.readFileSync( `${ path }/all.log`, 'utf-8' );
        const lowContent = fs.readFileSync( `${ path }/low.log`, 'utf-8' );
        const mediumContent = fs.readFileSync( `${ path }/medium.log`, 'utf-8' );
        const highContent = fs.readFileSync( `${ path }/high.log`, 'utf-8' );

        expect( allContent ).toContain( JSON.stringify( newLog ));
        expect( highContent ).toContain( JSON.stringify( newLog ));
        expect( mediumContent.length ).toBe(0);
        expect( lowContent.length ).toBe(0);

    });

    test('should throw an error if level is incorrect', async () => {

        const fileSystemLog = new FileSystemDatasource();
        const customSeverityLevel = 'critical' as LogSeverityLevel;

        try {

            await fileSystemLog.saveLog({
                ...log,
                level: customSeverityLevel,
            });

            expect( true ).toBeFalsy();

        }
        catch( error ) {
            
            expect(`${ error }`).toBe(`Error: ${ customSeverityLevel } is not implemented`);

        }

    });

    test('should return all logs', async() => {

        const fileSystemLog = new FileSystemDatasource();

        fileSystemLog.saveLog(log);
        fileSystemLog.saveLog({
            ...log,
            level: LogSeverityLevel.medium,
        });
        fileSystemLog.saveLog({
            ...log,
            level: LogSeverityLevel.high,
        });

        const logsLow = await fileSystemLog.getLogs( LogSeverityLevel.low );
        const logsMedium = await fileSystemLog.getLogs( LogSeverityLevel.medium );
        const logsHigh = await fileSystemLog.getLogs( LogSeverityLevel.high );

        expect( logsLow.length ).toBe(1);
        expect( logsMedium.length ).toBe(1);
        expect( logsHigh.length ).toBe(1);
        expect( logsLow[0] ).toEqual( expect.objectContaining({
            origin: log.origin,
            message: log.message,
            level: LogSeverityLevel.low,
        }));
        expect( logsMedium[0] ).toEqual( expect.objectContaining({
            origin: log.origin,
            message: log.message,
            level: LogSeverityLevel.medium,
        }));
        expect( logsHigh[0] ).toEqual( expect.objectContaining({
            origin: log.origin,
            message: log.message,
            level: LogSeverityLevel.high,
        }));

    });

});