// import { yarg } from '../../../src/config/plugins/args.plugin';

const runComand = async( args: string[] ) => {
    process.argv = [ ...process.argv, ...args ];

    const { yarg } = await import('../../../src/config/plugins/args.plugin');

    return yarg;
};

describe('args.plugin', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('should return configuration with default values', async() => { 
        const base = 5;  
        const argv = await runComand([ '-b', `${base}` ]);
        
        expect( argv ).toEqual(
            expect.objectContaining({
                b: base,
                l: 10,
                s: false,
                n: 'multiplication-table.txt',
                d: 'outputs',
            })
        );
    });

    test('should return configuration with custom values', async() => { 
        const config = {
            b: 7,
            l: 6,
            s: true,
            n: 'test.txt',
            d: 'test-directory',
        };  
        const argv = await runComand([ 
            '-b', `${ config.b }`, 
            '-l', `${ config.l }`, 
            '-s', 
            '-n', config.n, 
            '-d', config.d, 
        ]);

        expect( argv ).toEqual(
            expect.objectContaining( config )
        );
    });
});