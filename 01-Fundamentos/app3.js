const fs = require('fs');

const content = fs.readFileSync('README.md', 'utf-8');

// const words = content.split(' ');

// const reactWordsCount = words.filter(
//     (word) => word.toLocaleLowerCase() == 'react'
// ).length;

const reactWordsCount = content.match(/react/ig ?? []).length;

console.log('Palabras React: ', reactWordsCount);