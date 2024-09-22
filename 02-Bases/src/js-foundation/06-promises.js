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


const buildGetPokemonById = ({ httpClientPlugin }) => {

    return async( id ) => {
        const url = `https://pokeapi.co/api/v2/pokemon/${ id }`;
    
        const pokemon = await httpClientPlugin.get( url );

        return pokemon.name;
    };
}

module.exports = {
    buildGetPokemonById
};