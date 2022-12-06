const fs = require('fs');

const fileContent = fs.readFileSync('./input.txt', 'utf-8').split('');

const isStart = (startIndex, nbItem) => {
  let serie = [];
  for (let i = startIndex; i < startIndex + nbItem; i++) {
    serie.push(fileContent[i]);
  }

  return nbItem === new Set(serie).size;
}

const getStartPacket = (counter) => {
  let start = 0;
  for (let i = 0; i < fileContent.length - counter; i++) {
    if (isStart(i, counter)) {
      start = i + counter;
      break;
    }
  }

  return start;
}

console.log(getStartPacket(4));
console.log(getStartPacket(14));