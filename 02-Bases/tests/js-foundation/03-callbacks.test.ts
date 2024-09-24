import { getUserById } from '../../src/js-foundation/03-callbacks';

describe('03-callbacks.ts', () => {
    test('getUserById should return an error if user does not exist', ( done ) => {
        const id = 10;

        getUserById( id, ( error, user ) => {
            expect( user ).toBeUndefined();
            expect( error ).toBe(`User not found with id ${id}`);
        
            done();
        });
    });

    test('getUserById should return an user if user exist', ( done ) => {
        const id = 1;

        getUserById( id, ( error, user ) => {
            expect( user ).toStrictEqual({
                id: 1,
                name: 'John Doe',
            });
            expect( error ).toBeUndefined();

            done();
        });
    });
});