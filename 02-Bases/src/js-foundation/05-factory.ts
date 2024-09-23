// const { getUUID, getAge } = require('../plugins');

interface BuildMakePersonOptions {
    getUUID: () => string;
    getAge: ( birthdate: string ) => number;
};

interface PersonOptions {
    name: string;
    birthdate: string;
}

export const buildMakePerson = ( { getUUID, getAge }: BuildMakePersonOptions ) => {

    return ( {name, birthdate}: PersonOptions ) => {

        return {
            id: getUUID(),
            name,
            birthdate,
            age: getAge( birthdate ),
        };
    };
}

// const obj = {
//     name: 'John',
//     birthdate: '1985-10-21'
// };

// const john = buildPerson( obj );

// console.log(john);