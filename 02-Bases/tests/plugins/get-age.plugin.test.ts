import { getAge } from '../../src/plugins/get-age.plugin';

describe('get-age.plugin.ts', () => {
    test('getAge should return 0 years', () => {
        const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1995);

        const birthdate = '1985-10-21';
        
        const age = getAge( birthdate );

        expect( age ).toBe( 0 );
        expect( spy ).toHaveBeenCalledTimes(2);
    });
});