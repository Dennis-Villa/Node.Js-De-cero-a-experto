import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';

describe('log.entity', () => {

    const dataObj = {
        origin: 'log.entity.test.ts',
        message: 'test-message',
        level: LogSeverityLevel.low,
    };
    const customDate = new Date();

    test('should create a log entity instance', async () => {

        const log = new LogEntity( dataObj );

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.origin ).toBe( dataObj.origin );
        expect( log.message ).toBe( dataObj.message );
        expect( log.level ).toBe( dataObj.level );
        expect( log.createdAt ).toBeInstanceOf( Date );

    });

    test('should create an instance with custom date', async () => {

        const log = new LogEntity({
            ...dataObj,
            createdAt: customDate,
        });

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.origin ).toBe( dataObj.origin );
        expect( log.message ).toBe( dataObj.message );
        expect( log.level ).toBe( dataObj.level );
        expect( log.createdAt ).toBeInstanceOf( Date );
        expect( log.createdAt ).toBe( customDate );

    });

    test('should create an instance from JSON', async () => {

        const jsonString = '{"message":"Email sent","level":"low","createdAt":"2024-09-27T18:44:29.044Z","origin":"send-logs.use-case.ts"}';
        const log = LogEntity.fromJson( jsonString );

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.origin ).toBe( 'send-logs.use-case.ts' );
        expect( log.message ).toBe( 'Email sent' );
        expect( log.level ).toBe( LogSeverityLevel.low );
        expect( log.createdAt ).toBeInstanceOf( Date );
        expect( log.createdAt ).toEqual( new Date('2024-09-27T18:44:29.044Z') );

    });

    test('should throw an error with empty JSON', async () => {

        const jsonString = '';

        try {

            const log = LogEntity.fromJson( jsonString );

            expect( true ).toBeFalsy();

        }
        catch( error ) {

            expect(`${ error }`).toBe('Error: JSON data is empty');

        }
        
    });

    test('should create an instance from Object', async () => {

        const log = LogEntity.fromObject({
            ...dataObj,
            createdAt: customDate,
        });

        expect( log ).toBeInstanceOf( LogEntity );
        expect( log.origin ).toBe( dataObj.origin );
        expect( log.message ).toBe( dataObj.message );
        expect( log.level ).toBe( dataObj.level );
        expect( log.createdAt ).toBeInstanceOf( Date );
        expect( log.createdAt ).toEqual( customDate );

    });

});