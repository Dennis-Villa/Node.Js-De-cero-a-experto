import { CreateTable } from './../../../src/domain/use-cases/create-table.use-case';

describe('create-table.use-case.ts', () => {
    test('should create table with default values', () => {
        const options = {
            base: 3,
        };
        
        const createTable = new CreateTable();

        const table = createTable.execute(options);

        const rows = table.split('\n').length;

        expect( createTable ).toBeInstanceOf(CreateTable);
        expect( table ).toContain(`${ options.base } x 1 = ${ options.base }`);
        expect( table ).toContain(`${ options.base } x 10 = ${ options.base * 10 }`);
        expect( rows ).toBe(10);
    });

    test('should create table with custom values', () => {
        const options = {
            base: 3,
            limit: 20,
        };
        
        const createTable = new CreateTable();

        const table = createTable.execute(options);

        const rows = table.split('\n').length;

        expect( table ).toContain(`${ options.base } x 1 = ${ options.base }`);
        expect( table ).toContain(`${ options.base } x ${ options.limit } = ${ options.base * options.limit }`);
        expect( rows ).toBe( options.limit );
    });
});