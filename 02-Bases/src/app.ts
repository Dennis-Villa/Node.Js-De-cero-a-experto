// const {emailTemplate} = require('./js-foundation/01-template');
// require('./js-foundation/02-destructuring');
// const { getUserById } = require('./js-foundation/03-callbacks');
// const { getUserById } = require('./js-foundation/04-arrow');


// const { getUUID, getAge } = require('./plugins');
// const { buildMakePerson } = require('./js-foundation/05-factory');


// const makePerson = buildMakePerson({ getUUID, getAge });

// const obj = { name: 'John', birthdate: '1985-10-21'};

// const john = makePerson(obj);

// console.log(john);



import { httpClient } from './plugins';
import { buildGetPokemonById } from './js-foundation/06-promises';

// getPokemonById(2, ( error, pokemon ) => {
//     if ( error ) throw new Error(error);

//     console.log( pokemon );
// });

const getPokemonById = buildGetPokemonById({ httpClient });
const info = getPokemonById( 999 )
    .then( (pokemon) => console.log({ pokemon }))
    .catch( (error) => console.error({ error }));



// import { buildLogger } from './plugins';

// const logger = buildLogger('app.js');

// logger.log("Hola Mundo");
// logger.error("Esto es algo malo");