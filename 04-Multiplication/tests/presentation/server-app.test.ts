import { CreateTable } from '../../src/domain/use-cases/create-table.use-case';
import { SaveFile } from '../../src/domain/use-cases/save-file.use-case';
import { ServerApp } from '../../src/presentation/server-app';
import fs from 'fs';

describe('server-app', () => {

    const testOptions = {
        base: 2,
        limit: 10,
        showTable: false,
        name: 'test-filename',
        destination: 'test-destination',
    };
    const testContent = 'test-content';

    afterEach(() => {
        if (fs.existsSync(testOptions.destination))
            fs.rmdirSync(testOptions.destination, { recursive: true });
    });

    test('should create ServerApp instance', async() => { 
        const serverApp = new ServerApp();

        expect( serverApp ).toBeInstanceOf( ServerApp );
        expect( typeof ServerApp.run ).toBe( 'function' );
    });

    test('should run ServerApp with options', async() => { 

        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

        ServerApp.run( testOptions );

        expect( logSpy ).toHaveBeenCalledTimes(2);
        expect( logSpy ).toHaveBeenNthCalledWith(1, 'Server running...');
        expect( logSpy ).toHaveBeenNthCalledWith(2, 'File created');
        
        expect( createTableSpy ).toHaveBeenCalledTimes(1);
        expect( createTableSpy ).toHaveBeenCalledWith({
            base: testOptions.base,
            limit: testOptions.limit,
        });
        
        expect( saveFileSpy ).toHaveBeenCalledTimes(1);
        expect( saveFileSpy ).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: testOptions.destination,
            fileName: testOptions.name, 
        });
    });

    test('should run ServerApp with custom values mocked', async() => { 

        const createMock = jest.fn().mockReturnValue(testContent);
        const saveMock = jest.fn().mockReturnValue(true);
        const errorMock = jest.fn();

        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveMock;
        console.error = errorMock;

        ServerApp.run( testOptions );
        
        expect( createMock ).toHaveBeenCalledTimes(1);
        expect( createMock ).toHaveBeenCalledWith({
            base: testOptions.base,
            limit: testOptions.limit,
        });
        
        expect( saveMock ).toHaveBeenCalledTimes(1);
        expect( saveMock ).toHaveBeenCalledWith({
            fileContent: testContent,
            fileDestination: testOptions.destination,
            fileName: testOptions.name, 
        });
        expect( errorMock ).not.toHaveBeenCalled();
    });
});