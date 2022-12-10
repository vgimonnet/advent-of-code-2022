const fs = require('fs');

const instructions = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let register = 1;
let nbCycle = 0;
const cycles = [20, 60, 100, 140, 180, 220];
let execution = [];
const firstRow = [], secondRow = [], thirdRow = [], fourthRow = [], fifthRow = [], sixthRow = [];

const getSpritePosition = () => [register, register+1, register+2];

const newCycle = () => {
  nbCycle++;
  if (cycles.includes(nbCycle)) execution.push(nbCycle * register);

  let index = null, pos = null;
  const row = nbCycle / 40;
  let currentRow = null;
  if (row <= 1) { index = 0; pos = nbCycle; currentRow = firstRow; }
  else if (row <= 2) { index = 1; pos = nbCycle - 40; currentRow = secondRow; }
  else if (row <= 3) { index = 2; pos = nbCycle - 80; currentRow = thirdRow; }
  else if (row <= 4) { index = 3; pos = nbCycle - 120; currentRow = fourthRow; }
  else if (row <= 5) { index = 4; pos = nbCycle - 160; currentRow = fifthRow; }
  else if (row <= 6) { index = 5; pos = nbCycle - 200; currentRow = sixthRow; }

  if (null !== index && null !== pos && null !== currentRow) {
    if (getSpritePosition().includes(pos)) currentRow.push('#');
    else currentRow.push(' ');
  }
}

instructions.map(instruction => {
  const [cmd, value] = instruction.split(' ');
  if ('noop' === cmd) newCycle();
  else if ('addx' === cmd) {
    newCycle();
    newCycle();
    register += parseInt(value);
  }
});

const total = execution.reduce((accumulator, value) => accumulator += value, 0);
console.log('Part 1', total);

const showPixels = () => {
  console.log(firstRow.join(''));
  console.log(secondRow.join(''));
  console.log(thirdRow.join(''));
  console.log(fourthRow.join(''));
  console.log(fifthRow.join(''));
  console.log(sixthRow.join(''));
}
console.log('Part 2', showPixels());