import { buildMakePerson } from '../../src/js-foundation/05-factory';

describe('05-factory.ts', () => {
    const getUUID = () => '1234';
    const getAge = () => 35;

    test('buildMakePerson should return a function', () => {
        const makePerson = buildMakePerson({
            getUUID,
            getAge
        });

        expect(typeof makePerson).toBe('function');
    });

    test('makePerson should return a person', () => {
        const makePerson = buildMakePerson({
            getUUID,
            getAge
        });

        const person = makePerson({
            name: 'John Doe',
            birthdate: '1985-10-21',
        })

        expect( person ).toStrictEqual({
            id: getUUID(),
            name: 'John Doe',
            birthdate: '1985-10-21',
            age: getAge(),
        });
    });
});