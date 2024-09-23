// const getPokemonById = ( id, callback ) => {
//     const url = `https://pokeapi.co/api/v2/pokemon/${ id }`;

//     fetch( url ).then( (response) => {
//         response.json().then( ( pokemon ) => {
//             // console.log( pokemon.name );

//             callback( null, pokemon.name );
//         })
//         .catch( (err) => {
//             callback( err );
//         });
//     })
//     .catch( (err) => {
//         callback( err );
//     });
// };



// const getPokemonById = ( id ) => {
//     const url = `https://pokeapi.co/api/v2/pokemon/${ id }`;

//     return fetch( url )
//         .then( ( response ) => response.json())
//         .then( ( pokemon ) => pokemon.name );
// };


export const buildGetPokemonById = ({ httpClient }: any) => {

    return async( id: string|number ): Promise<string> => {
        const url = `https://pokeapi.co/api/v2/pokemon/${ id }`;
    
        const pokemon = await httpClient.get( url );

        return pokemon.name;
    };
};