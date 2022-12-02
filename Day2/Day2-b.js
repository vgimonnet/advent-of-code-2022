const fs = require('fs');

const fileContent = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

// A => Rock => 1
// B => Paper => 2
// C => Scissors => 3
// X =>  0, Y => 3, Z => 6

const combinations = {
  'A X': 0 + 3, // oponent choose Rock and I must loose (0) so I had to choose  Scissors (3)
  'A Y': 3 + 1, // oponent choose Rock and I must draw (3) so I had to choose  Rock (1)
  'A Z': 6 + 2, // oponent choose Rock and I must win (6) so I had to choose  Paper (2)
  'B X': 0 + 1, // oponent choose Paper and I must loose (0) so I had to choose  Rock (1)
  'B Y': 3 + 2, // oponent choose Paper and I must draw (3) so I had to choose  Paper (2)
  'B Z': 6 + 3, // oponent choose Paper and I must win (6) so I had to choose  Scissors (3)
  'C X': 0 + 2, // oponent choose Scissor and I must loose (0) so I had to choose  Paper (2)
  'C Y': 3 + 3, // oponent choose Scissor and I must draw (3) so I had to choose  Scissors (3)
  'C Z': 6 + 1  // oponent choose Scissor and I must win so (6) I had to choose  Rock (1)
};

const totalScore = fileContent.reduce((accumulator, currentValue) => accumulator + combinations[currentValue], 0);

console.log(totalScore);