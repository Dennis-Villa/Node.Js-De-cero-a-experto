// console.log(process.env);

const { ComSpec, INIT_CWD, npm_lifecycle_script } = process.env;

// console.table({ ComSpec, INIT_CWD, npm_lifecycle_script });

export const characters = ['Flash', 'Superman', 'Green Lantern', 'Batman'];

const [ , , , batman ] = characters;

// console.log(batman);