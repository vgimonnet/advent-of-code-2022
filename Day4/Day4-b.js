const fs = require('fs');

const fileContent = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

const testPairs = (pairs) => {
  [firstPair, secondPair] = pairs.split(',').map(pair => pair.split('-').map(section => parseInt(section)));

  return (firstPair[0] >= secondPair[0] && firstPair[0] <= secondPair[1]) 
    || (firstPair[1] >= secondPair[0] && firstPair[1] <= secondPair[1])  
    || (secondPair[0] >= firstPair[0] && secondPair[0] <= firstPair[1])  
    || (secondPair[2] >= firstPair[0] && secondPair[1] <= firstPair[1]);  
}

const nbPairs = fileContent.reduce((accumulator, pair) => testPairs(pair) ? accumulator += 1 : accumulator, 0);

console.log(nbPairs);