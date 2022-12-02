const fs = require('fs');

const fileContent = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

// A, X => Rock => 1
// B, Y => Paper => 2
// C, Z => Scissors => 3
// Lost =>  0, Draw => 3, Win => 6

const combinations = {
  'A X': 1 + 3,
  'A Y': 2 + 6,
  'A Z': 3 + 0,
  'B X': 1 + 0,
  'B Y': 2 + 3,
  'B Z': 3 + 6,
  'C X': 1 + 6,
  'C Y': 2 + 0,
  'C Z': 3 + 3
};

const totalScore = fileContent.reduce((accumulator, currentValue) => accumulator + combinations[currentValue], 0);

console.log(totalScore);