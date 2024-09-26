import { ServerApp } from "../src/presentation/server-app";

describe('app.ts', () => {

    const originalArgv = process.argv;

    test('should call ServerApp.run with values', async() => {
        
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock;

        process.argv = [
            ...originalArgv,
            '-b', '10',
            '-l', '5',
            '-s',
            '-n', 'test-file',
            '-d', 'test-destination',
        ];

        await import('../src/app');

        expect( serverRunMock ).toHaveBeenCalledWith({
            base: 10,
            limit: 5,
            showTable: true,
            name: 'test-file',
            destination: 'test-destination',
        });
    });
});
