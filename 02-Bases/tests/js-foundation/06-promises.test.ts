import { buildGetPokemonById } from '../../src/js-foundation/06-promises';
import { httpClientPlugin as httpClient } from '../../src/plugins/http-client.plugin'

describe('06-promises.ts', () => {
    test('buildGetPokemonById should return a function', () => {
        const getPokemonById = buildGetPokemonById({
            httpClient
        });

        expect(typeof getPokemonById).toBe('function');
    });

    test('makePerson should return a pokemon', async() => {
        const pokemonId = 1;
        
        const getPokemonById = buildGetPokemonById({
            httpClient
        });

        const pokemon = await getPokemonById( pokemonId );

        expect( pokemon ).toBe('bulbasaur');
    });

    test('makePerson should return an error if pokemon does not exists', async() => {
        const pokemonId = 999999;
        
        const getPokemonById = buildGetPokemonById({
            httpClient
        });

        try {
            const pokemon = await getPokemonById( pokemonId );
            expect( true ).toBeFalsy();
        }
        catch(error) {
            expect( error ).toBe(`Pokemon not found with id ${ pokemonId }`);
        }
    });
});