import { SaveFile } from '../../../src/domain/use-cases/save-file.use-case';
import fs from 'fs';

describe('save-file.use-case', () => {

    const options = {
        fileContent: 'custom content',
        fileDestination: 'outputs/custom-outputs', 
        fileName: 'custom-table-name.txt',
    };
    const filePath = `${ options.fileDestination }/${ options.fileName }`;

    afterEach(() => {
        if( fs.existsSync( 'outputs' ) )
            fs.rmSync('outputs', { recursive: true });
    });

    test('should save file with default values', () => {      
        const saveFile = new SaveFile();
        const options = {
            fileContent: 'test',
        };
        const filePath = 'outputs/table.txt';

        const fileCreated = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8'});

        expect( fileCreated ).toBeTruthy();
        expect( fileExists ).toBeTruthy();
        expect( fileContent ).toBe('test');
    });

    test('should save file with custom values', () => {      
        const saveFile = new SaveFile();

        const fileCreated = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8'});

        expect( fileCreated ).toBeTruthy();
        expect( fileExists ).toBeTruthy();
        expect( fileContent ).toBe( options.fileContent );
    });

    test('should return false if directory could not be created', () => {      
        const saveFile = new SaveFile();

        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw 'This is a custom error message from testing'; }
        );

        const fileCreated = saveFile.execute(options);

        expect( fileCreated ).toBeFalsy();
        expect( mkdirSpy ).toHaveBeenCalled();

        mkdirSpy.mockRestore();
    });

    test('should return false if file could not be created', () => {      
        const saveFile = new SaveFile();

        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw 'This is a custom error message from testing'; }
        );

        const fileCreated = saveFile.execute(options);

        expect( fileCreated ).toBeFalsy();
        expect( writeFileSpy ).toHaveBeenCalled();

        writeFileSpy.mockRestore();
    });
});