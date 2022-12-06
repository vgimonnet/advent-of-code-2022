const fs = require('fs');

const fileContent = fs.readFileSync('./input.txt', 'utf-8').split('\r\n\r\n');

fileContent[0] = fileContent[0].split('\r\n');
fileContent[0].pop();
const inputs = fileContent[0];
const instructions = fileContent[1].split('\r\n');

const buildStacks = () => {
  let stacks = [];
  let counter = 0;

  const setCrateOnStack = (row) => {
    row = row.split(' ')
    let index = 1;
    for (let i = 0; i < row.length; i++) {
      if ('' === row[i]) {
        i += 3;
      } else if (index in stacks) {
        stacks[index].push(row[i].split('')[1]);
      } else {
        stacks[index] = [];
        stacks[index].push(row[i].split('')[1]);
      }
      index++;
    }
  }
  
  inputs.map(input => {if (counter === 0) setCrateOnStack(input)});

  return stacks.map(stack => stack.reverse());
}


const getCratesOnTop = () => {
  const stacks = buildStacks();

  const getInstruction = (instruction) => {
    return instruction.split(' ').filter((element, index) => 0 !== index % 2)
  }

  const applyInstruction = (instruction) => {
    instruction = getInstruction(instruction);
    const move = instruction[0];
    const from = instruction[1];
    const to = instruction[2];

    stacks[to].push(...stacks[from].splice(-move, move));
  }

  instructions.map(instruction => applyInstruction(instruction));

  return stacks.reduce((accumulator, stack) => accumulator += stack[stack.length - 1], '');
}

console.log(getCratesOnTop());